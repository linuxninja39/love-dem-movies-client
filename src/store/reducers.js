import {REQUEST_MOVIES_ACTION_TYPE, RECEIVE_MOVIES_ACTION_TYPE, SET_LOGGED_IN, SET_LOGGED_OUT} from "./actions";

const initialState = {
    loggedIn: false,
    userInfo: null,
    movies: []
}

export function movieReducers(state, action) {
    console.log('reducers', state, action);
    switch (action.type) {
        case REQUEST_MOVIES_ACTION_TYPE:
            return state;
        case SET_LOGGED_OUT:
            const {loggedIn, userInfo} = action;
            return {...state, loggedIn, userInfo}
        case SET_LOGGED_IN:
            console.log('setting logged in', state, action);
            if (action.userInfo) return {...state, loggedIn: true, userInfo: action.userInfo}
            return state;
        case RECEIVE_MOVIES_ACTION_TYPE:
            console.log('setting movies', state, action);
            let {movies} = action;
            console.log('setting movies, movies', movies);
            return {...state, movies}
        default:
            if (!state) state = initialState;
            return state;

    }
}
