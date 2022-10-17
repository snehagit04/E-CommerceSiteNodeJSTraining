
const config = require('../configs/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    signup: (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
            .then((user) => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        user.setRoles(roles).then(() => { res.send('User Signed Up successfully.'); })
                    })
                } else {
                    user.setRoles([1]).then(() => { res.send('User signed Up successfully.'); })
                }
            })
            .catch((err) => {
                res.status(500).send(err.message);
            })
    },

    signin: (req, res) => {
        User.findOne({
            where: { username: req.body.username }
        })
            .then((user) => {
                if (!user) {
                    return res.status(400).send('User Not Found!!');
                }
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) {
                    return res.status(401).send('Invalid Password!!');
                }
                var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
                var authorities = [];
                user.getRoles().then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                        console.log(roles[i].name);
                        authorities.push("ROLE_" + roles[i].name.toUpperCase());
                    }
                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: authorities,
                        accessToken: token
                    })
                })
            })
            .catch((err) => {
                res.status(500).send(err.message);
            })
    }
}