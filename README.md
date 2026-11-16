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

- `index.html`: homepage written for buyers and sellers (selling, buying,
  how an order works and what happens when it goes wrong, questions,
  downloads), with one small developer strip near the bottom.
- `styles.css`: near-black cyberpunk palette (electric cyan, magenta for
  cautions), fine grid and scanline textures, HUD-framed screenshots, and
  responsive layout.
- `site.js`: the small-screen navigation menu.
- `assets/`: real testnet4 app captures (buyer marketplace, seller sales screen).
- `fonts/`: self-hosted Bricolage Grotesque (headlines), Instrument Sans (text)
  and IBM Plex Mono (labels).
- `paper/`: existing published technical paper, preserved separately.
- `SOURCE_NOTES.md`: claim verification and asset provenance.

The page works without JavaScript; the script only adds the mobile menu.
There are no animations, and smooth scrolling is off under the system's
reduced-motion preference.

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
