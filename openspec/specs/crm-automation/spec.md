# Spec: CRM Automation & Transaccional (`crm-automation`)

## 1. Propósito y Alcance
Especifica el motor de backend serverless implementado en Google Apps Script (`crm_script.gs`) para la recepción de inscripciones, orquestación de pagos, máquina de estados transaccional y comunicación vía correo electrónico.

---

## 2. Reglas de Negocio y Requisitos Técnicos

### `RULE-CRM-001`: Ingesta de Formularios vía Webhook (`doPost`)
- El script expone un endpoint HTTP POST que recibe: `name`, `email`, `country`, `nivel_sig`, `ocupacion`, `plan`.
- Si la hoja de cálculo destino está vacía, se inicializa automáticamente la cabecera: `["Fecha", "Nombre", "Email", "País", "Nivel SIG", "Profesión", "Plan", "Estado Pago"]`.
- Toda nueva inscripción se registra inicialmente en estado `"Pendiente"`.

### `RULE-CRM-002`: Bifurcación Geográfica y por Plan de Pasarelas de Pago
- **Residentes en Chile (`country === "chile"`):**
  - **Plan Acceso General ($30.000 CLP):** Enlace de cobro MercadoPago (`https://www.mercadopago.cl/payment-link/v1/go?link-id=f7b0764f-2801-4b26-a858-59c416eebe42`).
  - **Plan Pase Estudiantes ($25.000 CLP):** Enlace de cobro con descuento MercadoPago (`https://mpago.la/1EvJQi3`).
  - **Opción 2 (Transferencia Bancaria):** Transferencia directa a Banco Falabella, Cta. Corriente `019823326523`, RUT `18.223.053-7`, especificando el monto según plan ($25.000 o $30.000 CLP).
- **Residentes Internacionales (`country !== "chile"`):**
  - **Plan Acceso General (35 USD):** Enlace directo de cobro global vía PayPal (`https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`) por 35 USD.
  - **Plan Pase Estudiantes (26 USD):** Enlace directo de cobro global vía PayPal (`https://www.paypal.com/ncp/payment/2PVCP7EQT3DWU`) por **26 USD** con comprobante de alumno regular.
  - **Opción Alternativa:** Pago en moneda chilena vía MercadoPago adaptado por plan ($25.000 CLP Estudiante / $30.000 CLP General).

### `RULE-CRM-003`: Máquina de Estados Transaccional
La columna 8 (`Estado Pago`) gobierna el ciclo de vida del alumno:

```mermaid
stateDiagram-v2
    [*] --> Pendiente: doPost()
    Pendiente --> RecordatorioEnviado: enviarRecordatoriosPago() [24h]
    RecordatorioEnviado --> RecordatorioFinalEnviado: enviarRecordatoriosPago() [72h]
    Pendiente --> Pendiente_Asterisco: enviarAvisoPayPalAtrasados()
    
    Pendiente --> Pagado: Validación de Comprobante
    Pagado --> TutorialEnviado: enviarTutorialAutomático()
    TutorialEnviado --> TutorialEnviadoV3: enviarFeDeErratasTutorial()
    
    TutorialEnviado --> AccesosEnviados: enviarLinksConexion()
    TutorialEnviadoV3 --> AccesosEnviados: enviarLinksConexion()
    
    AccesosEnviados --> DiplomaEnviado: enviarDiplomasYCierre()
    DiplomaEnviado --> [*]
```

### `RULE-CRM-004`: Despacho de Sockets y Enlaces de Sesión (`enviarLinksConexion`)
- **Filtro estricto:** Solo filas cuyo estado sea `"Tutorial Enviado"` o `"Tutorial Enviado V4"`.
- **Contenido del correo:**
  - Sesión 1 (Viernes 11-SEP): `https://meet.google.com/dkp-rpqg-ktc`
  - Sesión 2 (Sábado 12-SEP): `https://meet.google.com/pgc-rmvk-dgj`
  - Sesión 3 (Domingo 13-SEP): `https://meet.google.com/dos-fcdq-kee`
  - Bóveda permanente en Drive: `https://drive.google.com/drive/folders/1vRA1fkfG01kLL3DfMeVres5re51YqlTg?usp=sharing`
- **Transición de estado:** Actualiza a `"Accesos Enviados"`.

### `RULE-CRM-005`: Notificación Inmediata al Administrador
- En cada ejecución exitosa de `doPost`, se despacha un correo de alerta a `jorge.ulloa.roa@gmail.com` con los datos del postulante para verificación inmediata.

---

## 3. Implementación y Mapeo en Código

| Función | Archivo | Líneas Aprox. | Propósito |
| :--- | :--- | :--- | :--- |
| `doPost(e)` | [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs#L21-L105) | 21–105 | Endpoint receptor de inscripciones y envío de bienvenida con datos de pago |
| `enviarRecordatoriosPago()` | [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs#L107-L158) | 107–158 | Cron de 24h y 72h para conversión de inscritos pendientes |
| `enviarTutorialAutomático()` | [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs#L160-L205) | 160–205 | Entrega de binarios e instructivo de instalación a alumnos con pago confirmado |
| `enviarLinksConexion()` | [crm_script.gs](file:///c:/Users/Tokyotech/sideprojects/spatial_ia_code/crm_script.gs#L302-L375) | 302–375 | Envío masivo de accesos a Google Meet y Drive |
