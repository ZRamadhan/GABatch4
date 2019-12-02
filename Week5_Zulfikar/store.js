import {createStore} from 'redux'
import rootReducer from './src/redux/reducer/index'

const configureStore = () => {
    return {
        ...createStore(rootReducer)
    }
}

export default configureStore