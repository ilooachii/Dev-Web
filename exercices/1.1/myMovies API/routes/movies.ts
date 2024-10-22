import express from "express";

import { Movie } from "../types";

const router = express.Router();

const defaultMovies: Movie[] = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      duration: 148,
      budget: 160, // en millions
      description: "Un film de science-fiction sur les rêves et la réalité",
      imageUrl: "https://example.com/inception.jpg"
    },
    {
      id: 2,
      title: "Interstellar",
      director: "Christopher Nolan",
      duration: 169,
      budget: 165, // en millions
      description: "Un voyage à travers l'espace et le temps",
      imageUrl: "https://example.com/interstellar.jpg"
    },
    {
      id: 3,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      duration: 152,
      budget: 185, // en millions
      description: "Batman contre le Joker",
      imageUrl: "https://example.com/darkknight.jpg"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      duration: 154,
      budget: 8, // en millions
      description: "Un film culte avec une narration non linéaire",
      imageUrl: "https://example.com/pulpfiction.jpg"
    },
    {
      id: 5,
      title: "The Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      duration: 136,
      budget: 63, // en millions
      description: "Un film révolutionnaire sur la réalité virtuelle",
      imageUrl: "https://example.com/matrix.jpg"
    }
  ];

router.get("/", (_req, res) => {
  res.json(defaultMovies);
});

export default router;
