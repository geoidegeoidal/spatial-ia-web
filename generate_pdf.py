import sys
from fpdf import FPDF

class SyllabusPDF(FPDF):
    def header(self):
        # Header Box with Dark Neon Tokyo Background
        self.set_fill_color(10, 10, 18) # #0a0a12
        self.rect(0, 0, 210, 45, 'F')
        
        # Title
        self.set_font('helvetica', 'B', 22)
        self.set_text_color(255, 45, 120) # Hot Pink Neon
        self.set_xy(10, 15)
        self.cell(0, 10, 'SYLLABUS: GEO-IA WEB APPS', 0, 1, 'C')
        
        # Subtitle
        self.set_font('helvetica', 'I', 11)
        self.set_text_color(0, 255, 204) # Cyan Neon
        self.cell(0, 8, 'Desarrollo de Aplicaciones Web Territoriales Asistido con IA', 0, 1, 'C')
        self.ln(15)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(161, 161, 170)
        self.cell(0, 10, '// ZERO_SERVER_ARCHITECTURE // Bootcamp 2026', 0, 0, 'C')

def create_pdf():
    pdf = SyllabusPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Title Section
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(10, 10, 18)
    pdf.cell(0, 12, 'Estructura del Bootcamp (3 Sesiones)', 0, 1, 'L')
    pdf.ln(2)

    # Session 1
    pdf.set_fill_color(248, 248, 252)
    pdf.set_font('helvetica', 'B', 13)
    pdf.set_text_color(255, 45, 120) # Pink
    pdf.cell(0, 10, ' S01 - Fundamentos de IA y Spec-Driven Development', 0, 1, 'L', fill=True)
    
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Que es un LLM y como programar asistido por IA usando Antigravity IDE y OpenCode.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Entenderemos la arquitectura detras de los grandes modelos de lenguaje y como interactuar con ellos gratuitamente desde el editor.', border=0, align='L')
    pdf.ln(2)
    
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Ingenieria de Prompts: Spec-Driven Development para codigo web.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Aprenderemos la metodologia tecnica para escribir especificaciones claras y sin ambiguedades, logrando codigo limpio y predecible.', border=0, align='L')
    pdf.ln(2)

    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Generacion de UI: Del mockup al codigo con IA.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Disenaremos las maquetas de nuestro visor territorial y las convertiremos instantaneamente en una interfaz web moderna sin tipear CSS.', border=0, align='L')
    pdf.ln(6)

    # Session 2
    pdf.set_font('helvetica', 'B', 13)
    pdf.set_text_color(0, 150, 150) # Dark Cyan
    pdf.cell(0, 10, ' S02 - Dashboards Territoriales y Web Mapping Reactivo', 0, 1, 'L', fill=True)
    
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Ecosistema Open Source: MapLibre GL JS / Leaflet.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Dominaremos librerias de web mapping de codigo abierto, liberandonos de licencias costosas y dependencias comerciales.', border=0, align='L')
    pdf.ln(2)
    
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Ensamblaje ("Stitching"): Integrando disenos generados en stitch.withgoogle.com.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Conectaremos las interfaces visuales generadas con la logica, aprendiendo a "coser" el mapa interactivo dentro del contenedor disenado.', border=0, align='L')
    pdf.ln(2)

    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Reactividad: Filtros espaciales interactivos.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Programaremos la comunicacion entre el mapa y el dashboard, logrando que clics actualicen dinamicamente datos y popups.', border=0, align='L')
    pdf.ln(6)

    # Session 3
    pdf.set_font('helvetica', 'B', 13)
    pdf.set_text_color(255, 45, 120) # Pink
    pdf.cell(0, 10, ' S03 - Analisis Espacial en el Navegador y Despliegue', 0, 1, 'L', fill=True)
    
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Geoprocesamiento Client-Side: Calculos espaciales sin servidores.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Implementaremos librerias como Turf.js para realizar analisis espaciales directamente en el navegador del usuario.', border=0, align='L')
    pdf.ln(2)
    
    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' Manejo de Datos: GeoJSON y formatos optimizados.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Aprenderemos tecnicas para optimizar la carga y renderizado de informacion espacial densa de forma ultrarrapida.', border=0, align='L')
    pdf.ln(2)

    pdf.set_font('helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(w=180, h=6, text=chr(149) + ' A Produccion: Despliegue gratuito en GitHub Pages.', border=0, align='L')
    pdf.set_font('helvetica', 'I', 9)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(w=180, h=5, text='  Subiremos nuestro codigo a la nube obteniendo un enlace publico y seguro (HTTPS) listo para el portafolio a costo cero.', border=0, align='L')
    pdf.ln(10)

    # Pricing
    pdf.set_font('helvetica', 'B', 16)
    pdf.set_text_color(10, 10, 18)
    pdf.cell(0, 12, 'Inversion y Valores', 0, 1, 'L')
    pdf.ln(2)

    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(45, 10, 'Acceso General:', 0, 0, 'L')
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(255, 45, 120) # Hot Pink
    pdf.cell(0, 10, '$30.000 CLP', 0, 1, 'L')
    
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(45, 10, 'Pase Estudiantes:', 0, 0, 'L')
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(0, 200, 200) # Dark Cyan for print contrast
    pdf.cell(40, 10, '$25.000 CLP', 0, 0, 'L')
    pdf.set_font('helvetica', 'I', 10)
    pdf.set_text_color(150, 150, 150)
    pdf.cell(0, 10, '(requiere credencial universitaria o certificado)', 0, 1, 'L')

    # Output
    try:
        pdf.output('Syllabus_Geo_IA_Apps_Web.pdf')
        print("PDF generado correctamente: Syllabus_Geo_IA_Apps_Web.pdf")
    except Exception as e:
        print(f"Error generando PDF: {e}")

if __name__ == '__main__':
    create_pdf()
