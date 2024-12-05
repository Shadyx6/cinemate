import React, { useEffect } from 'react'
import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from '../utils/axios'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineImageNotSupported } from 'react-icons/md';
import NoImage from '../assets/noImage.png'
function NavBar({...props}) {

  const [key, setKey] = useState("")
  const [list, setList] = useState(null)
  const getResult = async () => {
    try {
      if(key.length === 0) setList(null)
      const response = await axios.get(`/search/multi?query=${key}`)
      setList(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { 
   getResult()
  })

  return (
    <>
        <div {...props} >
            <div className="top h-full w-full mt-4 relative text-black">
                <div className="w-[50%] bg-[#D1D1D1] ml-32 relative rounded-full flex items-center ">
                <input value={key} onChange={(e) => setKey(e.target.value)} placeholder='Search for your favorites....' className=' ml-6 bg-[#D1D1D1]  border-none w-full rounded-full py-1 lg:py-3 px-4 focus:outline-none ' type="text" />
                <IoIosSearch className='absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2 text-gray-600' size={"19px"} />
                {key?.length > 0 && (<RxCross2 onClick={() => setKey("")} className='absolute right-3 text-xl' />)}
                </div>
                <div className=" h-auto max-h-[60vh] z-max text-[#D1D1D1] w-[50%] ml-32 rounded-lg mt-2 bg-[#222222] overflow-y-auto">
               {list && list.length > 0 && list.map((item, i) => ( <Link to={`/${item.media_type}/details/${item.id}`} key={i} className='p-5 flex gap-5 items-center mb-5 text-md'> <img className='lg:h-20 lg:w-30 h-10 w-10 object-cover rounded-md' src={item.backdrop_path || item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path || item.profile_path}` : NoImage} alt="img" />{item.title || item.original_title || item.name || item.original_name || "not found"}
                </Link>) )}
                </div>
            </div>
          
        </div>
    </>
  )
}

export default NavBar