// redux/reducers/courseReducer.js

import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
} from '../ActionType';

const initialState = {
  loading: false,
  course: null,
  error: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_COURSE_SUCCESS:
      return { ...state, loading: false, course: action.payload };
    case CREATE_COURSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default courseReducer;
