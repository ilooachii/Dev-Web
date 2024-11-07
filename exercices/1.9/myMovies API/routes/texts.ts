import express from "express";
import {
  readAll,
  readAllFiltered,
  readOne,
  createOne,
  deleteOne,
  updateOne
} from "../services/texts.service";

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
  const { content, level } = req.body;

  // Validation des données
  if (!content || typeof content !== 'string' || !['easy', 'medium', 'hard'].includes(level)) {
    return res.status(400).json({ message: "Données invalides" });
  }

  // Création d'un nouvel objet `NewText` et appel de la fonction `createOne`
  const newText = { content, level };
  const createdText = createOne(newText);

  // Réponse avec le nouvel objet créé
  return res.status(201).json(createdText);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteOne(id);
  res.status(204).send();
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { content, level } = req.body;
  if (!content || !['easy', 'medium', 'hard'].includes(level)) {
    return res.status(400).json({ message: "Données invalides" });
  }
  const updatedText = updateOne(id, content, level);
  if (updatedText) {
    return res.json(updatedText);
  } else {
    return res.status(404).json({ message: "Texte non trouvé" });
  }
});

export default router;