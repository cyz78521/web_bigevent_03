$(function () {
    //  1.获取信息渲染页面
    getUserinfo()
    // 2.实现退出功能
    $('#btnLogout').on('click',function() {
        // 弹出询问框
        layer.confirm('确认退出登录吗?', {icon: 3, title:'提示'}, function(index){
            // 删除本地存储中的token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
          });
    })
})


// 封装获取函数
function getUserinfo() {
    // 发送ajax请求
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取数据失败')
            }
            // 如果获取数据成功 就渲染页面
            renderAvatar(res.data)
        },
    });
}
// 封装渲染页面的函数
function renderAvatar(user) {
    // 获取用户名 用来渲染欢迎词
    var name = user.nickname || user.username
    console.log(name)
    console.log(user)
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 取出name里面的第一个字符转换为大写将他作为文字头像显示
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}