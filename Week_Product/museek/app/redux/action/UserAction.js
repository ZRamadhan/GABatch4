import { GET_USER_DATA} from '../type/UserType'

export const getUser = data => {
    return {
        type : GET_USER_DATA,
        payload : data
    }
}