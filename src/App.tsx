import { useState } from "react";
import "./App.css";
import { InputPanel, UserStatsTable, WordCloudComponent } from "./components/";
import { useMessageData } from "./hooks";

function App() {
    const [text, setText] = useState("");
    const { messages, userStats, fullText, setFileContent } = useMessageData();

    console.log(userStats);
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div className="text-sm text-gray-600">
                {messages.length} сообщений
            </div>

            <InputPanel onDataChange={setText} onFileLoad={setFileContent} />
            
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <WordCloudComponent text={fullText || text} />
                </div>
                <div className="w-full md:w-80">
                    <UserStatsTable stats={userStats} />
                </div>
            </div>
        </div>
    );
}

export default App;
