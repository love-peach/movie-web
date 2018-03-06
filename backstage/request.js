var axios = require('axios');
var instance = axios.create();
var qs = require('qs');

// 全局设置项
instance.defaults.baseURL = 'http://api.douban.com/';
instance.defaults.timeout = 20000;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded charset=utf-8';
instance.defaults.headers.get['Cache-Control'] = 'no-cache';
instance.defaults.headers.get['Pragma'] = 'no-cache';
instance.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';

instance.defaults.transformRequest = [
    function (data) {
        data.apikey = '0b2bdeda43b5688921839c8ecb20399b';
        data = qs.stringify(data);
        return data;
    }
];


// 请求前 钩子
instance.interceptors.request.use(config => {
    console.log('请求之前该做的事', config.url);
    console.time('请求花费时间')
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// 请求完成 钩子
instance.interceptors.response.use(response => {
    console.log('请求完成该做的事' );
    console.timeEnd('请求花费时间')
    return response;
    // return Promise.reject({msg: '未知错误'});
}, err => {
    console.log('请求完成出错该做的事');
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.msg = '请求错误';
                break;
            case 401:
                err.msg = '未授权，请登录';
                break;
            case 403:
                err.msg = '拒绝访问';
                break;
            case 404:
                err.msg = `请求地址出错: ${err.response.config.url}`;
                break;
            case 408:
                err.msg = '请求超时';
                break;
            case 500:
                err.msg = '服务器内部错误';
                break;
            case 501:
                err.msg = '服务未实现';
                break;
            case 502:
                err.msg = '网关错误';
                break;
            case 503:
                err.msg = '服务不可用';
                break;
            case 504:
                err.msg = '网关超时';
                break;
            case 505:
                err.msg = 'HTTP版本不受支持';
                break;
            default:
        }
    }
    if(err.code == 'ECONNABORTED') {
        err.msg = '请求超时';
    }
    return Promise.reject(err);
});


function fetch(url, data, method = 'get', options) {
    const isGet = method === 'get';
    if (isGet) {
        url = mosaicUrl(url, data);
    }
    var config = {
        method,
        url,
        data,
    };
    if (options) {
        for (var cfgKey in options) {
            config[cfgKey] = options[cfgKey]
        }
    }
    const fetchPromise = new Promise((resolve, reject) => {
        instance(config).then(response => {
            resolve(response.data || response, response.data);
        }).catch((error) => {
            reject(error);
        })
    });
    return fetchPromise;
}

// get 的时候 拼接url参数
function mosaicUrl(url, params) {
    if (!params) return url;
    const queryString = [];
    Object.keys(params).forEach(key => {
        let value = params[key];
        if (value !== undefined && value !== null) {
            queryString.push(`${key}=${value}`);
        }
    });
    const qStr = queryString.join('&');
    if (url.indexOf('?') < 0) {
        url += `?${qStr}`;
    } else if (url.endsWith('&')) {
        url += qStr;
    } else if (url.endsWith('?')) {
        url += `${qStr}`;
    } else {
        url += `&${qStr}`;
    }
    return url;
}

module.exports = {
    fetch: fetch,
    get(url, params, options) {
        return fetch(url, params, 'get', options);
    },
    post(url, params, options) {
        return fetch(url, params, 'post', options);
    },
    put(url, params, options) {
        return fetch(url, params, 'put', options);
    },
    patch(url, params, options) {
        return fetch(url, params, 'patch', options);
    },
    del(url, params, options) {
        return fetch(url, params, 'delete', options);
    },
}