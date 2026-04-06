# DINN Roadmap 2026

Visualizador interactivo del roadmap de proyectos DINN 2026, conectado a Airtable como fuente de verdad.

## Cómo abrir

Simplemente abre `index.html` en cualquier navegador moderno:

```bash
open index.html
# o en Windows:
start index.html
```

No requiere servidor, build step, ni dependencias locales. La única dependencia externa es Google Fonts (Poppins), que se carga automáticamente.

## Cómo desplegar

### Opción 1 — GitHub Pages
1. Sube el contenido de esta carpeta a un repositorio de GitHub
2. En Settings → Pages, selecciona la rama `main` y carpeta `/root`
3. La app estará disponible en `https://<usuario>.github.io/<repo>/`

### Opción 2 — Netlify Drop
1. Arrastra la carpeta `dinn-roadmap/` a [netlify.com/drop](https://netlify.com/drop)
2. Netlify genera una URL pública instantáneamente

### Opción 3 — Servidor estático
Sirve la carpeta con cualquier servidor HTTP estático:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

## Fuente de datos

Los proyectos se leen y actualizan en tiempo real desde Airtable.
Ver `CLAUDE.md` para los IDs y tokens de configuración.
