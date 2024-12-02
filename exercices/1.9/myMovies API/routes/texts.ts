import express from "express";
import {
  readAll,
  readAllFiltered,
  readOne,
  createOne,
  deleteOne,
  updateOne
} from "../services/texts.service";
import { NewText } from "../types";


const router = express.Router();

router.get("/", (req, res) => {
  const level = req.query.level as 'easy' | 'medium' | 'hard' | undefined;
  if (level) {
    res.json({ texts: readAllFiltered(level) });
  } else {
    res.json({ texts: readAll() });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const text = readOne(id);
  if (text) {
    res.json(text);
  } else {
    res.status(404).json({ message: "Texte non trouvé" });
  }
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof (body as NewText).content !== "string" ||
    !['easy', 'medium', 'hard'].includes((body as NewText).level)
  ) {
    return res.status(400).json({ message: "Données invalides" });
  }

  const { content, level } = body as NewText;
  const createdText = createOne({ content, level });

  return res.status(201).json(createdText);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteOne(id);
  res.status(204).end();
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof (body as NewText).content !== "string" ||
    !['easy', 'medium', 'hard'].includes((body as NewText).level)
  ) {
    return res.status(400).json({ message: "Données invalides" });
  }

  const { content, level } = body as NewText;
  const updatedText = updateOne(id, content, level);
  if (updatedText) {
    return res.json(updatedText);
  } else {
    return res.status(404).json({ message: "Texte non trouvé" });
  }
});

export default router;