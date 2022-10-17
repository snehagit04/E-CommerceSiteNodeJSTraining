const db = require('../models')
const Category = db.categories;
// Business logic for CRUD operations
module.exports = {
    getAllCategory: (req, res) => {
        Category.findAll()
            .then(category => res.status(200).send(category))
            .catch((err) => {
                console.log(err.message);
            })
    },

    getById: (req, res) => {
        Category.findOne({
            where: { id: req.params.id }
        })
            .then((category) => {
                if (category)
                    res.status(200).send(category)
                else
                    res.status(401).send("Category not present");
            })
            .catch((err) => res.send(err))
    },

    addCategory: (req, res) => {
        Category.create({
            name: req.body.name,
            desc: req.body.desc
        })
            .then((category) => {
                res.send(category);
            })
            .catch((err) => {
                console.log(err.message);
            })
    },

    updateCategory: (req, res) => {

        Category.findOne({ where: { id: req.params.id } })
            .then((category) => {
                if (category) {
                    Category.update(
                        {
                            name: req.body.name,
                            desc: req.body.desc

                        },
                        {
                            where: { id: req.params.id }
                        })
                    res.status(200).send("Category updated")
                }
                else {
                    res.status(400).send("No category with id : " + req.params.id);
                }
            }

            )
            .catch((err) => console.log(err.message))

    },

    deleteCategory: (req, res) => {
        Category.findOne({ where: { id: req.params.id } })
            .then((category) => {
                if (category) {
                    Category.destroy(
                        {
                            where: { id: req.params.id }
                        }

                    )
                    res.status(200).send("Category deleted")
                }
                else {
                    res.status(400).send("No data is present with categoryId :" + req.params.id + " to be deleted")
                }
            })


    }
}

