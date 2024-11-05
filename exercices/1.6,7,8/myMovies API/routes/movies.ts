import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
} from "../services/movies";
import { NewMovie } from "../types";

const router = express.Router();

router.get("/", (req, res) => {
  const filters = {
    minDuration: Number(req.query["minimum-duration"]),
    startsWith: req.query["startsWith"],
    director: req.query["director"],
    minBudget: Number(req.query["minimum-budget"]),
  };
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const { movies, total } = getAllMovies(filters, page, limit);

  res.json({
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalMovies: total,
    movies,
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) return res.status(400).json({ error: "ID invalide" });

  const movie = getMovieById(id);
  if (!movie) return res.status(404).json({ error: "Film non trouvé" });

  return res.json(movie);
});

router.post("/", (req, res) => {
  const body = req.body as NewMovie;
  const newMovie = createMovie(body);
  return res.status(201).json(newMovie);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) return res.status(400).json({ error: "ID invalide" });

  const deleted = deleteMovie(id);
  if (!deleted) return res.status(404).json({ error: "Film non trouvé" });

  return res.status(204).end();
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) return res.status(400).json({ error: "ID invalide" });

  const updatedMovie = updateMovie(id, req.body);
  if (!updatedMovie) return res.status(404).json({ error: "Film non trouvé" });

  return res.json(updatedMovie);
});

export default router;