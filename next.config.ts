import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Add IDX / CDN / Supabase storage hosts here as integrations come online.
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
