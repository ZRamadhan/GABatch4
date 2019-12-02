import { combineReducers } from 'redux';
import auth from './AuthReducer';
import user from './UserReducer'

const IndexReducer = combineReducers({
    auth: auth,
    user: user
});

export default IndexReducer;