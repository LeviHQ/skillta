# Project architecture rules

- Theme state uses `next-themes` with class-based light/dark tokens and defaults to dark, so every screen shares one persisted preference without changing SkillTa's existing default appearance.
- Achievement badges are immutable JSON snapshots stored behind the Firebase-authenticated `firebase-data` function, so earned quiz and resume cards remain private and historically accurate.