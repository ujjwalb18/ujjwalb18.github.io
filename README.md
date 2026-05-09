# ujjwal.codes — portfolio

Personal portfolio site. Modular static — no frameworks, no build step.

## Structure

```
portfolio/
├── index.html              ← thin shell, loads partials + scripts
├── css/
│   ├── variables.css       ← design tokens (colors, fonts, shadows)
│   ├── base.css            ← reset + body
│   ├── layout.css          ← topbar, sidebar, ide grid, blocks, footer
│   ├── components.css      ← cards, pills, codefile, terminal, sticker
│   └── sections.css        ← hero + section-specific bits
├── js/
│   ├── main.js             ← entry point, ES module
│   ├── components.js       ← loads HTML partials via fetch
│   ├── sidebar.js          ← file-tree toggle + scroll nav
│   ├── sticker.js          ← draggable sticker (mouse + touch)
│   ├── skills.js           ← renders skills.json
│   ├── projects.js         ← renders projects.json
│   └── terminal.js         ← terminal commands, history, easter eggs
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
│   └── sticker.html
└── data/
    ├── skills.json             ← edit to add/remove skills
    ├── projects.json           ← edit to add/remove projects
    └── terminal-commands.json  ← edit terminal command outputs
```

## How to edit

| If you want to change... | Edit this file |
|---|---|
| A color, font, or shadow | `css/variables.css` |
| The hero name or tagline | `components/hero.html` |
| The about code-block content | `components/about.html` |
| Add/remove a skill | `data/skills.json` |
| Add/remove a project | `data/projects.json` |
| What a terminal command outputs | `data/terminal-commands.json` |
| Add a new terminal command | `data/terminal-commands.json` (or `js/terminal.js` for dynamic ones) |
| Email/GitHub/LinkedIn links | `components/contact.html` |
| Footer text | `components/footer.html` |

## Running locally

The site uses `fetch()` to load HTML partials and JSON data. Browsers block this on `file://` URLs for security, so **double-clicking `index.html` won't work**. You need a local server.

**Easiest options:**

- **VS Code** → install the "Live Server" extension → right-click `index.html` → "Open with Live Server"
- **Python** (pre-installed on Mac/Linux):
  ```bash
  cd portfolio
  python3 -m http.server 8000
  ```
  Then visit `http://localhost:8000`
- **Node** (if you have it):
  ```bash
  npx serve portfolio
  ```

## Deploying to GitHub Pages

1. Create a public repo named `<your-username>.github.io`
2. Upload **everything inside** the `portfolio/` folder to the repo root (not the folder itself — the contents)
3. Repo → Settings → Pages → Source: Deploy from branch `main`, folder `/ (root)` → Save
4. Visit `https://<your-username>.github.io` after ~1 minute

GitHub Pages serves over HTTPS, so all the `fetch()` calls work fine there.

## Adding a custom domain (e.g. ujjwal.codes)

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

## License

Personal portfolio — feel free to take design inspiration but please don't republish wholesale.
