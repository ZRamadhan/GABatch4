import { combineReducers } from 'redux';
import musician from './MusicianReducer';
import user from './UserReducer';

const IndexReducer = combineReducers({
    user: user,
    musician: musician
});

export default IndexReducer;
