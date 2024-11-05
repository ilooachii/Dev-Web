import express from "express";
import path from "node:path";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/movies.json");
import { Movie, NewMovie } from "../types";
import { filterMoviesByAttribute } from "../utils/filterMovies";
import { paginateMovies } from "../utils/pagination";

const router = express.Router();

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160, // en millions
    description: "Un film de science-fiction sur les rêves et la réalité",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165, // en millions
    description: "Un voyage à travers l'espace et le temps",
    imageUrl: "https://example.com/interstellar.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    budget: 185, // en millions
    description: "Batman contre le Joker",
    imageUrl: "https://example.com/darkknight.jpg",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    duration: 154,
    budget: 8, // en millions
    description: "Un film culte avec une narration non linéaire",
    imageUrl: "https://example.com/pulpfiction.jpg",
  },
  {
    id: 5,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63, // en millions
    description: "Un film révolutionnaire sur la réalité virtuelle",
    imageUrl: "https://example.com/matrix.jpg",
  },
];

// GET /films - Lecture de tous les films avec filtrage et pagination
router.get("/", (req, res) => {
  const minDuration = req.query["minimum-duration"];
  const startsWith = req.query["startsWith"];
  const director = req.query["director"];
  const minBudget = req.query["minimum-budget"];
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  let filteredMovies = parse(jsonDbPath, defaultMovies);

  // Filtre par durée minimale
  if (minDuration) {
    const dureeMin = Number(minDuration);
    if (isNaN(dureeMin) || dureeMin <= 0) {
      return res.status(400).json({ error: "Durée minimale invalide" });
    }
    filteredMovies = filteredMovies.filter(
      (movie) => movie.duration >= dureeMin
    );
  }

  // Filtre par titre
  if (startsWith) {
    filteredMovies = filterMoviesByAttribute(
      filteredMovies,
      "title",
      startsWith
    );
  }

  // Filtre par directeur
  if (director) {
    filteredMovies = filterMoviesByAttribute(
      filteredMovies,
      "director",
      director
    );
  }

  // Filtre par budget minimum
  if (minBudget) {
    const budgetMin = Number(minBudget);
    if (isNaN(budgetMin) || budgetMin <= 0) {
      return res.status(400).json({ error: "Budget minimum invalide" });
    }
    filteredMovies = filteredMovies.filter(
      (movie) => movie.budget !== undefined && movie.budget >= budgetMin
    );
  }

  // Pagination
  filteredMovies = paginateMovies(filteredMovies, page, limit);

  return res.json({
    currentPage: page,
    totalPages: Math.ceil(filteredMovies.length / limit),
    totalMovies: filteredMovies.length,
    movies: filteredMovies,
  });
});

// GET /films/:id - Lecture d'un film par ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const movies = parse(jsonDbPath, defaultMovies);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).json({ error: "Film non trouvé" });
  }

  return res.json(movie);
});

// POST /films - Création d'un film
router.post("/", (req, res) => {
  const body: unknown = req.body;

  // Validation des données reçues
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
    return res.status(400).json({ error: "Données de film invalides" });
  }

  const newMovie = body as NewMovie;

  // Vérification si le film existe déjà
  const movieExists = defaultMovies.some(
    (movie) =>
      movie.title === newMovie.title && movie.director === newMovie.director
  );
  if (movieExists) {
    return res.status(409).json({ error: "Film déjà existant" });
  }

  // Création du film
  const movies = parse(jsonDbPath, defaultMovies);
  const nextId =
    movies.reduce(
      (maxId, movie) => (movie.id > maxId ? movie.id : maxId),
      0
    ) + 1;

  const addedMovie: Movie = {
    id: nextId,
    ...newMovie,
  };

  movies.push(addedMovie);
  serialize(jsonDbPath, movies);
  return res.status(201).json(addedMovie);
});

// DELETE /films/:id - Suppression d'un film par ID
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const movies = parse(jsonDbPath, defaultMovies);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Film non trouvé" });
  }

  movies.splice(index, 1);
  return res.status(204).end(); // Pas de contenu, opération réussie
});

// PATCH /films/:id - Mise à jour partielle d'un film
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const movies = parse(jsonDbPath, defaultMovies);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).json({ error: "Film non trouvé" });
  }

  const { title, director, duration, budget, description, imageUrl } = req.body;

  // Validation des paramètres
  if (
    duration !== undefined &&
    (typeof duration !== "number" || duration <= 0)
  ) {
    return res.status(400).json({ error: "Durée invalide" });
  }
  if (budget !== undefined && (typeof budget !== "number" || budget <= 0)) {
    return res.status(400).json({ error: "Budget invalide" });
  }

  // Mise à jour des champs
  if (title) movie.title = title;
  if (director) movie.director = director;
  if (duration) movie.duration = duration;
  if (budget) movie.budget = budget;
  if (description) movie.description = description;
  if (imageUrl) movie.imageUrl = imageUrl;

  serialize(jsonDbPath, movies);
  return res.json(movie);
});

// PUT /films/:id - Remplace un film ou le crée s'il n'existe pas
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const { title, director, duration, budget, description, imageUrl } = req.body;

  // Validation des données
  if (
    !title ||
    !director ||
    typeof duration !== "number" ||
    typeof budget !== "number" ||
    !description ||
    !imageUrl ||
    duration <= 0 ||
    budget <= 0
  ) {
    return res.status(400).json({ error: "Données de film invalides" });
  }

  const movies = parse(jsonDbPath, defaultMovies);
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  const newMovie: Movie = {
    id,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };

  if (movieIndex === -1) {
    movies.push(newMovie);
    return res.status(201).json(newMovie); // Création réussie
  }

  movies[movieIndex] = newMovie;
  return res.json(newMovie);
});

export default router;
