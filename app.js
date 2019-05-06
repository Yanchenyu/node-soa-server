const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

const App = function({
    autoStart = true,   // 是否自动启动
} = {}) {
    const config = {};
    
    try {
        Object.assign(config, require(path.resolve('./package.json')).config);
    } catch (e) {
        console.log('[node-soa-service] load package.json config fail!')
    }
    
    const port = config.port || process.env.PORT || 8080;
    const vd = (config.vd || '/').replace(/\/+$/g, '');
    
    const args = {app, vd};
    
    const registerMiddleware = function(name) {
        return require(`./middleware/${name}.js`)(args)
    };
    
    // 请求体转换为JSON
    app.use(bodyParser.json({strict: true}));
    
    // 将Cookie转换为JSON
    app.use(cookieParser());
    
    app.use('/yan/aa', function(req, res, next) {
        // res.status(200).json({user: 'ids'})
        res.status(200).send('<h1>123456</h1>')
    });

    // 启动服务
    const start = function() {
        app.listen(port, function() {
            const message = `load config with: ${JSON.stringify(config)}, mount route at ${(vd || '/')}, start at port ${port}`
            console.log(message)
        });
    }
    
    if (autoStart) {
        start();
        return
    }

    return {
        app,
        vd,
        start
    }
    
};

module.exports = function(config) {
    return App(config)
};
