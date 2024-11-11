import axios from '../../utils/axios'
import { getPeople } from '../reducers/peopleSlice';
export {removePeople} from '../reducers/peopleSlice'
export const asyncGetPeople = (id) => async (dispatch, getState) => {
    try {
        const details = await axios.get(`/person/${id}`);
        // const recommendations = await axios.get(`/person/${id}/recommendations`);
        // const latest = await axios.get(`/person/${id}/latest`);
        const combinedCredits = await axios.get(`/person/${id}/credits`);
        const images = await axios.get(`/person/${id}/images`);
        // const watchProviders = await axios.get(`/person/${id}/watch/providers`);
        const externalIds = await axios.get(`/person/${id}/external_ids`);
        const peopleData = {
            details: details.data,
            images: images.data,
            combinedCredits: combinedCredits.data,
            externalIds: externalIds.data
        }
        console.log(peopleData)
        dispatch(getPeople(peopleData));
    } catch (error) {
        console.log(error)
    }
}