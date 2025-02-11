import { useState } from "react";
import "./App.css";
import { TextInput, WordCloudComponent } from "./components/";

function App() {
    const [text, setText] = useState("");

    return (
        <div className="flex flex-col items-center gap-4 p-4">
                <TextInput onChange={setText} />
                <WordCloudComponent text={text} />
        </div>
    );
}

export default App;
