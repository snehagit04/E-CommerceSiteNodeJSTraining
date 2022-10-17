module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        }
    })
    return Product;
}