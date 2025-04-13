import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000

app.use(bodyParser.json());

var data = [
    {name: 'Lucas', age: 29},
    {name: 'Gisele', age: 29},
    {name: 'Castiel', age: 9}
];

app.get('/', (req, res) => {
    req.path;
    res.status(200);
    res.json(data);
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
});

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});