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

## Real Sarvam AI mode (backend is already built)

The repo now includes a small Node backend (`server.js`) that securely proxies
**Sarvam AI** — chat (LLM), text-to-speech (Bulbul) and speech-to-text (Saaras).
It is **fail-safe**: with no key it serves the site in demo mode; add the key and
the assistant auto-upgrades to real Sarvam Telugu/Hindi voice + smart answers.

### Run locally
```bash
npm install
# demo mode (no key):
npm start                       # http://localhost:3000
# real Sarvam mode:
#   Windows PowerShell:  $env:SARVAM_API_KEY="sk_xxx"; npm start
#   macOS/Linux:         SARVAM_API_KEY=sk_xxx npm start
```

### Deploy on Render as a Web Service (so the key stays secret)
The site must run as a **Web Service** now (not a Static Site), because it has a
backend.
1. Get a free key at **dashboard.sarvam.ai** (₹1,000 credit). Keep it secret.
2. Render → **New + → Web Service** → connect the `ethno-foods` repo.
3. Settings: **Build Command** `npm install` · **Start Command** `node server.js`.
4. **Environment** → add `SARVAM_API_KEY = sk_...` (your key). Save.
5. Deploy. The assistant now uses real Sarvam voice + chat.

(The included `render.yaml` already encodes steps 3–4 as a Blueprint.)

### Endpoints
| Route | Does |
|-------|------|
| `GET /api/config` | tells the frontend if Sarvam is enabled |
| `POST /api/chat`  | `{message,lang,history}` → Sarvam LLM reply |
| `POST /api/tts`   | `{text,lang}` → base64 voice audio |
| `POST /api/stt`   | `{audioBase64,mime,lang}` → transcript |

Optional env overrides: `SARVAM_CHAT_MODEL` (sarvam-m), `SARVAM_TTS_MODEL`
(bulbul:v2), `SARVAM_TTS_SPEAKER` (anushka), `SARVAM_STT_MODEL` (saarika:v2).

---

## Status

**Demo build.** Branding, product list, FSSAI licence and locations are taken from
S V Agro Foods' own posters. Product photos and final prices to be confirmed with
the client before going live.
