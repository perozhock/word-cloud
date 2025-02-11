import React from "react";

interface TextInputProps {
    onChange: (text: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ onChange }) => {
    return (
        <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={5}
            placeholder="Text here..."
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
