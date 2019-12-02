import {put, call} from 'redux-saga/effects';
import {SHOW_MUSICIAN_DATA, FAILED_GET_ALL_MUSICIAN, SUCCES_ALL_MUSICIAN} from '../type/MusicianType';
import {apiGetAllMusician} from './api/apiMusician';

export function* getMusicianData(action) {
    try {
        const {data} = action;
        const musician = yield call(apiGetAllMusician, data)
        // console.log('isi musician saga ',musician)
        yield put({type: SHOW_MUSICIAN_DATA, payload: musician})
        yield put({type: SUCCES_ALL_MUSICIAN, payload:'Successfully get'})
    }
    catch {
        put({FAILED_GET_ALL_MUSICIAN, payload:'Fatal error '})
        console.log('err', error)
    }
}