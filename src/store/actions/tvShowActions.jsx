import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { getTvShow } from "../reducers//tvShowSlice";
export { removeTvShow } from "../reducers/tvShowSlice";

export const asyncGetTvShow = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const credits = await axios.get(`/tv/${id}/credits`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const externalIds = await axios.get(`/tv/${id}/external_ids`);

    const data = {
      details: details.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      credits: credits.data,
      videos: videos.data.results?.filter(v => v.type === "Trailer")[0],
      watchProviders: watchProviders.data.results.US,
      externalIds: externalIds.data
    };
   
    dispatch(getTvShow(data));
  } catch (error) {
    console.log(error);
  }
};
