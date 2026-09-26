# Allied Pathways — Next Steps

A running checklist of things that need your input or action (not something I can complete on my own). Check items off as you go, or just tell me and I'll update this file.

**Site status as of today: LIVE at https://alliedpathways.com.au (HTTPS confirmed working).**

## Immediate — real infrastructure bug, needs a host-level fix

- [ ] **The `.htaccess` fixes (canonical host redirect, security headers) only work on the bare homepage URL `/` — every other page bypasses them.** Confirmed independently by 3 separate audit agents plus my own manual check on 2026-09-26. `curl -sI https://alliedpathways.com.au/about.html` still returns 200 with no redirect and no security headers; only `https://www.alliedpathways.com.au/` (root) and genuine 404s get the `.htaccess` treatment. Root cause: SiteGround's nginx layer serves any request matching a real on-disk file directly, bypassing the Apache layer that processes `.htaccess` — this can't be fixed with another `.htaccess` edit. **Fix: Site Tools → Domain → your domain → HTTPS Enforce** (handles the protocol/www redirect at the nginx layer). Security headers on every page may need a SiteGround support ticket, since that's an nginx-level config `.htaccess` can't reach. Don't mark this resolved until `curl -sI` on a real subpage (not just `/`) returns a 301/headers.
- [x] ~~Flush the SiteGround cache~~ — done, confirmed working as of 2026-09-26 (real visitors now see current content on the `www` host)

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

## SEO — audits run 2026-09-25 and 2026-09-26 (claude-seo plugin, 11 sub-agents each)

Full reports: [SEO-AUDIT-2026-09-25.md](SEO-AUDIT-2026-09-25.md), [SEO-AUDIT-2026-09-26.md](SEO-AUDIT-2026-09-26.md). Re-audit results: SXO gap score 43→64 (the discipline-page fix is working directionally), Content Quality 48→61, GEO 52→56. Local SEO score moved 43→37 but that's not a regression — GBP/reviews carry 45% combined weight and are still at zero live signal pending verification.

**Fixed in response to the 09-26 re-audit:**
- [x] `&amp;` HTML-entity leak in the suburbs page's JSON-LD (was corrupting structured-data parsing)
- [x] `privacy-policy.html`/`feedback-complaints.html` missing schema fields (areaServed/hours/sameAs)
- [x] NDIS pricing document renamed to match the NDIA's 2026-27 "Pricing Schedule" naming (dollar figures were already correct)
- [x] Stopped implying Occupational Therapy is currently staffed on pages other than the OT page itself
- [x] Toned down unverifiable "most active service area"/"same-day availability" claims on the suburbs page — same class of issue as the testimonials fix
- [x] Fixed Support at Home funding-flow description and "Improved Daily Living Skills" → correct category name
- [x] Added non-clinical-content guidance to the testimonial form
- [x] Fixed dead blog share buttons and an inflated read-time estimate
- [x] Added Victorian regulator references (Health Complaints Commissioner, Health Records Act) to the legal pages
- [x] Added footer disclosure that Allied Pathways is a business name of Centre for Care Pty Ltd

**Still open, bigger content work — needs your input on scope before I'd build more:**
- [ ] Discipline pages are thin vs. real competitors (246–333 words vs. ~1,290-word median) — needs FAQ sections + first-appointment detail per page
- [ ] **Glen Waverley needs its own dedicated page**, not just a subsection of the consolidated suburbs page — 6 of 9 real search results for that exact query are Glen-Waverley-specific pages (refines, doesn't reverse, the "one consolidated page for everything else" decision)
- [ ] A "Swallowing & Mealtime Management" page/section linking the Dietitian and Speech Pathology pages — a real differentiator currently invisible to search

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
- [x] Added 10 new blog posts (11 total now) covering the most-asked NDIS and Support at Home questions, sourced from real FAQ lists (Scope Australia, People with Disability Australia, Dept. of Health) rather than invented topics — [5 NDIS posts](blog-ndis-eligibility.html) and [5 Support at Home posts](blog-support-at-home-explained.html) all live at [blog.html](https://www.alliedpathways.com.au/blog.html)

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
