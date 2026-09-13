# Max-priority ad loading

## Goal
Make every existing Adsterra placement request its ad as early as possible when an ad-supported page opens, without adding ads to new pages or changing their positions.

## Changes
- Start the correct Native and Responsive ad-script downloads from the document head, based on the current page and device size.
- Remove the homepage ad component's lazy import so its setup is available in the initial page code.
- Run both reusable ad components during the earliest safe React phase rather than waiting for an animation frame.
- Keep ad scripts asynchronous and preserve fixed slot dimensions to limit page blocking and layout movement.
- Prevent stale or duplicate script/container state during navigation and remounting.

## Verification
- Check production compilation and current diagnostics.
- Open representative homepage, blog, roadmap, quiz, and service pages in a browser and confirm ad-network requests begin immediately without runtime errors.
- Check desktop and mobile-sized views for stable ad slots.

## Trade-off
Ads will receive maximum loading priority, so they can compete more with page content and may slightly reduce mobile performance scores. Actual display time and counted impressions still depend on Adsterra response speed, inventory, blockers, consent rules, and network conditions.
