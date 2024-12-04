import React, { useEffect, useRef, useState } from "react";
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
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { BiSearch } from "react-icons/bi";
import NoImage from '../assets/noImage.png'
import { FaFire } from "react-icons/fa";
import BottomNav from "../templates/BottomNav";



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
   <>
    <div className="h-screen w-full lg:flex hidden ">
      <SideBar />
      <div className="w-[75%] h-full bg-black relative flex flex-col justify-between">
        <NavBar className="wrapper h-[40%] w-full p-2 z-50 absolute" />
        <HeroImage wallpaper={wallpaper} big={true} />
        {trendy && <div className='gap-2 py-4 flex-flex-col overflow-hidden pointer-events-auto h-[45%] z-50'>
       <div className="flex justify-between w-full px-6 z-[100000]">
       <h1 className="text-[#D1D1D1] mb-4">Trending</h1>
       <Dropdown title={"Filter"} options={["tv", "movie", "all"]} cats={(e) => setCategory(e.target.value)} />
       </div>
       <Swiper
    modules={[Virtual, Navigation, Pagination]}
    pagination={{ clickable: true, el: '.swiper-pagination' }} 
    navigation
    className="px-[50px] z-40 h-56 w-full select-none"
    spaceBetween={50}
    slidesPerView={5}
    virtual
  >
    {trendy[0].map((slideContent, index) => (
      <SwiperSlide 
        className="h-56 relative w-40 text-black rounded-2xl overflow-hidden"
        key={slideContent}
        virtualIndex={index}
      >
        <Link to={`/${slideContent.media_type}/details/${slideContent.id}`} className="h-full w-full absolute top-0 left-0"></Link>
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
    <div className="h-full bg-black w-full lg:hidden">
      <div className="flex items-center justify-between py-2 px-2">
        <div className="flex items-center">
          <img className="w-8 h-8 rounded-full" src={logo} alt="" />
          <h1 className="text-2xl">Cinemate</h1>
        </div>
        <div className="flex">
          <BiSearch/>
        </div>
      </div>
      <div className="">
      <HeroImage wallpaper={wallpaper} big={false} />
      </div>
      <div className="px-4 mt-5">
        <h2 className="">For You</h2>
        <div className="flex flex-wrap gap-4 py-3 justify-center">
            {trendy && trendy[0].map((r, i) => (
                <Link
                  to={`/movie/details/${r.id}`}
                  key={i}
                  className="h-[25vh] overflow-hidden w-[47%] rounded-md"
                >
                  <img
                    className="h-full object-cover object-bottom w-full"
                    title={r.title}
                    src={
                      r.poster_path
                        ? `https://image.tmdb.org/t/p/original/${r.poster_path}`
                        : NoImage
                    }
                  />
                </Link>
              ))}
            {trendy.length === 0 && (
              <h1 className="text-xs text-gray-400 text-center mx-auto">
                No similar movies found.
              </h1>
            )}
          </div>
      </div>
    <div className="w-full h-full relative flex items-center justify-center bg-red-200">
    <BottomNav />
    </div>
    </div>
   </>
  ) : <Loader />
}

export default Home;
