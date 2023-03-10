const express = require('express');
const app = express();

app.use(express.json());

const Birds = [
    { id: 1, type: 'Pigeon', color: 'White' },
    { id: 2, type: 'Eagle', color: 'Brown' },
    { id: 3, type: 'Parrot', color: 'Green' },
    { id: 4, type: 'Duck', color: 'Yellow' },
    { id: 5, type: 'Owl', color: 'Black' },
    { id: 6, type: "Swan", color: "White" },
];

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Mo's Bird Server!</h1>`
    +`<h2>Available routes:</h2>`+
    `<h3>
    <br>/birds`+
    `<br>/birds/id`+
    `<br>/birds?type=type`+
    `<br>/birds?color=color`+
    `<br>/birds?type=type&color=color
    </h3>`);
});

app.get('/birds', (req, res) => {
    if (!req.query.type && !req.query.color) {
        res.send(Birds);
    } else if (!req.query.type && req.query.color) {
        const birds = Birds.filter(b => b.color.toLowerCase() === req.query.color.toLowerCase());
        if (birds.length === 0) {
            res.status(404).send('Birds not found');
        }
        res.send(birds);
    } else if (req.query.type && !req.query.color) {
        const birds = Birds.filter(b => b.type.toLowerCase() === req.query.type.toLowerCase());
        if (birds.length === 0) {
            res.status(404).send('Birds not found');
        }
        res.send(birds);
    } else if (req.query.type && req.query.color) {
        const birds = Birds.filter(b => b.type.toLowerCase() === req.query.type.toLowerCase() && b.color.toLowerCase() === req.query.color.toLowerCase());
        if (birds.length === 0) {
            res.status(404).send('Birds not found');
        }
        res.send(birds);
    } else {
        res.status(404).send('Birds not found');
    }
});

app.get('/birds/:id', (req, res) => {
    const bird = Birds.find(b => b.id === parseInt(req.params.id));
    if (!bird) {
        res.status(404).send('Bird not found')
    };
    res.send(bird);
});

app.listen(8080);