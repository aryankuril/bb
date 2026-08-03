import { NextResponse } from "next/server";
import { getPublishedBlogs, getPublishedCareers } from "@/lib/server-data";

// The sitemap must include records created after deployment as well.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const baseUrl = "https://bombayblokes.com";

  const pages = [
    "", // home
    "aboutus",
    "blogs",
    "client-registration",
    "clients",
    "contactus",
    "join-our-team",
    "services",
    "services/design-branding",
    "services/geo-services",
    "services/performance-marketing",
    "services/seo-services",
    "services/social-media-marketing",
    "services/website-development",
    "teams",
    "work",
    "work/performance-marketing/chatterboxlabels",
    "work/performance-marketing/dancingleaf",
    "work/performance-marketing/jkdiamondsinstitute",
    "work/performance-marketing/scssports",
    "work/seo-services/manbafinance",
    "work/seo-services/presolv360",
    "work/seo-services/scssports",
    "work/social-media-marketing/ricrackids",
    "work/social-media-marketing/scssports",
    "work/social-media-marketing/supersox",
    "work/website-development/jkdiamondsinstitute",
    "work/website-development/mysuittailor",
    "work/website-development/scssports",
    "work/website-development/supersox",
    "work/website-development/thefelinefoundation",
  ];

  const [blogs, careers] = await Promise.all([
    getPublishedBlogs(),
    getPublishedCareers(),
  ]);

  const dynamicPages = [
    ...blogs
      .filter((blog) => blog.slug)
      .map((blog) => ({
        path: `blogs/${blog.slug}`,
        lastModified: blog.scheduledAt ?? blog.postedAt,
      })),
    ...careers.map((career) => ({
      path: `join-our-team/${career.slug || career.id}`,
      lastModified: career.postedAt,
    })),
  ];

  const today = new Date().toISOString().split("T")[0];
  const formatDate = (timestamp?: { seconds: number }) =>
    timestamp
      ? new Date(timestamp.seconds * 1000).toISOString().split("T")[0]
      : today;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[
    ...pages.map((path) => ({ path, lastModified: undefined })),
    ...dynamicPages,
  ]
    .map(
      ({ path, lastModified }) => `<url>
  <loc>${baseUrl}/${path}</loc>
  <lastmod>${formatDate(lastModified)}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>${path === "" ? "1.0" : "0.8"}</priority>
</url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
