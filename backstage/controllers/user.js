var User = require('../models/user');

exports.showLogin = function(req, res) {
    res.render('login/login', {
        title: '登录',
    })
}

exports.showSignup = function(req, res) {
    res.render('sigup/sigup', {
        title: '注册',
    })
}

exports.list = function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err, '后台列表页报错');
        } else {
            res.render('admin/user/list', {
                title: '用户列表',
                users: users
            })
        }
    });
}

exports.logout = function(req, res) {
    delete req.session.user;
    res.json({
        success: 1
    });
}

exports.login = function(req, res) {
    var dataBody = req.body;
    var account = dataBody.account;
    var password = dataBody.password;

    User.findByAccount(account, function(err, user) {
        if (err) {
            console.log(err, '登录出错')
        }
        
        if (!user) {
            return res.json({
                success: 0,
                message: '账号不存在'
            })
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err)
            }

            if (isMatch) {
                req.session.user = user;
                res.json({
                    success: 1
                })
            } else {
                res.json({
                    success: 0,
                    message: '账号/密码不正确'
                })
            }
        })
    })
}

exports.sigup = function(req, res) {
    var userBody = req.body;
    var _user;

    User.findOne({
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
            _user = new User(userBody)
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