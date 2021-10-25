import { FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR } from './movies-constants';

const initialState = { data: [] };

function reducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_MOVIES_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}

		case FETCH_MOVIES_SUCCESS: {
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		}

		case FETCH_MOVIES_ERROR: {
			return state;
		}

		default: {
			return state;
		}
	}
}

export default reducer;
