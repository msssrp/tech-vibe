import { MetadataRoute } from "next";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin-dashboard/", "/manage/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
