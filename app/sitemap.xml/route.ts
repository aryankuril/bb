import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://bombayblokes.com";
  
  const pages = [
    "", // home
    "about",
    "contact",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `<url>
  <loc>${baseUrl}/${page}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
