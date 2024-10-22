
interface Movie {
  id: number; // un entier
  title: string; // titre du film
  director: string; // réalisateur du film
  duration: number; // durée en minutes (doit être un nombre positif)
  
  budget?: number; // optionnel : coût de production en millions (nombre positif)
  description?: string; // optionnel : description du film
  imageUrl?: string; // optionnel : URL vers une image du film
}

type NewMovie = Omit<Movie, "id">;

export type { Movie, NewMovie };
