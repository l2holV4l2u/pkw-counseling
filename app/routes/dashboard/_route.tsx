import { Outlet, redirect, useLoaderData, useLocation } from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUserIdFromRequest } from "@functions/server/cookie";
import { AppSidebar } from "@components/layout/appsidebar";
import { SidebarProvider } from "@components/ui/sidebar";
import { getUserById } from "@functions/server/user";
import { LoaderFunctionArgs } from "@remix-run/node";
import { userAtom } from "@utils/atoms/userAtoms";
import { Toaster } from "@components/ui/sonner";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserIdFromRequest(request);
  const url = request.url;
  if (!userId) {
    if (!url.includes("auth")) return redirect("/auth/login");
    return { user: null };
  }
  const { user } = await getUserById(userId);
  if (!user) throw new Response("User not found", { status: 404 });
  return { user };
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  const location = useLocation();
  const isAuthRoute = location.pathname.includes("/auth");
  const queryClient = new QueryClient();
  const setUser = useSetAtom(userAtom);

  useEffect(() => setUser(user), []);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background w-full">
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "font-noto",
              },
            }}
          />
          {!isAuthRoute && <AppSidebar />}
          <div className="flex-1 p-2">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
