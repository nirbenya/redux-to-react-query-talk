const express = require('express');
const app = express();
const port = 9000;


const cors = require('cors');

app.use(cors({origin: true, credentials: true}));

app.options('*', cors({origin: true, credentials: true})); // include before other routes


let db = [
    {id: 1, name: 'Star wars'},
    {id: 2, name: 'Matrix'},
    {id: 3, name: 'Dune'},
    {id: 4, name: 'Meet the falkers'},
    {id: 5, name: 'Lord of the rings'},
    {id: 2, name: 'Tenet'},
    {id: 2, name: 'Inception'},

];


app.get('/api/movies', (req, res) => {
    res.send(db);
});

app.post('/api/movies', (req, res) => {
    const movie = req.body || {};
    db.push({...movie, id: db.length});

    res.send(movie)
});

app.delete('/api/movies/:id', (req, res) => {
    const movieId = req.params.id;
    db = db.filter(item => item.id === movieId)

    res.send(200)
});

app.put('/api/movies/:id', (req, res) => {
    const movie = req.body || {};
    const movieId = req.params.id;

    db.forEach(((item, index) => {
        if (item.id === movieId) {
            db[index] = {...db[index], ...movie};
            res.send(db[index])
        }
    }))
})

app.get('/api/movies/:id', (req, res) => {
    const movieId = req.params.id;

    db.forEach(((item, index) => {
        if (item.id === movieId) {
            res.send(db[index])
        }
    }))
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
