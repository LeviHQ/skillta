# Shareable SkillTa badges

## Goal
Create premium 9:16 achievement cards for Career Quiz and Resume Review results, make them easy to download/share, and keep each signed-in user's badges available in a new Dashboard library.

## What will be built
- A reusable SkillTa badge card with a dark teal/violet visual identity, tighter corners, user photo/name, date, SkillTa branding, and a clear `skillta.tech` call to action.
- Career Quiz badges containing match score, recommended career, supporting matches, selected career signals, and a career-discovery rank.
- Resume Review badges containing ATS score, target role, role-fit score, strongest highlights, and a score-based rank: Rising Talent, Pro, Master, or Legend.
- A result-page badge experience after quiz completion and resume analysis, including preview, PNG download, native device sharing when supported, and dedicated X and LinkedIn share actions with prepared post copy and CTA.
- A Dashboard “My Badges” section with Quiz and Resume Review tabs, newest-first history, badge preview, sharing controls, and pagination.

## Data and history
- Add a private `badges` table in Lovable Cloud. Only server functions can read/write it after Firebase identity verification; browser-direct access remains blocked.
- Save a badge snapshot whenever a quiz result or resume review succeeds, so later content changes do not alter earned badges.
- Backfill badges for existing quiz history. Previous resume reviews cannot be reconstructed because their review results were not stored; all new resume badges will be retained.
- Extend the existing authenticated data function to return the current user's badge history without exposing another user's records.

## Sharing behavior
- Render a high-resolution 1080×1920 PNG from the card.
- On supported phones, use the native share sheet with the image attached.
- X and LinkedIn buttons prepare platform-specific post text and open the correct composer; the PNG is downloaded automatically when those sites cannot accept an attached image from the browser.
- Include a non-spammy CTA such as “Discover your path at skillta.tech” or “Check your resume readiness at skillta.tech.”

## Technical details
- Add one focused badge renderer and one share-controls module rather than duplicating card markup across pages.
- Use the existing user photo from Google sign-in with a branded initials fallback.
- Use semantic SkillTa theme tokens in the app UI; the exported card uses a fixed dark SkillTa presentation so every shared image is consistent in light and dark mode.
- Add the required image-export dependency and update the existing quiz, resume, dashboard, auth, and edge-function flows.
- Preserve existing plans, usage limits, SEO content, and quiz/resume scoring logic.

## Verification
- Verify the database grants and locked policies, quiz and resume badge creation, dashboard filtering/pagination, PNG dimensions, X/LinkedIn flows, mobile/desktop layout, dark/light app visibility, and production build.
