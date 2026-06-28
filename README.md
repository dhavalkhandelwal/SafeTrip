# SafeTrip : Safety-First Travel Companion for Solo Travelers

Solo travel in India is growing, but the infrastructure for staying safe while doing it hasn't kept up. SafeTrip is a web application built to bridge that gap  giving travelers real-time safety intelligence, emergency tools, and AI-assisted planning in one place.

This was built as a minor project, but the problem it addresses is real.

---

## The Problem

Solo travelers , especially women navigate a fragmented set of challenges: unreliable safety information about unfamiliar areas, no quick way to alert contacts during emergencies, and no personalized itinerary planning that factors in safety constraints. Existing solutions are either too generic or locked behind expensive APIs and premium plans.

SafeTrip was designed to solve all three with open-source tools and zero paid APIs (except one — Gemini, which has a generous free tier).

---

## What It Does

**Six core features, each solving a specific friction point:**

**1. Acoustic Sentinel (Voice SOS)**
Passively listens for verbal distress cues like "help", "bachao"  in the background and auto-triggers an SOS without the user needing to unlock their phone. Built on the HTML5 Web Speech API inside a custom React hook (`useAcousticSentinel`). Handles browser microphone timeout edge cases using auto-restart logic on the `onend` event.

**2. Community Safety Map**
An interactive map showing color-coded safety zones across Indian cities. Users can drop incident pins (poor lighting, harassment, suspicious activity, road issues) anywhere on the map with a single click. Built with React Leaflet + OpenStreetMap — no Google Maps, no API costs.

**3. Dynamic Safety Scoring**
Safety scores aren't static. Every community review recalculates the zone score using a weighted average algorithm: `newScore = (baseline × (1 - w)) + (communityAvg × w)` where `w = min(reviews × 0.2, 0.8)`. This caps community influence at 80% — preventing a handful of bad-faith reviews from nuking an area's rating overnight.

**4. AI Itinerary Planner**
Generates day-by-day travel schedules using Google Gemini 2.5 Flash. The prompt is engineered to return strict JSON (no markdown fences, no conversational text) — making the response directly parsable and renderable as a structured timeline. Every activity includes a safety note specific to that location.

**5. One-Tap SOS with Geolocation**
Captures the user's GPS coordinates via the HTML5 Geolocation API, timestamps the event in ISO-8601 format, logs it to localStorage, and simulates dispatch to emergency contacts. SOS history is available across sessions.

**6. Digital Tourist ID**
Each traveler gets a persistent ID (`ST-` prefix + base-36 encoded timestamp) generated at signup. Displays nationality, blood group, phone, and emergency contacts — the kind of information that matters in an actual emergency.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Maps | React Leaflet + Leaflet.js + OpenStreetMap |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Charts | Recharts |
| Styling | Tailwind CSS v4 + Custom CSS Variables |
| Auth & Storage | React Context API + localStorage |
| Voice | HTML5 Web Speech API |
| Location | HTML5 Geolocation API |

---

## Key Technical Concepts

- **Custom React Hooks** — `useAcousticSentinel` encapsulates all SpeechRecognition lifecycle management with `useRef` to avoid re-render loops
- **Prompt Engineering** — Gemini is instructed via structured prompt to return only valid, parsable JSON matching a defined schema
- **Weighted Crowdsourcing Algorithm** — EMA-style scoring that blends baseline data with community input without letting outliers dominate
- **OpenStreetMap Integration** — Raster tile-based mapping with coordinate-aware click events using Leaflet's `useMapEvents`
- **SPA Architecture** — Client-side routing via React Router with persistent global state through Context API
- **`L.divIcon` Custom Markers** — SVG-injected map pins for incident types, bypassing Leaflet's default icon system

---

## Project Structure

```
src/
├── frontend/
│   ├── components/        # Reusable UI components (map, SOS, profile, dashboard)
│   ├── context/           # AuthContext — global user/session state
│   ├── hooks/             # useAcousticSentinel
│   └── pages/             # Route-level page components
└── backend/
    ├── data/              # Static datasets (safety zones, analytics, resources)
    └── services/          # aiService.js, locationService.js
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Add your Gemini API key
echo "VITE_GEMINI_API_KEY=your_key_here" > .env

# Start the dev server
npm run dev
```

App runs at `http://localhost:5173`

> Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com)

---

## Impact & Context

The target user is the solo female traveler in Tier 1 and Tier 2 Indian cities — a segment growing at ~14% YoY (per MakeMyTrip & Google Travel reports) but underserved by mainstream travel tech.

What makes this different from a standard travel app:
- Safety is not a feature — it's the core product decision
- Community-sourced data means the map gets more accurate over time
- Zero dependency on paid infrastructure (except Gemini's free tier) — meaning it can scale without a budget

Built as an academic minor project, but the underlying architecture is production-capable: the SPA is fully deployable on Vercel/Netlify, the AI layer is model-agnostic (any Gemini model can be swapped in one line), and the map layer would require zero changes to work globally.

---

## Author

**Dhaval Khandelwal**
[GitHub](https://github.com/dhavalkhandelwal) · [dhavalkhandelwal15@gmail.com](mailto:dhavalkhandelwal15@gmail.com)
