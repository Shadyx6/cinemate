import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../templates/NavBar";
import Dropdown from "../templates/Dropdown";
import axios from "../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import BottomNav from "../templates/BottomNav";

function Trending() {
  const navigate = useNavigate();
  const [trendy, setTrendy] = useState([]);
  const [category, setCategory] = useState("all");
  const [day, setDay] = useState("day");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)
  const {pathname} = useLocation()
  console.log(pathname)
  document.title = "Cinemate - Trending Section"

  const getTrending = async () => {
    try {
      const res = await axios.get(`/trending/${category}/${day}?page=${page}`);
      const list = res.data.results;
      if(list.length > 0){
        setTrendy((prev) => [...prev, ...list]);
        setPage((page) => page + 1)
        console.log(page, res.data)
      } else{
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = () => {
    if(trendy.length === 0) {
      getTrending();
    } else{
      setTrendy([]);
      setPage(1);
      getTrending();
    }
  }

  useEffect(() => {
    refresh()
  },[category, day]);

  return trendy.length > 0 ? (
    <>
     <div className="w-full h-full relative z-[10000000000] flex items-center justify-center">
    <BottomNav />
    </div>
    <div className=" bg-black h-full w-screen overflow-x-hidden">
      <div className="flex p-4 items-center justify-between h-fit min-h-24 relative">
        <div className="flex lg:w-[15%] items-center justify-center gap-2">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="hover:text-[#00F5D4]"
          />
          <h1 className="lg:text-3xl">Trending <span className="text-xs">({category})</span></h1>
        </div>
        {/* <div className="flex text-black   mb-24">
          <NavBar />
        </div> */}
        <NavBar className={`lg:w-1/2 w-full  max-h-[50%] mb-2 lg:mb-8 block lg:ml-56 absolute z-50 pointer-events-auto text-black `} />
        <div className=" justify-end w-fit z-40 gap-4 lg:flex hidden ">
        <Dropdown title={"Filter"} options={["tv", "movie", "all"]} cats={(e) => setCategory(e.target.value)} />
          <Dropdown title={"time"} options={["day", "week"]} cats={(e) => setDay(e.target.value)} />
        </div>
      </div>
      <div className="h-10 w-full flex justify-between items-end px-5 gap-2 lg:hidden z-10 relative">
      <Dropdown title={"Filter"} options={["tv", "movie", "all"]} cats={(e) => setCategory(e.target.value)} />
      <Dropdown title={"Time"} options={["day", "week"]} cats={(e) => setDay(e.target.value)} />
      </div>
    <InfiniteScroll
      dataLength={trendy.length} 
      next={getTrending}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}>
    <div className="text-white bg-black h-full w-full">
       <Cards data={trendy} title={category} />
      </div>
    </InfiniteScroll>
    
    </div>
    </>
   
  ) : <Loader />
}

export default Trending;
