# Eleganza

AI room designer — upload a room photo, let AI detect furniture and suggest matching products from partner stores.

Live: https://eleganza.redcats.uk/

## Stack

Zero-build single-page app. One `public/index.html` with inline CSS and vanilla JS, served by `nginx:alpine` behind Traefik.

## Screens

Mobile-first flow, responsive up to tablet (≥720px) and desktop (≥1080px):

1. **Upload** — pick a photo (camera/gallery), toggle extended search, choose partner stores
2. **Analyze** — classification progress with live status chips
3. **Results** — detected objects on image, filter by store, collapsible category groups with match scores
4. **Selection** — summary of picks with stats (products · categories · avg match)
5. **Generate** — visualization ready, save/share/retry, before/after compare

## Local preview

Open `public/index.html` directly in a browser. No build step.

## Deploy

```bash
docker compose up -d
```

Serves on port 80 inside the `web` Docker network; Traefik publishes it at `eleganza.redcats.uk` with TLS termination. Expects an external `web` Docker network and a running Traefik instance on the host.

## Layout

```
public/
  index.html      # the whole app
docker-compose.yml
README.md
```
