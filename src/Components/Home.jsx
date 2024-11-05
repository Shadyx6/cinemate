import React, { useEffect, useState } from "react";
import SideBar from "../templates/SideBar";
import NavBar from "../templates/NavBar";
import axios from "../utils/axios";
import HeroImage from "./HeroImage";
import {Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Dropdown from "../templates/Dropdown";



function Home() {
  const [wallpaper, setWallpaper] = useState(null);
  const [trendy, setTrendy] = useState(null)
  const [category, setCategory] = useState('all')
  const getWallpaper = async () => {
    try {
      const res = await axios.get("/trending/all/day");
      const list = res.data.results;
      const finalWall = list[Math.floor(Math.random() * 20)];
      setWallpaper(finalWall);
      console.log(list, finalWall)
    } catch (error) { 
      console.log(error);
    }
  };

      const getTrending = async () => {
          try {
            const res = await axios.get(`/trending/${category}/day`);
            const list = res.data.results;
            const finalTrending = list && list.splice(0, 15)
            setTrendy([finalTrending])
          } catch (error) { 
            console.log(error);
          }
        };
 
  useEffect(() => {
    !wallpaper && getWallpaper();
    getTrending();
  }, [category]);

  return wallpaper ? (
    <div className="h-screen w-full flex">
      <SideBar />
      <div className="w-[75%] h-full bg-black relative flex flex-col justify-between">
        <NavBar />
        <HeroImage wallpaper={wallpaper} />
        {trendy && <div className=' gap-2 py-4 flex-flex-col overflow-hidden pointer-events-auto h-[45%] z-50'>
       <div className="flex justify-between w-full px-6">
       <h1 className="text-[#D1D1D1] mb-4">Trending</h1>
       <Dropdown title={"Filter"} options={["tv", "movie", "all"]} cats={(e) => setCategory(e.target.value)} />
       </div>
       <Swiper
    modules={[Virtual, Navigation, Pagination]}
    pagination={{ clickable: true, el: '.swiper-pagination' }} 
    navigation
    className="px-[50px] h-56 w-full select-none"
    spaceBetween={50}
    slidesPerView={5}
    virtual
  >
    {trendy[0].map((slideContent, index) => (
      <SwiperSlide
        className="h-56 w-40 bg-white text-black rounded-2xl overflow-hidden"
        key={slideContent}
        virtualIndex={index}
      >
        <img
          className="h-full w-full object-cover object-bottom"
          src={`https://image.tmdb.org/t/p/original/${slideContent.poster_path}`}
          alt={slideContent.title || slideContent.original_name}
        />
      </SwiperSlide>
    ))}
  </Swiper>
  <div className="swiper-pagination mt-10 text-gray-600  mx-auto block"></div>
           </div>}
         
      </div>
    </div>
  ) : <h1>Loading....</h1>
}

export default Home;
