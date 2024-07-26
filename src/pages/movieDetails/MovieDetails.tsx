import { FC, useState, useEffect } from "react";
import Ratings from "../../components/rating/Ratings";
import "./movieDetails.css";

import { ConfigResponse, GenreMovies } from "../homepage/HomePage";

interface MovieProps {
  movieData: {
    movie: GenreMovies;
    config: ConfigResponse;
  };
  onClose: (isClose: boolean) => void;
}

const MovieDetails: FC<MovieProps> = ({ movieData, onClose }) => {
  const movie: GenreMovies = movieData.movie;
  const config: ConfigResponse = movieData.config;
  const [isClose, setIsClose] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleCloseClick = () => {
    onClose(isClose);
  };

  return (
    <>
      <div
        className="details-container"
        style={{
          backgroundImage: `url(${config.base_url}${config.backdrop_sizes[2]}${movie.poster_path})`,
        }}
      >
        <div className="back" onClick={handleCloseClick}>
          X
        </div>

        <div className="movie-image-container">
          <img
            src={`${config.base_url}${config.backdrop_sizes[1]}${movie.poster_path}`}
          />
        </div>
        <div className="movie-content-container">
          <div className="detail-content">
            {movie.original_title.toUpperCase()}
          </div>
          <div className="overview-content">
            Release Date: {movie.release_date}
          </div>
          <div className="overview-content">
            Language: {movie.original_language}
          </div>
          <div className="overview-content">Description: {movie.overview}</div>
          <div className="ratings" style={{ marginTop: "10px" }}>
            <Ratings id={movie.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
