import { Router } from "express";
import { Film } from "../types";

const router = Router();

const films: Film[] = [
  {
    id: 1,
    title: "Film 1",
    director: "Réalisateur 1",
    duration: 120,
    budget: 100,
    description: "Un super film",
    imageUrl: "http://image.com/1",
  },
  { id: 2, title: "Film 2", director: "Réalisateur 2", duration: 90 },
  {
    id: 3,
    title: "Film 3",
    director: "Réalisateur 3",
    duration: 150,
    budget: 200,
    imageUrl: "http://image.com/3",
  },
];

router.get("/", (req, res) => {
  const minDuration = Number(req.query['minimum-duration']);
  if (!minDuration || minDuration <=0) {
    res.status(400).json({ error: 'Wrong minimum duration' });
  }

  const filteredFilms = films.filter(film => film.duration >= minDuration);
  res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find(f => f.id === id);
  if (!film) {
    res.status(404).json({ error: 'Film not found' });
  }
  res.json(film);
});

router.post("/", (req, res) => {
  const { id, title, director, duration, budget, description, imageUrl } = req.body;

  if (!id || !title || !director || !duration || duration <= 0) {
    res.status(400).json({ error: 'Invalid data' });
  }

  const newFilm = { id, title, director, duration, budget, description, imageUrl };
  films.push(newFilm);

  res.status(201).json(newFilm);
});

export default router;
