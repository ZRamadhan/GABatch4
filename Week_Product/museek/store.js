import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './app/redux/reducer/';
import IndexSaga from './app/redux/saga/index';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(rootReducer,
            applyMiddleware(sagaMiddleware)),
            runSaga: sagaMiddleware.run(IndexSaga)
    };
};

export default configureStore;