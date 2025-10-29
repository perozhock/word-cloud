import { useEffect, useMemo, useState } from "react";

export interface Message {
    id: number;
    date: string;
    from?: string;
    text: string;
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

            const parsed: Message[] = json.messages
                .map((m: any) => {
                    let text = "";

                    if (typeof m.text === "string") {
                        text = m.text;
                    } else if (Array.isArray(m.text)) {
                        text = m.text
                            .map((t: any) =>
                                typeof t === "string" ? t : t.text || ""
                            )
                            .join(" ");
                    }

                    return {
                        id: m.id,
                        date: m.date,
                        from: m.from,
                        text: text.trim(),
                    };
                })
                .filter((m: any) => m.text.length > 0);

            setMessages(parsed);
        } catch (e) {
            console.error("Ошибка парсинга JSON", e);
        }
    }, [fileContent]);

    const fullText = useMemo(
        () => messages.map((m) => m.text).join(" "),
        [messages]
    );

    return {
        messages,
        fullText,
        setFileContent,
    };
};
