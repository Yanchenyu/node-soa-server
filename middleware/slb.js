// 健康检查中间件

const slbMiddleware = function({app, vd}) {
    app.get(vd + '/slbhealthcheck.html', function(req, res, next) {
        res.status(200).send('slb health check correct!');
    })
}

module.exports = slbMiddleware;
