# ujjwal.codes — portfolio

Personal portfolio site. Modular static — no frameworks, no build step.

## Structure

```
portfolio/
├── index.html              ← thin shell, loads partials + scripts
├── README.md
├── assets/
│   └── avatar.png          ← profile photo (also used as favicon)
├── css/
│   ├── variables.css       ← design tokens (colors, fonts, shadows)
│   ├── base.css            ← reset + body
│   ├── layout.css          ← topbar, sidebar, ide grid, blocks, footer
│   ├── components.css      ← cards, pills, codefile, terminal, sticker, popup
│   └── sections.css        ← hero + section-specific bits
├── js/
│   ├── main.js             ← entry point, ES module
│   ├── components.js       ← loads HTML partials via fetch
│   ├── sidebar.js          ← file-tree toggle + smooth scroll
│   ├── nav.js              ← URL hash sync, active section tracking
│   ├── sticker.js          ← drag + click → opens contact popup
│   ├── skills.js           ← renders skills.json
│   ├── projects.js         ← renders projects.json
│   └── terminal.js         ← terminal commands + history + easter eggs
├── components/
│   ├── topbar.html
│   ├── sidebar.html
│   ├── tabs.html
│   ├── hero.html           ← includes avatar from /assets
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── terminal.html
│   ├── contact.html
│   ├── footer.html
│   └── sticker.html        ← sticker + contact popup markup
└── data/
    ├── skills.json             ← edit to add/remove skills
    ├── projects.json           ← edit to add/remove projects (10 real ones)
    └── terminal-commands.json  ← edit terminal command outputs
```

## How to edit

| If you want to change... | Edit this file |
|---|---|
| A color, font, or shadow | `css/variables.css` |
| Profile photo | replace `assets/avatar.png` |
| Hero name, tagline, or pills | `components/hero.html` |
| About code-block content | `components/about.html` |
| Add/remove a skill | `data/skills.json` |
| Add/remove a project | `data/projects.json` |
| Terminal command output | `data/terminal-commands.json` |
| Email/GitHub/LinkedIn links | `components/contact.html` AND `components/sticker.html` |
| Footer text | `components/footer.html` |

## Running locally

The site uses `fetch()` to load HTML partials and JSON. Browsers block this on `file://` URLs for security, so **double-clicking `index.html` won't work**. You need a local server.

**Easiest options:**

- **VS Code Live Server extension** — right-click `index.html` → "Open with Live Server"
- **Python:**
  ```bash
  cd portfolio
  python3 -m http.server 8000
  ```
  Visit `http://localhost:8000`
- **Node:**
  ```bash
  npx serve portfolio
  ```

## Deploying to GitHub Pages

1. Create a public repo named `<your-username>.github.io` (e.g. `ujjwalb18.github.io`)
2. Upload **everything inside** the `portfolio/` folder to the repo root (not the folder itself)
3. Repo → Settings → Pages → Source: Deploy from branch `main`, folder `/ (root)` → Save
4. Visit `https://<your-username>.github.io` after ~1 minute

GitHub Pages serves over HTTPS, so all the `fetch()` calls work fine there.

## Custom domain (e.g. ujjwal.codes)

1. Buy domain from registrar (Porkbun, Namecheap, GoDaddy)
2. Repo → Settings → Pages → Custom domain → enter `ujjwal.codes` → Save
3. In your registrar's DNS panel, add:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  <your-username>.github.io
   ```
4. Wait ~10 min, then back in Pages settings tick **Enforce HTTPS**

## Features

- **Smooth single-page nav** — URL updates as you scroll (`#about`, `#projects`, etc.)
- **Sidebar active-section tracking** — current section highlighted while you scroll
- **Hire Me sticker** — drag it around, or click to open a contact popup with email + LinkedIn
- **Live terminal** — try `help`, `about`, `projects`, `secret`, `hack`, `chai` (yes there are easter eggs)
- **Profile photo** — anchored to the hero, slightly tilted, with a draggable handle label
- **Real GitHub project links** — every project card with a link has an arrow button to its repo
