# Homepage evidence and asset provenance

Reviewed November 15, 2026 against the `v0.1.0-alpha.3` tag (`3a837ae`) of
OpenBazaar/openbazaar-rs, which is what every download button ships, plus
`docs/STATUS.md` on main for anything newer. The developer links point at
`b945f4f5a4e2a43b87f2b1d7d857532c1193b969`, an ancestor of the tag.

The page speaks to buyers and sellers, so each claim below is the plain
version of a mechanism in the code. If a mechanism changes, change the
sentence, not just the link.

## Verified claims

| Homepage claim | Evidence at alpha.3 |
| --- | --- |
| No platform fees; payment goes to a fresh address in the seller's wallet | No fee output anywhere in checkout or payment; BIP 21 per-order address in `crates/node` payment code |
| No company account; the shop belongs to recovery words | BIP 39 seed with role paths, store key derived from the seed (`crates/node/src/seed.rs`, store record v3) |
| Storefront name, logo, banner, about, shipping and returns policies | `GET`/`PUT /store/profile` and the storefront editor (`docs/STATUS.md`, "Storefront editor and role") |
| Physical and digital goods, up to 8 photos, variants, prices in USD/EUR/GBP/JPY, shipping, coupons | Listing v6+ and `docs/listing-parity.md`; coupons and the sales screen in the shop (`Sales.tsx`, Coupons nav) |
| Mark shipped with carrier, tracking number and a note; buyer sees it on the order | `Sales.tsx` fulfillment form; "shipped" reply carries tracking (`docs/STATUS.md`, "Order delivery") |
| Escrow holds payment until the buyer confirms; silent seller means refund after the agreed time; either side can dispute; the moderator only picks between two presigned payouts and cannot redirect funds; fee set in advance | `crates/escrow/src/lib.rs` module docs (spend table and timeline), vendor dispute route, moderator record in signed terms |
| Escrow only when the shop offers it, test network only, off for real bitcoin pending outside review; direct pay has no protection | `Commerce.tsx` (`p.moderated`), `crates/protocol/src/reputation.rs` (`MAINNET_BOND_REFUSAL`) |
| Address goes to the seller only | Orders sealed with HPKE to the mailbox key in the seller's signed record |
| Reviews only from buyers, sellers can reply but not edit | `crates/protocol/src/review.rs` (verified-purchase receipts, one signed reply) |
| Three demo shops | `docs/STATUS.md`, "Catalog served to client" (Marlow Goods, Hale Paper, North Kitchen) |
| Onboarding: wallet password, then Shop or Sell | `apps/mobile/src/marketplace/Onboarding.tsx` |
| Test coins from a testnet4 faucet | The app's wallet screen ("Send testnet4 coins from a faucet") |
| Buyers search the in-app marketplace and can follow a shop directly | On-device search and follows (`docs/STATUS.md`, "Discovery" and "Following stores") |
| Home node keeps a shop open; Android app manages a shop on a home computer | `docs/home-node.md`, `docs/home-node-mobile.md` |
| Order messages are coming in the next release | Merged on main in `b130b05`, after the alpha.3 tag; not in the download |
| No iPhone app | iOS checked only on the simulator (`docs/STATUS.md`) |
| MIT license | Root `LICENSE` |

Deliberately not claimed: real-money use, user or shop counts, testimonials,
card payments, automatic tracking updates (seller-side AfterShip setup over
Tor only), real independent moderators (still a test stand-in), automatic
admission of new shops to the shared directory, and the experimental Monero,
Zcash and Lightning direct-pay options.

## Visual assets

- `ob-market-logo-256.png` is the brand mark, used at logo size in the header
  and footer only.
- `assets/marketplace.jpg` is copied from
  `output/twitter-teasers/assets/marketplace.jpg` in the main repository.
- `assets/sales.jpg` is the top 1366 × 800 of
  `output/sales-console/2026-11-12/sales-console-1366-test-data.png`, the
  seller's sales screen with test orders, from the sales console work in
  `5b507be` (in alpha.3).
- Both are real app captures with demo or test data, labeled as such on the
  page. They are not fabricated interfaces or evidence of a live market.
- Fonts, all SIL Open Font License 1.1 and self-hosted: Bricolage Grotesque
  (condensed headlines, Fontsource Latin subset), Instrument Sans (body),
  IBM Plex Mono 400/500 (labels and figures, Fontsource Latin subset).
  `newsreader-*.woff2` predates this page and is not referenced.

## Verification

HEAD-check every release URL (`curl -sIL`), compare the download set with the
previous homepage, check fragment IDs and local asset references, run
`node --check site.js`, check WCAG AA contrast for the palette, and render at
1440 and 430 wide. The page makes no third-party requests.
