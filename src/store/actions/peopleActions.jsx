import axios from '../../utils/axios'
import { getPeople } from '../reducers/peopleSlice';
export {removePeople} from '../reducers/peopleSlice'
export const asyncGetPeople = (id) => async (dispatch, getState) => {
    try {
        const details = await axios.get(`/person/${id}`);
        // const recommendations = await axios.get(`/person/${id}/recommendations`);
        // const latest = await axios.get(`/person/${id}/latest`);
        const credits = await axios.get(`/person/${id}/combined_credits`);
        const images = await axios.get(`/person/${id}/images`);
        const taggedImages = await axios.get(`/person/${id}/tagged_images`);
        const externalIds = await axios.get(`/person/${id}/external_ids`);
        const peopleData = {
            details: details.data,
            images: images.data,
            credits: credits.data,
            externalIds: externalIds.data,
            taggedImages: taggedImages.data.results,
        }
        console.log(peopleData)
        dispatch(getPeople(peopleData));
    } catch (error) {
        console.log(error)
    }
}