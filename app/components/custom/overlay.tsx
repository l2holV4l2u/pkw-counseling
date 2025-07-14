import { Card } from "@components/ui/card";

export function Overlay({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-white p-4">{children}</Card>
        </div>
      )}
    </>
  );
}
