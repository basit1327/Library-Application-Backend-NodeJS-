'use strict';

const printRequestURL = true,
    auth = require('../services/auth'),
    userAPIRoute = require('./user_api'),
    adminAPIRoute = require('./admin_api'),
    loginRoute = require('../routes/login');

function init(server) {

    // supporting every casing in query parameters
    server.use(function (req, res, next) {
        for (var key in req.query) {
            req.query[key.toLowerCase()] = req.query[key];
        }
        for (var key in req.body) {
            req.body[key.toLowerCase()] = req.body[key];
        }
        next();
    });

    server.use('/', function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Authorization");
        next();
    });

    server.get('/', function (req, res) {
        res.send('IKUL')
    });

    server.use('/user',auth.authenticateUserSession,userAPIRoute);
    server.use('/admin',auth.authenticateAdminSession,adminAPIRoute);
    server.use('/auth',loginRoute);

}

module.exports = {
    init: init
};
