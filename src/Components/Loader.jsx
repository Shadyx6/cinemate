import React from 'react';
import  Lottie  from 'lottie-react';
import animationData from '../assets/loading.json';

function Loader() {
  return (
    <div className='bg-black flex items-center flex-col justify-center h-screen w-screen'>
      <Lottie className='h-[40%] mb-20' animationData={animationData} loop />
     
    </div>
  );
}   

export default Loader;
