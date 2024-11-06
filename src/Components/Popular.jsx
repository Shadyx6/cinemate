import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import NavBar from "../templates/NavBar";
import Dropdown from "../templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  const navigate = useNavigate();
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("tv");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Cinemate - Popular Section";
  const getPopular = async () => {
    try {
      const res = await axios.get(`/${category}/popular?page=${page}`);
      const list = res.data.results;
      if (list.length > 0) {
        setPopular((prev) => [...prev, ...list]);
        setPage((page) => page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPopular([]);
      setPage(1);
      getPopular();
    }
  };
  useEffect(() => {
    refresh();
  }, [category]);

  return popular.length > 0 ? (
    <div className=" bg-black h-full w-screen">
      <div className="flex p-4 items-center justify-between h-fit relative">
        <div className="flex w-[15%] items-center justify-center  gap-2">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="hover:text-[#00F5D4]"
          />
          <h1 className="text-3xl whitespace-nowrap">
            Popular <span className="text-xs">({category})</span>
          </h1>
        </div>
        <NavBar
          className={`w-1/2 max-h-[50%] mb-8 block ml-56 absolute z-50 pointer-events-auto text-black `}
        />
        <div className="flex justify-end w-fit z-40 gap-4 ">
          <Dropdown
            title={"Filter"}
            options={["tv", "movie"]}
            cats={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="text-white bg-black h-full w-full">
          <Cards data={popular} title={category} />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Popular;
