import React from "react";
import { buttonPrimary } from "./ui-styles";
import { UploadCloud } from "lucide-react";

interface Props {
    onLoad: (content: string) => void;
}

export const JsonUpload = ({ onLoad }: Props) => {
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        try {
            JSON.parse(text);
            onLoad(text);
        } catch {
            alert("Невалидный JSON");
        }
    };

    return (
        <label className="inline-block">
            <span className={buttonPrimary}>
                <UploadCloud size={16} />
                <span>Загрузить JSON</span>
                <input
                    type="file"
                    accept="application/json"
                    onChange={handleFile}
                    className="sr-only"
                />
            </span>
        </label>
    );
};
