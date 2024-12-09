import React from 'react'
import Routing from './utils/Routing'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
  <>
  <div className="h-full w-full bg-black text-[#D1D1D1] ">
        <Routing />
        <Analytics />
    </div>
  </>
  )
}

export default App