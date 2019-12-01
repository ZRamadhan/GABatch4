import { put, call } from './node_modules/redux-saga/effects';
import { SHOW_USER_DATA, FAILED_GET_USER_DATA, SUCCESS_USER_DATA } from '../type/UserType';
import { apiGetUser } from './api/apiUser';

export function* getUserData(action) {
    console.log('yes',action)

    try{
        const { token } = action;
        const users = yield call(apiGetUser, token)
        yield put({type: SHOW_USER_DATA, payload: users})
        yield put({type: SUCCESS_USER_DATA, payload:'Successfully get'})
    }
    catch{
        yield put({FAILED_GET_USER_DATA, payload:'Fatal error '})
        console.log('er',error)
    }
}