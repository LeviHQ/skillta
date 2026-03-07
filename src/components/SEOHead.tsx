import { Helmet } from "react-helmet-async";
import { SITE_CONFIG, getBaseUrl } from "@/lib/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: object | object[];
  image?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  path = "/",
  type = "website",
  noIndex = false,
  jsonLd,
  image,
}: SEOHeadProps) {
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/favicon.png`;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_CONFIG.author} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Theme */}
      <meta name="theme-color" content={SITE_CONFIG.themeColor} />

      {/* JSON-LD */}
      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
