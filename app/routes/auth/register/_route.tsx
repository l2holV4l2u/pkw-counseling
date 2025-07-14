import { Command, CommandGroup, CommandItem } from "@components/ui/command";
import {
  createUser,
  getUserByStudentId,
  getUserByEmail,
} from "@functions/server/user";
import { Link, redirect, useFetcher } from "@remix-run/react";
import { getUserIdCookie } from "@functions/server/cookie";
import { ActionFunctionArgs } from "@remix-run/node";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Logo } from "@utils/icons";
import { useState } from "react";
import bcrypt from "bcryptjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { ChevronDown } from "lucide-react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const rawData = formData.get("data");

  if (typeof rawData !== "string") return { error: "Invalid form data" };
  const { role, inviteCode, email, studentId, password, confirmPassword } =
    JSON.parse(rawData);

  if (
    (!email && (role == "ครู" || role == "แอดมิน") && !inviteCode) ||
    (!studentId && role == "นักเรียน") ||
    !password ||
    !confirmPassword
  ) {
    return { error: "กรอกข้อมูลให้ครบถ้วน" };
  }

  // hard coded invite code
  if (role == "ครู" && inviteCode != "PKW-12345") {
    return { error: "รหัสยืนยันสำหรับครูไม่ถูกต้อง" };
  }

  if (role == "แอดมิน" && inviteCode != "PKWADMIN-54321") {
    return { error: "รหัสยืนยันสำหรับแอดมินไม่ถูกต้อง" };
  }

  if (password !== confirmPassword) return { error: "รหัสผ่านไม่ตรงกัน" };

  try {
    if (role == "Teacher") {
      const { user } = await getUserByEmail(email);
      if (user) return { error: "Email นี้ถูกใช้แล้ว" };
    } else if (role == "Student") {
      const { user } = await getUserByStudentId(studentId);
      if (user) return { error: "รหัสนักเรียนนี้ถูกใช้แล้ว" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { user } = await createUser(email, studentId, hashedPassword, role);
    const cookieHeader = await getUserIdCookie(user.id, true);
    return redirect("/dashboard/home", {
      headers: { "Set-Cookie": cookieHeader },
    });
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Try again later" };
  }
};

export default function Register() {
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const roles = ["นักเรียน", "ครู", "แอดมิน"];
  const [role, setRole] = useState<(typeof roles)[number]>("นักเรียน");
  const [inviteCode, setInviteCode] = useState("");
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        role,
        inviteCode,
        email,
        studentId,
        password,
        confirmPassword,
      })
    );
    fetcher.submit(formData, { method: "POST" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col gap-4 w-full max-w-lg md:p-16 p-4 bg-white rounded-3xl shadow-lg">
        <Logo />
        <h2 className="text-2xl text-left font-bold text-gray-700">
          สร้างบัญชี
        </h2>
        {(fetcher.data as { error: string })?.error && (
          <div className="text-red-500 text-sm text-center">
            {(fetcher.data as { error: string })?.error}
          </div>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <div className="flex flex-col gap-2 w-full">
            <div className="font-semibold text-gray-700">สร้างในฐานะ</div>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-between rounded-lg"
                size={"full_sm"}
              >
                {role}
                <ChevronDown size={12} />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-2">
            <Command>
              <CommandGroup>
                {roles.map((r) => (
                  <CommandItem
                    key={r}
                    value={r}
                    onSelect={() => {
                      setRole(r as (typeof roles)[number]);
                      setOpen(false);
                    }}
                  >
                    {r}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {role == "ครู" || role == "แอดมิน" ? (
          <>
            <Input
              data={inviteCode}
              setData={setInviteCode}
              label={`รหัสยืนยันสำหรับ${role}`}
            />
            <Input data={email} setData={setEmail} label="Email" />
          </>
        ) : (
          <Input data={studentId} setData={setStudentId} label="รหัสนักเรียน" />
        )}

        <Input
          data={password}
          setData={setPassword}
          label="รหัสผ่าน"
          type="password"
        />
        <Input
          data={confirmPassword}
          setData={(d) => setConfirmPassword(d as string)}
          label="ยืนยันรหัสผ่าน"
          type="password"
        />
        <Button
          variant={"highlight"}
          size={"sm"}
          onClick={handleSubmit}
          isLoading={fetcher.state != "idle"}
        >
          สร้างบัญชี
        </Button>
        <div className="text-sm text-center text-gray-600">
          มีบัญชีอยู่แล้ว?{" "}
          <Link to={"/auth/login"} className="text-primary-500 hover:underline">
            เข้าระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
