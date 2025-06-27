// API地址配置
const apiConfig = {
    // 文本文件API地址（无需令牌）
    textFiles: {
        baseUrl: 'https://raw.githubusercontent.com/rjdsq/ksx/main/',
        path: 'text/',
        files: [
            { id: 'text1', path: '选项卡1.txt' },
            { id: 'text2', path: '选项卡2.txt' },
            { id: 'text3', path: '选项卡3.txt' }
        ]
    },
    // 通用图片API地址（需令牌访问）
    images: {
        baseUrl: 'https://api.github.com/repos/rjdsq/ksx/contents/',
        path: 'img/yunnan/',
        headers: {
            Authorization: 'u0067\u0068\u0070\u005F\u0048\u0031\u0058\u0036\u0062\u0055\u006E\u004F\u0046\u0033\u0071\u005A\u0047\u007A\u0036\u0047\u0053\u0074\u006E\u0043\u0057\u0045\u004C\u0049\u0074\u0072\u005A\u0054\u0034\u0063\u0030\u0041\u0036\u0051\u0067\u0076'
        }
    },
    // 轮播图专用图片API地址（需令牌访问）
    carouselImages: {
        baseUrl: 'https://api.github.com/repos/rjdsq/ksx/contents/',
        path: 'img/lunbo/', // 轮播图专用图片路径
        headers: {
            Authorization: 'u0067\u0068\u0070\u005F\u0048\u0031\u0058\u0036\u0062\u0055\u006E\u004F\u0046\u0033\u0071\u005A\u0047\u007A\u0036\u0047\u0053\u0074\u006E\u0043\u0057\u0045\u004C\u0049\u0074\u0072\u005A\u0054\u0034\u0063\u0030\u0041\u0036\u0051\u0067\u0076'
        }
    },
    // 全局域名替换规则（若API域名被墙时使用，正常情况可忽略）
    domainReplace: [
        {
            from: 'https://raw.githubusercontent.com',
            to: 'https://j.1lin.dpdns.org/https://raw.github.com'
        },
        {
            from: 'https://api.github.com',
            to: 'https://api.kkgithub.com'
        }
    ],
    // 轮播图配置
    carousel: {
        slideDelay: 5000, // 轮播切换延迟(毫秒)
        maxSlides: 5      // 最大显示张数
    }
};

// 封装带令牌的API请求函数
function fetchWithToken(url, headers = {}) {
    // 合并全局令牌 headers 和自定义 headers
    const requestHeaders = {
        ...(apiConfig.images.headers || {}),
        ...headers,
        'Accept': 'application/vnd.github.v3+json' // 指定GitHub API版本
    };
    
    return fetch(url, {
        method: 'GET',
        headers: requestHeaders
    });
}

