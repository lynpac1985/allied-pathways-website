# Allied Pathways — Next Steps

A running checklist of things that need your input or action (not something I can complete on my own). Check items off as you go, or just tell me and I'll update this file.

**Site status as of today: LIVE at https://alliedpathways.com.au (HTTPS confirmed working).**

## Immediate — one thing is blocking everything below from being visible

- [ ] **Flush the SiteGround cache.** Every fix and new page listed below is already correctly deployed to the server, but SiteGround's Dynamic Cache is still serving real visitors a stale, pre-2026-09-25 copy of several pages (confirmed via cache-busted requests — origin is correct, cache isn't). This needs your login: **Site Tools → Speed → Caching → Flush Cache**. I tried a `.htaccess` `Cache-Control` override to force this automatically — SiteGround's cache layer ignores it, so a manual flush is the only fix. Do this first; nothing else on this list matters to visitors until it's done.

## Immediate — push the site to GitHub

Needed so the monthly automated site check-in can run — cloud agents can only see a git repo or a live URL, not your local machine. The repo is already initialised locally with full history (now well ahead of GitHub — a lot has landed since this was last flagged); it just isn't backed up to GitHub yet.

- [ ] Create an empty repo at [github.com/new](https://github.com/new) (e.g. `allied-pathways-website`)
- [ ] Run in Terminal, from the project folder:
  ```bash
  cd "/Users/lyndontolentino/Desktop/Allied Pathways" && git remote add origin PASTE_URL_HERE
  git push -u origin main
  ```
- [ ] Tell Claude the repo URL once pushed

## Going live

- [x] Hosting + domain — done (SiteGround)
- [x] SSH key auth for direct deploys — done
- [x] Site files deployed via SSH/rsync — done
- [x] SSL/HTTPS confirmed — done (HTTP/2, valid cert)
- [x] `404.html` wired up as the server's real error page — done via `.htaccess`, verified live
- [x] Canonical host enforced — `.htaccess` now forces `https://www.alliedpathways.com.au`; previously all 4 host/protocol variants served duplicate copies with no redirect
- [x] Baseline security headers — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy added via `.htaccess`
- [ ] Click through the live site end to end once the cache is flushed (nav, mobile menu, referral form, footer links, all 6 new pages below)
- [ ] Verify domain in Google Search Console, submit `sitemap.xml` (now includes the 6 new pages)

## SEO — full audit run 2026-09-25 (claude-seo plugin, 11 sub-agents)

Full report: [SEO-AUDIT-2026-09-25.md](SEO-AUDIT-2026-09-25.md). Scored **57/100** at the time — that score predates almost everything below, so treat it as a baseline, not current. Worth re-running `/seo audit` after the cache flush to see where it lands now.

**Fixed since the audit:**
- [x] Removed fabricated homepage testimonials (real legal risk — Health Practitioner Regulation National Law s133 bans testimonials in advertising for AHPRA-regulated services)
- [x] Removed all live placeholder/scaffolding text (blog's dead-linked filler cards, blog post's placeholder paragraph, team page's OT placeholder, services page's disclaimer note)
- [x] Fixed factual error (Speech Pathology is regulated by Speech Pathology Australia, not AHPRA)
- [x] Updated outdated Medicare/Support at Home terminology (GPCCMP, my NDIS app)
- [x] Fixed contradictory "100% Registered" homepage claim
- [x] Fixed `contact.html`'s "PO Box" mislabel; replaced the map placeholder with a real embedded Google Map
- [x] Added a fallback link to the referral page's iframe form
- [x] Added Person schema (JSON-LD) for the four real team members
- [x] **Built 5 dedicated NDIS discipline landing pages** (the audit's single biggest finding — 96% of real competing search results are discipline-specific pages, not one shared services page): [Dietitian](https://www.alliedpathways.com.au/ndis-dietitian-melbourne.html) · [Speech Pathology](https://www.alliedpathways.com.au/ndis-speech-pathology-melbourne.html) · [Exercise Physiology](https://www.alliedpathways.com.au/ndis-exercise-physiology-melbourne.html) · [Nursing](https://www.alliedpathways.com.au/ndis-nursing-melbourne.html) · [Occupational Therapy](https://www.alliedpathways.com.au/ndis-occupational-therapy-melbourne.html) — each cites current NDIS Pricing Arrangements price limits, sourced and dated
- [x] Built a dedicated [Meal Delivery Company Audit](https://www.alliedpathways.com.au/meal-delivery-audit-melbourne.html) landing page (B2B-focused, expanded from one paragraph) plus a [separate enquiry form](https://www.alliedpathways.com.au/meal-delivery-audit-enquiry.html) instead of routing through the generic contact form
- [x] Site-wide internal linking updated to point at all the new pages (homepage cards, every page's footer, services.html hub links)

- [x] Built a [Melbourne suburbs landing page](https://www.alliedpathways.com.au/ndis-allied-health-melbourne-suburbs.html) — one consolidated page (not a separate URL per suburb, to avoid the thin-content risk of templating dozens of near-identical pages) giving real depth to the 19 densest/major suburbs already in `service-area.html`'s coverage area, grouped by region, with the remaining 16 honestly listed too. Linked from `service-area.html`.

**Still open from the audit — needs your input, not something I can safely do myself:**
- [ ] Real surnames or AHPRA/professional-body registration numbers for the team, so credentials are independently verifiable
- [x] Built real [Privacy Policy](https://www.alliedpathways.com.au/privacy-policy.html) and [Feedback & Complaints](https://www.alliedpathways.com.au/feedback-complaints.html) pages (both previously just linked to the contact page). Drafted from known facts (ABN, NDIS Provider No., actual forms/services on-site) plus standard APP structure and NDIS/Aged Care Commission escalation paths — **recommend a lawyer's read-through before treating this as final**, particularly the data retention and complaints-handling specifics
- [ ] Outdated funding terminology check — I updated the obvious ones (CDM Plan, myplace), worth a periodic re-check as NDIS/Medicare rules change

## Content — placeholders still to replace

- [x] Real photo + bio for Muhe, Jack, Jeina, Irene
- [ ] Real photo + bio for Occupational Therapist (same treatment as the above four — the new OT landing page currently says "we're growing this team" rather than naming anyone)
- [ ] **Real client testimonials** — still the highest-priority content gap now that the fake ones are removed. Collection is fully set up: `testimonial.html` is a live submission form, `assets/img/qr/testimonial-qr.png` is a printable QR code linking to it, and `TESTIMONIAL-REQUESTS.md` has ready-to-send outreach templates. Just needs 2-3 real responses back.
- [ ] At least 4-6 more blog posts (currently 1 real post — the placeholder filler cards that used to pad this out have been removed rather than left misleading)

## Business details to confirm

- [ ] Real business opening hours (currently placeholder Mon-Fri 9am-5pm in the site's structured data)
- [ ] Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) — not yet installed. Send the ID and it'll be wired in
- [ ] Confirm/claim Google Business Profile (needed before adding review star ratings to the site, and it's the single biggest local-SEO ranking lever available) — walkthrough already provided

## Ongoing cadence

- **Monthly:** publish a blog post, check Search Console, review the placeholder list above
- **Quarterly:** re-check NDIS pricing/policy references in the funding guide and the 5 discipline pages, re-check opening hours accuracy
- **As-needed:** new team member → team card + Person schema + relevant discipline page; new service → follow the discipline-page pattern (dedicated page + homepage card + footer link + Service schema entry + sitemap)
