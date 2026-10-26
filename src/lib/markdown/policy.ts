/** Public page families only. Private results are never described or exported. */
export const STATIC_PUBLIC_PATHS = ['/', '/quiz', '/roadmaps', '/about', '/terms', '/privacy', '/contact', '/compare', '/blog', '/story', '/salary-predictor', '/resume-reviewer', '/resume-version-control', '/skill-gap-analyzer'] as const;
export const SKIPPED_ROUTES: Record<string, string> = {
  '/results': 'Personalized quiz results',
  '/dashboard': 'Private account history',
  '*': 'Not-found fallback',
};
export const PUBLIC_PATTERNS = ['/roadmaps/:careerId', '/blog/:slug', '/:country', '/:country/:section'];
export const PRIVATE_PREFIXES = ['/dashboard', '/results', '/admin', '/staff', '/internal', '/ops', '/console', '/manage', '/account', '/billing', '/login', '/signup', '/logout', '/reset-password', '/verify', '/auth', '/oauth', '/callback'];
export const SEARCH_BOTS = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'];
// Existing training-crawler permissions are deliberately unchanged.
export function isPublicPath(path: string): boolean {
  if (PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return false;
  return (STATIC_PUBLIC_PATHS as readonly string[]).includes(path) || /^\/(roadmaps|blog)\/[^/]+$/.test(path) || /^\/[^/.]+(?:\/[^/.]+)?$/.test(path);
}
