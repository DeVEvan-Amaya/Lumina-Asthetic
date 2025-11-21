# Lumina Aesthetic

Sitio web oficial del centro de estética Lumina Aesthetic. Este proyecto implementa una landing page de alto rendimiento con enfoque en conversión y experiencia de usuario profesional.

## Fundamentos del Diseño

El diseño visual se basa en un análisis competitivo de establecimientos premium en el sector de estética y wellness, incluyendo Skin Laundry (NYC), Glowbar, AWAY Spa y Augustinus Bader. La estrategia visual adoptada responde a tres objetivos específicos:

El minimalismo con amplios espacios en blanco establece credibilidad profesional y transmite los estándares de higiene esperados en servicios estéticos. Los tonos cálidos en la paleta complementaria equilibran la austeridad clínica con un ambiente acogedor. Esta dirección diferencia al establecimiento en un mercado local donde predominan diseños saturados de información.

### Especificaciones de Diseño

La paleta de colores principal utiliza negro elegante para elementos primarios, crema cálido como color secundario, dorado como acento luxury, rosa antiguo para elementos complementarios y verde orgánico para estados de éxito. La tipografía combina Playfair Display para encabezados con Inter para texto de cuerpo, utilizando una escala modular de tercera mayor. El sistema de espaciado se construye sobre una base de 8px con incrementos progresivos hasta 64px.

## Arquitectura del Proyecto
```
Lumina-Asthetic/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   └── testimonials/
│   └── fonts/
└── README.md
```

La estructura mantiene separación de responsabilidades con archivos CSS y JavaScript modulares. Los recursos visuales se organizan por función para facilitar mantenimiento y actualizaciones.

## Ejecución del Proyecto

Para desarrollo local, se recomienda utilizar un servidor HTTP simple. Con Python 3, ejecute `python -m http.server 8000`. Con Node.js, use `npx serve .`. Para PHP, ejecute `php -S localhost:8000`. Posteriormente acceda a `http://localhost:8000` en su navegador.

Los usuarios de Visual Studio Code pueden instalar la extensión Live Server, hacer clic derecho en index.html y seleccionar "Open with Live Server" para recarga automática durante desarrollo.

## Implementación Técnica

El HTML utiliza elementos semánticos de HTML5 con meta tags optimizados para motores de búsqueda y redes sociales. Se incluyen atributos ARIA para accesibilidad y marcado Schema.org para negocios locales, mejorando la visibilidad en búsquedas geolocalizadas.

El CSS implementa variables personalizadas en la pseudo-clase :root para facilitar theming. El diseño sigue metodología mobile-first con breakpoints progresivos. Las animaciones respetan la preferencia del usuario mediante media query prefers-reduced-motion. Se aplican técnicas de glassmorphism de forma sutil en componentes específicos.

El JavaScript se organiza mediante patrón IIFE para evitar contaminación del scope global. Los event listeners se adjuntan programáticamente sin atributos inline. Se utiliza Intersection Observer API para animaciones basadas en scroll con mejor rendimiento que eventos scroll tradicionales. El código incluye documentación JSDoc completa para mantenibilidad.

## Componentes de la Interfaz

La sección hero proporciona impacto visual inicial con llamada a acción prominente. Los servicios se presentan mediante cards con iconografía consistente, información de precios y descripciones concisas. La sección institucional establece credibilidad mediante historia del establecimiento, valores corporativos y perfiles del equipo. Los testimonios implementan un carrusel con reseñas verificadas y fotografías. El área de contacto incluye formulario de consulta, integración de mapa y enlace directo a WhatsApp Business. El footer consolida navegación secundaria, enlaces a redes sociales e información legal requerida.

## Optimización de Rendimiento

Las optimizaciones implementadas incluyen CSS crítico inline para contenido above-the-fold, atributo loading="lazy" en imágenes para carga diferida, font-display: swap para prevenir bloqueo de renderizado tipográfico, ausencia de dependencias de terceros pesadas, y scripts JavaScript ubicados al final del body para no bloquear parsing del DOM.

Esta arquitectura logra tiempos de carga inferiores a 2 segundos en conexiones 3G y puntajes superiores a 90 en métricas de Lighthouse sin comprometer funcionalidad o estética visual.

## Licencia

Este proyecto se distribuye bajo licencia MIT. Lumina Aesthetic 2025.
