//在每次调用$ajax之前会调用这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url='http://www.liulongbin.top:3007'+options.url
})