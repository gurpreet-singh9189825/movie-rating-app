import { FC, useState, useEffect } from "react";
import "./homePage.css";
import Input from "../../components/input/Input";
import axios, { AxiosResponse } from "axios";
import Tabs from "../../components/Tab/Tab";
import MovieCard from "../../components/movieCard/MovieCard";
import "react-loading-skeleton/dist/skeleton.css";
import MovieDetails from "../movieDetails/MovieDetails";

import HomeScreen from "../../components/homeScreen/HomeScreen";
import { toast } from "react-toastify";

interface Genre {
  id: number;
  name: string;
}
[];

type Response = {
  genres: Genre[];
};

export interface GenreMovies {
  backdrop_path: string;
  original_title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  id: string;
  genre_ids: number[];
  original_language?: string;
}
[];

type GenreResponse = {
  results: GenreMovies[];
};
export interface ConfigResponse {
  base_url: string;
  backdrop_sizes: string[];
  poster_sizes: string[];
}

type config = {
  images: ConfigResponse;
};
export type MovieData = {
  movie: GenreMovies;
  config: ConfigResponse;
};

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const genre = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const API_READ_ACCESS_TOKEN = import.meta.env.VITE_APP_ACCESS_TOKEN;

const HomePage: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [genres, setGenre] = useState<Genre[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [moviesByGenre, setMoviesByGenre] = useState<GenreMovies[]>([]);
  const [config, setConfig] = useState<ConfigResponse>({} as ConfigResponse);
  const [copyOfAllMovies, setCopyOfAllMovies] = useState<GenreMovies[]>([]);
  const [stateTimer, setTimer] = useState<NodeJS.Timeout>();
  const [movieApiSearchResult, setMovieApiSearchResult] = useState<
    GenreMovies[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieClose, setMovieClose] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<MovieData>({} as MovieData);
  const [homeScreen, setHomeScreen] = useState(true);

  const searchMovie = (value: string) => {
    let searchedResult;

    searchedResult = moviesByGenre.filter((movie) => {
      return movie.original_title.toLowerCase().includes(value.toLowerCase());
    });
    return searchedResult;
  };

  const delay = (value: string) => {
    clearTimeout(stateTimer);
    let timer: NodeJS.Timeout = setTimeout(async () => {
      const response: AxiosResponse<GenreResponse> = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          headers: {
            Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          },
          params: {
            api_key: API_KEY,
            query: value,
          },
        }
      );
      if (response.data.results.length > 0) {
        setMovieLoading(false);
        setHomeScreen(false);
        setMoviesByGenre(response.data.results);
        setMovieApiSearchResult(response.data.results);
      } else {
        toast.info("No Movie Found", {
          position: "top-right",
        });
      }
    }, 1000);
    setTimer(timer);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setSearch(value);
    if (value !== "") {
      if (moviesByGenre.length > 0) {
        const searchedMovie = searchMovie(value);
        if (searchedMovie.length > 0) {
          setMoviesByGenre(searchedMovie);
        } else {
          delay(value);
        }
      } else {
        if (movieApiSearchResult.length > 0) {
          const searchedMovie = searchMovie(value);
          if (searchedMovie.length > 0) {
            setMoviesByGenre(searchedMovie);
          } else {
            delay(value);
          }
        } else {
          delay(value);
        }
      }
    } else {
      if (moviesByGenre.length > 0) {
        setMoviesByGenre(copyOfAllMovies);
      } else {
        setMoviesByGenre(movieApiSearchResult);
        setSelectedTab(0);
      }
    }
  };

  useEffect(() => {
    const currentTab = JSON.parse(localStorage.getItem("tab") as string);
    const currentMovie = JSON.parse(localStorage.getItem("movie") as string);
    if (currentTab && currentMovie) {
      const card = document.querySelector(`.card${currentMovie}`);
      if (card && card instanceof HTMLElement) {
        card.click();
      }
      const tab = document.querySelector(`.tab${currentTab}`);
      if (tab && tab instanceof HTMLElement) {
        tab.click();
      }
    }
  }, [genres, JSON.stringify(moviesByGenre[0])]);

  useEffect(() => {
    const fetchGenre = async () => {
      const response: AxiosResponse<Response> = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      if (response) {
        setGenre(response.data.genres);
        setLoading(false);
      }
    };

    fetchGenre();

    const fetchConfig = async () => {
      const response: AxiosResponse<config> = await axios.get(
        "https://api.themoviedb.org/3/configuration",
        {
          headers: {},
          params: {
            api_key: API_KEY,
          },
        }
      );
      setConfig(response.data.images);
    };
    fetchConfig();
  }, []);

  const handleTabClick = async (genreId: number) => {
    setSearch("");
    setSelectedTab(genreId);
    setHomeScreen(false);
    localStorage.setItem("tab", JSON.stringify(genreId));
    const response: AxiosResponse<GenreResponse> = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?`,
      {
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        },
        params: {
          api_key: API_KEY,
          with_genres: genreId,

          // with_genres: genreId,
        },
      }
    );
    setMoviesByGenre(response.data.results);
    setMovieLoading(false);
    setCopyOfAllMovies(response.data.results);
  };

  let renderedTabs;
  if (genres && genres.length > 0) {
    renderedTabs = genres.map((genre) => {
      const highlight = selectedTab === genre.id;
      return (
        <Tabs
          highlight={highlight}
          id={genre.id}
          name={genre.name}
          key={genre.id}
          onClick={handleTabClick}
          loading={loading}
        />
      );
    });
  }

  const handleMovieClick = (movie: GenreMovies, config: ConfigResponse) => {
    setMovieData({ movie, config });
    setMovieClose(true);
    localStorage.setItem("movie", JSON.stringify(movie.id));
  };

  let genreMoviesRendered;
  if (moviesByGenre && moviesByGenre.length > 0) {
    genreMoviesRendered = moviesByGenre.map((movie) => {
      return (
        <MovieCard
          movie={movie}
          key={movie.id}
          config={config}
          onClick={() => handleMovieClick(movie, config)}
          loading={movieLoading}
        />
      );
    });
  }

  const handleClose = (isTrue: boolean) => {
    setMovieClose(isTrue);
    localStorage.removeItem("movie");
  };

  return (
    <>
      <div className={`home ${moviesByGenre.length > 0 ? "dim" : ""}`}>
        <div className="home-content">
          <div className="search">
            <Input
              type="search"
              name="search"
              value={search}
              placeholder="Search"
              onChange={handleSearchChange}
              className="searchBar"
            />
          </div>
        </div>

        <div className="tabs-container">{renderedTabs}</div>
        {homeScreen && <HomeScreen />}

        {movieClose ? (
          <div></div>
        ) : (
          <div className="movies-container">{genreMoviesRendered}</div>
        )}

        {movieData.movie && movieData.config && movieClose && (
          <MovieDetails movieData={movieData} onClose={handleClose} />
        )}
      </div>
    </>
  );
};

export default HomePage;
