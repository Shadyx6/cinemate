import React from 'react'
import { Link } from 'react-router-dom'

function Card({info, title}) {

  // const navigate = useNavigate()
  return (
    <div >
    <Link to={`/${info.media_type || title}/details/${info.id}`} className='lg:h-[50vh] h-[40vh] lg:ml-0 w-40 lg:w-60 flex flex-col gap-2 '>
      <div className="h-[90%] ">
        <img className='h-full w-full object-cover object-bottom rounded-lg' src={`https://image.tmdb.org/t/p/original/${info.poster_path || info.profile_path}`} alt="" />
      </div>
      <div className="flex justify-between items-center">
      <h1>{info.title || info.original_name} </h1>
      {info.vote_average && <span className='text-xs text-gray-600'> {(info.vote_average.toFixed(2))} IMDB </span>}
      </div>
  </Link>

  </div>
  )
}

export default Card