module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'welcome$1234',
    db: 'projectdb',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}