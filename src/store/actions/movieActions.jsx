import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { getMovie } from "../reducers/movieSlice";
export { removeMovie } from "../reducers/movieSlice";

export const asyncGetMovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const releaseDate = await axios.get(`/movie/${id}/release_dates`);
    const credits = await axios.get(`/movie/${id}/credits`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const externalIds = await axios.get(`/movie/${id}/external_ids`);

    const data = {
      details: details.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      releaseDate: releaseDate.data,
      credits: credits.data,
      videos: videos.data,
      watchProviders: watchProviders.data.results.US,
      externalIds: externalIds.data
    };
    dispatch(getMovie(data));
  } catch (error) {
    console.log(error);
  }
};
