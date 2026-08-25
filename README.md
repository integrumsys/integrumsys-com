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
4. Verify all 7 HTML pages are present in `dist/`

Step 3 matters because the server serves the committed `dist/` and never runs a
build. Without it, `src/` and `dist/` can drift apart and CI stays green while the
live site is stale. A sibling site ran 20 months behind `master` before anyone
noticed.

## Deployment

The site runs on a Vultr VPS behind Cloudflare. Apache serves the committed
`dist/` from `/var/www/integrumsys.com/dist` — **the server never runs a build**,
so whatever is committed under `dist/` is what visitors get.

Deployment is a manual pull:

```sh
ssh linuxuser@integrumsys.com
cd /var/www/integrumsys.com
sudo git pull --ff-only origin master
```

No restart is needed; Apache reads the files on each request.

A source change is only live once the rebuilt `dist/` is committed too:

```sh
npm ci
npm run build
git add dist/ && git commit
```

### Server notes

- SSH is key-only; password authentication is disabled and `PermitRootLogin` is
  `prohibit-password`. `linuxuser` has passwordless sudo, so that key alone is
  root. Its password is deliberately left set — it is the only Vultr console
  fallback if the key ever fails.
- fail2ban guards SSH with escalating bans. Before it was installed the box was
  taking roughly 9,000 failed authentication attempts per day.
- ufw allows 22 and 80 from anywhere, but **443 only from Cloudflare's published
  ranges**, so the origin cannot be reached directly. Refresh the ranges from
  <https://www.cloudflare.com/ips-v4> and `ips-v6` if the site becomes
  intermittently unreachable — Cloudflare adds ranges occasionally, and a missing
  one fails for a subset of edges rather than outright.
- **Port 80 must stay open.** Certbot uses the `apache` authenticator (HTTP-01),
  so restricting port 80 breaks certificate renewal — and the failure surfaces up
  to 90 days later as a browser warning, with no email since Let's Encrypt
  stopped expiry notifications. Closing it requires moving to DNS-01 first.
  Verify any firewall or vhost change with
  `sudo /snap/bin/certbot renew --dry-run` (certbot is a snap; non-interactive
  SSH needs the full path).

## License

MIT — see [LICENSE](LICENSE).
