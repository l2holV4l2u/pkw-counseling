import { createCookie, type CookieSerializeOptions } from "@remix-run/node";

// Reusable function to generate cookie options
function getCookieOptions(remember: boolean): CookieSerializeOptions {
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: remember ? 60 * 60 * 24 * 365 * 999 : undefined,
  };
}

// Create the cookie definition (used for parsing)
const userIdCookie = createCookie("userId", { path: "/" });

// Set cookie with remember option
export async function getUserIdCookie(userId: string, remember: boolean) {
  return await userIdCookie.serialize(userId, getCookieOptions(remember));
}

// Destroy the cookie
export async function destroyUserIdCookie() {
  return await userIdCookie.serialize("", {
    path: "/",
    maxAge: 0,
  });
}

// Get userId from request
export async function getUserIdFromRequest(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const userId = await userIdCookie.parse(cookieHeader);
  return userId || null;
}
