import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";
import type { LinksFunction } from "@remix-run/node";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/pkw_logo.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PKW Counseling</title>
        <Meta />
        <Links />
      </head>
      <body className="font-noto">
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const errorMessage = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
    ? error.message
    : "Unknown error";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Oops! Something went wrong</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground">
            Please try refreshing the page or come back later.
          </p>
          {process.env.NODE_ENV === "development" && (
            <pre className="mt-4 p-4 bg-gray-100 text-sm text-left text-red-500 max-w-xl overflow-auto rounded">
              {errorMessage}
            </pre>
          )}
        </div>
        <Scripts />
      </body>
    </html>
  );
}
