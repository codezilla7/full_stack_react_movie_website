require("dotenv").config()
const cors = require("cors")
const express = require("express"); 
const mongoose = require("mongoose")
const MovieRoutes = require("./routes/Movies")
const CategoryRoutes = require("./routes/Categories")
const UserRoutes = require("./routes/User")
const contactsRoutes = require("./routes/Contactus")
const sliderRoutes = require('./routes/Slider')

const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// Routes

app.use('/movies' , MovieRoutes)
app.use('/categories' , CategoryRoutes)
app.use('/users', UserRoutes)
app.use('/' , contactsRoutes)
app.use('/slider' , sliderRoutes)


// connecting to database

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, ()=>{console.log('working on port',process.env.PORT)})
    })
    .catch((error) => {
        console.log('couldnot connect')
    })



