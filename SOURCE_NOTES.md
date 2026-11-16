# Homepage evidence and asset provenance

Reviewed November 15, 2026 against the local `openbazaar` repository and its
tracked source at `b945f4f5a4e2a43b87f2b1d7d857532c1193b969`.
The homepage links implementation references to that commit. Existing
v0.1.0-alpha.3 release downloads are preserved; the implementation notes
describe source architecture, rather than claiming every current source
feature shipped in that release.

## Verified claims

| Homepage subject | Evidence |
| --- | --- |
| Signed store/listing records, BIP 340, content hashes | `crates/protocol/src/store.rs`, `crates/protocol/src/listing.rs`, `docs/paper/sections/catalog.tex` |
| Tor or loopback sale transport; refused clearnet hosts and redirects | `crates/node/src/peer_http.rs`, `crates/node/src/replicas.rs` |
| Discovery has a shipped-key trust dependency | `crates/node/src/directory.rs`, `crates/node/src/seeds.rs` |
| Direct store follows remain possible without introductions | `crates/node/src/main.rs` at the tracked commit (`--no-introductions` usage text) |
| Buyer/seller MuSig2 aggregation without a moderator spend key | `crates/escrow/src/crypto.rs::aggregate`, `sorted_context` |
| Silent outcome is the buyer refund, not a vendor payout | `crates/escrow/src/lib.rs` module documentation |
| Mainnet escrow refused; bonds testnet4 only | `crates/protocol/src/reputation.rs` |
| 10,000-sat bond, 2,016-block lock, no slash key | `crates/protocol/src/reputation.rs` |
| Paired home-node access, signed requests, additional spending authorization | `docs/home-node.md`, `docs/home-node-protocol.md` |
| Shared web client and Tauri desktop shell | Root `README.md`, `apps/mobile/`, `apps/desktop/` |
| MIT license | Root `LICENSE` |

`docs/STATUS.md` contains older descriptions that disagree with the present
transport and discovery code. It was not used to claim that discovery is a
permissionless DHT, or that current remote trade only works on loopback.
No claim is made that a seeded public vendor is currently reachable.
Historical OpenBazaar 2.0 functionality is not attributed to this codebase.

## Visual assets

- The existing `ob-market-logo-256.png` is preserved. Its marketplace blue,
  approximately `#0d71c8`, is the site accent on a near-black ink palette.
  The scalloped awning edge on the hero screenshot and download section is
  drawn in CSS after the awning in the mark.
- `fonts/bricolage-grotesque-wdth.woff2` is the Latin subset of Bricolage
  Grotesque (SIL Open Font License 1.1, Google Fonts via Fontsource),
  self-hosted for headlines.
- `assets/marketplace.jpg` is copied from
  `output/twitter-teasers/assets/marketplace.jpg` in the main repository.
- `assets/wallet.jpg` is copied from
  `output/twitter-teasers/assets/wallet.jpg`.
- `assets/orders.jpg` is copied from
  `output/twitter-teasers/assets/payment.jpg`.
- These are existing app captures with fixture/demo data. The homepage
  explicitly labels them as alpha captures with demo data and test coins.
  They are not fabricated product interfaces or evidence of a live market.
- The NixOS homepage was reviewed for its open-source project navigation,
  flat blue fields, and large readable type. Its assets were not copied.

## Verification

Check fragment IDs and local asset references, compare all release download
URLs with the original homepage, run `node --check site.js`, and inspect
responsive layouts plus the keyboard-operated screenshot tabs and mobile menu.
The screenshot enlargement uses a native dialog with Escape and close-button
support. No continuous graphics renderer or animation loop is used.
