const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const cors = require('cors');
const path = require("path");
const player_route = require('./routes/playerRoute');
const futsalRoute = require('./routes/futsalRoute');
const eventRoute = require('./routes/eventRoute');
const communityRoute = require('./routes/communityRoute');
const futsalbookRoute = require('./routes/futsalbookRoute');

var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'images')));
app.use(player_route);
app.use(futsalRoute);
app.use(eventRoute);
app.use(communityRoute);
app.use(futsalbookRoute);

app.listen(8080);