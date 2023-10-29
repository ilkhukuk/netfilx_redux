import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseImgUrl, options } from "./../contants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=tr&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,
        options
      )
      .then((res) => setMovies(res.data.results));
  }, []);

  return (
    <div className="p-4">
      {!movies && <p>Yükleniyor...</p>}
      {movies && <h1 className="mb-3">{genre.name}</h1>}
      <Splide
        options={{
          autoWidth: true,
          gap: "10px",
          pagination: false,
        }}
      >
        {movies?.map((movie) => (
          <SplideSlide>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="movie"
                src={baseImgUrl.concat(movie.poster_path)}
                alt="Image 1"
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;
