const express =  require('express');
const {getAllProducts, getAllProductsTesting} = require('../controller/userController')


const router = express.Router();

router.get('/', getAllProducts);
router.get('/testing', getAllProductsTesting);


module.exports = router;