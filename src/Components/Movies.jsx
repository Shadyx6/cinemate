import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import NavBar from "../templates/NavBar";
import Dropdown from "../templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import BottomNav from "../templates/BottomNav";

function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Cinemate - Movies Section";
  const getmovies = async () => {
    try {
      const res = await axios.get(`/movie/${category}?page=${page}`);
      const list = res.data.results;
      if (list.length > 0) {
        setMovies((prev) => [...prev, ...list]);
        setPage((page) => page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = () => {
    if (movies.length === 0) {
      getmovies();
    } else {
      setMovies([]);
      setPage(1);
      getmovies();
    }
  };
  useEffect(() => {
    refresh();
  }, [category]);

  return movies.length > 0 ? (
    <>
     <div className="w-full h-full relative z-[10000000000] flex items-center justify-center">
    <BottomNav />
    </div>
      <div className=" bg-black h-full w-screen overflow-x-hidden">
      <div className="flex p-4 items-center justify-between h-fit relative">
        <div className="flex lg:w-[15%] items-center justify-center  gap-2">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="hover:text-[#00F5D4]"
          />
          <h1 className="lg:text-3xl i-mod lg:whitespace-nowrap">
            Movies <span className="text-xs">({category})</span>
          </h1>
        </div>
        <NavBar className={`lg:w-1/2 w-full i-ml max-h-[50%] ml-8 mb-8 block lg:ml-56 absolute z-50 pointer-events-auto text-black `} />
        <div className="hidden justify-end w-fit z-40 gap-4 lg:flex">
          <Dropdown
            title={"Filter"}
            options={["top_rated", "upcoming", "popular", "now_playing"]}
            cats={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <div className="h-10 w-full flex justify-between items-end px-5 gap-2 lg:hidden z-10 relative">
      <Dropdown
            title={"Filter"}
            options={["top_rated", "upcoming", "popular", "now_playing"]}
            cats={(e) => setCategory(e.target.value)}
          />
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={getmovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="text-white bg-black h-full w-full">
          <Cards data={movies} title={'movie'} />
        </div>
      </InfiniteScroll>
    </div>
    </>
  
  ) : (
   <Loader />
  );
}

export default Movies;
