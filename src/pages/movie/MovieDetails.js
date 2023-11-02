//import modules from libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./movie.css";
import { Chip, Grid, Paper, Rating, Typography } from "@mui/material";

//Define a movie component

const MovieDetails = () => {
  //create a state variable for managing the movie data
  const [currentMovieDetail, setMovie] = useState();

  //extract the id parameter from the url
  const { id } = useParams();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //define a functionality to fetch the movie data from an api
  const getData = () => {
    //Api key
    //define this api key authentication
    const apiKey = "5d795794f9b5e8b273d1b7784f18c992";
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;


    //make an api request
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="movie">
      <div className="movie_intro">
        <img
          className="movie_backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt=""
        />
      </div>

      {/* Display various Movie Details  */}

      <div className="movie_detail">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} className="movie_posterbox">
              <img
                className="movie_poster"
                src={`https://image.tmdb.org/t/p/original${
                  currentMovieDetail ? currentMovieDetail.poster_path : ""
                }`}
                alt=""
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={8} lg={9}>
            <div className="movie_detailRight">
              <div className="movie_detailRightTop">
                <Typography variant="h4" className="movie_name">
                  {currentMovieDetail ? currentMovieDetail.original_title : ""}
                </Typography>
                <Typography variant="h4" className="movie_tagline">
                  {currentMovieDetail ? currentMovieDetail.tagline : ""}
                </Typography>

                <div className="movie_rating">
                  <span>
                    Rating:
                    {currentMovieDetail ? currentMovieDetail.vote_average : ""}
                    <Rating name="half-rating" defaultValue={4} precision={1} />
                  </span>
                </div>

                <Typography variant="subtitle1" className="movie_runtime">
                  {currentMovieDetail
                    ? `${currentMovieDetail.runtime}mins`
                    : ""}
                </Typography>
                <Typography variant="subtitle1" className="movie_revenue">
                  {currentMovieDetail ? `${currentMovieDetail.revenue}$` : ""}
                </Typography>

                <Typography variant="subtitle1" className="movie_releasedate">
                  {currentMovieDetail ? currentMovieDetail.release_date : ""}
                </Typography>

                {/* //Display movie generes  */}

                <div className="movie_generes">
                  {currentMovieDetail && currentMovieDetail.genres
                    ? currentMovieDetail.genres.map((genre) => (
                        <Chip
                          key={genre.id}
                          label={genre.name}
                          className="movie_genre"
                          color="primary"
                        />
                      ))
                    : ""}
                </div>
              </div>

              {/* Display Movie Description  */}
              <div className="movie_detailRightBottom">
                <Typography variant="h5" className="description">
                  Description
                </Typography>

                <Typography variant="body1" className="description_overview">
                  {currentMovieDetail ? currentMovieDetail.overview : ""}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Display extra information related to movie  */}

      <div className="movie_links">
        <Typography variant="h5" className="movie_heading">
          Useful Links
        </Typography>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <Link
            href={currentMovieDetail.homepage}
            target="_blank"
            underline="none"
            className="useful"
          >
            <Typography
              variant="body1"
              className="movie_homeButton movie_Button"
            >
              Homepage <i className="newTab fas fa-external-link-alt" />
            </Typography>
          </Link>
        )}

        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <Link
            href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
            target="_blank"
            underline="none"
            className="useful"
          >
            <Typography
              variant="body1"
              className="movie_imdbButton movie_Button"
            >
              IMDB <i className="newTab fas fa-external-link-alt" />
            </Typography>
          </Link>
        )}
      </div>

      {/* Display the information of the production companies of the movie  */}

      <Typography variant="h5" className="movie_heading">
        Production Companies
      </Typography>

      <div className="movie_production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company) =>
            company.logo_path ? (
              <span key={company.id} className="productioncompanyimage">
                <img
                  className="movie_productioncompany"
                  src={`http://image.tmdb.org/t/p/original${company.logo_path}`}
                  alt={company.name}
                />
                <span>{company.name}</span>
              </span>
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};
export default MovieDetails;
