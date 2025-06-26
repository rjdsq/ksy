// API地址配置
const apiConfig = {
    // 文本文件API地址
    textFiles: {
        baseUrl: '',
        path: '',
        files: [
            { id: 'text1', path: '选项卡1.txt' },
            { id: 'text2', path: '选项卡2.txt' },
            { id: 'text3', path: '选项卡3.txt' }
        ]
    },
    // 通用图片API地址 - 改为使用本地路径
    images: {
        baseUrl: '',
        path: 'img/yunnan/'
    },
    // 轮播图专用图片API地址 - 改为使用本地路径
    carouselImages: {
        baseUrl: '',
        path: 'img/yunnan/'
    },
    // 轮播图配置
    carousel: {
        slideDelay: 5000, // 轮播切换延迟(毫秒)
        maxSlides: 5      // 最大显示张数
    }
};