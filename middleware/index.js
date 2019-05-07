// 中间件汇总

// 注册
const registerMiddleware = function(name) {
    return function(args) {
        require(`./${name}.js`)(args)
    }
};

const MiddlewareCreator = function({
    slbhealthcheck
}) {
    return function(args) {
        if (slbhealthcheck) {
            registerMiddleware('slb')(args)
        }
    }
}

module.exports = MiddlewareCreator;
