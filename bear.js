const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(cors());
app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = [
    { id: 0, name: 'pooh', weight: 211 },
    { id: 1, name: 'winny', weight: 111 }
];

router.route('/bears')
    .get((req, res) => {
        res.json(bears);
    })
    .post((req, res) => {
        const { name, weight } = req.body;
        const newBear = {
            id: bears.length,
            name,
            weight
        }
        bears.push(newBear);
        res.json({ message: 'Bear Created' });
    })

router.route('/bears/:bear_id')
    .get((req, res) => {
        const id = req.params.bear_id;
        res.json(bears[id]);
    })
    .put((req, res) => {
        const id = req.params.bear_id;
        const { name, weight } = req.body;
        bears[id].name = name;
        bears[id].weight = weight;
        res.json({ message: `Bear Updated : ${id}`})
    })
    .delete((req, res) => {
        const id = req.params.bear_id;
        delete bears[id];
        res.json({ message: `Bear Deleted : ${id}`})
    })

app.use('*', (req, res) => {
    res.status(404).send('404 NOT found');
});

app.listen(80, () => {
    console.log('Listening to port 80')
})

