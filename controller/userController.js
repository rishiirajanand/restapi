const productModel = require("../models/product");


const getAllProducts = async (req, res)=>{

    const { company, name, featured, sort, select } = req.query;
    const queryobject = {};

    //query searching 
    if(company){
        queryobject.company = company;
    }

    if(featured)
    {
        queryobject.featured = featured;
    }

    if(name){
        queryobject.name = {$regex : name, $options : "i"};
    }

    let apiData = productModel.find(queryobject);

    if(sort){
        let sortFix = sort.replace("," , " ");
        apiData = apiData.sort(sortFix);
    }

    //select functionality
    if(select){
        // let selectFix = select.replace("," , " ");
        let selectFix = select.split(",").join(" ");

        apiData = apiData.select(selectFix);
    }


    //pagination limit page set

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page -1) * limit;


    apiData = apiData.skip(skip).limit(limit);


    const Products = await apiData;
    res.status(200).json({Products, nbHits: Products.length});
}

const getAllProductsTesting = async (req, res)=>{

    const Products = await productModel.find(req.query).select("name company"); 
    console.log(req.query);
    res.status(200).json({Products});
}

module.exports = {getAllProducts, getAllProductsTesting};