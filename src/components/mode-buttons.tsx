interface Props {
    mode: string;
    onChange: (id: "text" | "json") => void;
}

export const ModeButtons = ({ mode, onChange }: Props) => {
    const modes: {id: "text" | "json"; label: string}[] = [
        { id: "text", label: "Текстовый ввод" },
        { id: "json", label: "Загрузка JSON" },
    ];

    return (
        <div className="flex gap-3">
            {modes.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => onChange(id)}
                    className={`px-4 py-2 rounded-xl border transition-colors
            ${
                mode === id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};
