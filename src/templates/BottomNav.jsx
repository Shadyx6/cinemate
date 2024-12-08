import React, { useEffect, useState } from 'react'
import { CiStar } from 'react-icons/ci'
import { FaFire } from 'react-icons/fa'
import { MdOutlineHomeMax, MdOutlineMovieFilter } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { GrHomeRounded } from 'react-icons/gr'
function BottomNav() {
    const [links, setLinks] = useState([
      {path: "/movies", isActive: false, icon: <MdOutlineMovieFilter size={'60%'}   />},
      {path: "/trending",isActive: false, icon: <FaFire size={'40%'}  />},
      {path:"/", isActive: false, icon: <GrHomeRounded  size={'55%'} />},
      {path:"/tv-shows",isActive: false, icon: <MdOutlineHomeMax size={'60%'}  />},
      {path:"/persons",isActive: false, icon: <CiStar size={'60%'}  />},
    ])
    const {pathname} = useLocation()
    useEffect(() => {
     setLinks((prev) => 
      prev.map((l) => ({
        ...l, isActive: l.path === pathname 
      })
    ))}, [pathname])
  return (
    <div className="fixed bottom-6 lg:hidden rounded-lg w-[95%] bg-[#1F1F1F]/50 backdrop-blur-lg m-auto items-center justify-evenly overflow-visible flex h-16 md:h-20 ">
    {links && links.map((l, i) => (
      <Link to={l.path} className={`ml-4 md:scale-50 ${l.isActive && "text-green-500"}`} key={i}>
        {l.icon}
      </Link>
    ))}
  </div>
  
  )
}

export default BottomNav