import { Layout } from "@components/layout/layout";
import { Button } from "@components/ui/button";
import { Link } from "@remix-run/react";

export default function NotFound() {
  return (
    <Layout className="w-full h-full">
      <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
        <h1 className="text-3xl font-bold text-red-600">Page Not Found</h1>
        <p className="text-gray-700">
          The page you're looking for in the dashboard doesn’t exist.
        </p>
        <Link to="/dashboard/home">
          <Button variant={"destructive"}>Go Back Home</Button>
        </Link>
      </div>
    </Layout>
  );
}
