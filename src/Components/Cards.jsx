import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

function Cards({data, title}) {

  return (
   <div className="flex relative lg:gap-12 gap-4 gap-y-8 justify-center  bg-black w-screen overflow-x-hidden items-center px-4 lg:px-14 py-6 flex-wrap">
    {data.map((d,i) => <Card title={title} info={d} key={i} /> )}
   </div>
  )
}

export default Cards