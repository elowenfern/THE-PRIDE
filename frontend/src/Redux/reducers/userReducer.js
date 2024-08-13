import { SETUSER, LOGIN, LOGOUT, ADMINLOGIN, ADMINLOGOUT, ALLUSERS, UPDATEUSER } from '../ActionType';

const initialState = {
    user: null,      // User information including userType
    token: '',
    userType: null,
    allUsers: [],
    admintoken: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUSER:
            console.log('Reducer received SETUSER:', action.user); 
            return {
                ...state,
                user: action.user, 
                userType: action.user ? action.user.userType : null,
            };

        case LOGIN:
            return {
                ...state,
                token: action.token,
                // user: action.user, // Ensure `user` includes `userType`
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
                token: '',
            };

        case ALLUSERS:
            return {
                ...state,
                allUsers: action.data,
            };

        case UPDATEUSER:
            return {
                ...state,
                allUsers: state.allUsers.map(user =>
                    user.id === action.data.id ? action.data : user
                ),
            };

        case ADMINLOGIN:
            return {
                ...state,
                admintoken: action.token,
            };

        case ADMINLOGOUT:
            return {
                ...state,
                admintoken: '',
                allUsers: [],
            };

        default:
            return state;
    }
};

export default reducer;
