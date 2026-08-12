import Script from "next/script";

/**
 * Analytics scaffold. Nothing loads unless the corresponding environment
 * variable is set, so no third-party scripts run before analytics is
 * intentionally configured:
 *
 *   NEXT_PUBLIC_GA_ID       Google Analytics 4 measurement id (G-XXXXXXX)
 *   NEXT_PUBLIC_CLARITY_ID  Microsoft Clarity project id
 *
 * Google Search Console needs no script — verify via DNS or the sitemap.
 */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!ga && !clarity) return null;

  return (
    <>
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}
      {clarity && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}
        </Script>
      )}
    </>
  );
}
