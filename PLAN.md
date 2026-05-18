# Samasta Saunas — Site Plan

Approved design reference for the build. Pages live alongside this file.

## Brand direction

**Editorial warm-dark.** Alternates moody photographic sections (firelight, woodland, dusk interiors) with warm cream content sections. Large editorial display serif for headlines, clean humanist sans for body. Arched/circular photo crops as a recurring motif. Subtle concentric-arc line motif as brand detail.

### Palette
- `--ink` `#1c2420` deep forest-charcoal
- `--cream` `#f3ede2` warm oat
- `--cedar` `#8a5a3a` muted warm brown
- `--moss` `#6b7a63` muted sage (accent only)
- `--paper` `#faf7f1` soft off-white

### Type
- Display: **Fraunces** (Google) — editorial serif, optical sizing
- Body: **Inter** (Google) — clean humanist sans

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — set the mood, lead them in |
| `sauna.html` | The Sauna — specs, photos, materials |
| `about.html` | About Dan + saunas' original intentions |
| `enquire.html` | Booking journey + enquiry form |

Shared sticky nav + footer. Nav: wordmark left, Home / The Sauna / About / Enquire right. Footer: arc mark, areas served, install disclaimer, email.

## Section breakdown

### Home
1. Hero — dark full-bleed photo, display headline, tagline ("Real wood. Live edges. Sanctuary, built by hand."), CTA to Enquire
2. Ethos manifesto (cream): Real wood. Live edges. Soul. Warmth. Heart.
3. Intro paragraph + three quick-facts (Up to 8 people / Wood-burning / 2 days to fit)
4. Three arched-crop photo strip
5. Origins teaser quote-card on dark → About
6. CTA band → Enquire

### The Sauna
1. Hero — arched photo + spec sidebar (dimensions TBD, up to 8 people, wood-burning, British red cedar, sheep's wool, bespoke floors)
2. Materials — three tile cards (cedar / wool / floors)
3. Modular — "Built at our Leeds farm. Rebuilt at your home in two days."
4. Photo gallery — six images, mixed demographic
5. Areas served — Yorkshire / North of England
6. Site requirements panel — flat plot disclaimer
7. CTA → Enquire

### About
1. Hero — portrait of Dan + display headline ("Made by hand, in Leeds.")
2. Dan's story — first-person prose from notes
3. Pull-quote — "Spaces built for healing."
4. **Saunas' original intentions** — five cards on dark section: Purification & Hygiene / Survival & Warmth / Spiritual & Magical Rituals / Practical Work Hub / Healing & Medicine
5. CTA → Enquire

### Enquire
1. Hero — "From first brew to first sweat."
2. The journey — five numbered steps (enquiry → consultation → deposit → final payment → delivery & 2-day install)
3. Form — Name, Email, Telephone, Home address, "Tell us about your space" textarea
4. Disclaimer under form
5. Direct contact fallback

## Form delivery

**Formspree** placeholder endpoint. Dan signs up, I swap one URL. `mailto:` fallback link below the form.

## Photos

Dan's photos not yet supplied. Use Unsplash placeholders matching mood. Tag every `<img>` with `data-placeholder="true"` for easy swap later. Dan-portrait slot on About is also a placeholder.

## Tech

- Plain HTML + custom CSS in `<style>`, vanilla JS only for mobile nav
- No build step
- Hosted on GitHub Pages — repo `Ashdabash2926/samasta-saunas`

## SEO

Per-page `<title>` + meta description. OG image (moody hero). Keywords: wood-burning sauna Yorkshire, bespoke sauna Leeds, modular sauna installation North of England. Basic `sitemap.xml` + `robots.txt`.

## Out of scope

Online payment, booking calendar, multi-language, blog/CMS, social links (TBC — footer slots ready).
