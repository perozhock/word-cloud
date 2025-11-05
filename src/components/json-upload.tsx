import React from "react";

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
        <label className="cursor-pointer inline-block">
            <span className="border bg-gray-400 px-3 py-1 rounded-md">
                Загрузить JSON
                <input
                    className="cursor-pointer"
                    type="file"
                    accept="application/json"
                    onChange={handleFile}
                ></input>
            </span>
        </label>
    );
};
