import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineHomeMax, MdOutlineMovieFilter } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
import logo from '../assets/logo.png'
import { FaFire } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { CiStar } from "react-icons/ci";
function SideBar() {
    const links = [
      {name: "Trending", icon: <FaFire  />},
      {name: "Popular", icon: <IoMdTrendingUp  />},
      {name: "Movies", icon: <MdOutlineMovieFilter />},
      {name: "TV Shows", icon: <MdOutlineHomeMax />},
      {name: "Artists", icon: <CiStar />},
    ]
  return (
    <div className="side relative w-[25%] bg-[#17181C] text-[#D1D1D1] p-10 justify-center">
       <div className="flex items-center">
        <img className='h-10 w-10' src={logo} alt="" />
        <h1 className=' text-5xl'> CineMate  </h1>
       </div>
        <div className="flex-col flex text-zinc-200 mt-8 ">
            <h1 className='text-3xl mt-6'>Menu</h1>
            <hr style={{boxShadow: "0px 0px 10px 1px green"}} className="border-t-2  border-[#00F5D4] mt-2 mb-2" />
            {links.map((link, index) => 
                <Link to={`${index === 3 ? 'tv-shows' : index === 4 ? 'persons' : link.name.toLowerCase() }`}  key={index} className='mt-12 flex items-center text-xl gap-5 hover:text-[#00F5D4]'>
                  {link.icon}
                  {link.name}
                </Link>
            )}
        </div>
        <div className="flex items-center gap-4 mt-20 hover:text-[#00F5D4]">
      
         <span className='p-1 border-bg-[#D1D1D1]  border-2 rounded-full'><LiaQuestionSolid /></span>
          <h1>Questions? <Link to={`/about`}>About Us</Link> </h1>
          
        </div>
 
    </div>
  )
}

export default SideBar