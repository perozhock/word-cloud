import { useState } from "react";
import { JsonUpload, ModeButtons, TextInput } from ".";
import { card } from "./ui-styles";

interface Props {
    onDataChange: (words: string) => void;
    onFileLoad: (content: string) => void;
}

export const InputPanel = ({ onDataChange, onFileLoad }: Props) => {
    const [mode, setMode] = useState<"text" | "json">("text");

    return (
        <div className={card + "space-y-4"}>
            <div className="flex justify-center gap-2 mb-4">
                <ModeButtons mode={mode} onChange={setMode} />
            </div>
            {mode === "text" ? (
                <TextInput onChange={onDataChange} />
            ) : (
                <JsonUpload onLoad={onFileLoad} />
            )}
        </div>
    );
};
