import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const response = await fetch(`${process.env.STRAIP_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Request error");
    }

    const payload = await response.json();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("users", JSON.stringify({ email: payload.email }));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/special-blogs/:path*",
};
