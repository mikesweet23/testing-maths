# Testing Maths

Guided calculators for 2nd-year electrical apprentices. Each sum explains what it's for, why it matters, where the numbers come from, and how to key it into an ordinary calculator. A "Have a go first" switch hides the answer until you've tried it yourself.

## Calculators

- Ohm's law and power
- Continuity: R1 + R2
- Ring final circuit continuity
- Insulation resistance (resistances in parallel)
- Earth fault loop impedance: Zs and maximum Zs
- Prospective fault current
- Voltage drop
- Cable sizing with correction factors
- Adiabatic equation

## Tables

The **Tables** tab has the look-up data apprentices would normally find in BS 7671, the On-Site Guide and GN3: conductor resistances, max Zs (Table 41.3), disconnection times, typical Ze, RCD values, insulation resistance minimums, Table 4D5 cable ratings and voltage drop, correction factors (Ca, Cg, Ci, Cc), voltage drop limits, k values, bonding sizes and unit conversions. Every table says where it lives in the real books. Each calculator links to the tables it uses. The data is in `tables.js`.

## Quiz and progress

- **Quiz tab:** Quick fire (mixed), Practice sums (random numbers every time), Which test? Which sum? (multiple choice, including where to find each table), Table lookup (sums where the data has to be found in the tables, which open inside the question), Retry my mistakes, and a short quiz for each topic. Every quiz can be retaken with new questions, or just the ones that were wrong.
- **Progress tab:** scores, quiz history, how well each topic is going, and the weakest topic to practise next.
- Progress saves automatically on the phone, in the browser's storage for this site. On iPhone, use the app from the Home Screen icon: Safari and the Home Screen app keep separate progress. **Save a backup** (Progress tab) makes a file that can be restored on the same or a new phone.

## Releasing an update

1. Make your changes.
2. Change `APP_VERSION` in `index.html` **and** `VERSION` in `sw.js` to the same new number (e.g. `1.1.0` → `1.2.0`).
3. Optionally add a line to `WHATS_NEW` in `index.html`. It shows once after the update.
4. Push to `main`. Within a few minutes, anyone opening the app sees **"New version ready — Update"**. Tapping it reloads onto the new version and keeps their progress.

If the version numbers aren't changed, phones keep running the old cached copy.

## Adding quiz questions

Multiple-choice questions live in `questions.js`. Copy a block, give it a new unique `id`, and put the correct answer first in `options` (the app shuffles them). Then release an update as above.

## Put it on GitHub Pages

1. Upload every file in this folder to a new public repo (keep the `icons` folder).
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. After a minute the site is live at `https://<username>.github.io/<repo-name>/`.

## Add it to a phone

- **iPhone (Safari):** open the link, tap Share, then "Add to Home Screen".
- **Android (Chrome):** open the link, tap ⋮, then "Install app" or "Add to Home screen".

It works offline once it's been opened once.

## Note

Reference values follow BS 7671 (18th Edition), the On-Site Guide and Guidance Note 3. It's a learning aid: always check against the current edition used at college and on site.
