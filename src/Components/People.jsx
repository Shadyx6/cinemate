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

function People() {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Cinemate - Popular Stars";
  const getpeople = async () => {
    try {
      const res = await axios.get(`/person/${category}?page=${page}`);
      const list = res.data.results;
      if (list.length > 0) {
        setPeople((prev) => [...prev, ...list]);
        setPage((page) => page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = () => {
    if (people.length === 0) {
      getpeople();
    } else {
      setPeople([]);
      setPage(1);
      getpeople();
    }
  };
  useEffect(() => {
    refresh();
  }, [category]);

  return people.length > 0 ? (
    <>
    <div className="w-full h-full relative z-[10000000000] flex items-center justify-center">
    <BottomNav />
    </div>

    <div className=" bg-black h-full w-screen overflow-x-hidden">
      <div className="flex p-4 items-center justify-between h-fit relative">
        <div className="flex lg:w-[15%] items-center justify-center gap-2">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="hover:text-[#00F5D4]"
          />
          <h1 className="lg:text-3xl max-lg:w-[40%] mr-auto i-mod lg:whitespace-nowrap">
            People
          </h1>
        </div>
        <NavBar className={`lg:w-1/2 w-full i-ml max-h-[50%] ml-4 mb-8 block lg:ml-56 absolute z-50 pointer-events-auto text-black `} />
        <div className="flex justify-end w-fit z-40 gap-4 ">
        </div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getpeople}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="text-white bg-black h-full w-full">
          <Cards data={people} title={'people'} />
        </div>
      </InfiniteScroll>
    </div>
    </>
  ) : (
   <Loader />
  );
}

export default People;
