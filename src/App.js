import logo from './logo.svg';
import './App.css';
import {useDispatch} from "react-redux";
import {fetchMovies} from "./redux/movies/movies-actions";
import React from 'react';


function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMovies())
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
