import { NextResponse } from "next/server";

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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `<url>
  <loc>${baseUrl}/${page}</loc>
  <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>${page === "" ? "1.0" : "0.8"}</priority>
</url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
