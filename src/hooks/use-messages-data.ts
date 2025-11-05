import { useEffect, useMemo, useState } from "react";

export interface Message {
    id: number;
    date: string;
    from?: string;
    forwarded_from?: string;
    text: string;
}

interface RawMessage {
    id: number;
    date: string;
    from?: string;
    forwarded_from?: string;
    text: string | (string | { text?: string });
}

export const useMessageData = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [fileContent, setFileContent] = useState<string | null>(null);

    useEffect(() => {
        if (!fileContent) return;

        try {
            const json = JSON.parse(fileContent);

            if (!Array.isArray(json.messages)) {
                console.error("Некорректная структура, нет поля messages");
                return;
            }

            const parsed: Message[] = (json.messages as RawMessage[])
                .map((m) => {
                    let text = "";

                    if (typeof m.text === "string") {
                        text = m.text;
                    } else if (Array.isArray(m.text)) {
                        text = m.text
                            .map((t) =>
                                typeof t === "string" ? t : t.text || ""
                            )
                            .join(" ");
                    }

                    return {
                        id: m.id,
                        date: m.date,
                        from: m.from,
                        forwarded_from: m.forwarded_from,
                        text: text.trim(),
                    };
                })
                .filter((m) => m.text.length > 0);

            setMessages(parsed);
        } catch (e) {
            console.error("Ошибка загрузки JSON", e);
        }
    }, [fileContent]);

    const userStats = useMemo(() => {
        const stats: Record<string, number> = {};

        for (const msg of messages) {
            const user = msg.from || "Unknown";
            stats[user] = (stats[user] || 0) + 1;
        }

        return Object.entries(stats)
            .map(([user, count]) => ({ user, count }))
            .sort((a, b) => b.count - a.count);
    }, [messages]);

    const fullText = useMemo(
        () =>
            messages
                .filter((m) => !m.forwarded_from)
                .map((m) => m.text)
                .join(" "),
        [messages]
    );

    return {
        messages,
        userStats,
        fullText,
        setFileContent,
    };
};
