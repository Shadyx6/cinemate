import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineHomeMax } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
function SideBar() {
    const links = [
      {name: "Home", icon: <MdOutlineHomeMax />},
      {name: "Latest", icon: <MdOutlineHomeMax />},
      {name: "TV Shows", icon: <MdOutlineHomeMax />},
      {name: "Recently Added", icon: <MdOutlineHomeMax />},
    ]
  return (
    <div className="side relative w-[25%] bg-[#17181C] text-[#D1D1D1] p-10 justify-center">
        <h1 className=' text-5xl'> CineMate  </h1>
        <div className="flex-col flex text-zinc-200 mt-8 ">
            <h1 className='text-3xl mt-6'>Menu</h1>
            <hr style={{boxShadow: "0px 0px 10px 1px green"}} className="border-t-2  border-[#00F5D4] mt-2 mb-2" />
            {links.map((link, index) => 
                <Link   key={index} className='mt-12 flex items-center text-xl gap-5'>
                  {link.icon}
                  {link.name}
                </Link>
            )}
        </div>
        <div className="flex items-center gap-4 mt-20">
      
         <span className='p-1 border-bg-[#D1D1D1] border-2 rounded-full'><LiaQuestionSolid color='#D1D1D1' /></span>
          <h1>Questions? <Link>Contact us</Link> </h1>

          
        </div>
 
    </div>
  )
}

export default SideBar