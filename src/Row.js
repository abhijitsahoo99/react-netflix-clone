import React, { useState , useEffect} from 'react'
import axiox from './axios'
import "./Row.css"
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title , fetchUrl , isLargeRow}) {

        const [movies , setMovies] = useState([]);
        const [trailerUrl , setTrailerUrl] = useState("");
        // A snippet of code that runs based on a specific condition - useEffect
        useEffect(() => {
            // If [], run once when the row loads, and don't run again 
            async function fetchData() {
                const request = await axiox.get(fetchUrl);
                setMovies(request.data.results);
                return request;
            }
            fetchData();
        }, [fetchUrl]);
        //console.log(movies);
        const opts = {
            height: '390',
            width: "100%",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
        };
        const handleClick = (movie) => {
            if (trailerUrl){
                setTrailerUrl("");
            }else{
                movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
            }
        }

  return (
    <div className="row">
    {/* Navbar */}
    {/* Banner */}
      {/* Title */}
        <h2>{title}</h2>
        <div className="row_posters">
            {movies.map(movie => (
                //console.log(movie)
                <img key = {movie.id} 
                onClick={() => handleClick(movie)}
                className = {`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt = {movie.name}  />
            ))}
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts = {opts}  />}
      {/* Container -> Posters */}

    </div>
  )
}


export default Row
