import React from "react";
import { textareaBase } from "./ui-styles";

interface TextInputProps {
    onChange: (words: string) => void;
}

export const TextInput = ({ onChange }: TextInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <textarea
            className={textareaBase}
            rows={5}
            placeholder="Text here..."
            onChange={handleChange}
        />
    );
};
