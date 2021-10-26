import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchMovies } from './redux/movies/movies-actions';
import React from 'react';
import one from './sound/1 1-GHS_123_Filo_Kick_Clap.mp3';
import two from './sound/1 2-hk_top125_funkdirt.mp3';
import three from './sound/1 3-GHS_123_Gm_Sun_Synth_Bass.mp3';
import four from './sound/1 4-hk_gtr125_frisco_Gm.mp3';
import five from './sound/1 5-hk_gtr125_pickcut_Gm.mp3';
import six from './sound/1 6-hk_syn125_holdme1_Gm.mp3';
import seven from './sound/1 7-hk_top125_latint.mp3';
import eight from './sound/1 8-hk_top125_zulu.mp3';
import nine from './sound/1 9-hk_mus125_lovefunk2_Gm.mp3';

const audios = [
	{ stream: new Audio(one), isPlaying: false, id: 0 },
	{ stream: new Audio(two), isPlaying: false, id: 1 },
	{
		stream: new Audio(three),
		isPlaying: false,
		id: 2,
	},
	{ stream: new Audio(four), isPlaying: false, id: 3 },
];

function App() {
	const dispatch = useDispatch();
	const [playingList, setPlayingList] = React.useState([]);
	const [seconds, setSeconds] = React.useState(0);
	// React.useEffect(() => {
	// 	dispatch(fetchMovies());
	// }, []);

	React.useEffect(() => {
		if (playingList.length === 1) {
			setInterval(() => {
				setSeconds(prev => prev + 1);
			}, 1000);
		}
	}, [playingList]);

	React.useEffect(() => {}, [seconds]);

	React.useEffect(() => {
		playingList.forEach(item => {
			const audioData = audios.find(audio => item.id === audio.id);
			if (!audioData.isPlaying) {
				audioData.stream.loop = true;
				const nextList = [...playingList];
				nextList[item.id] = { ...nextList[item.id], isPlaying: true };
				setPlayingList(nextList);
				audioData.stream.play();
			} else {
				//audioData.url.stop()
			}
		});
	}, []);

	return (
		<div
			className="App"
			style={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<h1>{seconds}</h1>
			<div style={{ maxWidth: '300px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
				{audios.map((audio, index) => {
					return (
						<div
							onClick={() => {
								setPlayingList(prev => [...prev, { id: audio.id, audio: null }]);
							}}
							style={{ height: 80, width: 80, border: '1px solid black' }}
						>
							{index}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
