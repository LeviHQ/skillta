# Paid-plan content and payment-flow update

## Scope
- Replace the homepage hero’s tool CTAs with **Compare Our Plans** and open a polished Pro-versus-Lifetime popup.
- Let signed-in users start the selected Dodo checkout directly from that popup; ask signed-out users to sign in first and then continue checkout.
- Rewrite the “Everything included” section for the paid-only model: identical benefits, Pro for 1 year at $3, Lifetime forever at $10.
- Update Country Ecosystem, How to Use SkillTa, homepage FAQ, and homepage FAQ structured data so they accurately describe paid access.
- Remove plan-related “free” wording across non-blog website screens while leaving blogs and learning-resource names/content untouched.
- Refresh all app email copy for Pro/Lifetime access, daily limits, receipts, welcome, and expiry reminders.
- Fix webhook expiry handling so a Pro purchase extends only an existing active Pro plan; legacy/unknown plans start from purchase time, while Lifetime remains permanent.

## Technical details
- Reuse the existing plan context and Dodo checkout flow rather than adding a second payment path.
- Preserve all existing URLs, canonical metadata, sitemap, and unrelated SEO content.
- Add defensive webhook parsing, escaped email values, explicit Dodo event/payment deduplication safeguards where supported by current data, and consistent CORS/error responses.
- Deploy every changed email/payment function, then verify the site build, desktop/mobile UI, popup actions, and current error logs.

## Out of scope
- Blog copy and blog data.
- Switching Dodo from test to live mode.
- Changing plan prices, benefits, or daily limits.
