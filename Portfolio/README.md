# Ashish Kumar — Portfolio

A fast, dependency-free static portfolio (plain HTML/CSS/JS — no build step required).

## Files
- `index.html` — all page content and structure
- `style.css` — theme, layout, animations (light/dark mode via CSS variables)
- `script.js` — theme toggle, nav behavior, scroll reveal, project filter/search/modal, contact form
- `resume/Ashish_Kumar_Resume.pdf` — **add your real resume file here** (create the `resume/` folder)
- `images/` — **add your photo and any project screenshots here** (create the `images/` folder)

## Run locally
No install needed — just open `index.html` in a browser, or serve it:
```bash
npx serve .
```

## Deploy
**Vercel / Netlify:** drag-and-drop the folder, or connect a GitHub repo — no build command needed
(leave "build command" empty, output directory `.`).

**GitHub Pages:** push to a repo, enable Pages on the `main` branch root.

## Editing content
Everything lives directly in `index.html`:
- **Profile photo:** replace the `.profile-photo` placeholder in the hero with an `<img>` tag pointing to `images/your-photo.jpg`.
- **Resume:** add your PDF at `resume/Ashish_Kumar_Resume.pdf` (the Download/View buttons already point here).
- **Contact details:** update the placeholder email (`your.email@example.com`) and phone number in the Contact section and footer.
- **Projects:** edit the `projects` array at the top of `script.js`. Each project supports `github` and `demo` URLs —
  leave them as `null` to automatically show "Link coming soon" instead of a broken link.
- **Skills / Experience / Education:** edit the corresponding `<section>` blocks directly in `index.html`.

## Contact form
The form currently opens the visitor's email client via `mailto:` (no backend required). To send messages directly:
- **Formspree:** change the `<form>` to `action="https://formspree.io/f/YOUR_ID" method="POST"` and remove the JS `preventDefault` mailto logic.
- **EmailJS:** call `emailjs.send()` inside the submit handler in `script.js`.

## Notes
- No fake statistics, testimonials, or invented links are included — placeholders are clearly marked in comments and text.
- Respects `prefers-reduced-motion` and keyboard navigation throughout.
- SEO: update `<link rel="canonical">`, Open Graph, and JSON-LD URLs in `index.html` once you have a real domain.
