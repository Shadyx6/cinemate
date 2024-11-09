import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetMovie, removeMovie } from "../store/actions/movieActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import NoImage from "../assets/noImage.png";
import { SiWikipedia } from "react-icons/si";
function MovieDetails() {
  const dispatch = useDispatch();
  const [details, setdetails] = useState(false);
  const data = useSelector((state) => state.movie.details);
  const navigate = useNavigate();
  console.log(data);
  const toggleDetails = () => {
    setdetails(!details);
  };
  const bigScreen = window.length >= 1024;
  const { id } = useParams();
  useEffect(() => {
    dispatch(asyncGetMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);
  return data ? (
    <>
      <div className="h-full overflow-y-auto  bg-[#121212] w-full">
        <div
          style={{
            background: data.details.backdrop_path
              ? `linear-gradient(to right, rgba(0,0,0, 1) 23%, rgba(0,0,0,.9) 25%, rgba(0, 0, 0, 0.5) 30%), url(https://image.tmdb.org/t/p/original/${data.details.backdrop_path})`
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
              <a href="">
                <SiWikipedia className="hover:text-[#00F5D4]" />
              </a>
              <a href="">
                <FaInstagram className="hover:text-[#00F5D4]" />
              </a>
              <a href="">
                <FaXTwitter className="hover:text-[#00F5D4]" />
              </a>
            </div>
          </div>
         <div className="flex h-full w-full">
         <div className="h-full w-[27%]  px-6  p-4">
            <div
              className="h-[50vh] w-[88%] overflow-hidden "
            >
              <img className="h-full w-full object-cover object-bottom" src={`https://image.tmdb.org/t/p/original/${data.details.poster_path}`} alt="" />

            </div>
            <h1 className="mt-4 mb-4 ">Cast</h1>
            <div className="flex flex-wrap gap-x-6 mx-auto gap-y-4">
            {data.credits &&
            data.credits.cast.slice(0, 6).map((a, i) => (
              <div key={i} className="flex flex-col">
                <div className=" w-[3.4rem] rounded-full h-[3.4rem]">
                  {" "}
                  <img
                    className="h-full w-full object-cover rounded-full"
                    src={`https://image.tmdb.org/t/p/original/${a.profile_path}`}
                    alt=""
                  />
                </div>
                <h2 className=" text-center mx-auto mt-1 text-xs w-10 text-gray-300">
                  {a.original_name}
                </h2>
              </div>
            ))}
              {/* <div className="">
                <div className="h-[15vh] w-[15vh] bg-red-500 rounded-full"></div>
                <h3 className="text-center text-black">some name</h3>
              </div> */}
            </div>
          </div>
          <div className="h-full w-full px-6 p-2">
                <div className="">
                <h1 className="text-5xl">  {data.details && data.details.title || data.details.original_title || 'no info'}</h1>
                </div>
                <div className="flex mt-2">
                
            {<div className="">
              <div className="flex gap-4 text-gray-400 mt-2 text-sm">
                <h3 className="">IMDb {data.details.vote_average.toFixed(1)}/10</h3>
                <h3>{data.details.runtime} min</h3>
                <h3>
                  {data.details.release_date || data.details.first_air_date
                    ? data.details.release_date?.slice(0, 4) ||
                      data.details.first_air_date?.slice(0, 4)
                    : "no info"}
                </h3>
              </div>
              <div className="flex text-gray-400 mt-4 text-sm">
                {data.details.genres.map((g, i) => 
                  <h3 key={i}>
                    {g.name} {i == 2 ? "" : ","}
                  </h3>
                )}
              </div>
            </div>}
           
                </div>
                <div className="w-[90%]">
            <p className="mt-6 text-[#a7a4a4]">{data.details.overview}</p>
            </div>
            <div className="mt-3">
              <div className="">
                <h3 className="text-gray-500">Starring : <p></p></h3>
                <h3 className="text-gray-500">Directed by : <p></p></h3>
              </div>
            </div>
          </div>
         </div>
        </div>
        <div className="info p-4 text-[#d1d1d1]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">
              {data.details.title || data.details.original_name}
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
                <h3 className="">IMDb {data.details.vote_average}</h3>
                <h3>{data.details.runtime} mins</h3>
                <h3>
                  {data.details.release_date || data.details.first_air_date
                    ? data.details.release_date?.slice(0, 4) ||
                      data.details.first_air_date?.slice(0, 4)
                    : "no info"}
                </h3>
              </div>
              <div className="flex text-gray-400 mt-2 text-xs">
                {data.details.genres.map((g, i) => (
                  <h3 key={i}>
                    {g.name} {i == 2 ? "" : ","}
                  </h3>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-1 bg-[#171717] w-full px-4">
          <h1 className="text-xs mx-auto block text-center">Available on</h1>
          <div className="flex items-center w-full gap-4 p-4 overflow-x-auto">
            {data.watchProviders &&
              data.watchProviders.buy &&
              data.watchProviders.buy.map((p, i) => (
                <div className="h-[2rem] w-[2rem] mx-auto" key={i}>
                  {" "}
                  <img
                    className="h-full object-contain w-full rounded-lg "
                    title={p.provider_name}
                    src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                  />
                </div>
              ))}
            {data.watchProviders &&
              !data.watchProviders.buy &&
              data.watchProviders.rent &&
              data.watchProviders.rent.map((p, i) => (
                <div className="h-[2rem] w-[2rem] mx-auto items-center" key={i}>
                  {" "}
                  <img
                    className="h-full object-cover w-full rounded-lg "
                    title={p.provider_name}
                    src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                  />
                </div>
              ))}
            {data.watchProviders &&
              !data.watchProviders.buy &&
              !data.watchProviders.rent &&
              data.watchProviders.flatrate.map((p, i) => (
                <div className="h-[2rem] w-[2rem] mx-auto" key={i}>
                  {" "}
                  <img
                    className="h-full object-contain w-full rounded-lg "
                    title={p.provider_name}
                    src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                  />
                </div>
              ))}
            {!data.watchProviders && (
              <h1 className="text-xs text-gray-400 text-center mx-auto">
                No streaming info available.
              </h1>
            )}
          </div>
        </div>
        <div className="flex p-4 gap-6">
          {data.credits &&
            data.credits.cast.slice(0, 3).map((a, i) => (
              <div key={i} className="flex flex-col">
                <div className=" w-[3rem] rounded-full h-[3rem]">
                  {" "}
                  <img
                    className="h-full w-full object-cover rounded-full"
                    src={`https://image.tmdb.org/t/p/original/${a.profile_path}`}
                    alt=""
                  />
                </div>
                <h2 className=" text-center mx-auto mt-1 text-xs w-10 text-gray-300">
                  {a.original_name}
                </h2>
              </div>
            ))}
        </div>
        <div className="w-[100%] px-4 py-2">
          <p className="text-sm text-[#a7a4a4]">{data.details.overview}</p>
        </div>
        <hr className="border-[#171717]" />
        <div className="p-2">
          <h1 className="px-2 text-white  ">Similar Movies</h1>
          <div className="flex flex-wrap gap-4 p-3 justify-center">
            {data.recommendations &&
              data.recommendations.length > 0 &&
              data.recommendations.map((r, i) => (
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
            {!data.recommendations &&
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
            {data.recommendations.length === 0 && data.similar.length === 0 && (
              <h1 className="text-xs text-gray-400 text-center mx-auto">
                No similar movies found.
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export default MovieDetails;