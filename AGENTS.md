# Project architecture rules

- Theme state uses `next-themes` with class-based light/dark tokens and defaults to light, so every screen shares one persisted preference while retaining user choice.
- Achievement badges are immutable JSON snapshots stored behind the Firebase-authenticated `firebase-data` function, so earned quiz and resume cards remain private and historically accurate.
- Homepage product-proof content lives in a dedicated sample-results section before pricing, so buyers can inspect representative outputs without coupling it to checkout logic.
- Routed content pages use a wrapping, top-right visible breadcrumb; the homepage and 404 page intentionally omit it for a cleaner entry state.
- Advertising eligibility is centralized in PlanContext with account-scoped entitlement resolution; ad components never request scripts while auth or paid status is unknown, preventing paid-user ad flashes and stale-account leakage.
- Responsive advertising runs in a sandboxed iframe per placement so third-party globals cannot collide and unmounting stops the placement without a full-page reload.