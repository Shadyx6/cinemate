import React, { useEffect, useState } from 'react'
import SideBar from '../templates/SideBar'
import NavBar from '../templates/NavBar'
import axios from '../utils/axios'
function Home() {
  const [wallpaper, setWallpaper] = useState(null)
  const getWallpaper = async () => {
    try {
      const res = await axios.get('/trending/all/day')
      const list = res.data.results 
      const finalWall = list[Math.floor(Math.random() * 20)]
      setWallpaper(finalWall)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
   !wallpaper && getWallpaper()
  })

  return (
   <div className="h-screen w-full flex">
    <SideBar />
    <div className="w-[75%] h-full bg-black relative">
      <NavBar />
      <div className="hero w-full h-[60%] absolute top-0 left-0">
      <img className='h-full w-full object-cover' src={wallpaper ? `https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || wallpaper.poster_path || wallpaper.profile_path}` : ''} alt="" />
      </div>
        
        
    </div>
   </div>
  )
}

export default Home