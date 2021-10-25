import './App.css';
import Movies from './Movies';
import Movie from './Movie';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="app">
			<div className="container">
				<Switch>
					<Route path="/" exact>
						<Movies />
					</Route>
					<Route path="/:id" exact>
						<Movie />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
