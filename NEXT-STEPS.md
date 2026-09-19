# Allied Pathways — Next Steps

A running checklist of things that need your input or action (not something I can complete on my own). Check items off as you go, or just tell me and I'll update this file.

**Site status as of today: LIVE at https://alliedpathways.com.au (HTTPS confirmed working).**

## Immediate — push the site to GitHub

Needed so the monthly automated site check-in (structured data validity, title/description length, placeholder tracking, broken internal links) can actually run — cloud agents can only see a git repo or a live URL, not your local machine. The repo is already initialised locally with full history; it just isn't backed up to GitHub yet.

- [ ] Create an empty repo at [github.com/new](https://github.com/new) (e.g. `allied-pathways-website`)
- [ ] Run in Terminal, from the project folder:
  ```bash
  cd "/Users/lyndontolentino/Desktop/Allied Pathways" && git remote add origin PASTE_URL_HERE
  git push -u origin main
  ```
- [ ] Tell Claude the repo URL once pushed, so the monthly cloud routine can be finished

## Going live

- [x] Get hosting + point the `alliedpathways.com.au` domain at it — done (SiteGround)
- [x] Get FTP/SFTP credentials from the host — done, SSH key auth set up for direct deploys
- [x] Upload site files to the live server — done, deployed via SSH/rsync
- [x] Confirm SSL/HTTPS is active on the host — confirmed (HTTP/2, valid cert)
- [ ] Configure `404.html` as the server's actual error page — **checked today: still serving SiteGround's generic 404, not the branded one.** Needs a Site Tools setting (Error Pages) or a `.htaccess` rule — Claude can write and deploy the `.htaccess` directly via SSH, just say go
- [ ] Click through the live site end to end (nav, mobile menu, referral form, footer links)
- [ ] Verify domain in Google Search Console, submit `sitemap.xml`

## Content — placeholders still to replace

- [x] Real photo + bio for Muhe (Dietitian, Director & Practice Manager) — includes PEG feeding, sports dietetics, low-FODMAP/IBS specialties, Mandarin speaking
- [x] Real photo + bio for Jack (Exercise Physiologist) — Mandarin speaking
- [x] Real photo + bio for Jeina (Registered Nurse)
- [ ] Real photos for: Speech Pathologist, Occupational Therapist (same treatment as the above three)
- [ ] Bios for the above 2 team members once photos/names are confirmed
- [ ] **Real client testimonials** — highest-priority remaining item. The three testimonials currently on the homepage are generic/fabricated, not from real clients. Collection is fully set up: `testimonial.html` is a live submission form at alliedpathways.com.au/testimonial.html (opens a pre-filled email to info@alliedpathways.com.au), `assets/img/qr/testimonial-qr.png` is a printable QR code linking to it, and `TESTIMONIAL-REQUESTS.md` has ready-to-send outreach templates for clients, Support Coordinators, and GPs. Just needs 2-3 real responses back.
- [ ] Confirm scope/wording for the "Meal Delivery Company Audit" service section on services.html (currently marked placeholder copy)
- [ ] At least 4-6 more blog posts (currently 1 real post)

## Business details to confirm

- [ ] Real business opening hours (currently placeholder Mon-Fri 9am-5pm in the site's structured data)
- [ ] Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) — checked live site today, not yet installed. Send the ID and it'll be wired in
- [ ] Confirm/claim Google Business Profile (needed before adding review star ratings to the site) — walkthrough already provided

## Ongoing cadence

- **Monthly:** publish a blog post, check Search Console, review the placeholder list above
- **Quarterly:** re-check NDIS pricing/policy references in the funding guide, re-check opening hours accuracy
- **As-needed:** new team member → team card + service page + schema; new service → follow the Meal Delivery Audit pattern (homepage card + detail section + footer link + structured data entry)

## Current site score: 8.3/10

Design & UX 9/10 · Technical SEO 8.7/10 · Accessibility 9/10 · Content 7/10 · Conversion path 7.5/10 · Maintainability 7/10.

Content (fabricated testimonials) and the GitHub push are the two biggest levers left to move this meaningfully higher.
