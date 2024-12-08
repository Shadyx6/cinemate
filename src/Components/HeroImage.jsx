import React from 'react'
import { CiPlay1 } from 'react-icons/ci'
import { FaPlay, FaRegCirclePlay } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function HeroImage({wallpaper, big}) {
  console.log(wallpaper)
  return (
    <div
    style={{
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.3), rgba(0,0,0,.8)), 
                     url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || ""})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 10%',
      }}
    className="hero w-full h-[40vh] lg:h-[55%] bg-cover bg-no-repeat flex items-end p-2 px-4"
  >
    <div className="w-full mt-auto flex gap-4 relative">
        <div className="lg:block hidden h-56 w-40 rounded-lg overflow-hidden shadow-lg">
        <img className='h-full w-full object-cover ' src={`https://image.tmdb.org/t/p/original/${wallpaper.poster_path}`} alt={wallpaper.title || wallpaper.original_name} />
        </div>
        <div className="text-[#D1D1D1] flex flex-col gap-4 lg:gap-6 items-start ">
            <h1 className='lg:text-4xl w-[90%] sm:w-full text-2xl font-bold'>{ wallpaper.title || wallpaper.original_name}</h1>
            <p className='text-gray-300 text-xs w-1/2 hidden lg:block'>{wallpaper.overview.split(' ').splice(0, 20).join(' ')}...<Link onClick={() => console.log("yes")} style={{zIndex: 999999999}} to={`/${wallpaper.media_type}/details/${wallpaper.id}`} className='text-[#02C39A]'>more</Link> </p>
            <Link to={`/${wallpaper.media_type}/details//${wallpaper.id}/trailer`} className='px-4 py-2 hidden text-sm bg-[#00A896] lg:block text-black rounded-lg'>Watch trailer</Link>
            <Link className="absolute bottom-5 h-14 w-14 lg:hidden bg-[#008f7e] flex items-center justify-center rounded-full right-4" to={`/${wallpaper.media_type}/details/${wallpaper.id}/trailer`} ><FaPlay size={'40%'}  fill='white' style={{ zIndex: 999999999, margin: "auto"}} /></Link>
            <div className="flex gap-5 text-xs items-center text-gray-600">
                <p>{wallpaper.release_date || wallpaper.first_air_date ? wallpaper.release_date?.slice(0,4) || wallpaper.first_air_date.slice(0,4) : "no info"}</p>
                <p>|</p>
                <p>{wallpaper.vote_average} IMDB</p>
                <p>|</p>
                <p className='capitalize'>{wallpaper.media_type}</p>
            </div>
        </div>
    </div>
  </div>
  )
}

export default HeroImage