import { all, takeLatest } from './node_modules/redux-saga/effects';
import { REQUEST_USER_DATA } from '../type/UserType';
import { getUserData } from './user';

export default function* IndexSaga() {
    yield all([takeLatest(REQUEST_USER_DATA, getUserData)]);
}