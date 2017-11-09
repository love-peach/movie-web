var Movie = require('../models/user');

exports.showLogin = function(req, res) {
    res.render('users/login', {
        title: '登录',
    })
}

exports.showSignup = function(req, res) {
    res.render('users/singin', {
        title: '注册',
    })
}

exports.login = function(req, res) {
    var dataBody = req.body;
    console.log(dataBody, 'dataBody')
    console.log(req.params, 'params')
    var account = dataBody.account;
    var password = dataBody.password;

    User.findByAccount(account, function(err, user) {
        if (err) {
            console.log(err, '登录出错')
        } else {
            if (user) {
                if (password === user.password) {
                    res.json({
                        success: 1
                    })
                } else {
                    res.json({
                        success: 0,
                        message: '账号/密码不正确'
                    })
                }
            } else {
                res.json({
                    success: 0,
                    message: '账号不存在'
                })
            }
        }
    })
}

exports.singin = function(req, res) {
    var userBody = req.body;
    var _user;

    User.find({
        account: userBody.account
    }, function(err, user) {
        if (err) {
            console.log('注册时,查询用户出错')
        }
        if (user) {
            res.json({
                success: 0,
                message: '用户名重复'
            })
        } else {
            _user = new User({
                account: userBody.account,
                password: userBody.password
            })
            _user.save(function(err, user) {
                if (err) {
                    console.log(err, '注册出错')
                } else {
                    res.json({
                        success: 1
                    });
                }
            })
        }
    });
}