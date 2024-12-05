import React from 'react'
import { Link } from 'react-router-dom'

function Cards({data, title}) {

  return (
   <div className="flex relative lg:gap-12 gap-4 gap-y-8 justify-center  bg-black w-screen overflow-x-hidden items-center px-4 lg:px-14 py-6 flex-wrap">
    {data.map((d,i) => <div key={i}>
      <Link to={`/${d.media_type || title}/details/${d.id}`} className='lg:h-[50vh] h-[40vh] lg:ml-0 w-40 lg:w-60 flex flex-col gap-2 '>
        <div className="h-[90%] ">
          <img className='h-full w-full object-cover object-bottom rounded-lg' src={`https://image.tmdb.org/t/p/original/${d.poster_path || d.profile_path}`} alt="" />
        </div>
        <div className="flex justify-between items-center">
        <h1>{d.title || d.original_name} </h1>
        {d.vote_average && <span className='text-xs text-gray-600'> {(d.vote_average.toFixed(2))} IMDB </span>}
        </div>
  
        
    </Link>
  
    </div> )}
   </div>
  )
}

export default Cards