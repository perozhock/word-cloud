import { useState } from "react";
import "./App.css";
import { InputPanel, WordCloudComponent } from "./components/";
import { useMessageData } from "./hooks";

function App() {
    const [text, setText] = useState("");
    const { messages, fullText, setFileContent } = useMessageData();

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <span>{messages.length}</span>
            <InputPanel onDataChange={setText} onFileLoad={setFileContent} />
            <WordCloudComponent text={fullText || text} />
        </div>
    );
}

export default App;
