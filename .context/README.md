# Codebase Context

Static personal portfolio site. No build step, no bundler, no framework — plain HTML/CSS/JS.

---

## How it runs

`index.html` is the single entry point. `<main id="app">` starts empty.  
`loader.js` fetches each file from `sections/` in order and appends them into `#app`, then dynamically injects `script.js` after all sections are in the DOM.  
`particles-init.js` drives a custom canvas animation in the hero background.

> Must be served over HTTP — `fetch()` in `loader.js` fails on `file://` URLs. Use any static server, e.g. `python3 -m http.server`.

**Section load order** (defined in `loader.js`):
```
hero → about → education → experience → publications → projects → awards → certifications → contact
```

---

## File map

```
index.html              Entry point. Contains: <nav>, <main id="app">, <footer>.
                        Sections are injected here at runtime by loader.js.

style.css               All styles. Single flat file, no preprocessor.

script.js               All interactivity. Loaded dynamically after sections are in DOM.
                        Handles: nav scroll/highlight, mobile toggle, scroll reveal,
                        staggered grid reveal, timeline expand/collapse,
                        education card expand/collapse, project category filter.

loader.js               Fetches sections/*.html sequentially, appends to #app,
                        then injects script.js and calls initParticles().

particles-init.js       Custom canvas-based background animation for the hero section.

profile.png             Profile photo used in hero.

sections/               One HTML fragment per section. Each file contains a single
  hero.html             <section id="…"> element — no <html>/<head>/<body> wrapper.
  about.html
  education.html
  experience.html
  publications.html
  projects.html
  awards.html
  certifications.html
  contact.html

assets/                 Static image assets used by section HTML files.
  *.svg / *.png         Company and institution logos.
  skills/               Skill icon assets.
```

---

## Key CSS patterns

| Selector / attribute | Purpose |
|---|---|
| `.reveal` | Fade/slide-in on scroll. Applied to headings, labels, and blocks. Becomes `.reveal.visible` when intersecting. |
| `[data-stagger]` | Parent whose direct children each receive staggered `.reveal` with 60 ms delay offset per child. |
| `.timeline-item` | One row in the experience timeline. |
| `.timeline-item.open` | Expanded state — shows `.timeline-body`. Toggled by clicking `.timeline-header`. |
| `.edu-expandable` | Education card with collapsible body. |
| `.edu-expandable.open` | Expanded state — shows `.edu-expand-body`. Toggled by `.edu-expand-header` click. |
| `.project-card[data-category]` | Project card. Filtered by `.filter-tab[data-filter]` clicks. Hidden state: `.project-card.hidden`. |
| `.card` | Base card style (background, border, radius). Composed with section-specific card classes. |
| `.section-label` | Small uppercase label rendered above `.section-title`. |
| `.gradient-text` | CSS gradient clipped to text. Used on the hero name. |
| `.tl-logo-dark` | Applies invert filter to a logo image — for dark logos on dark backgrounds. |
| `.container` | Max-width centered wrapper. Used inside every section. |

---

## JS interaction model

All JS runs **after** `loader.js` finishes injecting sections. `script.js` queries the DOM once at the top level — no event delegation except where noted.

| Feature | How it works |
|---|---|
| Scroll reveal | `IntersectionObserver` on `.reveal` elements; adds `.visible` class once. |
| Stagger | Second `IntersectionObserver` on `[data-stagger]` parents; sets `transitionDelay` on children, then adds `.visible`. |
| Timeline toggle | Click on `.timeline-header` → closest `.timeline-item` toggled `.open`. All other items closed first (accordion). First item opened by default on load. |
| Edu card toggle | Click on `.edu-expand-header` → parent `.edu-expandable` `.open` toggled. First expandable opened by default. |
| Project filter | Click `.filter-tab[data-filter]` → toggle `.hidden` on `.project-card` elements where `card.dataset.category !== filter`. `data-filter="all"` shows everything. |
| Nav active link | On scroll, compares `scrollY + 80` against each `section[id]` offset range; toggles `.active` on matching nav anchor. |

---

## How to make common changes

### Add an experience entry
Edit `sections/experience.html`. Copy an existing `.timeline-item` block. Update role, company, dates, location, logo `src` (add SVG to `assets/`), and `<ul>` bullets in `.timeline-body`.

### Add a project card
Edit `sections/projects.html`. Add a `.project-card` div with `data-category="cv|nlp|mlops|sensor|os|ug"`. If introducing a new category, add a matching `.filter-tab[data-filter="…"]` to the filter bar.

### Add a new section
1. Create `sections/your-section.html` — must wrap content in `<section id="your-section">`.
2. Add `'your-section'` to the `SECTIONS` array in `loader.js`.
3. Add a nav `<a href="#your-section">` in `index.html`.
4. Style in `style.css`.

### Edit styles
Search `style.css` by selector or by the comment blocks that group sections (e.g. `/* HERO */`, `/* TIMELINE */`, `/* EDUCATION */`).

---

## Git

- **Main branch:** `master` — pushes here auto-deploy to GitHub Pages.
- No CI, no build pipeline. Repo contents = what's live.
