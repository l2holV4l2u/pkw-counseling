import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";

export const ExportButton: React.FC<{
  data: Record<string, string>[];
  filename?: string;
  type?: "csv" | "json";
}> = ({ data, filename = "export", type = "csv" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    let content = "";
    let mimeType = "";

    if (type === "csv") {
      const headers = Object.keys(data[0]);
      const rows = data.map((row) =>
        headers.map((field) => `"${String(row[field] ?? "")}"`).join(",")
      );
      content = [headers.join(","), ...rows].join("\n");
      mimeType = "text/csv";
    } else {
      content = JSON.stringify(data, null, 2);
      mimeType = "application/json";
    }
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size={"sm"}
      className="flex-1"
    >
      <MdOutlineFileDownload size={24} />
      Export
    </Button>
  );
};
