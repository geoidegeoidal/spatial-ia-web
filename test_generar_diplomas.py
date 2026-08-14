import os
import sys
import subprocess
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')


def get_diploma_html(nombre_alumno, fecha_emision="10 de Agosto de 2026"):
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600;700&display=swap');
    @page {{
      size: A4 landscape;
      margin: 0;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      width: 297mm;
      height: 210mm;
      background-color: #000000;
      color: #FFFFFF;
      font-family: 'Space Grotesk', 'Courier New', monospace;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;
    }}
    .diploma-container {{
      width: 1040px;
      height: 700px;
      border: 2px solid #222222;
      background-color: #0A0A0A;
      position: relative;
      padding: 50px 60px;
      box-sizing: border-box;
    }}
    .corner-tl {{ position: absolute; top: 0; left: 0; width: 30px; height: 30px; border-top: 4px solid #D4FF00; border-left: 4px solid #D4FF00; }}
    .corner-br {{ position: absolute; bottom: 0; right: 0; width: 30px; height: 30px; border-bottom: 4px solid #D4FF00; border-right: 4px solid #D4FF00; }}
    
    .badge {{
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid #D4FF00;
      color: #D4FF00;
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 30px;
    }}
    .title {{
      font-family: 'Inter', Arial, sans-serif;
      font-size: 46px;
      font-weight: 700;
      letter-spacing: -1px;
      margin: 0 0 8px 0;
      color: #FFFFFF;
    }}
    .subtitle {{
      font-size: 15px;
      color: #888888;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 35px;
    }}
    .student-name {{
      font-family: 'Inter', Arial, sans-serif;
      font-size: 40px;
      font-weight: 700;
      color: #D4FF00;
      margin: 0 0 15px 0;
      border-bottom: 1px solid #333333;
      padding-bottom: 8px;
      display: inline-block;
      min-width: 600px;
    }}
    .description {{
      font-size: 14px;
      color: #AAAAAA;
      line-height: 1.6;
      max-width: 720px;
      margin-bottom: 35px;
    }}
    .footer-grid {{
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #222222;
      padding-top: 20px;
    }}
    .footer-block {{
      text-align: left;
    }}
    .footer-label {{
      font-size: 11px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }}
    .footer-value {{
      font-size: 14px;
      color: #FFFFFF;
      font-weight: bold;
    }}
    .signature {{
      font-family: 'Courier New', monospace;
      color: #D4FF00;
      font-size: 16px;
      font-style: italic;
    }}
    .stamp {{
      position: absolute;
      bottom: 40px;
      right: 40px;
      width: 90px;
      height: 90px;
      border: 2px dashed #333333;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 10px;
      color: #666666;
      transform: rotate(-15deg);
    }}
  </style>
</head>
<body>
  <div class="diploma-container">
    <div class="corner-tl"></div>
    <div class="corner-br"></div>
    
    <div class="badge">SYS.CERTIFICATE_OF_COMPLETION</div>
    
    <h1 class="title">Certificado de Aprobación</h1>
    <div class="subtitle">Desarrollo Web Territorial con IA (Bootcamp V3)</div>
    
    <p style="color: #666666; margin-bottom: 8px; font-size: 13px;">Este documento certifica que:</p>
    <h2 class="student-name">{nombre_alumno}</h2>
    
    <p class="description">
      Ha completado satisfactoriamente los módulos teórico-prácticos del Bootcamp Geo-IA V3 (5 horas lectivas y 4 horas de práctica), demostrando competencias en análisis espacial, programación web frontend, uso de MapLibre GL JS, geoprocesamiento client-side con Turf.js y arquitectura Zero-Server.
    </p>
    
    <div class="footer-grid">
      <div class="footer-block">
        <div class="footer-label">Intensidad Horaria</div>
        <div class="footer-value">5 hrs lectivas + 4 hrs prácticas (9 hrs totales)</div>
      </div>
      <div class="footer-block">
        <div class="footer-label">Fecha de Emisión</div>
        <div class="footer-value">{fecha_emision}</div>
      </div>
      <div class="footer-block">
        <div class="footer-label">Instructor / Director</div>
        <div class="signature">Jorge Ulloa Roa</div>
      </div>
    </div>

    <div class="stamp">
      GEO-IA<br>VERIFIED<br>V3.0
    </div>
  </div>
</body>
</html>"""

def test_generate_pdf():
    edge_paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    ]
    edge_exe = next((p for p in edge_paths if os.path.exists(p)), None)
    if not edge_exe:
        print("❌ Microsoft Edge no fue encontrado en las rutas estándar.")
        return

    output_dir = os.path.join(os.path.dirname(__file__), "test_diplomas")
    os.makedirs(output_dir, exist_ok=True)

    alumnos_prueba = [
        "Jorge Ulloa Roa",
        "Valentina Soto Moraga",
        "Carlos Eduardo Mendoza"
    ]

    print(f"🚀 Iniciando prueba local de generación de diplomas ({len(alumnos_prueba)} alumnos)...")

    for nombre in alumnos_prueba:
        safe_name = "".join(c if c.isalnum() else "_" for c in nombre)
        html_path = os.path.join(output_dir, f"diploma_{safe_name}.html")
        pdf_path = os.path.join(output_dir, f"Diploma_GeoIA_V3_{safe_name}.pdf")

        html_content = get_diploma_html(nombre)
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        file_url = f"file:///{os.path.abspath(html_path).replace(os.sep, '/')}"
        
        cmd = [
            edge_exe,
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            file_url
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 0:
            size_kb = round(os.path.getsize(pdf_path) / 1024, 2)
            print(f"✅ PDF generado con éxito para '{nombre}': {pdf_path} ({size_kb} KB)")
        else:
            print(f"❌ Falló la generación de PDF para '{nombre}'. Error: {result.stderr}")

if __name__ == "__main__":
    test_generate_pdf()
