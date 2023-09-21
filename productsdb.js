const dbConnect = require("./db/connect");
const modelProduct = require("./models/product");
const productJson = require("./products.json");
require("dotenv").config();


const start = async ()=>{

    try {
        await dbConnect(process.env.MONGO_URL);
        await modelProduct.deleteMany();
        await modelProduct.create(productJson);
        console.log("json success");
    } catch (error) {
        console.log(error)
    }

}

start();