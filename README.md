# Lumina Aesthetic

> Página oficial de Lumina Aesthetic - Centro de Estética Premium

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Decisiones de Diseño (El "Por Qué")

### Investigación de Mercado

**Industria:** Estética / Belleza / Wellness

**Benchmark realizado sobre:**
- Skin Laundry (NYC) - Minimalismo clínico premium
- Glowbar (Facials) - UI moderna con booking integrado
- AWAY Spa (W Hotels) - Luxury organic aesthetic
- Augustinus Bader - Tipografía editorial de alto impacto

### Propuesta Visual: "Luxury Organic Minimal"

Elegimos esta dirección por tres razones estratégicas:

1. **Confianza Médica**: El minimalismo con espacios blancos amplios transmite profesionalismo y limpieza - crucial para servicios estéticos.

2. **Calidez Humana**: Los tonos dorados y rosados suavizan la frialdad clínica, creando un ambiente acogedor.

3. **Diferenciación Local**: Mientras la competencia local usa diseños recargados, el minimalismo premium posiciona a Lumina como líder de mercado.

### Sistema de Diseño

```
PALETA DE COLORES
─────────────────────────────────────
Primary     #1a1a1a    Negro elegante
Secondary   #f8f5f2    Crema cálido
Accent      #c9a959    Dorado luxury
Rose        #d4a5a5    Rosa antiguo
Success     #7d9471    Verde orgánico

TIPOGRAFÍA
─────────────────────────────────────
Headings    Playfair Display (Serif)
Body        Inter (Sans-serif)
Scale       1.25 (Major Third)

ESPACIADO (8px base)
─────────────────────────────────────
xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px | 3xl: 64px
```

---

## Estructura del Proyecto

```
Lumina-Asthetic/
│
├── index.html              # Página principal (HTML5 semántico)
│
├── css/
│   └── styles.css          # Estilos con CSS Variables + Mobile-First
│
├── js/
│   └── main.js             # JavaScript modular con JSDoc
│
├── assets/
│   ├── images/             # Imágenes optimizadas (WebP preferido)
│   │   ├── hero/
│   │   ├── services/
│   │   └── testimonials/
│   └── fonts/              # Fuentes locales (fallback)
│
└── README.md               # Este archivo
```

---

## Cómo Ejecutar el Proyecto

### Opción 1: Apertura Directa
```bash
# Simplemente abre index.html en tu navegador
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Opción 2: Servidor Local (Recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

Luego visita: `http://localhost:8000`

### Opción 3: Live Server (VS Code)
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

---

## Características Técnicas

### HTML
- [x] HTML5 Semántico (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- [x] Meta tags SEO optimizados
- [x] Open Graph para redes sociales
- [x] Accesibilidad (ARIA labels, roles)
- [x] Schema.org markup para negocios locales

### CSS
- [x] Variables CSS en `:root` para theming
- [x] Mobile-First responsive design
- [x] Reset CSS moderno (box-sizing, margins)
- [x] Sistema de espaciado consistente
- [x] Animaciones suaves con `prefers-reduced-motion`
- [x] Glassmorphism sutil en componentes

### JavaScript
- [x] Código modular (IIFE pattern)
- [x] Event Listeners (no inline onclick)
- [x] Intersection Observer para animaciones scroll
- [x] Documentación JSDoc completa
- [x] Manejo de errores

---

## Secciones de la Página

| Sección | Propósito | Componentes |
|---------|-----------|-------------|
| **Hero** | Impacto inicial + CTA principal | Imagen hero, headline, botón reserva |
| **Servicios** | Mostrar ofertas | Cards con iconos, precios, descripciones |
| **Nosotros** | Generar confianza | Historia, valores, equipo |
| **Testimonios** | Prueba social | Slider de reviews con fotos |
| **Contacto** | Conversión | Formulario, mapa, WhatsApp |
| **Footer** | Navegación secundaria | Links, redes sociales, legal |

---

## Rendimiento

Optimizaciones implementadas:
- CSS crítico inline (above the fold)
- Lazy loading en imágenes (`loading="lazy"`)
- Font-display: swap para fuentes
- Sin dependencias externas pesadas
- JavaScript al final del body

---

## Licencia

MIT License - Lumina Aesthetic 2025

---

<p align="center">
  <strong>Diseñado con enfoque estratégico para conversión</strong><br>
  <em>UX Research → UI Design → Clean Architecture</em>
</p>
