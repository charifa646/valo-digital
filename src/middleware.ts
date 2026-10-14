import { NextResponse, type NextRequest } from "next/server";
import { SITE_HOST } from "@/lib/site";

/**
 * One address for the search engines (14 October 2026). `SITE_HOST` is the site's own address, the one `SITE_URL` names
 * (src/lib/site.ts): on any other address (the provisional valo-digital.vercel.app, the previews of each branch) the answer
 * carries `X-Robots-Tag: noindex`, so that once the site is open to search engines Google never lists the same pages
 * twice; and the other form of the domain (with or without « www ») goes to `SITE_HOST`, with a permanent redirect (308),
 * the form's POST included.
 */
const AUTRE_HOTE = SITE_HOST.startsWith("www.") ? SITE_HOST.slice(4) : `www.${SITE_HOST}`;

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (host === AUTRE_HOTE && !host.endsWith(".vercel.app")) {
    const url = req.nextUrl.clone();
    url.host = SITE_HOST;
    url.port = "";
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  const res = NextResponse.next();
  if (host !== SITE_HOST && host !== "localhost" && host !== "127.0.0.1") res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

// everything but the files the build names with a hash and the browser's own requests
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png).*)"] };
