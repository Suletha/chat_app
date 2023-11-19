const express = require('express');
//const fs = require('fs');
const bodyParse = require('body-parser')
const app = express();
const login_routes = require('./routes/login')
const msg_routes = require('./routes/msg')

app.use(bodyParse.urlencoded({extended:false}));

app.use(login_routes);
app.use(msg_routes);
app.listen(3500)


