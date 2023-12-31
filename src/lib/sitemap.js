const URL = "https://www.wrenchworks.tech";

export function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <priority>1.00</priority>
     </url>
     <url>
       <loc>${URL}/blog</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <priority>0.80</priority>
     </url>
     <url>
        <loc>${URL}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>${URL}/privacy_policy</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>${URL}/contact_us</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>${URL}/disclaimer</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>${URL}/sign_in</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>${URL}/sign_up</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.64</priority>
    </url>
     ${posts
       .map(({ _id, slug = "" }) => {
         return `
       <url>
           <loc>${`${URL}/blog/${slug.current}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>0.80</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}
