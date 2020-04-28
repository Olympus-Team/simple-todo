const User = require('../models/users');

module.exports.createUser = (req, res, next) => {
    let { name, email } = req.body;

    User.create({ name, email })
    .then((data) =>{
        res.json({
            status_code: 200,
            data: {data}
        });
    }).error((err) =>{
        res.json({
            status_code: 500,
            data: {err}
        })
    });

}

module.exports.getListUser = async (req, res, next) => {
    let users = await User.findAll();
    res.json(users);
}

module.exports.getUserById = async (req, res, next) => {
    let userId = req.params.userId;
    let user = await User.findAll({where: {id: userId}});
    res.json({
        status_code: 200,
        data: user
    });
}

module.exports.updateUserById = async (req, res, next) => {
    let userId = req.body.user_id;
    let name = req.body.name;
    console.log(userId + '-' + name);
    let user = null;
    user = await User.findAll({where: {id: userId}});
    if (user != null) {
        await User.update({ name: name }, { where: {id: userId}});
        res.json({
            status_code: 200,
            message: 'Update success'
        });
    }
    res.json({
        status_code: 500,
        message: 'This user is not exist'
    });
}

module.exports.deleteUser = async (req, res, next) => {
    let userId = req.params.userId;
    User.destroy({
        where: {id: userId}
    }).then((data) => {
        res.json({
            status_code: 200,
            message: 'Delete success'
        });
    }).catch((err) => {
        res.json({
            status_code: 500,
            message: 'Delete fail'
        });
    })
}