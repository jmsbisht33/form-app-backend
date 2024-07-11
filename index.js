const express = require("express")
const app = express()
const port = process.env.PORT || 5200;
const cors = require("cors")
const mongoose = require("mongoose")
const usersRoute = require('./routers/user-routes')

//db connect
const connect = async() => {
    try {
        await mongoose.connect('mongodb+srv://inShare:14608726l@cluster0.w07kf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            dbName: 'social-media'
        })

        console.log(`DB connected successfully`);
    } catch (error) {
        console.log(error);
    }
}

connect();

// middleware
app.use(cors())

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/users', usersRoute);

app.listen(port, () => {
    console.log(`app is running at port ${port}`);
})