/* ============================================================
   Ethno Foods — backend (Node, Express)
   ------------------------------------------------------------
   • Serves the static website (index.html, app.js, styles.css)
   • Securely proxies Sarvam AI:  chat (LLM), TTS (voice out),
     STT (voice in). The Sarvam key lives ONLY here, in the
     SARVAM_API_KEY env var — never in the browser.
   • FAIL-SAFE: if SARVAM_API_KEY is not set (or Sarvam errors),
     the endpoints report a fallback so the frontend uses its
     built-in demo brain + browser voice. The site never breaks.
   ============================================================ */

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "12mb" }));

const KEY        = process.env.SARVAM_API_KEY || "";
const BASE       = "https://api.sarvam.ai";
const CHAT_MODEL = process.env.SARVAM_CHAT_MODEL || "sarvam-30b";
const TTS_MODEL  = process.env.SARVAM_TTS_MODEL  || "bulbul:v2";
const STT_MODEL  = process.env.SARVAM_STT_MODEL  || "saarika:v2";
const TTS_SPEAKER= process.env.SARVAM_TTS_SPEAKER|| "anushka";
const HAS_KEY    = () => KEY.trim().length > 0;
const LANG = { en: "en-IN", te: "te-IN", hi: "hi-IN" };
const lc = (l) => LANG[l] || "en-IN";

/* ---- business context the assistant is allowed to use ---- */
const BIZ_CONTEXT = `
You are the friendly customer assistant for "Ethno Foods" (brand of S V Agro Foods),
a Telangana-based, FSSAI-licensed (Lic. 13622025000018) natural & organic food business.
Motto: "మీ ఆరోగ్యం.. మీ చేతుల్లోనే" (your health is in your hands).

PRODUCTS:
- Wood-pressed (ganuga) oils: Sunflower; also Groundnut, Sesame, Coconut on request.
- Native millets (Siri Dhanyalu): foxtail/korralu, finger/ragi, pearl/sajja, little/sama, kodo/arika, barnyard/udalu, browntop.
- Organic rice: Red rice, Brown rice, Black rice.
- Ravva & flours: Multigrain Ravva, Multigrain Chapathi Flour, Sorghum (Jonna) Idly Ravva.
- Naturals: Pure raw Honey, Tulasi powder, Moringa (Munaga) powder, Pure Kumkuma (turmeric-based).
- Pickles & snacks: Mango pickle (Avakaya), Protein Laddu.

FACTS:
- Pan-India delivery + export packing & courier. Charges vary by location.
- Chemical-free, no colours/preservatives, own-farm sourced, wood-pressed & cloth-filtered.
- Phones: 92432 11033, 94480 28642. WhatsApp orders welcome.
- Outlets: Processing unit - Adams College Road, New Palvancha; Palvancha (near Arun Ice Cream, Ambedkar Center); Kothagudem (opp. Vidyanagar Gram Panchayat office).

RULES:
- Reply in the SAME language the user used (Telugu, Hindi or English). Keep replies short (1-3 sentences), warm and helpful.
- For exact prices and pack sizes, tell them to order/ask on WhatsApp (we share current prices there).
- Never invent products or certifications beyond the above. If unsure, suggest WhatsApp.
`.trim();

/* ---------------- config probe ---------------- */
app.get("/api/config", (req, res) => {
  res.json({ sarvam: HAS_KEY() });
});

/* ---------------- chat (LLM) ---------------- */
app.post("/api/chat", async (req, res) => {
  if (!HAS_KEY()) return res.json({ fallback: true });
  try {
    const { message = "", lang = "en", history = [] } = req.body || {};
    const messages = [
      { role: "system", content: BIZ_CONTEXT + `\n\n(User's UI language: ${lang}. Prefer replying in that language unless they clearly write another.)` },
      ...history.slice(-6),
      { role: "user", content: String(message).slice(0, 800) },
    ];
    const r = await fetch(`${BASE}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${KEY}`, "api-subscription-key": KEY },
      body: JSON.stringify({ model: CHAT_MODEL, messages, temperature: 0.2, max_tokens: 300, reasoning_effort: null }),
    });
    if (!r.ok) { const b = await r.text(); console.error("[chat]", r.status, b); return res.json({ fallback: true, _debug: { ep: "chat", status: r.status, body: b.slice(0, 300) } }); }
    const data = await r.json();
    const msg = data?.choices?.[0]?.message || {};
    let reply = msg.content;
    if (Array.isArray(reply)) reply = reply.map(x => (x && x.text) ? x.text : (typeof x === "string" ? x : "")).join(" ");
    if (!reply && msg.reasoning_content) reply = msg.reasoning_content;
    reply = String(reply || "").trim();
    if (!reply) { console.error("[chat] empty", JSON.stringify(data).slice(0, 500)); return res.json({ fallback: true, _debug: { ep: "chat", note: "empty reply", data: JSON.stringify(data).slice(0, 500) } }); }
    res.json({ reply });
  } catch (e) { console.error("[chat]", e.message); res.json({ fallback: true, _debug: { ep: "chat", err: String(e.message).slice(0, 200) } }); }
});

/* ---------------- text-to-speech ---------------- */
app.post("/api/tts", async (req, res) => {
  if (!HAS_KEY()) return res.json({ fallback: true });
  try {
    const { text = "", lang = "en" } = req.body || {};
    if (!text.trim()) return res.json({ fallback: true });
    const r = await fetch(`${BASE}/text-to-speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-subscription-key": KEY },
      body: JSON.stringify({
        inputs: [String(text).slice(0, 1500)],
        target_language_code: lc(lang),
        speaker: TTS_SPEAKER,
        model: TTS_MODEL,
      }),
    });
    if (!r.ok) { const b = await r.text(); console.error("[tts]", r.status, b); return res.json({ fallback: true, _debug: { ep: "tts", status: r.status, body: b.slice(0, 300) } }); }
    const data = await r.json();
    const audio = data?.audios?.[0];
    if (!audio) return res.json({ fallback: true });
    res.json({ audio, mime: "audio/wav" });
  } catch (e) { console.error("[tts]", e.message); res.json({ fallback: true }); }
});

/* ---------------- speech-to-text ---------------- */
app.post("/api/stt", async (req, res) => {
  if (!HAS_KEY()) return res.json({ fallback: true });
  try {
    const { audioBase64 = "", mime = "audio/webm", lang = "en" } = req.body || {};
    if (!audioBase64) return res.json({ fallback: true });
    const buf = Buffer.from(audioBase64, "base64");
    const form = new FormData();
    form.append("file", new Blob([buf], { type: mime }), "audio.webm");
    form.append("model", STT_MODEL);
    form.append("language_code", lc(lang));
    const r = await fetch(`${BASE}/speech-to-text`, {
      method: "POST",
      headers: { "api-subscription-key": KEY },
      body: form,
    });
    if (!r.ok) { const b = await r.text(); console.error("[stt]", r.status, b); return res.json({ fallback: true, _debug: { ep: "stt", status: r.status, body: b.slice(0, 300) } }); }
    const data = await r.json();
    const transcript = (data?.transcript || "").trim();
    res.json({ transcript });
  } catch (e) { console.error("[stt]", e.message); res.json({ fallback: true }); }
});

/* ---------------- static site ---------------- */
app.use(express.static(__dirname, { extensions: ["html"] }));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ethno Foods server on :${PORT} — Sarvam ${HAS_KEY() ? "ENABLED" : "disabled (demo mode)"}`);
});
