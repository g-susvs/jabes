import content from "@/locales/es/content.json";

export const getContent = async (page: string) => {
  const contentParsed = content as { [key: string]: object };
  return contentParsed[page];
};
