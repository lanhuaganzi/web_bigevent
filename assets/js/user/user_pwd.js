$(function () {
    let form = layui.form



    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6~12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd:function (value) {
            if(value!==$('[name=newPwd]').val()){
                return '两次密码不一致！'
            }
        }
    })

    $('.layui-form').on('submit',function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (response) {
                if(response.status!==0){
               return layui.layer.msg('更新失败！')
                }
                // layui.layer.msg('更新成功！')

                //转为原生dom 调用reset方法重置表单
                $('.layui-form')[0].reset()
            }
        });
    });
}) 