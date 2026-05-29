// PATH: src/middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PROTECTED = ["/dashboard", "/editor"];
const AUTH_ONLY  = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const sb = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await sb.auth.getUser();
  const path = request.nextUrl.pathname;

  // Redirect logged-in users away from auth pages
  if (user && AUTH_ONLY.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect dashboard & editor routes
  if (!user && PROTECTED.some((p) => path.startsWith(p))) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirectTo", path);
    return NextResponse.redirect(url);
  }

  // /u/* adalah public — tidak perlu auth
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};