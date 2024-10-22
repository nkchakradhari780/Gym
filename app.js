const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose-connection')
const cors = require('cors');

const indexRoute = require('./routes/indexRoute')
const customerRoute = require('./routes/customresRoute')
const trainersRoute = require('./routes/trainersRoute')
const managerRoute = require('./routes/managersRoute')
const ownerRoute = require('./routes/ownersRoute')
// const plansRoute = require('./routes/plansRoute')

const isOwner = require('./middlewares/isOwner')
const isCustomer = require('./middlewares/isCustomer')
const isManager = require('./middlewares/isManager')
const isTrainer = require('./middlewares/isTrainer')

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }));
app.use('/',indexRoute)

app.get('/loginpage',(req,res) =>{
    res.render('login')
})

app.use('/customer',isCustomer,customerRoute);
app.use('/trainer',isTrainer, trainersRoute);
app.use('/manager',isManager,managerRoute);
app.use('/owner',isOwner,ownerRoute);
// app.use('/plan',plansRoute);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});