import path from "path";
import { v4 as uuidv4 } from "uuid";
import { TypingText } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "../data/texts.json");

// Initialisation des données par défaut si le fichier JSON est vide
const defaultTexts: TypingText[] = [  {
    id: "967979ee-4c4b-4f93-920b-115976fa4abb",
    content: "Hello, world!",
    level: "easy",
  },
  {
    id: "98c72e0e-db05-442a-b035-061f56f7e7f8",
    content: "This is a text.",
    level: "medium",
  },
  {
    id: "45a3397c-d9bd-440b-8099-4346a38d1428",
    content: "This is a longer text.",
    level: "hard",
  },
];

export const readAll = (): TypingText[] => {
  return parse<TypingText>(jsonDbPath, defaultTexts);
};

export const readAllFiltered = (level: 'easy' | 'medium' | 'hard'): TypingText[] => {
  const texts = parse<TypingText>(jsonDbPath, defaultTexts);
  return texts.filter(text => text.level === level);
};

export const readOne = (id: string): TypingText | undefined => {
  const texts = parse<TypingText>(jsonDbPath, defaultTexts);
  return texts.find(text => text.id === id);
};

export const createOne = (content: string, level: 'easy' | 'medium' | 'hard'): TypingText => {
  const texts = parse<TypingText>(jsonDbPath, defaultTexts);
  const newText: TypingText = {
    id: uuidv4(),
    content,
    level,
  };
  texts.push(newText);
  serialize(jsonDbPath, texts);
  return newText;
};

export const deleteOne = (id: string): void => {
  let texts = parse<TypingText>(jsonDbPath, defaultTexts);
  texts = texts.filter(text => text.id !== id);
  serialize(jsonDbPath, texts);
};

export const updateOne = (id: string, content: string, level: 'easy' | 'medium' | 'hard'): TypingText | undefined => {
  const texts = parse<TypingText>(jsonDbPath, defaultTexts);
  const index = texts.findIndex(text => text.id === id);
  if (index !== -1) {
    texts[index] = { id, content, level };
    serialize(jsonDbPath, texts);
    return texts[index];
  }
  return undefined;
};