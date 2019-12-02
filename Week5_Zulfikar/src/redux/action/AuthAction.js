import { FETCH_TOKEN } from '../type/AuthType';

export const auth = data => {
    // console.log(data)
    return {
        type: FETCH_TOKEN,
        payload: data
    };
};