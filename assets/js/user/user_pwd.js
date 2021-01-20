$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能和原密码相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 修改密码
    $('.layui-form').on('submit',function (e) {
        e.preventDefault();
        // 发送ajax
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败！')
                }
                layui.layer.msg('修改密码成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        });
    })
})