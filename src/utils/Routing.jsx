import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Trending from '../Components/Trending'
import Popular from '../Components/Popular'
import Movies from '../Components/Movies'
import TvSeries from '../Components/TvShows'
import People from '../Components/People'

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv-shows' element={<TvSeries />} />
        <Route path='/people' element={<People />} />
    </Routes>
  )
}

export default Routing