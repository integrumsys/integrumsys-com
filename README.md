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
3. Fail if `dist/` does not match a clean rebuild
4. Verify all 7 HTML pages and `_headers` are present in `dist/`

Step 3 matters because Cloudflare serves the committed `dist/` and never runs a
build. Without it, `src/` and `dist/` can drift apart and CI stays green while the
live site is stale. A sibling site ran 20 months behind `master` before anyone
noticed.

## Deployment

The site is a Cloudflare Worker with static assets only: Cloudflare serves the
committed `dist/` and never runs a build (`wrangler.jsonc`). Workers Builds
deploys on every push to `master`, so whatever is committed under `dist/` is
what visitors get.

A source change is only live once the rebuilt `dist/` is committed too:

```sh
npm ci
npm run build
git add dist/ && git commit
```

Response headers (HSTS, CSP, framing) live in `src/_headers`, which the build
copies to `dist/_headers`. The CSP ships as `Content-Security-Policy-Report-Only`
until a pass over every page shows no violations in the browser console.

## License

MIT — see [LICENSE](LICENSE).
