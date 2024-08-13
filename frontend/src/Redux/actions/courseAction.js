// actions/courseActions.js
import axios from 'axios';

export const CREATE_COURSE_REQUEST = 'CREATE_COURSE_REQUEST';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_FAIL = 'CREATE_COURSE_FAIL';

export const COURSE_LIST_REQUEST = 'COURSE_LIST_REQUEST';
export const COURSE_LIST_SUCCESS = 'COURSE_LIST_SUCCESS';
export const COURSE_LIST_FAIL = 'COURSE_LIST_FAIL';

const API_URL = 'http://localhost:8000/api/'; // Update this with your actual API URL

// Action to create a new course
export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST });

    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      formData.append(key, courseData[key]);
    });

    const { data } = await axios.post(`${API_URL}courses/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({ type: CREATE_COURSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

// Action to fetch all courses
export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    const { data } = await axios.get(`${API_URL}courses/`);

    dispatch({ type: COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
