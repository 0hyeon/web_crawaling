import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();
  if (
    (req.nextUrl.pathname.startsWith("/pcbanner") &&
      !req.cookies.get("gb_session")) ||
    (req.nextUrl.pathname.startsWith("/mbanner") &&
      !req.cookies.get("gb_session")) ||
    (req.nextUrl.pathname.startsWith("/exceltrans") &&
      !req.cookies.get("gb_session")) ||
    (req.nextUrl.pathname.startsWith("/exceltransAlbamon") &&
      !req.cookies.get("gb_session")) ||
    (req.nextUrl.pathname.startsWith("/excelLogic") &&
      !req.cookies.get("gb_session"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
