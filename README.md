# NITS HACKS 9.0 — Teams Page

React + Vite implementation of the comic-inspired Teams page.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Update the team cards

Edit `src/data/team.js` to change names, roles, portraits, and social links.
Replace the placeholder portraits in `src/assets/team/` with the final exported card portraits.

## Background

The comic collage is stored locally at `public/comic-background.png`.

## Hover interactions

- Event-head cards lift slightly and gain a warm golden glow / border accent.
- Co-head and member cards animate their comic border, portrait position, name/role, and social footer.
- Keyboard focus also triggers the card interaction.
