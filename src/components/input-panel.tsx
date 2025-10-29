import { useState } from "react";
import { JsonUpload, ModeButtons, TextInput } from ".";

interface Props {
    onDataChange: (words: string) => void;
    onFileLoad: (content: string) => void;
}

export const InputPanel = ({ onDataChange, onFileLoad }: Props) => {
    const [mode, setMode] = useState<"text" | "json">("text");

    return (
        <div className="p-4 border rounded-2xl shadow-sm space-y-4">
            <ModeButtons mode={mode} onChange={setMode} />

            {mode === "text" ? (
                <TextInput onChange={onDataChange} />
            ) : (
                <JsonUpload onLoad={onFileLoad} />
            )}
        </div>
    );
};
