import {
    FETCH_ALL_MUSICIAN,
    SHOW_MUSICIAN_DATA,
    SUCCES_ALL_MUSICIAN,
    FAILED_GET_ALL_MUSICIAN
} from '../type/MusicianType'

const initialState = {
    loading: true,
    data: [],
    message: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_MUSICIAN: return {
            ...state,
            loading: true
        }
        case SUCCES_ALL_MUSICIAN: return {
            ...state,
            loading: false,
            data: action.payload
        }
        case SHOW_MUSICIAN_DATA: return {
            ...state,
            loading: false,
            message: action.payload
        }
        case FAILED_GET_ALL_MUSICIAN: return {
            ...state,
            loading: false,
            message: action.payload
        }
        default: return state
    }
}