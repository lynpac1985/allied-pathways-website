# Allied Pathways — Next Steps

A running checklist of things that need your input or action (not something I can complete on my own). Check items off as you go, or just tell me and I'll update this file.

## Immediate — push the site to GitHub

Needed so the monthly automated site check-in (JSON-LD validity, title/description length, placeholder tracking, broken internal links) can actually run — cloud agents can only see a git repo or a live URL, not your local machine.

- [ ] Create an empty repo at [github.com/new](https://github.com/new) (e.g. `allied-pathways-website`)
- [ ] Run in Terminal, from the project folder:
  ```bash
  cd "/Users/lyndontolentino/Desktop/Allied Pathways" && git remote add origin PASTE_URL_HERE
  git push -u origin main
  ```
- [ ] Tell Claude the repo URL once pushed, so the monthly cloud routine can be finished

## Going live

- [ ] Get hosting + point the `alliedpathways.com.au` domain at it
- [ ] Get FTP/SFTP credentials from the host
- [ ] Upload via FileZilla — everything except the `Media/` folder (raw source images, not used by the site)
- [ ] Confirm SSL/HTTPS is active on the host
- [ ] Configure `404.html` as the server's actual error page (cPanel: Error Pages, or `.htaccess`: `ErrorDocument 404 /404.html`)
- [ ] Click through the live site end to end (nav, mobile menu, referral form, footer links)
- [ ] Verify domain in Google Search Console, submit `sitemap.xml`

## Content — placeholders still to replace

- [ ] Real photos for: Speech Pathologist, Registered Nurse, Occupational Therapist, Practice Manager (same treatment as Jack/Muhe)
- [ ] Bios for the above 4 team members once photos/names are confirmed
- [ ] Real client testimonials to replace the generic ones on the homepage (get written consent before publishing — ACCC treats published testimonials as genuine-customer claims). Collection is now set up: `testimonial.html` is a live submission form (opens a pre-filled email to info@alliedpathways.com.au), `assets/img/qr/testimonial-qr.png` is a printable QR code linking to it, and `TESTIMONIAL-REQUESTS.md` has ready-to-send outreach templates for clients, Support Coordinators, and GPs
- [ ] Confirm scope/wording for the "Meal Delivery Company Audit" service section on services.html (currently marked placeholder copy)
- [ ] At least 4–6 more blog posts (currently 1 real post)

## Business details to confirm

- [ ] Real business opening hours (currently placeholder Mon–Fri 9am–5pm in the site's structured data)
- [ ] Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) — send it and it'll be wired in
- [ ] Confirm/claim Google Business Profile (needed before adding review star ratings to the site)

## Ongoing cadence (see full plan in chat history)

- **Monthly:** publish a blog post, check Search Console, review the placeholder list above
- **Quarterly:** re-check NDIS pricing/policy references in the funding guide, re-check opening hours accuracy
- **As-needed:** new team member → team card + service page + schema; new service → follow the Meal Delivery Audit pattern (homepage card + detail section + footer link + JSON-LD)
