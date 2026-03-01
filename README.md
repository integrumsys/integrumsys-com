# Integrum Systems — Company Website

Marketing website for [Integrum Systems Inc.](https://integrumsys.com) Built with Bootstrap 5, Pug, and Sass via a Node.js build pipeline.

## Pages

| Page | Source | Description |
|------|--------|-------------|
| Home | `src/pug/index.pug` | Hero, differentiators, CTA |
| About | `src/pug/about.pug` | Founding context, founder, operating principles |
| Services | `src/pug/services.pug` | Service cards, approach block |
| Contact | `src/pug/contact.pug` | Contact form, direct info |
| Shop | `src/pug/shop.pug` | Coming Soon product card |
| Privacy | `src/pug/privacy.pug` | Privacy policy stub |
| Terms | `src/pug/terms.pug` | Terms of service stub |

## Stack

- **Bootstrap** 5.2.3
- **Pug** 3.0.2 — HTML templating
- **Sass** 1.60.0 — CSS compilation
- **Prettier** 3.x + `@prettier/plugin-pug` — formatting
- **Browser Sync** — live reload dev server

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Clean + compile all sources to `dist/` |
| `npm run build:pug` | Compile Pug to HTML |
| `npm run build:scss` | Compile Sass to CSS |
| `npm run build:scripts` | Copy JS to dist |
| `npm run build:assets` | Copy assets to dist |
| `npm run clean` | Delete `dist/` |
| `npm start` | Build + launch live preview with watch |
| `npm run format` | Format all source files with Prettier |

## Development

```sh
npm install
npm start          # builds and opens browser with live reload
```

All compiled output goes to `dist/`. Do not edit files in `dist/` directly.

## CI

GitHub Actions runs on every push and pull request to `master`:
1. Prettier format check
2. Full build
3. Verify all 7 HTML pages are present in `dist/`

## License

MIT — see [LICENSE](LICENSE).
