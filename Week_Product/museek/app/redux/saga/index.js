import {all, takeLatest} from 'redux-saga/effects'
import {FETCH_ALL_MUSICIAN} from '../type/MusicianType'
import {getMusicianData} from './musician'

export default function* IndexSaga() {
    yield all([takeLatest(FETCH_ALL_MUSICIAN, getMusicianData)]);
}