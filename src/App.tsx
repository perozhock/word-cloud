import { useState } from "react";
import "./App.css";
import { InputPanel, UserStatsTable, WordCloudComponent } from "./components/";
import { useMessageData } from "./hooks";

function App() {
    const [text, setText] = useState("");
    const { messages, userStats, fullText, setFileContent } = useMessageData();

    console.log(userStats);
    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <span>{messages.length}</span>
            <InputPanel onDataChange={setText} onFileLoad={setFileContent} />
            <div className="flex">
                <WordCloudComponent text={fullText || text} />
                <UserStatsTable stats={userStats} />
            </div>
        </div>
    );
}

export default App;
