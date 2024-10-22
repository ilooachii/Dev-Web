import express from "express";

import { Movie, NewMovie } from "../types";

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

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    !("budget" in body) ||
    !("description" in body) ||
    !("imageUrl" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    typeof body.budget !== "number" ||
    typeof body.description !== "string" ||
    typeof body.imageUrl !== "string" ||
    !body.title.trim() ||
    !body.director.trim() ||
    !body.description.trim() ||
    !body.imageUrl.trim() ||
    body.duration <= 0 ||
    body.budget <= 0
  ) {
    return res.sendStatus(400);
  }

  const newMovie = body as NewMovie;

  const nextId =
    defaultMovies.reduce((maxId, movie) => (movie.id > maxId ? movie.id : maxId), 0) + 1;

  const addedMovie: Movie = {
    id: nextId, ...newMovie
  };

  defaultMovies.push(addedMovie);
  return res.json(addedMovie);
});

export default router;
