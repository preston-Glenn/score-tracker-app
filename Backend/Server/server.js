const express = require ('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const PORT = 5000
const app = express()
//db: 13Uha0ooJyCNglbK

app.use(cors()) 
app.use(express.json())

const uri = process.env.ATLAS_URI

console.log(uri)
mongoose.connect(uri,{ useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.once('open',()=>{
    console.log("MongoDB connected Succesfully")
})

const scoreboardRouter = require('./Routes/scoreboards');
const usersRouter = require('./routes/users');

app.use('/scoreboards', scoreboardRouter);
app.use('/users', usersRouter);


app.listen(PORT,function(){
    console.log("Server is running")
})
