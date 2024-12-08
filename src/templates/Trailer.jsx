import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv"
  console.log(pathname, category)
  const bigScreen = window.innerWidth >= 1024;
  const video = useSelector(state => state[category].details.videos)
  console.log(video, category)
  const navigate = useNavigate()

  return video ? (
    <div className="absolute h-full z-[10000] flex items-center flex-col justify-center w-full top-0 left-0">
      <div className="absolute h-full w-full bg-black opacity-80 pointer-events-none"></div>
    <div className="w-full hidden lg:flex z-[100000] ml-56" >
   <div   onClick={() => navigate(-1)} className="p-4 w-fit z-[10000000000000000000000000000] rounded-full border hover:text-red-600 hover:bg-[#00F5D4] border-[#00F5D4]">
   <FaArrowLeftLong 
              
              />  
   </div>
    </div>
      <ReactPlayer
      
        style={{ zIndex: 999999999 }}
        height={bigScreen ? 600 : '100%'}
        width={bigScreen ? 1100 : '100%'}
        controls={true}
        url={ video ? `https://www.youtube.com/watch?v=${video.key}` : null }
      />
    </div>
  ) : <h1>No trailer found</h1>
}

export default Trailer;
