# Follow-up task — remove remaining WordPress dependency

**Status:** Required after the refreshed site is deployed and before the WordPress host is retired.

## Objective

Download the complete legacy WordPress file/archive set, move required assets and retained editorial content into CannaCon-controlled storage/source, update references, then redeploy with no live WordPress dependency.

## Inputs to obtain

1. Full `wp-content/uploads/` directory.
2. Full WordPress database SQL dump.
3. Full `wp-content/` archive, including themes, plugins and MU plugins for historical reference.
4. Keep the existing XML, ACF, Gravity Forms, Yoast redirect/settings and SEO exports.
5. Search Console external links / top-linked-pages export before irreversible retirement decisions.

## Implementation work after files arrive

1. Inventory all uploaded assets and hash/deduplicate them.
2. Identify production assets referenced by retained pages and articles.
3. Copy retained production media into CannaCon-controlled asset storage.
4. Convert retained WordPress editorial pages to native static HTML/structured content.
5. Update every `wp-content` reference in the generated website.
6. Implement the final A/B/C migration map and preserve/flatten legacy redirects.
7. Return intentional 404/410 responses for approved retirement URLs rather than mass-redirecting to the homepage.
8. Crawl the rebuilt site and verify zero accidental requests to the WordPress origin.
9. Re-run accessibility, SEO, structured-data and link QA.
10. Redeploy and only then retire WordPress hosting.

## Definition of done

- `grep -R "wp-content" public/` returns zero production dependencies.
- All SEO-protected URLs resolve to retained content or intentional redirects.
- Production sitemap/canonicals point only to the new CannaCon site.
- WordPress database and files are archived offline/object storage.
- WordPress/PHP/MySQL are no longer needed for production traffic.
