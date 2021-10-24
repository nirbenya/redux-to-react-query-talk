import axios from 'axios';
import {FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR} from "./movies-constants";

export const fetchMovies = () => {
    return dispatch => {
        dispatch({type: FETCH_MOVIES_REQUEST});
        axios.get('http://localhost:9000/api/movies').then((data) => {
            dispatch({type: FETCH_MOVIES_SUCCESS, payload: data});

        }).catch(() => {
            dispatch({type: FETCH_MOVIES_ERROR});

        })
    }
}