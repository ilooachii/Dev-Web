import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Movie, NewMovie } from "../types";
import { filterMoviesByAttribute } from "../utils/filterMovies";
import { paginateMovies } from "../utils/pagination";

const jsonDbPath = path.join(__dirname, "/../data/movies.json");
const defaultMovies: Movie[] = [
];

function getAllMovies(filters: any, page: number, limit: number): { movies: Movie[]; total: number } {
  let movies = parse(jsonDbPath, defaultMovies);

  // Application des filtres
  if (filters.minDuration) {
    movies = movies.filter((movie) => movie.duration >= filters.minDuration);
  }
  if (filters.startsWith) {
    movies = filterMoviesByAttribute(movies, "title", filters.startsWith);
  }
  if (filters.director) {
    movies = filterMoviesByAttribute(movies, "director", filters.director);
  }
  if (filters.minBudget) {
    movies = movies.filter((movie) => movie.budget !== undefined && movie.budget >= filters.minBudget);
  }

  // Pagination
  const paginatedMovies = paginateMovies(movies, page, limit);
  return { movies: paginatedMovies, total: movies.length };
}

function getMovieById(id: number): Movie | undefined {
  const movies = parse(jsonDbPath, defaultMovies);
  return movies.find((movie) => movie.id === id);
}

function createMovie(newMovie: NewMovie): Movie {
  const movies = parse(jsonDbPath, defaultMovies);
  const nextId = movies.reduce((maxId, movie) => (movie.id > maxId ? movie.id : maxId), 0) + 1;
  const addedMovie = { id: nextId, ...newMovie };
  movies.push(addedMovie);
  serialize(jsonDbPath, movies);
  return addedMovie;
}

function deleteMovie(id: number): boolean {
  const movies = parse(jsonDbPath, defaultMovies);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) return false;
  movies.splice(index, 1);
  serialize(jsonDbPath, movies);
  return true;
}

function updateMovie(id: number, updatedFields: Partial<Movie>): Movie | undefined {
  const movies = parse(jsonDbPath, defaultMovies);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) return undefined;

  // Mise à jour des champs
  Object.assign(movie, updatedFields);
  serialize(jsonDbPath, movies);
  return movie;
}

export { getAllMovies, getMovieById, createMovie, deleteMovie, updateMovie };