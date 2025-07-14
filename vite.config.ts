import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from "remix-flat-routes";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

function wellKnownMiddleware() {
  return {
    name: "handle-well-known",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/.well-known")) {
          res.statusCode = 204; // No Content
          return res.end();
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: ["**/.*"], // Ignore dot files (like .DS_Store)
        });
      },
    }),
    tsconfigPaths(),
    wellKnownMiddleware(),
  ],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@components": "/app/components",
    },
  },
});
