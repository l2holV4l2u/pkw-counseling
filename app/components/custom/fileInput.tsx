import { Card } from "@components/ui/card";
import { useState, ChangeEvent, useEffect } from "react";
import {
  MdClose,
  MdOutlineFileUpload,
  MdOutlineInsertDriveFile,
} from "react-icons/md";

export default function FileInput({
  data,
  setData,
  disabled,
}: {
  data: string | null;
  setData: (url: string | null) => void;
  disabled: boolean;
}) {
  const [input, setInput] = useState<File | null>(null);

  useEffect(() => {
    const fetchFileFromUrl = async () => {
      if (data) {
        try {
          const response = await fetch(data);
          const blob = await response.blob();
          const file = new File([blob], "uploaded-file", { type: blob.type });
          setInput(file);
        } catch (error) {
          console.error("Failed to fetch file from URL:", error);
        }
      } else {
        setInput(null);
      }
    };

    fetchFileFromUrl();
  }, [data]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Create a blob URL for local preview
    setData(URL.createObjectURL(file));
    setInput(file);
  };

  const handleRemoveFile = () => {
    setData(null);
    setInput(null);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Upload Area */}
      {input == null ? (
        <label
          className={`flex flex-col shadow-sm bg-white items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-gray-50 gap-2 ${
            disabled ? "bg-transparent" : ""
          }`}
        >
          <MdOutlineFileUpload size={24} />
          <div className="text-gray-600 text-sm">Upload File</div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
          />
        </label>
      ) : (
        /* Uploaded File Preview */
        <Card className="flex items-center justify-center gap-4 p-2">
          {input.type.startsWith("image/") && data ? (
            <img
              src={data}
              alt="Uploaded Preview"
              className="h-12 w-12 object-cover rounded-md"
            />
          ) : (
            <MdOutlineInsertDriveFile size={48} className="text-gray-400" />
          )}
          <div className="text-sm font-medium w-full text-gray-800">
            {input.name}
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <MdClose size={20} />
          </button>
        </Card>
      )}
    </div>
  );
}
