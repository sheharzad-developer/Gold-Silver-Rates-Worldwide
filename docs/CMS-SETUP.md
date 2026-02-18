# CMS Setup (Sanity) – Edit country pages and SEO

Your team can edit **Saudi, India, Pakistan, Qatar** page content (article text, FAQs) from a browser — no code changes needed.

**Install note:** If you use Next.js 16, run `npm install --legacy-peer-deps` (Sanity’s packages may not list Next 16 yet). Ensure you have enough disk space for the install.

---

## 1. Create a Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage) and log in (or create an account).
2. Click **Create project**.
3. Name it (e.g. "Gold & Silver Content"), choose a dataset name (e.g. **production**), then create.
4. In **Project settings** → **API** note:
   - **Project ID**
   - **Dataset** (usually `production`).

---

## 2. Add env vars

In your project (and in **Vercel** → Project → Settings → Environment Variables), add:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id_here` with the Project ID from step 1.

Redeploy on Vercel after adding env vars.

---

## 3. Open the Studio (admin)

- **Local:** run `npm run dev`, then open [http://localhost:3000/studio](http://localhost:3000/studio).
- **Production:** open **https://thegoldprice.gold/studio** (or your domain).

Log in with the same Sanity account you used to create the project.

---

## 4. Add content for each country

1. In the Studio, open **Country Page** in the sidebar.
2. Click **Create** → **Country Page**.
3. Choose **Country ID** (e.g. Saudi Arabia, India, Pakistan, Qatar).
4. Fill in:
   - **Article heading (H1)**
   - **Sections** (add as many as you need; each has **Section heading (H2)** and **Body text**).
   - **FAQ section title** (optional).
   - **FAQ** (add questions and answers).
5. Click **Publish**.

Repeat for each country (Saudi, India, Pakistan, Qatar). The site will use CMS content when it exists; otherwise it falls back to the built-in content.

---

## 5. CORS (if Studio is on your domain)

If the Studio is at **https://thegoldprice.gold/studio**:

1. In [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS origins**.
2. Add: `https://thegoldprice.gold` and `http://localhost:3000` (for local dev).

---

## Summary

| Step | Action |
|------|--------|
| 1 | Create project at sanity.io/manage, note Project ID and dataset |
| 2 | Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in .env and Vercel |
| 3 | Open **/studio** on your site and log in with your Sanity account |
| 4 | Create one **Country Page** per country and publish |
| 5 | Add CORS origins if needed |

After that, you and your team can change Saudi (and other) page content and FAQs from the Studio without touching code.
