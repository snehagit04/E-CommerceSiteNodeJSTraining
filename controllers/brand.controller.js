
const db = require('../models')
const Brand = db.brands;
// Business logic for CRUD operations

module.exports = {

    getAllBrands: (req, res) => {
        var brand = [];
        Brand.findAll()
            .then(brands => {
                for (i = 0; i < brands.length; i++) {
                    brand.push({
                        id: brands[i].id,
                        name: brands[i].name,
                        desc: brands[i].desc

                    })
                }
                res.send(brand);
            })
            .catch((err) => res.send("There is error" + err.message))
    },


    getByID: (req, res) => {
        Brand.findOne({
            where: { id: req.params.id }
        })
            .then((brand) => {
                if (brand)
                    res.status(200).send({
                        id: brand.id,
                        name: brand.name,
                        desc: brand.desc
                    })
                else
                    res.status(401).send("Brand not present");
            })
            .catch((err) => res.send(err.message))
    },

    addBrand: (req, res) => {

        Brand.create({
            name: req.body.name,
            desc: req.body.desc
        })
            .then((brand) => {
                res.send(brand);
            })
            .catch((err) => {
                console.log(err.message);
            })




    },

    updateBrand: (req, res) => {

        Brand.findOne({ where: { id: req.params.id } })
            .then((brand) => {
                if (brand) {
                    brand.update(
                        {
                            name: req.body.name,
                            desc: req.body.desc

                        },
                        {
                            where: { id: req.params.id }
                        })
                    res.status(200).send("Brand updated")
                }
                else {
                    res.status(400).send("No brand with id : " + req.params.id);
                }
            }

            )
            .catch((err) => console.log(err.message))

    },



    deleteBrand: (req, res) => {
        Brand.findOne({ where: { id: req.params.id } })
            .then((brand) => {
                if (brand) {
                    Brand.destroy(
                        {
                            where: { id: req.params.id }
                        }

                    )
                    res.status(200).send("Brand deleted")
                }
                else {
                    res.status(400).send("No data is present with BrandID :" + req.params.id + " to be deleted")
                }
            })


    }
}