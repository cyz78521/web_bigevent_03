$(function () {
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $('#link_login').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide();
    })

    // 正则验证

    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,16}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg_box  [name=password]').val().trim()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 1.注册事件
    $('#form_reg').on('submit',function (e) {
        // 阻止表单的默认要提交事件
        e.preventDefault();
        // 获取layui的弹出预示 
        var layer = layui.layer;
        var data = {
            username : $('#form_reg [name=username]').val().trim(),
            password : $('#form_reg [name=password]').val().trim()
        }
        // 发送ajax请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                // 手动调用点击事件 跳转到登录页 
                $('#link_login').click()
                // 快速清空表单的值
                $('#form_reg')[0].reset()
            }
        });
    })

    // 登录事件 
    $('#form_login').submit(function(e){
        e.preventDefault();
        var layer = layui.layer
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功');
                // 把token存到本地存储
                localStorage.setItem('token',res.token);
                // 跳转到首页
                location.href = '/index.html'
            }
        });
    })
})