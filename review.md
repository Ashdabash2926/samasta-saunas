# Samasta Saunas — Site Review

A self-critical pass on the first build. What's working, what's weak, what's open.

---

## What's working

- **Brand voice is consistent.** Editorial warm-dark direction holds across all four pages — same palette, same type pairing (Fraunces + Manrope), same arch motif. No page feels like a different site.
- **The arch is a real signature.** It shows up in the brand mark, photo crops, the corner SVG flourishes, the section dividers, and the button cap. A visitor will remember the shape.
- **Copy reads like a person, not a brand.** "Brew, sauna and a chat", "two unhurried days", "the kettle's on at your place this time" — this lifts the site well above a typical trades website.
- **The journey page is clear.** Five numbered steps in big italic figures, each with a short description. Anyone landing on `/enquire` understands what they're signing up for in under 20 seconds.
- **Mobile nav, scroll reveals, dark-section nav swap** all work without a framework. Pure CSS + ~80 lines of JS.
- **No build step.** Edit a file, push, GitHub Pages picks it up. Matches the rest of Ash's static sites.

---

## Known weak spots

### 1. Photos are stock, not Dan's
Every image is an Unsplash placeholder. They match the mood, but:
- The "in setting" photos are not actually Dan's sauna in a Yorkshire garden
- The "Dan portrait" is a generic carpenter — needs to be replaced with the photo Sammie mentioned (Dan outside Mandy's sauna)
- The gallery doesn't show real customers — currently two generic-looking shots

**Priority:** This is the single biggest swap before going live. Until then it could feel like a template.

### 2. Dimensions are still "tbc"
The spec table on `sauna.html` has `<em>tbc — ask Dan</em>` in the footprint row. Dan needs to send measurements before launch.

### 3. The form doesn't actually send anything
The form posts to `https://formspree.io/f/YOUR_FORMSPREE_ID` which is a placeholder. The JS detects this and shows a fake success message — so it looks like it works during a demo, but no email goes anywhere. **Dan needs to sign up at formspree.io** (free tier, 50 submissions/month) and replace that string before launch.

### 4. No real social card image
`og:image` is not set on any page. When someone shares the URL in WhatsApp or on Facebook, they'll get a blank preview or a guessed image. Should add a proper 1200×630 social card per page (or at minimum, one for the home page) once Dan's hero photo is in.

### 5. Some hero copy is one-shot
"Real wood. Live edges. Built by hand." reads strong but it's the first thing on the page. If Dan doesn't love it, the whole homepage tone shifts. Worth A/B-ing with him.

### 6. Accessibility — partial
- All images have `aria-label` (good)
- Focus states exist on form fields (good)
- But: photo divs are decorative-looking, not real `<img>` — screen readers see only the label, not an actual image. If we swap to real `<img>` tags later this improves automatically.
- Heading hierarchy: each page has one `<h1>`, content uses `<h2>`/`<h3>` — checked, looks correct.

### 7. The "Areas served" list is invented
I made up Leeds / Harrogate / York / Sheffield / Bradford / Wakefield / Skipton / Ilkley / Manchester / Lancaster / Durham / Northumberland. Dan should confirm which of these are actually reasonable delivery destinations and which he'd want to add or remove.

### 8. Email address is invented
`hello@samastasaunas.co.uk` is a placeholder. Dan needs to either set up that mailbox or give us his real work email to use in the `mailto:` link and the form's `_subject` line.

### 9. No favicon beyond the SVG mark
The SVG favicon works in modern browsers but Safari ignores it on iOS home screens. Worth adding a 180×180 `apple-touch-icon.png` once a real version exists.

### 10. The `<title>` and meta are templated, not Dan-tested
Each page has a sensible SEO `<title>` and description, but nothing has been checked against actual search demand or competitor titles. A quick Google for "wood burning sauna Yorkshire" before launch would tell us if we should tweak.

---

## Open questions for Dan

1. **Business name.** I went with "Samasta Saunas" from your notes. Confirmed?
2. **Logo.** I drew a three-arch mark. Want something different? A wordmark?
3. **Dimensions** of the sauna (length × width × height + bench depth)?
4. **Real email address** for the contact link and form delivery
5. **Areas served** — confirm or edit the list
6. **Phone number** for the footer or enquiry page (currently not listed)
7. **Disclaimer wording** — I summarised "plot must be flat, delays incur a cost" in two places. Want me to use your exact disclaimer copy instead?
8. **Social handles** — none on the site yet (your notes said TBC). Footer has slots ready.
9. **Hero copy** — "Real wood. Live edges. Built by hand." OK or rewrite?
10. **The story copy** on `/about` — I rewrote your notes lightly in first person. Want it more or less polished?

---

## Pre-launch checklist

- [ ] Replace all 16 photo URLs with Dan's photos (or marked sub-set)
- [ ] Replace `YOUR_FORMSPREE_ID` in `enquire.html` with Dan's real endpoint
- [ ] Replace `hello@samastasaunas.co.uk` with Dan's real email (3 places: footer, enquire intro, mailto link)
- [ ] Fill in actual dimensions in `sauna.html` spec table
- [ ] Confirm areas-served list
- [ ] Add real disclaimer wording if different from current
- [ ] Generate proper 1200×630 OG social card and add to all pages
- [ ] Test the live form on each page after Formspree endpoint is wired
- [ ] Enable GitHub Pages (Settings → Pages → Source: `main` / root)
- [ ] Optionally: buy a domain and point it at the GitHub Pages URL
- [ ] Screenshot the four pages in WhatsApp + Facebook share debuggers to make sure cards render

---

## Possible v2 additions (not for first launch)

- A short looping video on the home hero — fire in the stove, or the sauna at night
- Testimonials section once Dan has happy customers willing to be quoted
- A "build diary" / journal page if Dan enjoys writing about each commission
- A simple price guide ("from £X") to qualify leads before the consultation
- An interactive 2-day install timeline graphic
- Multi-language for the Sanskrit/Finnish meaning of "samasta" if Dan wants to explain the name

---

## Tech notes for future me

- **CSS pseudo-element stacking** in `.photo`: `::after` (grain) sits below `.photo__tint` (warm multiply wash, z-index 1) which sits below `::before` (arc lines, z-index 2). If a future edit changes z-index on any of these, the visual stack breaks.
- **Nav darkens** when a `.hero`, `.origins`, `.modular`, `.origins-full` or `.section.dark` crosses under the nav. Logic is in `app.js`. Adding a new dark section requires adding its selector to that observer.
- **Font axes.** Fraunces is variable with `opsz`, `wght`, `SOFT` axes — using `font-variation-settings: "opsz" 144, "SOFT" 80` for display sizes gives the softer, more editorial cut. If swapping fonts, remember to drop that rule or it won't apply.
- **Photo swap path.** Inline `style="background-image: url('...')"` on each `.photo` div. To convert to `<img>` later: change div to figure, add child `<img>` with `style="width:100%;height:100%;object-fit:cover;"`, move arch border-radius to the figure.

---

*Last updated: 2026-05-17 — first build, before Dan's review.*
