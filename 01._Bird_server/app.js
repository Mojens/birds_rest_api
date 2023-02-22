const { Birds, getNextId } = require('../01._Bird_server/birds.js');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/birds', (req, res) => {
    // at skrive ? er det samme som at sige req.query.type ? req.query.type.toLowerCase() : undefined;, 
    // det er så den ikke kaster en fejl ved at bruge toLowerCase på undefined
    const type = req.query.type?.toLowerCase();
    const color = req.query.color?.toLowerCase();
    const filteredBirds = Birds.filter(bird => (
        (!type || bird.type.toLowerCase() === type) &&
        (!color || bird.color.toLowerCase() === color)
    ));
    res.send(filteredBirds);
});


app.get('/birds/:id', (req, res) => {
    const bird = Birds.find(b => b.id === parseInt(req.params.id));
    if (!bird) {
        res.status(404).send(`Could not find Bird with ID: ${req.params.id}.`);
    };
    res.send(bird);
});
app.post('/birds', (req, res) => {
    const bird = {
        id: getNextId(),
        type: req.body.type,
        color: req.body.color
    };
    console.log(bird);
    Birds.push(bird);
    res.send(bird);
});
app.put('/birds/:id', (req, res) => {
    const bird = Birds.find(b => b.id === parseInt(req.params.id));
    if (!bird) {
        res.status(404).send(`Could not find Bird with ID: ${req.params.id}.`);
    };
    bird.type = req.body.type;
    bird.color = req.body.color;
    res.send(bird);
});
app.patch('/birds/:id', (req, res) => {
    const bird = Birds.find(b => b.id === parseInt(req.params.id));
    if (!bird) {
        res.status(404).send(`Could not find Bird with ID: ${req.params.id}.`);
    } else {
        // hvis der er en type, så skal den opdateres
        if (req.body.type) {
            bird.type = req.body.type;
        }
        // hvis der er en color, så skal den opdateres
        if (req.body.color) {
            bird.color = req.body.color;
        }
        res.send(bird);
    }
});
app.delete('/birds/:id', (req, res) => {
    const bird = Birds.find(b => b.id === parseInt(req.params.id));
    if (!bird) {
        res.status(404).send(`Could not find Bird with ID: ${req.params.id}.`);
        return;
    }
    const index = Birds.indexOf(bird);
    Birds.splice(index, 1);
    res.send(`Deleted bird with ID ${req.params.id}.`);
});


app.listen(8080, () => {
    console.log('Server started on port 8080');
});