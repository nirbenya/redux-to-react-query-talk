const express = require('express');

const app = express();
const port = 9000;

const cors = require('cors');

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.options('*', cors({ origin: true, credentials: true })); // include before other routes
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/api/movies', async (req, res) => {
	await delay(2000);
	res.send(db);
});

let db = [
	{
		id: 5,
		name: 'Lord of the Rings',
		likes: 1780,
		brief: "the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.",
	},
	{
		id: 1,
		name: 'Star Wars',
		likes: 543,
		brief: 'Star Wars is an American epic space opera multimedia franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop-culture phenomenon.',
	},
	{
		id: 2,
		name: 'Matrix',
		likes: 499,
		brief: "The film describes a future in which reality perceived by humans is actually the Matrix, a simulated reality created by sentient Machines in order to pacify and subdue the human population while their bodies' heat and electrical activity are used as an energy source.",
	},
	{ id: 8, name: 'Interstellar', likes: 350 },
	{ id: 7, name: 'Inception', likes: 32 },
	{ id: 3, name: 'Good Fellas', likes: 0 },
	{ id: 6, name: 'Tenet', likes: 0 },
	{ id: 4, name: 'Looper', likes: 0 },
];

app.post('/api/movies', (req, res) => {
	const movie = req.body || {};
	db.push({ ...movie, id: db.length });

	res.send(movie);
});

app.delete('/api/movies/:id', (req, res) => {
	const movieId = req.params.id;
	db = db.filter(item => item.id === movieId);

	res.send(200);
});

app.put('/api/movies/:id', (req, res) => {
	const movie = req.body || {};
	const movieId = parseInt(req.params.id);

	db.forEach(async (item, index) => {
		if (item.id === movieId) {
			db[index] = { ...db[index], ...movie };
			console.log(db[index]);
			await delay(2000);
			res.send(db);
		}
	});
});

app.get('/api/movies/:id', (req, res) => {
	const movieId = req.params.id;

	db.forEach((item, index) => {
		if (item.id === movieId) {
			res.send(db[index]);
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
