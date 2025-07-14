import { Input } from "@components/ui/input";
import { Mode } from "@types";
import { useAtom } from "jotai";
import { UploadCloud } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";
import { userAtom } from "@utils/atoms/userAtoms";
import { cn } from "@utils/utils";

export default function ProfileEditor({ mode }: { mode: Mode }) {
  const [user, setUser] = useAtom(userAtom);

  if (!user) return <></>;

  return (
    <div className="flex gap-4 w-full">
      <div className="relative w-48 h-48 flex-shrink-0 group transition-transform duration-200 hover:scale-[1.02]">
        <img
          src={
            user.profileUrl
              ? user.profileUrl.includes("amazonaws.com")
                ? `${user.profileUrl}?cb=${Date.now()}`
                : user.profileUrl
              : "/placeholder.png"
          }
          alt="Profile"
          className="w-full h-full rounded-lg object-cover border border-zinc-300 dark:border-zinc-700 shadow-md group-hover:shadow-lg transition-shadow duration-200"
        />
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 rounded-lg backdrop-blur-sm transition-all hover:bg-black/40 cursor-pointer",
            user.profileUrl ? "opacity-0" : "opacity-100",
            mode != "View" && "group-hover:opacity-100"
          )}
        >
          <UploadCloud className="text-white w-8 h-8 opacity-80" />
          <div className="text-sm text-white font-medium opacity-90">
            Upload Your Picture
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setUser({ ...user, profileUrl: URL.createObjectURL(file) });
            }
          }}
          disabled={mode == "View"}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      {/* Title Dropdown */}
      <div className="flex flex-col gap-4 w-full">
        <div
          className={cn(
            "items-start gap-2",
            mode === "View" ? "flex justify-between" : "flex flex-col"
          )}
        >
          <div className="font-semibold text-gray-800">คำนำหน้า</div>
          {mode === "View" ? (
            <div>{user.title || "-"}</div>
          ) : (
            <Select
              value={user.title || ""}
              onValueChange={(value) => setUser({ ...user, title: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกคำนำหน้า" />
              </SelectTrigger>
              <SelectContent>
                {["ด.ช.", "ด.ญ.", "นาย", "นาง", "นางสาว"].map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <Input
          data={user.firstName}
          setData={(firstName) => setUser({ ...user, firstName })}
          mode={mode}
          label="ชื่อ"
        />
        <Input
          data={user.lastName}
          setData={(lastName) => setUser({ ...user, lastName })}
          mode={mode}
          label="นามสกุล"
        />
      </div>
    </div>
  );
}
