# dev-portfolio — IDE-style portfolio template

A modular, framework-free portfolio site styled as an IDE. No build step, no dependencies — just HTML, CSS, and vanilla JS.

**[Live demo →](https://ujjwalb18.github.io)**

## Why this exists

Most portfolio templates are either too generic or too coupled to a framework. This one is:
- **Static** — deploys anywhere, loads fast, no Node required
- **Modular** — swap content without touching layout code
- **Data-driven** — projects and skills live in JSON files, not hardcoded HTML
- **Opinionated on style** — IDE aesthetic, Fira Code font, dark theme

Fork it, replace the content files, deploy. Done.

## Structure

```
├── index.html                  ← thin shell, loads partials + scripts
├── assets/
│   └── avatar.png              ← your profile photo (also used as favicon)
├── css/
│   ├── variables.css           ← design tokens (colors, fonts, shadows)
│   ├── base.css                ← reset + body
│   ├── layout.css              ← topbar, sidebar, IDE grid, blocks, footer
│   ├── components.css          ← cards, pills, codefile, terminal, sticker, popup
│   └── sections.css            ← hero + section-specific styles
├── js/
│   ├── main.js                 ← entry point, ES module
│   ├── components.js           ← loads HTML partials via fetch
│   ├── sidebar.js              ← file-tree toggle + smooth scroll
│   ├── nav.js                  ← URL hash sync, active section tracking
│   ├── sticker.js              ← drag + click → opens contact popup
│   ├── skills.js               ← renders skills.json
│   ├── projects.js             ← renders projects.json
│   └── terminal.js             ← terminal commands + history + easter eggs
├── components/
│   ├── topbar.html
│   ├── sidebar.html
│   ├── tabs.html
│   ├── hero.html
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── terminal.html
│   ├── contact.html
│   ├── footer.html
│   └── sticker.html            ← draggable sticker + contact popup
└── data/
    ├── skills.json             ← add/remove skills here
    ├── projects.json           ← add/remove projects here
    └── terminal-commands.json  ← customise terminal command outputs
```

## Making it yours

| What you want to change | File to edit |
|---|---|
| Name, tagline, role pills | `components/hero.html` |
| About section content | `components/about.html` |
| Profile photo | replace `assets/avatar.png` |
| Skills | `data/skills.json` |
| Projects | `data/projects.json` |
| Terminal command outputs | `data/terminal-commands.json` |
| Email / GitHub / LinkedIn links | `components/contact.html` and `components/sticker.html` |
| Footer text | `components/footer.html` |
| Colors, fonts, shadows | `css/variables.css` |

### Adding a project

Open `data/projects.json` and add an object following this shape:

```json
{
  "id": "PRJ-011",
  "meta": "// python · pandas · 2025",
  "title": "YourProject.run()",
  "description": "What you built, why it was hard, what you learned.",
  "tags": ["Python", "pandas"],
  "stats": [
    { "value": "X", "label": "some metric" },
    { "value": "Y", "label": "another metric" }
  ],
  "link": "https://github.com/you/your-repo"
}
```

Leave `link` as `""` to hide the repo button.

## Running locally

The site uses `fetch()` to load HTML partials and JSON — browsers block this on `file://` URLs, so opening `index.html` directly won't work. Use a local server:

**VS Code** — install the Live Server extension, right-click `index.html` → *Open with Live Server*

**Python:**
```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

**Node:**
```bash
npx serve .
```

## Deploying to GitHub Pages

1. Fork this repo (or create a new one named `<your-username>.github.io`)
2. Push the files to the root of the `main` branch
3. Repo → **Settings → Pages → Source:** Deploy from branch `main`, folder `/ (root)` → Save
4. Visit `https://<your-username>.github.io` after ~1 minute

## Custom domain

1. Buy a domain from any registrar
2. Repo → **Settings → Pages → Custom domain** → enter your domain → Save
3. In your registrar's DNS panel, add:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  <your-username>.github.io
   ```
4. Wait ~10 minutes, then tick **Enforce HTTPS** in Pages settings

## Features

- **Smooth single-page nav** — URL hash updates as you scroll (`#about`, `#projects`, etc.)
- **Sidebar active-section tracking** — highlights current section while scrolling
- **Draggable sticker** — click to open a contact popup with email + LinkedIn
- **Live terminal** — try `help`, `about`, `projects`, `secret`, `hack` (there are easter eggs)
- **Data-driven rendering** — projects and skills are JSON, not hardcoded HTML
- **Zero dependencies** — no npm, no bundler, no framework

## License

MIT — fork freely, attribution appreciated but not required.
