const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')

const indexRoute = require('./routes/index')
const userRoute = require('./routes/userRoute')
const customerRoute = require('./routes/customresRoute')

require('dotenv').config();

const db = require('./config/mongoose-connection')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use('/',indexRoute)

app.use('/user',userRoute);
app.use('/customer',customerRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});  