
const express = require('express');
const db = require('./models');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express();

db.sequelize.sync({ force: true })

// Middleware
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/news', require('./routes/news'))
app.use('/api/v1/warning', require('./routes/warning'))

app.get('/', async (req, res) => {
    await res.send('Hello world11');
});

const port = process.env.port | 80;

app.listen(port, () => console.log(`listening on port ${port}`));
