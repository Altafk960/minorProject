const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(bodyParser.json({ extended: true }));

app.use(userRoutes);


mongoose.connect(
  "mongodb+srv://Altaf:altaf960@altaf.uzjoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
).then(res => console.log("success")).catch(err => {
    console.log(err);
});

app.listen(3001);
