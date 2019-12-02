import { GET_USER_DATA } from '../type/UserType';

const initialState = {
    dataUser: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                dataUser: action.payload,
            };
        default:{
            return state;
        }
    }
};