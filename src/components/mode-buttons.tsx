import { buttonPrimary } from "./ui-styles";

interface Props {
    mode: string;
    onChange: (id: "text" | "json") => void;
}

export const ModeButtons = ({ mode, onChange }: Props) => {
    const modes: { id: "text" | "json"; label: string }[] = [
        { id: "text", label: "Текстовый ввод" },
        { id: "json", label: "Загрузка JSON" },
    ];

    return (
        <div className="flex gap-2">
            {modes.map(({ id, label }) => {
                const isActive = mode === id;
                return (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        aria-pressed={isActive}
                        className={`${buttonPrimary} text-sm
            ${
                isActive
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white !text-gray-600 border border-gray-200 hover:bg-gray-200"
            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
