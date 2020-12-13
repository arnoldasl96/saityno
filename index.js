const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');
app.use(bodyParser.json());
app.use(cors());


//Import Routes
const CarriersRoute = require('./routes/Carriers.js');
const CarriersPlanes = require('./routes/CarriersPlanes');
const PlanesRoute = require('./routes/Planes.js');
const PlacesRoute = require('./routes/Places.js');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users')

app.use('/carriers', CarriersRoute);
app.use('/carriers', CarriersPlanes);
app.use('/planes', PlanesRoute);
app.use('/places', PlacesRoute);
app.use('/api/user',authRoute);
app.use('/users',usersRoute);
//ROUTES

app.get('/', (req,res) => {
    res.send("we are home");
})
app.get('*', (req,res) => {
    res.send("404 page not found");
})
// Listening to server


//Connect to Db

try {
    mongoose.connect( process.env.DB_CONNECTION, {useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }
app.listen(PORT);