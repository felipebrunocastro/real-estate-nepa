# Going live: deploy + domain

This walks you from the code on your computer to **https://realestateinnepa.com**
live on the internet. It's written for a non-developer. Total time ~30–45 min.

> A couple of steps (creating accounts, **buying the domain**, entering payment)
> are things only you can do — I can't create accounts or make purchases for you.
> They're marked **[YOU]**. Everything else is already done.

The app needs **no environment variables** to run, so it deploys as-is.

---

## Step 1 — Put the code on GitHub  [YOU]

Vercel deploys from a GitHub repo (and auto-redeploys every time the code
changes).

1. Create a free account at **https://github.com** if you don't have one.
2. Create a new **empty** repository named `real-estate-nepa`
   (https://github.com/new). Don't add a README/license — the project already
   has them.
3. In a terminal, from the project folder (`~/real-estate-nepa`), run the
   commands GitHub shows you for "push an existing repository", which are:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/real-estate-nepa.git
   git branch -M main
   git push -u origin main
   ```

   (Replace `YOUR-USERNAME`. If it asks you to sign in, follow the browser
   prompt.)

## Step 2 — Deploy on Vercel  [YOU]

1. Go to **https://vercel.com** and sign up with your GitHub account (free
   "Hobby" plan is enough to launch).
2. Click **Add New… → Project**, and **Import** the `real-estate-nepa` repo.
3. Vercel auto-detects **Next.js** — you don't need to change any settings.
   Click **Deploy**.
4. In ~1–2 minutes you'll get a live URL like
   `real-estate-nepa.vercel.app`. Open it — your site is online. 🎉

## Step 3 — Get the domain realestateinnepa.com  [YOU]

**Easiest path — buy it through Vercel** (it auto-connects, no DNS to configure):

1. In your Vercel project → **Settings → Domains**.
2. Type `realestateinnepa.com` and click **Buy**. Pay for it (typically
   ~$15–25/year). Vercel wires it up automatically, including HTTPS.

**Or buy it elsewhere** (Cloudflare Registrar, Namecheap, Porkbun are
reputable and low-cost), then in Vercel → Settings → Domains, **Add**
`realestateinnepa.com`. Vercel will show you the DNS records to set at your
registrar (usually an `A` record to Vercel's IP, or a nameserver change).
Follow Vercel's on-screen instructions.

3. Also add `www.realestateinnepa.com` and let Vercel **redirect it to the
   apex** (`realestateinnepa.com`) — it offers this in one click. HTTPS is
   automatic.

DNS can take anywhere from a few minutes to a few hours to go live.

---

## After launch (optional, whenever you're ready)

Add these in Vercel → **Settings → Environment Variables** (then redeploy).
Nothing breaks without them.

| Variable | What it does |
| --- | --- |
| `LEAD_WEBHOOK_URL` | Send contact-form leads to a CRM/automation (see README). |
| `NEWSLETTER_WEBHOOK_URL` | Send newsletter sign-ups somewhere. |
| `NEXT_PUBLIC_GA_ID` | Turn on Google Analytics. |
| `NEXT_PUBLIC_CLARITY_ID` | Turn on Microsoft Clarity. |

**Updating market data:** edit `data/market-input.csv` (or run
`npm run market:fetch -- --apply` to pull the latest Zillow figures), then
`git commit` + `git push` — Vercel redeploys automatically. See the README's
"Updating market data".

## Troubleshooting

- **Build fails on Vercel** but works locally → make sure everything is
  committed and pushed (`git status` should be clean).
- **Domain shows "not configured"** → give DNS time, and double-check the
  records match exactly what Vercel shows.
