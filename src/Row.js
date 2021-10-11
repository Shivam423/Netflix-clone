import React, { useState, useEffect } from 'react';
import axios from './axios';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchdata() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchdata();
    }, [fetchUrl]);
    console.log(movies)
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {


            autoplay: 1,
        },
    }
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch(error => console.log(error));
        }
    }
    return (
        
        <>
            <div className="row">
                <h1>{title}</h1>
                <div className="row_posters">
                    {movies.map((elem, index) => {
                        return (
                            <img key={elem.id}
                                onClick={() => handleClick(elem)}
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                src={`${base_url}${isLargeRow ? elem.poster_path : elem.backdrop_path}`} alt="" />
                        )
                    })}
                </div>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </>
    )
}

export default Row
