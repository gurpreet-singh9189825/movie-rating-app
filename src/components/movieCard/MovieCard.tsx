import { FC } from "react";
import "./moviecard.css";
import { GenreMovies, ConfigResponse } from "../../pages/homepage/HomePage";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface InputProps {
  movie: GenreMovies;
  config: ConfigResponse;
  onClick: () => void;
  loading: boolean;
}

const MovieCard: FC<InputProps> = ({ movie, config, onClick, loading }) => {
  return (
    <div className={`card-container card${movie.id}`} onClick={onClick}>
      {loading ? (
        <Skeleton height={300} width={200} />
      ) : (
        <div className="movie">
          <div className="image-movie">
            <img
              src={`${config.base_url}${config.backdrop_sizes[0]}${movie.backdrop_path}`}
              alt={movie.id}
            ></img>
          </div>
          <div className="content-container">
            <div className="movie-title">{movie.original_title}</div>
            <div className="overview">{movie.release_date}</div>
            <div className="overview">{movie.overview.slice(1, 150)}.....</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
