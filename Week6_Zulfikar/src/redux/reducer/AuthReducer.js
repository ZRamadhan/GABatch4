import { FETCH_TOKEN } from '../type/AuthType'

const initialState = {
    token: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                token: action.payload
            };
            default:
                return state;
    }
};