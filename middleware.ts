import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();

   // Check if the request is trying to access secured routes without the session
   const isRestrictedPath =
   req.nextUrl.pathname.startsWith("/pcbanner") ||
   req.nextUrl.pathname.startsWith("/mbanner") ||
   req.nextUrl.pathname.startsWith("/exceltrans") ||
   req.nextUrl.pathname.startsWith("/exceltransAlbamon") ||
   req.nextUrl.pathname.startsWith("/excelLogic");

 const isLoggedIn = req.cookies.get("gb_session") !== undefined;

 if (isRestrictedPath && !isLoggedIn) {
   // Check if the request is not already being redirected to the login page
   if (!req.nextUrl.pathname.startsWith("/login")) {
     return NextResponse.redirect(new URL("/login", req.url));
   }
 }

 // Allow requests to pass through for other cases
 return NextResponse.next();
}
