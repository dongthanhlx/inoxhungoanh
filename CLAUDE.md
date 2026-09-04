# CLAUDE.md — inoxhungoanh (MVP v0.1)

## Project
Marketing site for **CÔNG TY TNHH HÙNG OANH VĨNH PHÚC** (brand: Inox Hùng Oanh), a stainless-steel
fabrication company at Khu 3, Thị trấn Tứ Trưng, Huyện Vĩnh Tường, Tỉnh Vĩnh Phúc. Tax code
2500673624, operating since 04/11/2021. The owner confirmed this is the single correct address;
an earlier draft carried a different one and it has been removed everywhere.

The job: a *retail* customer nearby needs an inox item made — a gate, window, shelf, table, staircase
railing. They have never heard of Hùng Oanh. This site has ONE job: make them trust the xưởng enough
to **tap Call or Zalo** and ask for a quote.

Not a catalog. Not an online shop. A call generator.

## Outcome — what must CHANGE, and how we'll know
- **Who:** retail customers near the xưởng who do not yet know Hùng Oanh.
- **Change:** they find the xưởng themselves and reach out — instead of every job arriving by referral.
- **Signal:** countable inbound calls/Zalo where the caller says "saw you on Google"; plus the call
  count in Google Business Profile Insights.
- **Riskiest assumption:** retail inox buyers around Vĩnh Tường search Google for a fabricator, rather
  than asking someone they know — **UNTESTED**.
- **Cheapest test, do BEFORE deep SEO work:** publish Google Business Profile, wait 2–3 weeks, read
  Insights. It also reveals the real search terms to write for.
- **Check by:** 6 weeks after GBP and the site are both live.

## Ubiquitous Language
| Term (use in code) | Meaning | Not |
|---|---|---|
| Hạng mục | A product category, parent or child (see ARCHITECTURE.md taxonomy) | "product", "item", "service" |
| Hạng mục cha / con | Pillar category / its cluster children | "parent"/"child" alone |
| Công trình | A real finished job for a real customer, with real photos | "portfolio", "showcase" |
| Yêu cầu báo giá | A customer reaching out to describe a need and get a price | "lead", "order", "inquiry" |
| Mác inox | Steel grade: 201 / 304 / 316 | "material", "type" |
| Xưởng | The workshop at Khu 3, Thị trấn Tứ Trưng | "office", "factory" |
| Kênh liên hệ | Zalo or phone call — the ONLY two conversion channels | "contact form" |

## The floor — non-negotiable from day one (one-way doors)
This is a static marketing site, so the floor is UI/UX + SEO, **not** backend layering.
1. **Mobile-first, designed from 360px up.** These customers arrive on a phone. Desktop is derived.
2. **URL structure is frozen once published.** Changing URLs after ranking loses the ranking.
3. **Structured data on every page:** LocalBusiness, Product, FAQPage, BreadcrumbList (Schema.org).
   This is what Google AI Overview / ChatGPT / Perplexity read. Missing it = invisible to AI search.
4. **Semantic HTML + WCAG AA basics:** one h1 per page, real heading order, alt text on every photo,
   4.5:1 text contrast, visible focus ring, tap targets >= 44px.
5. **Images optimised:** WebP/AVIF, explicit width/height (no layout shift), lazy-load below the fold.
6. **NAP consistency:** business name, address, phone byte-identical here and on Google Business
   Profile. Any drift breaks local SEO.
7. **Call + Zalo are the only primary CTAs** — sticky on mobile, repeated on every page. One action.

## Hạng mục substance gate — a child page ships only when it earns it
The taxonomy in ARCHITECTURE.md is broad on purpose and frozen from day one. Pages fill in over time.
A **Hạng mục con** may become its own URL only when ALL of these hold:
- at least one **real photo of that specific thing**, made by Hùng Oanh — not the parent's photo reused
- 300+ words of content specific to it, not a paraphrase of a sibling page
- its own spec table: Mác inox used, thickness, common sizes, typical application
- at least two FAQ entries specific to it

Fails the gate → it stays a **section on its parent page**. Same content, same keywords, no thin page.

**Why this rule exists:** many near-duplicate pages are read as thin content, and the penalty lands on
the whole domain rather than only the weak pages. Six substantial pillar pages beat twenty-nine
hollow ones, and the hollow ones would need rewriting anyway. Breadth of *taxonomy* is free; breadth
of *published pages* is earned.

## Content integrity (this project's real risk)
- **Allowed:** describing the full range the xưởng *accepts and can make*. A fabrication shop
  genuinely makes a wide range; broad honest coverage is good SEO.
- **Never:** photos of work not done by Hùng Oanh; invented customer names, công trình,
  certifications, years in business, or output figures.
- **Why:** a caller asking for something the xưởng cannot make costs trust and time. Long-term
  ranking is driven by real experience signals (E-E-A-T), which fabricated content actively damages.
- Every Công trình entry maps to a real job with real photos, or it does not ship.

## Tech stack
Astro (static output) + Tailwind CSS. Content as Markdown content collections.
Deploy: Cloudflare Pages or Vercel. Domain: inoxhungoanh.com
Node.js 24 LTS. No backend, no database, no CMS at MVP.

## Local SEO — the naming window
The registered address uses the pre-merger naming (Tỉnh Vĩnh Phúc), and the owner confirmed it as
correct, so the site uses it verbatim. The 2025 merger folded Vĩnh Phúc into Phú Thọ, so customers
now search BOTH name sets. Content may mention "Vĩnh Tường", "Vĩnh Phúc", "Phú Thọ", "Việt Trì",
"Vĩnh Yên" for reach, but the NAP string itself never varies: it stays exactly
"Khu 3, Thị trấn Tứ Trưng, Huyện Vĩnh Tường, Tỉnh Vĩnh Phúc" everywhere, matching Google Business
Profile. No service radius is published; coverage is discussed on the call.

Location is deliberately de-emphasised in visible copy (owner's call): the H1 and section headings
lead with capability and the company, not the address. Location stays in `<title>` tags and
structured data, where it earns local search without dominating the page.

## Deferred (two-way doors — do NOT build yet)
Blog/news system, multi-language, CMS, cart/checkout, customer login, quote-tracking backend,
heavy design-token pipeline, heavy animation.

## Known defect — intermittent missing stylesheet
Roughly one build in several emits HTML with no stylesheet link at all, while reporting success.
The page then renders unstyled. Root cause is NOT established: it survived a full clean of `dist`,
`.astro` and `node_modules/.vite`, so the first "stale cache" guess was wrong. Suspicion sits with
Astro 7.3.1 + @tailwindcss/vite 4.3.3, unproven.

`npm run kiem-tra` detects it deterministically and exits 2. Re-running `npm run build` has cleared
it every time so far. **Never deploy a build that has not passed `npm run kiem-tra`.**
If it becomes frequent, the next step is pinning or upgrading those two packages and reporting upstream.

## When to ask before doing
- Adding or renaming a URL after launch
- Adding a dependency not in the stack above
- Publishing any Công trình, customer name, figure or certification (see Content integrity)
- Publishing a Hạng mục con page that has not passed the substance gate

## Shipright state
Level: L1 (walking skeleton built, not yet deployed)
Active: 12 pages build clean, light theme only, stock imagery in place as a visual
        stand-in. Structure, SEO and the a11y floor are done; photos and several
        business facts still await the owner.
Design: committed light mode (no dark). The owner found the dark scheme gloomy and
        wrong for the audience, and photos of stainless read better on white.
Next: owner fills assets-goc/ (photos + THONG-TIN.md) and CAN-XAC-NHAN.md ->
      import photos into PhotoSlot -> `npm run kiem-tra` must report zero ->
      publish Google Business Profile -> deploy -> then answer the Outcome check
Verified by running it: astro build green (12 pages) - 0 broken internal links -
      0 JavaScript shipped - 0 em-dashes - 11/11 colour pairs pass WCAG AA -
      sitemap covers all 12 URLs - measured in headless Chrome at 390px wide,
      scrollWidth === innerWidth === 390 so there is no horizontal overflow -
      pages inspected as screenshots at 1440px and 390px.
NOT verified: behaviour on a real phone, Lighthouse field scores.

How to look at the site (Chrome is installed; Node has a global WebSocket):
      npm run build, then npx astro preview, then drive Chrome over the DevTools
      Protocol on port 9222 for screenshots and layout measurement.
      Do NOT judge layout from `chrome --headless --screenshot --window-size`:
      without device emulation it lays out at desktop width and then crops, which
      looks exactly like a mobile overflow bug and is not one. That mistake cost
      an hour this session.
      Note astro preview runs as a daemon and may pick 4322 if 4321 is taken;
      check its output for the port rather than assuming.
Last shipped: nothing yet
Last updated: 2026-09-04
Skills active: shipright, design-taste-frontend
