const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: 'http://backend:5000/', //타겟이 되는 api url를 입력합니다.
            changeOrigin: true,
            pathRewrite:{
                '^/api': ''
            }
        })
    );
};