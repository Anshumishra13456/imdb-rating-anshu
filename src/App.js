import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Registeration from "./pages/registeration/Registeration";
import Login from "./pages/login/Login";
import PopularMovieList from "./components/movieList/PopularMovieList";
import UpcomingMovieList from "./components/movieList/UpcominMovieList";
import TopRatedMovieList from "./components/movieList/TopRatedMovieList";
import Protect from "./components/protect/Protect";
import MovieDetails from "./pages/movie/MovieDetails";
import Videoplay from "./pages/video/Videoplay";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Registeration />} />

          <Route path="/login" element={<Login />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/movies/popular" element={<PopularMovieList />} />

          <Route
            path="/movies/toprated"
            element={<Protect Component={TopRatedMovieList} />}
          />

          <Route
            path="/movies/upcoming"
            element={<Protect Component={UpcomingMovieList} />}
          />

          <Route path="/video" element={<Videoplay/>} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

const NotFound = () => <h1>Page Not available</h1>;

export default App;



// Api key :         AIzaSyAkVV43DZdvCg6y0Ov0iO3qmf-DnpnP3og


// https://www.googleapis.com/youtube/v3/search?key=AIzaSyAkVV43DZdvCg6y0Ov0iO3qmf-DnpnP3og&part=snippet,id&order=date&maxResults=10