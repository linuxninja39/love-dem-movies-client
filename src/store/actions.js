import fetch from 'cross-fetch'

export const REQUEST_MOVIES_ACTION_TYPE = "REQUEST_MOVIES";
export const RECEIVE_MOVIES_ACTION_TYPE = "RECEIVE_MOVIES";
export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_LOGGED_OUT = "SET_LOGGED_OUT";
export const SAVE_RATING = "SAVE_RATING";

export const SAVE_RATING_ACTION = {
    type: SAVE_RATING,
    user: null,
    movie: null,
    rating: null
}

export const REQUEST_MOVIES_ACTION = {
    type: REQUEST_MOVIES_ACTION_TYPE
};

export const SET_MOVIES_ACTION = {
    type: RECEIVE_MOVIES_ACTION_TYPE,
    movies: null
};

export function saveRating(ratingInfo) {
    return function (dispatch, getState) {
        const state = getState();
        console.log('save rating state is ', state);
        ratingInfo = {
            ...ratingInfo,
            user: `http://localhost:8000/users/${state.userInfo.user.id}/`
        };
        console.log('save rating ratingInfo', ratingInfo);
        const body = JSON.stringify(ratingInfo);
        return fetch(
            'http://localhost:8000/movieuserratings/',
            {
                method: 'post',
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${state?.userInfo?.token}`
                }
            }
        )
            .then(
                response => {
                    console.log('save rating response', response);
                    dispatch(fetchMovies());
                }
            )
    }
}

export function requestMovies() {
    return REQUEST_MOVIES_ACTION
}

export function setLoggedIn(userInfo) {
    return {
        type: SET_LOGGED_IN,
        userInfo
    }
}

export function setLoggedOut() {
    return {
        type: SET_LOGGED_OUT,
        userInfo: null,
        loggedIn: false
    }
}

export function login(username, password) {
    return function (dispatch) {
        const body = JSON.stringify({username, password});
        console.log('login', body);
        return fetch(
            'http://localhost:8000/token-auth/',
            {
                method: 'post',
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(
                response => {
                    console.log('in login response is', response);
                    return response.json()
                }
            )
            .then(
                data => {
                    console.log('logged in data is', data);
                    dispatch(setLoggedIn(data));
                }
            )
    }
}

export function receiveMovies(movies) {
    console.log('setMovies: ', movies);
    return {...SET_MOVIES_ACTION, movies}
}


export function fetchMovies() {
    return function (dispatch, getState) {
        dispatch(requestMovies())

        const {loggedIn, userInfo} = getState();

        if (!userInfo || !userInfo.token) {
            dispatch(setLoggedOut());
            return;
        }

        console.log('fetching movies, loggedIn, userInfo is', loggedIn, userInfo);
        return fetch(
            'http://localhost:8000/movies/',
            {headers: {Authorization: `JWT ${userInfo.token}`}}
        )
            .then(
                response => {
                    console.log('in fetchMovies response is', response);
                    return response.json()
                }
            )
            .then(
                data => {
                    console.log('fetchMovies data is', data);
                    dispatch(receiveMovies(data.results));
                }
            )
    }
}
