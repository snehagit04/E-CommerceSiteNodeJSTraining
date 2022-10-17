
const { authJwt } = require('../middlewares');
const userController = require('../controllers/user.controllers');

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get('/api/all', userController.allAccess);

    app.get('/api/user', [authJwt.verifyToken], userController.userAccess);

    app.get('/api/mod', [authJwt.verifyToken, authJwt.isModerator], userController.moderatorAccess);

    app.get('/api/admin', [authJwt.verifyToken, authJwt.isAdmin], userController.adminAccess);

}