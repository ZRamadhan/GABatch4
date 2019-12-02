import {FETCH_ALL_MUSICIAN} from '../type/MusicianType';

export const getMusician = data => {
    return {
        type: FETCH_ALL_MUSICIAN,
        payload: data
    }
}