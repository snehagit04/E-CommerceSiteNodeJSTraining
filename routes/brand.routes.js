const db = require('../models');
const getAllBrand = require('../controllers/brand.controller')
const Brand = db.brands;
var express = require('express')
var app = express();
app.use(express.urlencoded({ extended: false }));
// CRUD Operations for brand : We can get all brands, get specific brand, add , update or delete the brand from repository. 

module.exports = function (app) {
    app.get('/brands', getAllBrand.getAllBrands);

    app.get('/brand/:id', getAllBrand.getByID)

    app.post('/brands/add', getAllBrand.addBrand)

    app.put('/brand/:id', getAllBrand.updateBrand)

    app.delete('/brand/:id', getAllBrand.deleteBrand)
}


