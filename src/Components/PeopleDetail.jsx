import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetPeople, removePeople } from "../store/actions/peopleActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import NoImage from "../assets/noImage.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { LiaImdb } from "react-icons/lia";
import { GrLocationPin } from "react-icons/gr";

function PeopleDetail() {
  const dispatch = useDispatch();
  const [details, setdetails] = useState(false);
  const data = useSelector((state) => state.people.details);
  const navigate = useNavigate();
  const [bioOpen, setBioOpen] = useState(false)
  
    const toggleBio = () => {
      setBioOpen(!bioOpen);
    }
      const dateObj = new Date(data ? data.details.birthday : null);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const finalDate = dateObj.toLocaleDateString("en-GB", options);
  

  const toggleDetails = () => {
    setdetails(!details);
  };
  const bigScreen = window.innerWidth >= 1024;
  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncGetPeople(id));
    return () => {
      dispatch(removePeople());
    };
  }, [id]);


  return data ? (
    <>
      <div className="h-full overflow-y-auto lg:h-screen lg:overflow-hidden relative  bg-[#121212] w-full">
        <div
          style={{
            background: data.taggedImages
              ? bigScreen
                ? `linear-gradient(to right, rgba(0,0,0, 1) 23%, rgba(0,0,0,.9) 25%, rgba(0, 0, 0, 0.5) 30%), url(https://image.tmdb.org/t/p/original/${
                    data.taggedImages[Math.floor(Math.random() * 20)]?.media
                      .backdrop_path
                  })`
                : ` url(https://image.tmdb.org/t/p/original/${data.details.profile_path})`
              : `url(${NoImage})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
          className={`w-full select lg:h-full h-[35%] p-5 bg-red-100`}
        >
          <div className="flex items-center justify-between">
            <div className="">
              <FaArrowLeftLong
                onClick={() => navigate(-1)}
                className="hover:text-[#00F5D4]"
              />
            </div>
            <div className="flex items-center  gap-4">
              <h1 className="text-xs text-gray-600">Links</h1>
              <a
                target="_blank"
                href={`https://www.instagram.com/${
                  data.externalIds && data.externalIds.instagram_id
                }`}
              >
                <FaInstagram className="hover:text-[#00F5D4]" />
              </a>
              <a
                target="_blank"
                href={`https://www.imdb.com/title/${data.externalIds.imdb_id}`}
              >
                <LiaImdb className="hover:text-[#00F5D4]" />
              </a>
              <a
                target="_blank"
                href={`https://x.com/${data.externalIds.twitter_id}`}
              >
                <FaXTwitter className="hover:text-[#00F5D4]" />
              </a>
            </div>
          </div>
          <div className=" hidden lg:flex h-full w-full">
            <div className="h-full w-[27%]  px-6  p-4">
              <div className="h-[50vh] w-[88%] overflow-hidden ">
                <img
                  className="h-full w-full object-cover object-bottom"
                  src={`https://image.tmdb.org/t/p/original/${data.details.profile_path}`}
                  alt=""
                />
              </div>
              <h1 className="mt-4 ">Images</h1>
              <div className="flex flex-wrap mb-4 mt-4 h-full w-full overflow-hidden">
                <Swiper
                  modules={[Virtual, EffectCards, Navigation]}
                  className="px h-60 w-60 select-none"
                  slidesPerView={1}
                  virtual
                  navigation
                  effect="cards"
                >
                  {data.images &&
                    data.images.profiles
                      .filter((img, i) => i > 1)
                      .map((img, i) => (
                        <SwiperSlide
                          key={i}
                          className=" relative text-black rounded-md  rounded-2 xl overflow-hidden"
                        >
                          <img
                            className="h-full w-full object-cover "
                            src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
                            alt=""
                          />
                        </SwiperSlide>
                      ))}
                </Swiper>
              </div>
            </div>
            <div
              className="h-full
             text-white w-[77%] pl-4 p-2"
            >
              <div className="">
                <h1 className="text-5xl">
                  {" "}
                  {data.details && data.details.name
                    ? data.details.name
                    : "no info"}
                </h1>
              </div>
              <div className="flex mt-2">
                {
                  <div className="">
                    <div className="flex gap-4 text-gray-200 mt-2 text-sm">
                      <h3 className="">
                        {" "}
                        <strong>Born</strong> {data.details.birthday == null ? "no info" : finalDate}
                      </h3>
                      <h3 className="flex items-center"> <GrLocationPin />{data.details.place_of_birth == null ? "no info" : data.details.place_of_birth}</h3>
                    </div>
                  </div>
                }
              </div>
              <div className="overflow-y-auto h-full nobar">
                <div className="w-[90%]">
                  <p className="mt-6 text-gray-200">
                    {data.details.biography
                      .split(" ")
                      .filter((p, i) => i < 100)
                      .join(" ")}
                   
                    <span className={`${bioOpen ? '' : 'hidden'}`}>
                    {data.details.biography
                      .split(" ")
                      .filter((p, i) => i > 100)
                      .join(" ")}
                      
                    </span>
                    <span className={`${!bioOpen ? '' : 'hidden'}`}>...</span>
<button onClick={toggleBio} className="text-green-400">{bioOpen ? "See less" : "Read more"}</button>{" "}
                  </p>
                </div>
                <div className="mt-3">
                  <div className="">
                    <h1 className="text-2xl mt-8">Known for</h1>
                    <div className="relative w-full mt-5 mb-20">
                      <Swiper
                      modules={[Virtual, Navigation, Pagination]}
                      pagination={{ clickable: true, el: ".swiper-pagination" }}
                      navigation
                      className="px-10 py-10 select-none"
                      spaceBetween={50}
                      slidesPerView={5}
                      virtual
                    >
                      {data.movies &&
                        data.movies.cast.map((slideContent, index) => (
                          <SwiperSlide
                            className="h-60 relative w-40 text-black rounded-2xl overflow-hidden"
                            key={slideContent}
                            virtualIndex={index}
                          >
                            <Link
                              to={`/${slideContent.media_type}/details/${slideContent.id}`}
                              className="h-full w-full absolute top-0 left-0"
                            ></Link>
                            <img
                              className="h-full w-full object-cover object-bottom"
                              src={`https://image.tmdb.org/t/p/original/${slideContent.poster_path}`}
                              alt={
                                slideContent.title || slideContent.original_name
                              }
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                      <div className="swiper-pagination sticky bottom-10  text-gray-600 block"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="info p-4 text-[#d1d1d1]">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl">
                {data.details.name || "no info"}
              </h1>
              {details == true ? (
                <RiArrowUpSLine size={"20px"} onClick={toggleDetails} />
              ) : (
                <RiArrowDownSLine size={"20px"} onClick={toggleDetails} />
              )}
            </div>
            {details && (
              <div className="duration-200 ease-linear">
                <div className="flex gap-4 text-gray-400 mt-2 text-xs">
                  <h3 className="">
                   <strong>Born</strong>  {data.details.birthday == null ? "no info" : finalDate}
                  </h3>
                  <h3 className="flex items-center">
                    <GrLocationPin /> {data.details.place_of_birth ? data.details.place_of_birth : "no info"}
                  </h3>
                  <h3>
                  </h3>
                </div>
                <h3 className="text-xs mt-2 "> <strong className="text-xs text-gray-500">Known for</strong> {data.details.known_for_department ? data.details.known_for_department : "no info"}</h3>
              </div>
            )}
          </div>  
          <div className="w-[100%] px-4 py-2">
          <p className="text-sm text-[#a7a4a4]">
                    {data.details.biography
                      .split(" ")
                      .filter((p, i) => i < 100)
                      .join(" ")}
                   
                    <span className={`${bioOpen ? '' : 'hidden'}`}>
                    {data.details.biography
                      .split(" ")
                      .filter((p, i) => i > 100)
                      .join(" ")}
                      
                    </span>
                    <span className={`${!bioOpen ? '' : 'hidden'}`}>...</span>
<button onClick={toggleBio} className="text-green-400">{bioOpen ? "See less" : "Read more"}</button>{" "}
                  </p>
          </div>
          <hr className="border-[#171717]" />
          <div className="p-2">
            <h1 className="px-2 text-white  ">Best works</h1>
            <div className="flex flex-wrap gap-4 p-3 justify-center">
              {data.movies.cast &&
                data.movies.cast.length > 0 &&
                data.movies.cast.map((r, i) => (
                  <Link
                    to={`/movie/details/${r.id}`}
                    key={i}
                    className="h-[20vh] overflow-hidden w-[47%] rounded-md"
                  >
                    <img
                      className="h-full object-cover object-bottom w-full"
                      title={r.title}
                      src={
                        r.poster_path
                          ? `https://image.tmdb.org/t/p/original/${r.poster_path}`
                          : NoImage
                      }
                    />
                  </Link>
                ))}
              {!data.movies.cast &&
                data.similar &&
                data.similar.length > 0 &&
                data.similar.map((s, i) => (
                  <Link
                    to={`/movie/details/${r.id}`}
                    key={i}
                    className="h-[20vh] overflow-hidden w-[47%] rounded-md"
                  >
                    <img
                      className="h-full object-cover object-bottom w-full"
                      title={s.title}
                      src={
                        s.poster_path
                          ? `https://image.tmdb.org/t/p/original/${r.poster_path}`
                          : NoImage
                      }
                    />
                  </Link>
                ))}
              {data.movies.cast &&
                (<data value="" className="movies.cast"></data>).length ===
                  0 &&
                data.similar.length === 0 && (
                  <h1 className="text-xs text-gray-400 text-center mx-auto">
                    No movies found for this star
                  </h1>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export default PeopleDetail;
