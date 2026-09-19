# GitHub Pages Deployment

## Existing repository

This package is designed to replace the website files in the existing Play At Scale GitHub Pages repository.

Keep the existing `CNAME` file already in GitHub. This package intentionally does not include a `CNAME` file so it cannot overwrite the custom-domain configuration.

## Upload

Upload these root files:

- `index.html`
- `advisory.html`
- `education.html`
- `resources.html`
- `about.html`
- `contact.html`
- `privacy.html`
- `styles.css`
- `site-data.js`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `.nojekyll`
- `assets/`

You may also keep `CONTENT-GUIDE.md` and `DEPLOYMENT.md` in the repository. GitHub Pages will not show them in the navigation.

## Important

- Do not delete or replace your existing `CNAME` file.
- Do not upload the ZIP file itself; extract it first.
- Do not change DNS if the existing custom domain is already working.
- GitHub Pages should continue to deploy from `main` and the repository root.

## Future content

Use `CONTENT-GUIDE.md` and `site-data.js` for most recurring updates.
