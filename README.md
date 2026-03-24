# 💒 Barath ❤️ Abirami — Wedding Invitation Website

A beautiful, fully responsive wedding invitation website built with pure HTML, CSS & JavaScript.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main wedding website |
| `style.css` | All styles (responsive, dark/light theme) |
| `script.js` | Countdown, animations, music, share |
| `invitation-card.html` | Standalone shareable invitation card (WhatsApp/Instagram) |

## Features

- ✅ Live countdown timer to 18 May 2026
- ✅ Floating hearts & petal animations
- ✅ Scroll reveal animations
- ✅ Light / Dark theme toggle (persisted)
- ✅ Ambient music toggle (Web Audio API)
- ✅ Groom & Bride profile cards
- ✅ Wedding details + Google Maps button
- ✅ Event timeline
- ✅ Photo gallery (placeholder — replace with real photos)
- ✅ Digital invitation card with Share button
- ✅ RSVP form
- ✅ Standalone poster card for WhatsApp/Instagram

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `barath-abirami-wedding`)
2. Upload all four files to the repo root
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch → `/ (root)`
5. Click **Save** — your site will be live at:  
   `https://<your-username>.github.io/barath-abirami-wedding/`

## Adding Real Photos

Replace the `.gallery-placeholder` divs in `index.html` with:
```html
<img src="your-photo.jpg" alt="Couple photo" style="width:100%;height:100%;object-fit:cover;" />
```

## Customization

All colors are CSS variables in `:root` inside `style.css` — easy to change the palette.
