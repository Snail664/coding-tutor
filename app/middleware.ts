import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired(async function middleware() {
  return NextResponse.next();
});

export const config = {
  matcher: ["/api/llm-guide/:path*", "/api/chat/:path*"],
};
