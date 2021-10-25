import React from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import { useMovies } from './Movies';
import { MdArrowBack, MdFavorite } from 'react-icons/md';
import Button from '@mui/material/Button';
import { useMutation, useQueryClient } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';

const useUpdateMovie = id => {
	const queryClient = useQueryClient();

	return useMutation(
		'update-movie',
		async payload => {
			const response = await fetch(`http://localhost:9000/api/movies/${id}`, {
				method: 'PUT',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error();
			}
			return await response.json();
		},
		{
			onSuccess: data => {
				// we can either update the cache directly with the server response
				queryClient.setQueryData('movies', data);
				// or invalidate the query for future refetch
				// queryClient.invalidateQueries('movies');
			},
		},
	);
};

function Movie() {
	const { id } = useParams();
	const history = useHistory();
	const { data: movies, isLoading } = useMovies({ enabled: false });
	const { mutate: updateMovie, isLoading: isUpdating, isSuccess } = useUpdateMovie(id);

	if (isSuccess) history.push('/');

	if (isLoading || isUpdating)
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);

	const movie = movies.find(movie => movie.id === parseInt(id));

	return (
		<div className="movie">
			<Link to="/" className="back">
				<MdArrowBack />
			</Link>
			<div className="name">{movie?.name}</div>
			<div className="brief">"{movie?.brief}"</div>

			<div className="like-button">
				<Button
					variant="contained"
					startIcon={<MdFavorite />}
					size={'large'}
					onClick={() => updateMovie({ likes: movie.likes + 1 })}
				>
					Like
				</Button>
			</div>
		</div>
	);
}

export default Movie;
