import { REQUEST_USER_DATA } from '../type/UserType'

export const getUser = data => {
    return {
        type: REQUEST_USER_DATA,
        token: data
    }
}