import MovieItem from "./MovieItem";

type Movie = {
    title: string;
    director: string;
    description: string;
};

type CinemaProps = {
    name: string;
    movies: Movie[];
};

const Cinema = ({ name, movies }: CinemaProps) => {
    return (
        <div>
            <h2>{name}</h2>
            {movies.map((movie) => (
                <MovieItem key={movie.title} movie={movie} />
            ))}
        </div>
    );
};

export default Cinema;