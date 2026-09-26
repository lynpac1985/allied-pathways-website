# Allied Pathways — Next Steps

A running checklist of things that need your input or action (not something I can complete on my own). Check items off as you go, or just tell me and I'll update this file.

**Site status as of today: LIVE at https://alliedpathways.com.au (HTTPS confirmed working).**

## Immediate — one thing is blocking everything below from being visible

- [ ] **Flush the SiteGround cache.** Every fix and new page listed below is already correctly deployed to the server, but SiteGround's Dynamic Cache is still serving real visitors a stale, pre-2026-09-25 copy of several pages (confirmed via cache-busted requests — origin is correct, cache isn't). This needs your login: **Site Tools → Speed → Caching → Flush Cache**. I tried a `.htaccess` `Cache-Control` override to force this automatically — SiteGround's cache layer ignores it, so a manual flush is the only fix. Do this first; nothing else on this list matters to visitors until it's done.

## GitHub & automated check-in — done

- [x] Repo created and pushed: [github.com/lynpac1985/allied-pathways-website](https://github.com/lynpac1985/allied-pathways-website), full history, `main` branch tracked. SSH key (`~/.ssh/github_allied_pathways`) configured for future pushes.
- [x] **Weekly automated site health-check routine is live** (JSON-LD validity, title/description lengths, placeholder sweep, broken internal links, live-vs-repo drift check). Runs Monday mornings, emails the report to info@alliedpathways.com.au. Will switch to monthly once the content backlog below clears. [Routine link](https://claude.ai/code/routines/trig_01C13BfSg25ZbakbT8nrKnKQ)

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
- [ ] Google Business Profile — **set up, awaiting Google's verification** (postcard/phone/email). Once verified, send Claude the profile URL to add to the site's schema `sameAs`, and it becomes the biggest lever for real reviews/star ratings

## Future ideas — not scheduled, needs your go-ahead

- [ ] **AI chatbot.** Recommended approach: an embeddable third-party widget (e.g. Chatbase, Tidio AI, Intercom Fin) rather than a custom Claude/OpenAI build — this site is static with no backend, so a widget is a one-`<script>`-tag fit, while a custom build would need a new serverless backend just to hide the API key. Benefits: captures after-hours referrer/GP/family enquiries, answers routine funding/service-area questions from existing site content, reduces routine questions reaching Muhe directly, can capture leads before handing off to the referral form. Cost: roughly $20–100+/month depending on vendor. **Two things to decide before building:** budget/vendor, and it must be scoped to non-clinical questions only (services, funding, referral process, hours) — a health provider's chatbot giving anything that reads as clinical advice is a liability. Also needs a line added to the Privacy Policy once live, disclosing chatbot conversation data collection.

## Ongoing cadence

- **Monthly:** publish a blog post, check Search Console, review the placeholder list above
- **Quarterly:** re-check NDIS pricing/policy references in the funding guide and the 5 discipline pages, re-check opening hours accuracy
- **As-needed:** new team member → team card + Person schema + relevant discipline page; new service → follow the discipline-page pattern (dedicated page + homepage card + footer link + Service schema entry + sitemap)
