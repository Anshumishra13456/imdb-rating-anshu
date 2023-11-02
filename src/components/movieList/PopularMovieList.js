import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../cards/Cards";
import "./movieList.css";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";

const PopularMovieList = () => {
  //Define a functional component and state variable
  const [movieList, setMovieList] = useState([]);

  const { type } = useParams();

  //define a function getData to fetch moviedata

  useEffect(() => {
    getData();
  });

  const getData = () => {
    const apiKey = "5d795794f9b5e8b273d1b7784f18c992";
    const apiUrl = `https://api.themoviedb.org/3/movie/${
      type ? type : "popular"
    }?api_key=${apiKey}&language=en-US`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Movie list", response.data.results);
        setMovieList(response.data.results);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <Container className="movie_list">
      <Typography variant="h2" className="list_title">
        {(type ? type : "POPULAR").toUpperCase()}
      </Typography>

      {/* create a Grid container ->display movie card  */}
      <Grid container spacing={2} className="list_cards">
        {movieList.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Cards movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PopularMovieList;
