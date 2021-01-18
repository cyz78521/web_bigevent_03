$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 为有权限的接口统一设置headers请求头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 控制用户的访问权限
    // 无论成功失败都会访问complete函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空本地存储
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})