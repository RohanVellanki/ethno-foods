# Ethno Foods · S V Agro Foods — website + AI assistant

A clean, fast, **trilingual (English / తెలుగు / हिंदी)** website for Ethno Foods
(S V Agro Foods), with a built-in **AI chat + voice assistant**.

Built by **Verba**.

---

## How to view it (no install needed)

Just **double-click `index.html`** — it opens in your browser. That's it.

> For the **voice** features (mic + spoken replies) to work reliably, open it in
> **Google Chrome** and allow microphone access when asked.

### Optional: run it on a local server (recommended for voice)
Some browsers restrict the microphone on `file://`. To avoid that, serve it:

```bash
# from inside this folder
python -m http.server 5500
# then open  http://127.0.0.1:5500
```

---

## What works right now (DEMO MODE)

- ✅ Full responsive site — hero, products, "how it's made", about, contact, footer
- ✅ **15 real products** from the catalog (Telugu + English names)
- ✅ Language switch **EN / తె / हि** (whole site + the assistant)
- ✅ **Order on WhatsApp** buttons everywhere (number: 92432 11033)
- ✅ **AI assistant** that answers about products / delivery / contact
- ✅ **Voice** — speak to it and it speaks back, using the **browser's free speech
  engine** (`Web Speech API`). Telugu/Hindi quality depends on the browser.

No API key is needed for the demo. Everything runs in the browser.

---

## Editing content

| What | Where |
|------|-------|
| Products (name, description, category, colour) | `app.js` → `PRODUCTS` array |
| Business name / WhatsApp number | `app.js` → `WA_NUMBER` (top) |
| Translations / wording | `app.js` → `I18N` object |
| Locations / contact | `app.js` → `CONTACTS` |
| Colours, fonts, layout | `styles.css` (`:root` has the design tokens) |

### Adding real product photos
1. Make a folder `images/` next to `index.html`.
2. Drop a photo in, e.g. `images/sunflower-oil.jpg`.
3. In `app.js`, add `img:"images/sunflower-oil.jpg"` to that product.
   (Ask Verba/Claude to wire the `<img>` swap — it's a 3-line change.)

---

## Going live with Sarvam AI (Phase 2 — needs a key + a tiny backend)

The browser voice is good for a demo, but **Sarvam AI** gives far better Telugu/Hindi
voice + a real chatbot brain. That step needs a small server so the API key stays
secret (never put the key in `app.js` — it's public).

Plan when you're ready:
1. Get a free key at **dashboard.sarvam.ai** (₹1,000 free credit).
2. Add a tiny serverless function (e.g. on **Vercel**) that calls Sarvam's
   Speech-to-Text, Text-to-Speech and Chat APIs.
3. Point the assistant's `userSend()` / `speak()` at that function instead of the
   browser engine.
4. Deploy free on Vercel and connect a domain.

(Verba/Claude can do all of this — it's a clean follow-up.)

---

## Status

**Demo build.** Branding, product list, FSSAI licence and locations are taken from
S V Agro Foods' own posters. Product photos and final prices to be confirmed with
the client before going live.
