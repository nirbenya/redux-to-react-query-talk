import React from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';
import { useMovies, useUpdateMovie } from './queries';
import { MdArrowBack, MdFavorite } from 'react-icons/md';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';

function Movie() {
	const { id } = useParams();
	const history = useHistory();
	const { data: movies, isLoading } = useMovies();
	const { mutate: updateMovie, isLoading: isUpdating, isSuccess } = useUpdateMovie(id);

	if (isSuccess) history.push('/');

	if (isLoading || isUpdating)
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);

	const movie = movies?.find(movie => movie.id === parseInt(id));

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
					onClick={() => updateMovie({ likes: ++movie.likes })}
				>
					Like
				</Button>
			</div>
		</div>
	);
}

export default Movie;
