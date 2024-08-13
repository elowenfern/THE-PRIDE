// src/Redux/actions.js

import { SETUSER, LOGIN, LOGOUT, ADMINLOGIN, ADMINLOGOUT, ALLUSERS, UPDATEUSER } from '../ActionType';

// Action creator for setting user
export const setUser = (user) => ({
    type: SETUSER,
    user,
});

// Action creator for login
export const login = (token, user) => ({
    type: LOGIN,
    token,
    user,
});

// Action creator for logout
export const logout = () => ({
    type: LOGOUT,
});

// Action creator for admin login
export const adminLogin = (token) => ({
    type: ADMINLOGIN,
    token,
});

// Action creator for admin logout
export const adminLogout = () => ({
    type: ADMINLOGOUT,
});

// Action creator for getting all users
export const setAllUsers = (data) => ({
    type: ALLUSERS,
    data,
});

// Action creator for updating a user
export const updateUser = (data) => ({
    type: UPDATEUSER,
    data,
});
