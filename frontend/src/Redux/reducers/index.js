// redux/reducers/index.js

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  courseCreate: courseReducer,
  // Add other reducers as needed
});

export default rootReducer;
