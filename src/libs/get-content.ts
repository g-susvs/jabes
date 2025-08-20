import { promises as fs } from "fs";


export const getContent = async (page: string) => {
    const content = await fs.readFile(process.cwd() +"/src/locales/es/content.json", "utf8");
    const contentParsed = JSON.parse(content) as { [key: string]: object };
    return contentParsed[page];
}
