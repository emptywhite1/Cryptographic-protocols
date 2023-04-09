const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DHRoutes = require('./routes/DHRoutes');
const SchnorrRoutes = require('./routes/SchnorrRoutes');
const ChaumRoutes = require('./routes/ChaumRoutes');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use('/api/dh', DHRoutes);
app.use('/api/schnorr', SchnorrRoutes);
app.use('/api/chaum', ChaumRoutes);


app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
