import fs from "node:fs";

export const getContent = async (page: string) => {
    const content = fs.readFileSync("./src/locales/es/content.json", "utf-8");
    const contentParsed = JSON.parse(content) as { [key: string]: object };
    return contentParsed[page];
}
