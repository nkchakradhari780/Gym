const express = require('express');
const app = express();
const path = require('path');
const indexRoute = require('./routes/index')
const userRoute = require('./routes/userRoute')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const db = require('./config/mongoose-connection')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use('/',indexRoute)

app.use('/user',userRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});  