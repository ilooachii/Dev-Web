import { Router } from "express";
import { Film } from "../types";

const router = Router();

const films: Film[] = [
    { id: 1, title: "Film 1", director: "Réalisateur 1", duration: 120, budget: 100, description: "Un super film", imageUrl: "http://image.com/1" },
    { id: 2, title: "Film 2", director: "Réalisateur 2", duration: 90 },
    { id: 3, title: "Film 3", director: "Réalisateur 3", duration: 150, budget: 200, imageUrl: "http://image.com/3" }
];

router.get('/', (_req, res) => {
    res.json(films);
});

export default router;