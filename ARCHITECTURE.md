# ARCHITECTURE.md — inoxhungoanh

## The one journey (walking skeleton)
```
Google / Google Business Profile  (on a phone)
        |
        v
  Trang chu  or  a Hang muc page
        |   sees: real photos of the xuong + real cong trinh + address + Mac inox explained
        v
  Sticky bar:  [ Goi ngay ]  [ Nhan Zalo ]
        |
        v
  Yeu cau bao gia  (a phone call or a Zalo message - off-site, no backend)
```
Everything on the site serves this one path. A page that does not move a visitor toward the sticky
bar is scope, not floor.

## Hang muc taxonomy — parent/child, FROZEN at launch (one-way door)
Two levels: a **Hang muc cha** (pillar) and its **Hang muc con** (cluster). Vietnamese slugs without
diacritics, carrying the words customers actually type. Renaming after ranking loses the ranking.

```
/san-pham/                                       All Hang muc

/san-pham/cua-cong-inox/                         Cua & cong inox
   |-- cong-inox/                                Cong inox
   |-- cua-inox/                                 Cua inox
   |-- cua-so-inox/                              Cua so inox
   +-- khung-bao-ve-inox/                        Khung bao ve / hoa cua so inox

/san-pham/cau-thang-lan-can-inox/                Cau thang & lan can inox
   |-- cau-thang-inox/                           Cau thang inox
   |-- lan-can-inox/                             Lan can inox
   |-- lan-can-ban-cong-inox/                    Lan can ban cong inox
   +-- tay-vin-inox/                             Tay vin inox

/san-pham/ban-inox/                              Ban & thiet bi bep inox
   |-- ban-inox-cong-nghiep/                     Ban inox cong nghiep
   |-- ban-bep-inox/                             Ban bep inox
   |-- chau-rua-inox/                            Chau rua inox
   +-- xe-day-inox/                              Xe day inox

/san-pham/ke-tu-inox/                            Ke & tu inox
   |-- ke-inox-nha-bep/                          Ke inox nha bep
   |-- ke-kho-inox/                              Ke kho / ke hang inox
   |-- tu-inox/                                  Tu inox
   +-- gia-treo-inox/                            Gia treo inox

/san-pham/mai-che-khung-inox/                    Mai che & khung inox
   |-- mai-che-inox/                             Mai che inox
   |-- khung-mai-kinh-inox/                      Khung mai kinh inox
   +-- gian-phoi-inox/                           Gian phoi inox

/san-pham/gia-cong-theo-yeu-cau/                 Gia cong theo yeu cau
   |-- cat-inox/                                 Cat inox
   |-- chan-uon-inox/                            Chan / uon inox
   |-- han-inox/                                 Han inox
   +-- danh-bong-inox/                           Danh bong inox
```
6 Hang muc cha, 23 Hang muc con. Child URLs nest under their parent so the pillar/cluster
relationship is visible in the URL and BreadcrumbList falls out for free.

**A Hang muc con only becomes its own page when it passes the substance gate in CLAUDE.md.**
Until it does, it lives as a section on its parent page — same content, no thin page. The taxonomy is
frozen; which parts of it have *pages* grows over time.

## Other URLs
```
/                                       Trang chu — the conversion page
/cong-trinh/                            Cong trinh da thuc hien
/ve-chung-toi/                          Xuong, may moc, nang luc, phap ly
/lien-he/                               NAP + map + Zalo/phone
/kien-thuc/inox-304-201-316/            Mac inox explained — the AI-SEO + objection page
```
Reserved, do not create at MVP: `/kien-thuc/` index, `/bao-gia/`, `/tin-tuc/`.

## Content model (Astro content collections, Markdown)
```
src/content/
  hang-muc/     one file per Hang muc   -> slug, ten, cha (parent slug | null), mo_ta,
                                           mac_inox[], kich_thuoc[], anh[], faq[]
  cong-trinh/   one file per Cong trinh -> slug, ten, hang_muc, dia_diem, nam, anh[], mo_ta
```
A child's `cha` and a Cong trinh's `hang_muc` must reference an existing Hang muc slug. Enforced by
the collection schema (Zod), so a typo fails the build instead of shipping a broken link.

## Page anatomy — Trang chu (sections in this order; you cut, you don't reorder)
1. **Hero** — outcome headline + real xuong photo + one primary CTA. Passes the 5-second test.
2. **Trust strip, high up** — dia chi xuong, Mac inox used, what the xuong makes. Real facts only.
3. **Hang muc grid** — the six Hang muc cha, real photos, each linking to its pillar page.
4. **Bang chung xuong that** — machines, workers mid-job. This section separates a real xuong from a
   middleman, and it is why the photos matter more than the copy.
5. **Cong trinh** — real finished jobs with location and year.
6. **Objection handling** — 201 vs 304 vs 316, how quoting works, lead time, warranty.
7. **FAQ** — real questions heard on the phone (also feeds FAQPage structured data).
8. **Final CTA** — the same Goi / Zalo pair. Map + NAP below it.

## Page anatomy — Hang muc cha (pillar)
Hero + what this family covers -> grid of its Hang muc con -> real photos -> Mac inox / size table ->
Cong trinh in this family -> FAQ -> CTA. Links down to every child; every child links back up.

## Structured data map
| Page | Schema.org types |
|---|---|
| All pages | `LocalBusiness` (name, address, phone, geo, openingHours), `BreadcrumbList` |
| Hang muc (cha + con) | `Product` + `Offer` (priceSpecification: quote-on-request) |
| Cong trinh | `CreativeWork` / `ImageObject` with real location |
| FAQ + Kien thuc | `FAQPage` |

No `areaServed` radius is declared — the xuong discusses coverage with each caller directly.

## ADR-001 — Astro static over Next.js or WordPress
**Context.** A local marketing site whose entire value is being found on Google and loading fast on a
mid-range phone over mobile data. No user accounts, no dynamic data, no transactions.

**Decision.** Astro with static output, Tailwind for styling, Markdown content collections.

**Consequences.**
- (+) Ships near-zero JavaScript, so Core Web Vitals are good by default — the foundation of the
  ranking goal, rather than something to fix later.
- (+) ~30 mostly-static pages generate from Markdown with one page template per level.
- (+) Content lives in Git; no CMS to secure, update, or pay for. Free static hosting.
- (-) Content edits require a Git commit. Accepted: the owner is technical. If a non-technical editor
  is ever needed, the escape hatch is a Git-backed CMS (Decap/TinaCMS) over the same Markdown.
- Rejected: **Next.js** — server runtime and JS payload bought nothing here. **WordPress** — plugin
  surface, security patching, and speed all work against the one goal.

## ADR-002 — Conversion is off-site (phone + Zalo), so there is no backend
**Context.** The customer converts by calling or messaging Zalo. That is how they already behave.

**Decision.** No server, no database, no form endpoint at MVP. CTAs are `tel:` and Zalo deep links.

**Consequences.**
- (+) Zero backend means zero attack surface, zero hosting cost, nothing to keep running.
- (-) No first-party record of leads; attribution depends on asking callers how they found the xuong,
  plus Google Business Profile Insights. Accepted at MVP — that IS the Outcome signal.
- If a quote form is added later it becomes an external integration and Boundary 5 applies: a timeout
  and a deliberate fallback (show the phone number if the POST fails), and it must never be the only
  way to convert.

## ADR-003 — Broad taxonomy, gated pages
**Context.** The owner wants wide category coverage for search reach. A wide taxonomy is good SEO;
many near-empty pages is not — Google treats thin, near-duplicate pages as low quality and the damage
lands on the whole domain, not only on those pages.

**Decision.** Freeze the full 6+23 taxonomy now (URLs are one-way doors). Publish a child page only
when it passes the substance gate. Un-gated children render as sections on their parent.

**Consequences.**
- (+) The URL map never has to change; pages fill in as real photos and copy arrive.
- (+) No thin page ever ships, so the domain accumulates quality instead of dilution.
- (-) Day-one page count is lower than the taxonomy suggests. Accepted: 6 substantial pillar pages
  outrank 29 thin ones, and the thin ones would need rewriting anyway.
