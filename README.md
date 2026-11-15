# openbazaar-site

The static site served at [openbazaar.org](https://openbazaar.org).

Plain HTML/CSS with no build step. It is deployed to the Vercel project
`openbazaar-org-hqje` (Hallucination Engineering team), which holds the
`openbazaar.org` domain.

**Deploys:** push to `main` auto-deploys to
[openbazaar.org](https://openbazaar.org) via Vercel (Git-connected to this
repo).

The paper under `paper/` is generated from the main repository
(`docs/paper/publish-pages.sh` in OpenBazaar/openbazaar-rs); refresh it from
there rather than editing the PDF by hand.
