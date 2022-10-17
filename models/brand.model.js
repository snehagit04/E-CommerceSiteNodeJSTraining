module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("brands", {
        name: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        }
    })
    return Brand;
}