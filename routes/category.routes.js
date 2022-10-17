const db = require('../models');
const Category = db.categories;
const getCategory = require('../controllers/category.controller')
// CRUD Operations for category : We can get all category, get specific category, add , update or delete the category from repository. 

module.exports = function (app) {
    app.get('/categories', getCategory.getAllCategory)
    app.get('/category/:id', getCategory.getById)

    app.post('/categories/add', getCategory.addCategory)

    app.put('/category/:id', getCategory.updateCategory)

    app.delete('/category/:id', getCategory.deleteCategory)
}


