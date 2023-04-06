const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const DHRoutes = require('./routes/DHRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/dh', DHRoutes);



app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
