const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/code', //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: 'http://docker:8080/', //타겟이 되는 api url를 입력합니다.
            changeOrigin: true,
            pathRewrite:{
                '^/code': ''
            }
        })
    );
};