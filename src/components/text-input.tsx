import React from "react";

interface TextInputProps {
    onChange: (words: string) => void;
}

export const TextInput = ({ onChange }: TextInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={5}
            placeholder="Text here..."
            onChange={handleChange}
        />
    );
};
