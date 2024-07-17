const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://212.46.56.10:84',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove /api from the request path
            },
        })
    );
};
