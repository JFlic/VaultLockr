# VaultLocker website

Static pages for the App Store listing:

- `index.html`: landing page (use as the Marketing URL)
- `support.html`: Support URL (required by App Store Connect)
- `privacy.html`: Privacy Policy URL (required by App Store Connect)

## Before publishing

1. Replace the placeholder email everywhere:
   `grep -rl SUPPORT_EMAIL@example.com . | xargs sed -i '' 's/SUPPORT_EMAIL@example.com/you@yourdomain.com/g'`
2. Set `Links.site` in `VaultLockrApp/lib/core/links.dart` to the final URL.

## Publish on GitHub Pages

1. Create a new **public** GitHub repo named `vaultlocker` (only this folder, not the app code).
2. From this folder:
   ```
   git init && git add . && git commit -m "VaultLocker website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/vaultlocker.git
   git push -u origin main
   ```
3. On GitHub: Settings › Pages › Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/vaultlocker/`.

## App Store Connect

- Privacy Policy URL: `…/privacy.html`
- Support URL: `…/support.html`
- App Privacy questionnaire: **Data Not Collected** (matches the policy: no accounts, analytics, ads or tracking).
