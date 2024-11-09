import React from 'react'
import { Link } from 'react-router-dom'

function HeroImage({wallpaper}) {
  console.log(wallpaper)
  return (
    <div
    style={{
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.3), rgba(0,0,0,.8)), 
                     url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || ""})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 10%',
      }}
    className="hero w-full h-[55%] bg-cover bg-no-repeat flex items-end p-2 px-4"
  >
    <div className="w-full mt-auto flex gap-4">
        <div className=" h-56 w-40 rounded-lg overflow-hidden shadow-lg">
        <img className='h-full w-full object-cover ' src={`https://image.tmdb.org/t/p/original/${wallpaper.poster_path}`} alt={wallpaper.title || wallpaper.original_name} />
        </div>
        <div className="text-[#D1D1D1] flex flex-col gap-6 items-start">
            <h1 className='text-4xl font-bold'>{ wallpaper.title || wallpaper.original_name}</h1>
            <p className='text-gray-300 text-xs w-1/2 '>{wallpaper.overview.split(' ').splice(0, 20).join(' ')}...<span className='text-[#02C39A]'>more</span> </p>
            <Link className='px-4 py-2 text-sm bg-[#00A896] text-black rounded-lg'>Watch trailer</Link>
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