import { ActionFunctionArgs } from "@remix-run/node";
import { Link, redirect, useFetcher } from "@remix-run/react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { getUserByEmail, updateUserPassword } from "@functions/server/user";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Logo } from "@utils/icons";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = formData.get("data");

  if (typeof rawData !== "string") return { error: "Invalid form data." };
  const { email, newPassword, confirmPassword } = JSON.parse(rawData);

  if (!email || !newPassword || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    const { user } = await getUserByEmail(email);
    if (!user) return { error: "No account found for this email." };
    const hashed = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(user.id, hashed);
    return redirect("/auth/login");
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong. Please try again." };
  }
}

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const fetcher = useFetcher();
  const error = (fetcher.data as { error?: string })?.error;

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        email,
        newPassword: newPass,
        confirmPassword: confirmPass,
      })
    );
    fetcher.submit(formData, { method: "POST" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <Logo className="mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 text-left">
          Reset Password
        </h2>
        {error && <div className="text-red-500 text-sm text-left">{error}</div>}
        <Input data={email} setData={setEmail} label="Email" type="email" />
        <Input
          data={newPass}
          setData={setNewPass}
          label="New Password"
          type="password"
        />
        <Input
          data={confirmPass}
          setData={setConfirmPass}
          label="Confirm New Password"
          type="password"
        />
        <Button
          variant={"highlight"}
          size={"sm"}
          onClick={handleSubmit}
          isLoading={fetcher.state != "idle"}
        >
          Reset Password
        </Button>
        <p className="text-sm text-center text-gray-600">
          Remembered your password?{" "}
          <Link to="/auth/login" className="text-primary-500 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
