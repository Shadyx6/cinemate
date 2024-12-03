import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Trending from "../Components/Trending";
import Popular from "../Components/Popular";
import Movies from "../Components/Movies";
import TvSeries from "../Components/TvShows";
import People from "../Components/People";
import MovieDetails from "../Components/MovieDetails";
import TvShowDetails from "../Components/TvShowDetails";
import PeopleDetail from "../Components/PeopleDetail";
import Trailer from "../templates/Trailer";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/details/:id" element={<MovieDetails />}>
        <Route path="trailer" element={<Trailer />} />
      </Route>{" "}
      <Route path="/tv/details/:id" element={<TvShowDetails />}>
        <Route path="trailer" element={<Trailer />} />
      </Route>
      <Route path="/tv-shows" element={<TvSeries />} />
      <Route path="/people" element={<People />} />
      <Route path="/people/details/:id" element={<PeopleDetail />} />
    </Routes>
  );
}

export default Routing;
