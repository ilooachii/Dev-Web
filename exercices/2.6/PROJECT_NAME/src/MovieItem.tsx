import { useState } from "react";

type Movie = {
    title: string;
    director: string;
    description: string;
};

type MovieItemProps = {
    movie: Movie;
};

const MovieItem = ({ movie }: MovieItemProps) => {
    const { title, director, description } = movie;
    const [showDescription, setShowDescription] = useState(false);

    const handleClick = () => {
        setShowDescription(!showDescription);
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <h3>{title}</h3>
            <p>Director: {director}</p>
            {showDescription && <p>{description}</p>}
        </div>
    );
};

export default MovieItem;