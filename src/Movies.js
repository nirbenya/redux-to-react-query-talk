import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';
import { useMovies } from './queries';
import Bee from './bee.jpeg';
function Movies() {
	const { data: movies, isLoading } = useMovies();

	if (isLoading)
		return (
			<div className="loader">
				<CircularProgress />
			</div>
		);

	return (
		<>
			<div className={'title'}>
				<h1>I am the bee</h1>
				<img src={Bee}></img>
			</div>
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
		</>
	);
}

export default Movies;
