import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, redirect, useFetcher } from "@remix-run/react";
import { getUserByEmail } from "@functions/server/user";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Logo } from "@utils/icons";
import { useState } from "react";
import bcrypt from "bcryptjs";
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

  const { email, pass, remember } = JSON.parse(rawData);
  try {
    const { user } = await getUserByEmail(email);
    const isMatch = await bcrypt.compare(pass, user?.password || "");
    if (!user || !isMatch) return { error: "Invalid username or password" };
    const cookieHeader = await getUserIdCookie(user.id, remember == "true");
    return redirect("/dashboard/home", {
      headers: { "Set-Cookie": cookieHeader },
    });
  } catch (error) {
    return { error: "Something went wrong. Please try again later." };
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState<boolean>(false);
  const fetcher = useFetcher();
  const error = (fetcher.data as { error?: string })?.error;

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ email, pass, remember }));
    fetcher.submit(formData, { method: "POST" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col gap-4 w-full max-w-lg bg-white md:p-16 p-4 rounded-3xl shadow-lg">
        <Logo />
        <h2 className="text-2xl font-bold text-gray-700 text-left">
          Log in to your account
        </h2>
        {error && <div className="text-red-500 text-sm text-left">{error}</div>}
        <Input data={email} setData={setEmail} label="Email" type="email" />
        <Input data={pass} setData={setPass} label="Password" type="password" />
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <label className="flex items-center text-gray-600 text-sm">
            <input
              type="checkbox"
              name="Remember"
              checked={remember}
              onChange={handleRememberChange}
              value={remember.toString()}
              className="mr-2 w-4 h-4 bg-white checked:bg-primary-500 checked:border-primary-500"
            />
            Remember this device
          </label>
          <Link
            to={"/auth/register"}
            className="text-sm text-primary-500 hover:underline"
          >
            Create an account
          </Link>
        </div>
        <Button
          variant={"highlight"}
          size={"sm"}
          onClick={handleSubmit}
          isLoading={fetcher.state != "idle"}
        >
          Log in
        </Button>
        <p className="text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <Link
            to="/auth/resetpass"
            className="text-primary-500 hover:underline"
          >
            Reset here
          </Link>
        </p>
      </div>
    </div>
  );
}
