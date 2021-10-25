import './App.css';
import { useDispatch } from 'react-redux';
import { fetchMovies } from './redux/movies/movies-actions';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';

export const useMovies = (options = {}) => {
	const query = useQuery(
		'movies',
		async () => {
			const response = await fetch('http://localhost:9000/api/movies', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error();
			}
			return data;
		},
		{ ...options },
	);
	return query;
};

function Movies() {
	// const dispatch = useDispatch();

	// React.useEffect(() => {
	// 	dispatch(fetchMovies());
	// }, []);

	const { data: movies, isLoading } = useMovies();

	if (isLoading)
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);
	return (
		<div className="movies">
			{movies.map(movie => (
				<Link to={`/${movie.id}`}>
					<div className={'item'}>
						<div className={'name'}>{movie.name}</div>
						<div className={'likes'}>
							{movie.likes}
							<MdFavorite />
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Movies;
