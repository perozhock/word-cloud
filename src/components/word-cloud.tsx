import { useEffect, useRef } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";

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

export const WordCloudComponent = ({ text }: WordCloudProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const prevWordCountsRef = useRef<Record<string, number>>({});

    useEffect(() => {
        const normalizeNow = text
            .toLowerCase()
            .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
        const tokensNow = normalizeNow.split(/\s+/).filter(Boolean);
        const lastCharIsWhitespace = /\s$/.test(text);

        const delay = lastCharIsWhitespace ? 50 : 500;

        const handler = setTimeout(() => {
            const committedTokens = lastCharIsWhitespace
                ? tokensNow
                : tokensNow.slice(0, -1);

            const counts: Record<string, number> = {};
            committedTokens.forEach((w) => {
                counts[w] = (counts[w] || 0) + 1;
            });

            const prev = prevWordCountsRef.current || {};
            const prevKeys = Object.keys(prev);
            const newKeys = Object.keys(counts);

            let countsChanged = false;
            if (prevKeys.length !== newKeys.length) {
                countsChanged = true;
            } else {
                for (const k of newKeys) {
                    if (prev[k] !== counts[k]) {
                        countsChanged = true;
                        break;
                    }
                }
            }

            if (!countsChanged) return;

            prevWordCountsRef.current = counts;
            const wordData = Object.entries(counts).map(([word, count]) => ({
                text: word,
                count,
            }));

            if (!svgRef.current) return;

            const minFrequency = 3;
            let filteredWordData = wordData.filter(
                (d) => d.count >= minFrequency
            );
            filteredWordData = filteredWordData
                .sort((a, b) => b.count - a.count)
                .slice(0, 200);
            if (filteredWordData.length === 0) return;

            const countsArray = wordData.map((d) => d.count);
            const maxCount = Math.max(...countsArray);
            const minCount = Math.min(...countsArray);

            const uniqueCount = wordData.length;

            const maxFontSize = Math.max(24, 620 - uniqueCount * 0.03);
            const minFontSize = 10;

            const sizeScale = scaleLinear()
                .domain([minCount, maxCount])
                .range([minFontSize, maxFontSize]);

            const layout = cloud<Word>()
                .size([1000, 500])
                .words(
                    filteredWordData.map((d) => ({
                        text: d.text,
                        size: sizeScale(d.count),
                    }))
                )
                .padding(2)
                .rotate(() => (Math.random() > 0.5 ? 0 : 90))
                .fontSize((d: Word) => d.size)
                .on("end", (words) => draw(words));

            layout.start();
        }, delay);

        return () => clearTimeout(handler);
    }, [text]);

    const draw = (words: Word[]) => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg.append("g").attr("transform", "translate(500,250)");

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

    return (
        <svg
            ref={svgRef}
            width="1000"
            height="500"
            className="border border-gray-300"
        />
    );
};
