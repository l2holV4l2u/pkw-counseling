import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { Collapsible } from "@components/ui/collapsible";
import ProfileDialog from "./profileDialog";
import { Logo } from "@utils/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChartBar,
  LucideChevronRight,
  LucideLogOut,
  LucidePanelLeftClose,
  LucidePanelLeftOpen,
  LucideX,
  PencilRuler,
  School,
  UsersRound,
} from "lucide-react";
import { cn } from "@utils/utils";
import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@utils/atoms/userAtoms";

const iconProps = { size: 24, strokeWidth: 1.5 };

const items = [
  {
    title: "คะแนนของฉัน",
    url: "score",
    icon: <PencilRuler {...iconProps} />,
  },
  {
    title: "การวิเคราะห์",
    url: "analysis",
    icon: <ChartBar {...iconProps} />,
  },
  {
    title: "คณะที่สนใจ",
    url: "university",
    icon: <School {...iconProps} />,
  },
  {
    title: "นักเรียนของฉัน",
    url: "mystudents",
    icon: <UsersRound {...iconProps} />,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigation = useNavigation();
  const curPath = location.pathname.slice(1);
  const focus =
    "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100 text-white hover:text-white focus:text-white active:text-white hover:from-primary-600 hover:to-primary-400";
  const { toggleSidebar, state, isMobile, setOpenMobile } = useSidebar();
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  /*
  const items = [
    ...baseItems,
    ...(user.role === "Organizer" ? hostItems : participantItems),
  ];
  */

  useEffect(() => {
    if (navigation.state === "idle" && curPath.includes(loadingButton || "")) {
      setLoadingButton(null);
    }
  }, [navigation, loadingButton, curPath]);

  const handleLogout = () => {
    setLoadingButton("logout");
    navigate("/auth/logout");
  };

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <Sidebar collapsible="icon">
        <SidebarContent className="h-full">
          <SidebarGroup className="flex flex-col h-full gap-4 text-sm">
            <SidebarGroupLabel
              className={`flex gap-4 h-fit ${
                state == "collapsed"
                  ? "flex-col items-start"
                  : "justify-between"
              }`}
            >
              {state == "collapsed" ? (
                <>
                  <button
                    onClick={toggleSidebar}
                    className="flex w-full justify-center pb-2 border-b-2 border-border"
                  >
                    <LucidePanelLeftOpen {...iconProps} color="black" />
                  </button>
                  <Logo
                    size={48}
                    className="w-full flex justify-center"
                    onClick={() => navigate("/dashboard/home")}
                  />
                </>
              ) : (
                <>
                  <Logo size={48} onClick={() => navigate("/dashboard/home")} />
                  {isMobile ? (
                    <button
                      onClick={() => setOpenMobile(false)}
                      className="flex w-full justify-end"
                    >
                      <LucideX {...iconProps} color="black" />
                    </button>
                  ) : (
                    <button
                      onClick={toggleSidebar}
                      className="flex w-full justify-end"
                    >
                      <LucidePanelLeftClose {...iconProps} color="black" />
                    </button>
                  )}
                </>
              )}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link to={item.url}>
                      <SidebarMenuButton
                        onClick={() => setLoadingButton(item.url)}
                        isLoading={loadingButton == item.url}
                        className={cn(
                          curPath.includes(item.url) ? focus : "text-gray-800",
                          state == "expanded"
                            ? "justify-between"
                            : "justify-center"
                        )}
                      >
                        <div className="flex gap-3 items-center">
                          {item.icon}
                          {state !== "collapsed" && <div>{item.title}</div>}
                        </div>
                        {curPath.includes(item.url) && state == "expanded" && (
                          <LucideChevronRight {...iconProps} />
                        )}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              {/* Profile Navigation */}
              <SidebarMenu>
                <ProfileDialog />
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isLoading={loadingButton === "logout"}
                    onClick={handleLogout}
                    className={cn(state == "collapsed" && "justify-center")}
                  >
                    <div className="flex gap-2 items-center">
                      <LucideLogOut {...iconProps} />
                      {state !== "collapsed" && <div>Log Out</div>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Collapsible>
  );
}
