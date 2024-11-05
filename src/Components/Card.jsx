// import { Navigation, Pagination, Virtual } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/virtual";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useEffect, useState } from "react";
// import axios from "../utils/axios";

// export default function Card({data}) {
//     const [trendy, setTrendy] = useState(null)
//     const getTrending = async () => {
//         try {
//           const res = await axios.get("/trending/all/day");
//           const list = res.data.results;
//           const finalTrending = list && list.splice(0, 15)
//           setTrendy([finalTrending])
//         } catch (error) { 
//           console.log(error);
//         }
//       };
//       useEffect(() => {
//         !trendy && getTrending()
//         console.log(trendy)
//       }, )

//   return trendy ? (
//     <Swiper
//       modules={[Virtual, Navigation, Pagination]}
//       pagination={{ clickable: true }}
//       navigation
//       className="px-[50px]"
//       spaceBetween={50}
//       slidesPerView={6}
//       virtual
//     >
//       {trendy.map((slideContent, index) => (
//         <SwiperSlide
//           className="h-56 w-40 bg-white text-black"
//           key={slideContent}
//           virtualIndex={index}
//         >
//           {slideContent.name}
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   ) : <h1>Loading...</h1>
// }
