import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./home.css";
import MovieList from "../../components/movieList/PopularMovieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  //write a logiic to fetch the data
  useEffect(() => {
    //Api key
    //define this api key authentication
    const apiKey = "5d795794f9b5e8b273d1b7784f18c992";
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data.results);
        setPopularMovies(response.data.results);
      })
      .catch((error) => {
        console.log("Error in fetching the data", error);
      });
  }, []);

  return(
    <>
    <div className="poster">
     <Carousel
         autoPlay={true}
         animation="fade"
         timeout={3000}
         indicator={false}
     >
     
     {/* map over popularMovies array to create a Link for each  */}
     {popularMovies.map((movie)=>(
       <Link 
         key={movie.id}
         to={`/movie/${movie.id}`}
         style={{textDecoration:"none",color:"black"}}
       >
         {/* create a div for movie poster image  */}
         <div className="posterImage">
           <img 
              src={`https://image.tmdb.org/t/p/original${movie&& movie.backdrop_path}`}
              alt={movie?movie.original_title:""}
           />
         </div>

         {/* create a one more div to provide additional info  */}
         <div className="posterImage_overlay">
           {/* display movie title  */}
           <div className="posterImage_title">
            <h1>{movie?movie.original_title:""}</h1> 
           </div>
           <div className="posterImage_releasedate">
             {movie?movie.release_date:""}
           </div>
           <div className="posterImage_rating">
             <span>
             Rating:{movie?movie.vote_average:""}
             <Rating name="half-rating" defaultValue={4} precision={1} />
             </span>
           </div>
            
            <div className="posterImage_description">
             {movie?movie.overview:""}
            </div>

         </div>
       </Link>
     ))}



     </Carousel>
    </div>

    {/* Render the movie list component */}
      <MovieList />
    </>
 )
}

export default Home;
