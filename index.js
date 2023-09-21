const express = require('express');
const product_routes = require('./routes/userRoutes');
const connectDB = require('./db/connect');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

/*app.get("/home", (req, res)=>{
    res.status(400).json({meggage : "home page"});
    console.log(req.url);
});*/

// use middleware
app.use('/api/product',product_routes);

const start = async ()=>{

    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, ()=>{
            console.log(`server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();
