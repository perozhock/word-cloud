import React, { useEffect, useRef, useState } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";

interface WordCloudProps {
    text: string;
}

interface Word {
    text: string;
    size: number;
    x?: number;
    y?: number;
    rotate?: number;
}

export const WordCloudComponent: React.FC<WordCloudProps> = ({ text }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [words, setWords] = useState<Word[]>([]);

    const generateWordCloudData = (text: string) => {
        const wordsArray = text
            .toLowerCase()
            .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "")
            .split(/\s+/)
            .filter(Boolean);
    
        const wordMap: Record<string, number> = {};
    
        wordsArray.forEach((word) => {
            wordMap[word] = (wordMap[word] || 0) + 1;
        });
    
        return Object.entries(wordMap).map(([word, count]) => ({
            text: word,
            size: count * 10,
        }));
    };

    useEffect(() => {
        if (!text) return;

        const wordData = generateWordCloudData(text);
        setWords(wordData);

        const layout = cloud<Word>()
            .size([500, 500])
            .words(wordData)
            .padding(2)
            .rotate(() => (Math.random() > 0.5 ? 0 : 90))
            .fontSize((d: Word) => d.size)
            .on("end", (words) => draw(words));

        layout.start();
    }, [text]);

        const draw = (words: Word[]) => {
            if (!svgRef.current) return;

            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove();

            const g = svg
                .append("g")
                .attr("transform", "translate(250,250)");

            g.selectAll("text")
                .data(words)
                .enter()
                .append("text")
                .style("font-size", (d: Word) => `${d.size}px`)
                .style("fill", () => `hsl(${Math.random() * 360}, 100%, 50%)`)
                .attr("text-anchor", "middle")
                .attr(
                    "transform",
                    (d: Word) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`
                )
                .text((d: Word) => d.text);
        };

    return <svg ref={svgRef} width="1000" height="480" className="border border-gray-300" />;
};
