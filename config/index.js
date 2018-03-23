module.exports = {
    // 静态页面走http,本地跨域参数设置
    get proxyTable() {
        return {
            '/searchSuggest': {
                target: 'https://movie.douban.com/',
                pathRewrite: {
                    '^/searchSuggest': '/j/subject_suggest'
                },
                changeOrigin: true
            },
            '/fullReview': {
                target: 'https://movie.douban.com/',
                pathRewrite: {
                    '^/fullReview': '/j/review'
                },
                changeOrigin: true
            }
        }
    }
};