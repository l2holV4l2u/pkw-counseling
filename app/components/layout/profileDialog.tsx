import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@components/ui/sidebar";
import { userAtom } from "@utils/atoms/userAtoms";
import { useAtom } from "jotai";
import { useState } from "react";
import ModeAction from "@components/custom/modeAction";
import { User } from "prisma/generated/zod";
import ProfileEditor from "./profileEditor";
import { updateUser } from "@functions/client/user";
import { cn } from "@utils/utils";
import { Mode } from "@types";
import { LoaderCircle } from "lucide-react";

export default function ProfileDialog() {
  const [user, setUser] = useAtom(userAtom);
  const [mode, setMode] = useState<Mode>("View");
  const [prevProfile, setPrevProfile] = useState<User | null>(null);
  const { state } = useSidebar();

  if (!user)
    return (
      <div className="flex w-full h-14 justify-center items-center ">
        <LoaderCircle size={24} strokeWidth={1.5} className="animate-spin" />
      </div>
    );

  return (
    <SidebarMenuItem>
      <Dialog>
        <DialogTrigger asChild>
          <SidebarMenuButton
            className={cn(state == "collapsed" && "p-0 justify-center")}
          >
            <img
              src={user.profileUrl || "/placeholder.png"}
              className="w-10 h-10 rounded-md object-cover"
            />
            {state == "expanded" && (
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {user.firstName || "Unknown User"}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user.email}
                </div>
              </div>
            )}
          </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode == "View" ? "โปรไฟล์" : "แก้ไขโปรไฟล์"}
            </DialogTitle>
          </DialogHeader>
          <ProfileEditor mode={mode} />
          <DialogFooter>
            <div className="flex w-full justify-end">
              <ModeAction
                mode={mode}
                setMode={setMode}
                onClickEdit={() => setPrevProfile(user)}
                onClickSave={() => updateUser(user)}
                onClickCancel={() => setUser(prevProfile || user)}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  );
}
