# DANCHE Training & Consultancy — Website Redesign

A modern, professional redesign of [dancheinc.com](https://dancheinc.com), the website of
**DANCHE Training and Consultancy, Inc.** — a CSC Accredited Learning and Development
Institution (ALDI) and PhilGEPS Platinum Member delivering leadership, HR, and professional
skills training to government and private organizations in the Philippines since 2016.

## Features

- Fully responsive single-page design (desktop, tablet, mobile)
- Modern typography (Fraunces + Inter) with a navy/gold professional palette
- Sticky navigation with mobile hamburger menu
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Sections: Hero, Credentials, About (Mission/Vision/Approach), Training Programs,
  Why DANCHE, Founder, CTA, Contact with inquiry form
- Accessible markup: semantic landmarks, ARIA labels, keyboard-friendly forms
- Zero build step — plain HTML/CSS/JS, deployable to any static host (GitHub Pages, Netlify, etc.)

## Structure

```
index.html        # Single-page site
css/styles.css    # All styling
js/main.js        # Nav toggle, scroll reveal, form handling
assets/           # Favicon and static assets
```

## Running locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Going live with the contact form

The inquiry form currently validates client-side only. To receive submissions, point the
form at a backend such as [Formspree](https://formspree.io) or your own endpoint by adding
an `action` attribute in `index.html` and removing the `preventDefault` handler in `js/main.js`.
