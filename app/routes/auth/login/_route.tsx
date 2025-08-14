import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useFetcher } from "@remix-run/react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { getUserByEmail } from "@functions/server/user";
import { Logo } from "@utils/icons";
import { jwtDecode } from "jwt-decode";
import {
  getUserIdCookie,
  getUserIdFromRequest,
} from "@functions/server/cookie";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserIdFromRequest(request);
  return userId ? redirect("/dashboard/home") : null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = formData.get("data");

  if (typeof rawData !== "string") return { error: "Invalid form data." };

  const { email } = JSON.parse(rawData);

  // Handle Google OAuth Login
  if (email) {
    try {
      const { user } = await getUserByEmail(email);
      if (!user) return { error: "ไม่พบบัญชีที่ใช้ email นี้" };
      const cookieHeader = await getUserIdCookie(user.id, true);
      return redirect("/dashboard", {
        headers: { "Set-Cookie": cookieHeader },
      });
    } catch (error) {
      return { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" };
    }
  }
}

export default function Login() {
  const fetcher = useFetcher();
  const error = (fetcher.data as { error?: string })?.error;

  return (
    <GoogleOAuthProvider clientId="691727014310-k7uoil8qdrcjg2balfgjjpamq50lpb44.apps.googleusercontent.com">
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="flex flex-col gap-4 w-full max-w-lg bg-white md:p-16 p-4 rounded-3xl shadow-lg">
          <Logo />
          <h2 className="text-2xl font-bold text-gray-700 text-left">
            Log in to your account
          </h2>
          {error && (
            <div className="text-red-500 text-sm text-left">{error}</div>
          )}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (!credentialResponse.credential) return;
              const decoded: { email: string } = jwtDecode(
                credentialResponse.credential
              );

              console.log(decoded.email);

              fetcher.submit(
                {
                  data: JSON.stringify({ email: decoded.email }),
                },
                { method: "post" }
              );
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
