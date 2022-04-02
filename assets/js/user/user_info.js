$(function () {
    let form = layui.form
    let layer = layui.layer


    form.verify({
        nikename: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })


    initUserInfo()


    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                //为表单赋值
                form.val('formUserInfo', res.data)
            }
        });
    }



    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    });

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                // 调用主页中的方法  重新渲染用户信息和头像
                window.parent.getUserInfo()
            }
        });
    });
})