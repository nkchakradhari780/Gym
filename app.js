const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose-connection')

const indexRoute = require('./routes/indexRoute')
const userRoute = require('./routes/userRoute')
const customerRoute = require('./routes/customresRoute')
const trainersRoute = require('./routes/trainersRoute')
const managerRoute = require('./routes/managersRoute')
const ownerRoute = require('./routes/ownersRoute')

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use('/',indexRoute)

app.use('/user',userRoute);
app.use('/customer',customerRoute);
app.use('/trainer', trainersRoute);
app.use('/manager',managerRoute);
app.use('/owner',ownerRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});  