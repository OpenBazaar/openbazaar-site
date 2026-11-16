# Homepage evidence and asset provenance

Reviewed November 16, 2026 against the `v0.1.0-alpha.4` tag
(`96b2de316bb8399ef7082363806215ba6f6338be`) of OpenBazaar/openbazaar-rs,
which is what every download button ships. That commit is the merge of
PR #142 and includes PRs #141, #146, #142 and #140. Open PRs #143, #144 and
#145 (external send) are not in the tag and are not claimed here.

The page speaks to buyers and sellers, so each claim below is the plain
version of a mechanism in the code. If a mechanism changes, change the
sentence, not just the link.

## Verified claims

| Homepage claim | Evidence at alpha.4 |
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
| Buyers and sellers can message each other inside an order | `apps/mobile/src/marketplace/MessageThread.tsx` at the tag (PR #136, merged before this release) |
| The app connects through Tor on its own; you don't install Tor | Desktop sidecar always passes `--tor` (`apps/desktop/src-tauri/src/node.rs`); home node does too (`Dockerfile` CMD, `packaging/systemd/ob-node.service`, `packaging/macos/app.openbazaar.home-node.plist`). PR #146 |
| No iPhone app | iOS checked only on the simulator (`docs/STATUS.md`); the release attaches an Android APK, not an App Store build |
| Apps aren't signed | Release workflow signs only when Apple/Windows/Android secrets exist; this release's notes say the builds are unsigned |
| MIT license | Root `LICENSE` |

## Ways to pay

Sources: PR #141 (Monero and Lightning on in the desktop app), PR #146 (built-in
Tor for the desktop app and home-node packages, and the same Monero and
Lightning flags on those packages), PR #142 (fiat estimates), PR #140 (wallet
sync recovers when the saved filter tip was reorged away).

| Currency | Page status | Evidence |
| --- | --- | --- |
| Display prices in USD, EUR, GBP, JPY; buyer pays the matching coin amount at order time | Shipped | Listing v6 fiat price, converted by the seller's node when the order arrives (`docs/STATUS.md`, "Listing v6") |
| Wallet balances show USD/EUR/GBP/JPY beside Bitcoin, Lightning and Monero, labelled "at mainnet price · test coins, no value" | Shipped | `fiatView` in `apps/mobile/src/walletFiat.ts` (that exact label when the coins are test coins and the rate is not a fixed test rate); `FiatEstimate.tsx`. PR #142. Mainnet rates on test coins; not a claim that the coins have value |
| Bitcoin on-chain, from the app wallet or any wallet, Bitcoin testnet4; the only escrow coin; first scan can take a while | In the app | Checkout "Pay the seller directly" and "Moderated escrow" (`apps/mobile/src/marketplace/Commerce.tsx`); escrow is bitcoin-only (`docs/zcash.md`, "Escrow is refused"). Compact-filter peers over Tor are scarce on testnet4, so the page does not say the first scan is fast. PR #140: sync restarts from the checkpoint when the saved tip is not on the peers' chain (`crates/node/src/chain_filters/`) |
| Zcash, direct pay only, Zcash testnet, buyer pays the order QR from any Zcash wallet; the app can receive, not spend | In the app, experimental | Desktop app passes `--zec-indexer https://testnet.zec.rocks` by default (`node.rs`); store opt-in under Settings → Zcash; `docs/zcash.md` phases 1–2 done, paying from the node still "specified" (phase 3). No escrow |
| Monero, direct pay only, stagenet, no manual server, first sync can take a while | In the app | Desktop and home node pass `--xmr-daemon default` (the node's stagenet onion daemons, overridable by an `xmr-daemon` file) plus `--tor` (`node.rs`, systemd, launchd, Docker). PR #141 and PR #146. No escrow (`docs/STATUS.md`, Monero "Escrow: refused"). No completed live Monero payment is claimed |
| Lightning, direct pay only, Mutinynet (not Bitcoin testnet4), channel opens when someone pays | In the app | Desktop and home node pass `--lightning` (`node.rs`, systemd, launchd, Docker). Default network is Mutinynet signet with the Megalith LSP, separate from the testnet4 Bitcoin wallet (`docs/lightning.md`, "Networks"). No escrow. No completed live Lightning payment is claimed (`docs/STATUS.md` still records that none has been made) |
| No card, PayPal or bank transfer | Shipped (absence) | No such rail in checkout |

Deliberately not claimed: real-money use, a completed live Monero or Lightning
payment, fast Bitcoin sync over Tor, user or shop counts, testimonials, card
payments, automatic tracking updates (seller-side AfterShip setup over Tor
only), real independent moderators (still a test stand-in), automatic
admission of new shops to the shared directory, and sending from the in-app
wallet to an external address (open PRs #143, #144, #145).

## Visual assets

- `ob-market-logo-256.png` is the brand mark, used at logo size in the header
  and footer only.
- `assets/marketplace.jpg` is copied from
  `output/twitter-teasers/assets/marketplace.jpg` in the main repository.
- `assets/sales.jpg` is the top-left 1500 × 800 of
  `output/sales-console/2026-11-12/sales-console-1920-test-data.png`, the
  seller's sales screen in the app's dark theme with test orders, from the
  sales console work in `5b507be` (in alpha.3, still the screenshot on this
  page). It does not show the alpha.4 wallet or Tor status.
- Both are real app captures with demo or test data, labeled as such on the
  page. They are not fabricated interfaces or evidence of a live market.
- Fonts, all SIL Open Font License 1.1 and self-hosted: Bricolage Grotesque
  (condensed headlines, Fontsource Latin subset), Instrument Sans (body),
  IBM Plex Mono 400/500 (labels and figures, Fontsource Latin subset).
  `newsreader-*.woff2` predates this page and is not referenced.
- Developer doc links point at the release commit
  `96b2de316bb8399ef7082363806215ba6f6338be`.

## Verification

HEAD-check every release URL (`curl -sI`, then the redirect). On November 16,
2026 each alpha.4 asset returned 302 and then 200: the macOS dmg and app.zip,
Windows setup.exe, Linux AppImage and deb, Android apk and apk.sha256, the
three home-node tarballs, and SHA256SUMS. SHA256SUMS lists those desktop and
home-node files and not the APK; the APK has its own `.sha256`, same as
alpha.3. File sizes on the page are the whole megabytes of the GitHub asset
size (`bytes // 1_000_000`), which is how alpha.3 displayed 59.9 MB as 59 MB.
The Docker image `ghcr.io/openbazaar/ob-node:0.1.0-alpha.4` was pushed by the
release workflow (manifest `sha256:59b403f7f0cc2bc9e387ff9e1801a5d0d4f5cc6e742e8ce8c59227621289785b`).
`node --check site.js` and the production deploy are checked with the commit.
The page makes no third-party requests. `paper/` is unchanged.
