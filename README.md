# openbazaar-site

The static site served at [openbazaar.org](https://openbazaar.org).

Plain HTML/CSS with no build step. The Vercel project `openbazaar-org-hqje`
(Hallucination Engineering team) is connected to this repository and deploys
`main` to production; `openbazaar.org` is assigned to that project.

To update the site, edit the files here and push to `main`.

The paper under `paper/` is generated from the main repository
(`docs/paper/publish-pages.sh` in OpenBazaar/openbazaar-rs); refresh it from
there rather than editing the PDF by hand.
