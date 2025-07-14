import { redirect } from "@remix-run/node";
import { destroyUserIdCookie } from "@functions/server/cookie";

export async function loader() {
  const cookieHeader = await destroyUserIdCookie();
  return redirect("/", { headers: { "Set-Cookie": cookieHeader } });
}
