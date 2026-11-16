# openbazaar-site

The static marketing site for [openbazaar.org](https://openbazaar.org).
Plain HTML, CSS, and a small JavaScript module. No package installation or build step.

## Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. All fonts, illustrations, and app captures are
served locally. There are no analytics or external page dependencies.

## Structure

- `index.html`: homepage, downloads, source references, and resource navigation.
- `styles.css`: dark ink palette with the logo's marketplace blue, and responsive layout.
- `site.js`: keyboard-accessible screenshot tabs, native screenshot dialog,
  and the small-screen navigation menu.
- `assets/`: real testnet4 app captures.
- `fonts/`: self-hosted Instrument Sans (text) and Bricolage Grotesque (headlines).
- `paper/`: existing published technical paper, preserved separately.
- `SOURCE_NOTES.md`: claim verification and asset provenance.

JavaScript adds optional interactions. The base page, product capture,
protocol notes, downloads, navigation, and source links work without it. View Transitions
are optional and disabled under the system's reduced-motion preference.
There are no continuously running animations.

## Deployment

It is deployed to the Vercel project
`openbazaar-org-hqje` (Hallucination Engineering team), which holds the
`openbazaar.org` domain.

**Deploys:** push to `main` auto-deploys to
[openbazaar.org](https://openbazaar.org) via Vercel (Git-connected to this
repo).

The paper under `paper/` is generated from the main repository
(`docs/paper/publish-pages.sh` in OpenBazaar/openbazaar-rs); refresh it from
there rather than editing the PDF by hand.
