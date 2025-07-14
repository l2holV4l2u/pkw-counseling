import { Button } from "@components/ui/button";
import { ModeType } from "@types";
import { SetStateAction } from "jotai";
import { Dispatch } from "react";
import { Pen, Save, X } from "lucide-react";

type ModeActionButtonType = {
  onClick: () => void;
  setMode: Dispatch<SetStateAction<ModeType>>;
  isRes?: boolean;
};

function SaveButton({ onClick, setMode }: ModeActionButtonType) {
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        setMode("View");
        onClick();
      }}
      size={"sm"}
      className="flex-1"
    >
      <Save size={24} /> Save
    </Button>
  );
}

function CancelButton({ onClick, setMode }: ModeActionButtonType) {
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        setMode("View");
        onClick();
      }}
      size={"sm"}
      className="flex-1"
    >
      <X size={24} /> Cancel
    </Button>
  );
}

function EditButton({ onClick, setMode, isRes }: ModeActionButtonType) {
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        setMode(isRes ? "Response" : "Edit");
        onClick();
      }}
      size={"sm"}
      className="flex-1"
    >
      <Pen size={24} /> Edit
    </Button>
  );
}

export default function ModeAction({
  mode,
  setMode,
  onClickEdit,
  onClickSave,
  onClickCancel,
  customComponent,
  isRes = false,
}: {
  mode: ModeType;
  setMode: Dispatch<SetStateAction<ModeType>>;
  onClickEdit: () => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  customComponent?: React.ReactNode;
  isRes?: boolean;
}) {
  return (
    <div className="flex gap-1 items-center w-full">
      {mode == "View" ? (
        <EditButton onClick={onClickEdit} setMode={setMode} isRes={isRes} />
      ) : (
        <>
          {customComponent}
          <SaveButton onClick={onClickSave} setMode={setMode} />
          <CancelButton onClick={onClickCancel} setMode={setMode} />
        </>
      )}
    </div>
  );
}
