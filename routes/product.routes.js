
const db = require('../models');
const Product = db.products;

module.exports = function (app) {
    app.get('/products', (req, res) => {
        res.send('Products Here')
    })

    app.post('/products/add', (req, res) => {
        Product.create({
            name: req.body.name,
            desc: req.body.desc,
            brandId: req.body.brandId,
            categoryId: req.body.categoryId
        })
            .then((product) => {
                res.send(product);
            })
            .catch((err) => {
                console.log(err.message);
            })
    })
}


