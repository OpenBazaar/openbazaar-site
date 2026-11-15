# openbazaar-site

The static site served at [openbazaar.org](https://openbazaar.org).

Plain HTML/CSS with no build step. It is deployed to the Vercel project
`openbazaar-org-hqje` (Hallucination Engineering team), which holds the
`openbazaar.org` domain.

**One-time setup still pending:** the OpenBazaar org's Vercel GitHub App has
repository access set to "selected", so this repo must be added before
push-to-deploy works: GitHub → OpenBazaar org settings → GitHub Apps →
Vercel → Repository access → add `openbazaar-site`. Then run
`vercel git connect https://github.com/OpenBazaar/openbazaar-site` from a
checkout linked to the project (`vercel link`).

Until then, deploy by hand from a checkout:

```sh
vercel link --project openbazaar-org-hqje --scope hallucination-engineering
vercel deploy --prod
```

After the Git connection is made, pushing to `main` deploys production.

The paper under `paper/` is generated from the main repository
(`docs/paper/publish-pages.sh` in OpenBazaar/openbazaar-rs); refresh it from
there rather than editing the PDF by hand.
