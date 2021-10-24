import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// reducers
import moviesReducer from './movies/movies-reducer';


const store = createStore(
    combineReducers({
        movies: moviesReducer
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;