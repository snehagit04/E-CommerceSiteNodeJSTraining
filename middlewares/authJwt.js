const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send('No Token Provided!!');
    }
    jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        req.userId = decode.id;
        next();
    })
}

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Admin") {
                    next();
                    return;
                }
            }
            res.status(403).send('Requires Admin Role');
            return;
        })
    })
}


isModerator = (req, res, next) => {
    User.findByPk(req.userId)
        .then((user) => {
            user.getRoles()
                .then((roles) => {
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name == "Moderator") {
                            next();
                            return;
                        }
                    }
                    res.status(403).send('Requires Moderator Role');
                    return;
                })
        })
}

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then((user) => {
            user.getRoles()
                .then((roles) => {
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name == "moderator") {
                            next();
                            return;
                        }
                        if (roles[i].name == "admin") {
                            next();
                            return;
                        }
                    }
                    res.status(403).send('Requires Moderator or Admin Role');
                    return;
                })
        })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
}

module.exports = authJwt;