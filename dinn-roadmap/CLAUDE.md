# DINN Roadmap 2026 — Contexto para Claude Code

## Descripción del proyecto

App web estática (un solo `index.html`, HTML + CSS + JS vanilla, sin frameworks, sin build step) que visualiza el roadmap de proyectos DINN 2026 con Airtable como fuente de verdad. Permite ver el estado de todos los proyectos agrupados por semestre y actualizar su estatus directamente desde la interfaz.

DINN es la app de inversión y débito de Banco Actinver.

---

## IDs de Airtable

| Recurso       | ID                                     |
|---------------|----------------------------------------|
| API Key       | `patKC0BMgfeMEnnk0`                    |
| Base ID       | `apppW2dYQR1fq1a8i`                    |
| Tabla         | `Proyectos`                            |
| Table ID      | `tbl9dnfWuOX9AWjjE`                    |

### Campos (Field IDs)

| Field ID               | Nombre en Airtable        | Tipo             |
|------------------------|---------------------------|------------------|
| `fldPfQnkalgfOlEFd`    | Nombre                    | Text             |
| `fldhBmfdglPCANjq3`    | Estatus                   | singleSelect     |
| `fldMZtRGHHd8pvVYv`    | Descripción               | Long text        |
| `fldtzMNqSb5mejE7m`    | Pilar                     | multipleSelects  |
| `flds5LPdTaIwjm13W`    | Prioridad inicial         | singleSelect     |
| `fldE0cnERdlC392Hf`    | Semestre                  | singleSelect     |

### Endpoint base

```
https://api.airtable.com/v0/apppW2dYQR1fq1a8i/tbl9dnfWuOX9AWjjE
```

Header de autenticación: `Authorization: Bearer patKC0BMgfeMEnnk0`

---

## Tokens de diseño DINN

### Tipografía
- Font: **Poppins** (weights: 300, 400, 500, 600, 700)
- Cargada desde Google Fonts

### Paleta de colores

| Token           | Color hex   | Uso                                  |
|-----------------|-------------|--------------------------------------|
| Verde Pino      | `#0B645C`   | Primario, CTAs, acentos              |
| Verde Olmo      | `#002421`   | Texto principal                      |
| Verde Castaño   | `#27BCB0`   | Acento secundario, En desarrollo     |
| Verde Fresno    | `#9AD9CF`   | Elementos sutiles                    |
| Verde Olivo     | `#E8F4F3`   | Fondos de sección, superficies       |
| Amarillo        | `#FFE980`   | Alerts, highlights                   |
| Gris texto      | `#616161`   | Texto secundario                     |
| Fondo           | `#FFFFFF`   | Background principal                 |

---

## Paleta de estatus (colores semánticos)

| Estatus                   | Color hex   | Descripción visual    |
|---------------------------|-------------|-----------------------|
| Nueva Captura             | `#94A3B8`   | Gris                  |
| Definición del problema   | `#F59E0B`   | Amarillo              |
| Validación                | `#3B82F6`   | Azul                  |
| Diseño                    | `#8B5CF6`   | Púrpura               |
| Lista para sprint         | `#0B645C`   | Verde pino            |
| En desarrollo             | `#27BCB0`   | Verde castaño         |
| Bloqueado                 | `#DC2626`   | Rojo                  |
| Lanzado                   | `#16A34A`   | Verde                 |

---

## Lógica de agrupación por Semestre

El campo `fldE0cnERdlC392Hf` (Semestre) tiene 3 valores posibles:

1. **H1 2026** — Proyectos del primer semestre (enero–junio 2026). Marcado con badge "HOY ▶"
2. **H2 2026** — Proyectos del segundo semestre (julio–diciembre 2026)
3. **Backlog** — Proyectos sin fecha comprometida

Orden de renderizado: H1 2026 → H2 2026 → Backlog

---

## Pilares del producto

Los proyectos se clasifican por pilar. Los filtros disponibles son:

- Todos
- Regulatorio
- Inversión
- Transaccionalidad
- Educación Financiera
- Tecnología
- Optimización

### Colores de pilar (badges)

| Pilar                  | Background   | Texto      |
|------------------------|-------------|------------|
| Regulatorio            | `#FEF3C7`   | `#92400E`  |
| Inversión              | `#D1FAE5`   | `#065F46`  |
| Transaccionalidad      | `#DBEAFE`   | `#1E40AF`  |
| Educación Financiera   | `#EDE9FE`   | `#5B21B6`  |
| Tecnología             | `#E0F2FE`   | `#0369A1`  |
| Optimización           | `#FCE7F3`   | `#9D174D`  |

---

## Métricas del header

Se calculan en tiempo real a partir del fetch:

- **Total proyectos** — count de todos los registros
- **En curso** — Estatus = "En desarrollo" | "Diseño" | "Validación" | "Lista para sprint"
- **Lanzados** — Estatus = "Lanzado"
- **Bloqueados** — Estatus = "Bloqueado"

---

## Cómo agregar proyectos nuevos

1. Abrir la base en Airtable: `apppW2dYQR1fq1a8i`, tabla `Proyectos`
2. Crear un nuevo registro con los campos requeridos
3. Asegurarse de asignar un valor de **Semestre** (H1 2026 / H2 2026 / Backlog)
4. Recargar la app — el fetch trae todos los registros automáticamente

No hay cambios necesarios en el código para agregar proyectos.

---

## Cómo iterar el diseño sin romper la integración

- Los field IDs de Airtable están declarados en la constante `FIELDS` al inicio del `<script>` en `index.html`. No cambiarlos.
- Los colores están como variables CSS en `:root`. Modificar solo ahí.
- El PATCH de estatus usa el field ID `fldhBmfdglPCANjq3` — no renombrar ni mover esa constante.
- Los valores de estatus en el dropdown deben coincidir exactamente con las opciones en Airtable (case-sensitive).
- Para agregar un nuevo pilar: añadir un botón de filtro en el HTML y un entry en el objeto `PILAR_COLORS` del JS.

---

## Archivos del proyecto

```
dinn-roadmap/
├── index.html   ← toda la app (HTML + CSS + JS)
├── CLAUDE.md    ← este archivo
└── README.md    ← instrucciones de despliegue
```
