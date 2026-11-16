# VaultLocker website

Static site, no build step. Plain HTML/CSS plus one small script.

- `index.html`: landing page (use as the Marketing URL)
- `support.html`: Support URL (required by App Store Connect)
- `privacy.html`: Privacy Policy URL (required by App Store Connect)
- `style.css`: all styles; colour tokens at the top, taken from the app's `lib/theme/app_theme.dart`
- `main.js`: theme toggle, mobile menu, scroll reveal
- `assets/`: app icon, favicon, lock-screen screenshot

## Run locally

```
cd website
python3 -m http.server 8000
```

Then open http://localhost:8000. Stop with Ctrl+C.

## Placeholders to fill in

- `SUPPORT_EMAIL@example.com`: support address (all pages)
- `https://apps.apple.com/app/idAPP_STORE_ID`: App Store link (index.html header, hero, pricing, CTA, footer)

`grep -rn "SUPPORT_EMAIL\|APP_STORE_ID" .` finds them all.

## Before publishing

1. Replace the placeholder email (and the App Store id the same way):
   `grep -rl SUPPORT_EMAIL@example.com . | xargs sed -i '' 's/SUPPORT_EMAIL@example.com/you@yourdomain.com/g'`
2. Set `Links.site` in `VaultLockrApp/lib/core/links.dart` to the final URL.

## Publish on GitHub Pages

1. Create a new **public** GitHub repo named `vaultlocker` (only this folder, not the app code).
2. From this folder:
   ```
   git init && git add . && git commit -m "VaultLocker website"
   git branch -M main
   git remote add origin https://github.com/JFlic/VaultLockr.git
   git push -u origin main
   ```
3. On GitHub: Settings › Pages › Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`.
4. After about a minute the site is live at `https://vaultlockr.com` (custom domain via the `CNAME` file; DNS and `support@` email forwarding are on Cloudflare).

## App Store Connect

- Privacy Policy URL: `https://vaultlockr.com/privacy.html`
- Support URL: `https://vaultlockr.com/support.html`
- App Privacy questionnaire: **Data Not Collected** (matches the policy: no accounts, analytics, ads or tracking).
