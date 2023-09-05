const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// ! DB setup
mongoose.connect(process.env.MONGO_DB_URI)
.then(()=>{
    console.log('db connected');
})
.catch((error)=>{
    console.log(error);
});

// ! Server setup
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send('working');
})

const newsRoutes = require('./router/news');
app.use(newsRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('server working');
})