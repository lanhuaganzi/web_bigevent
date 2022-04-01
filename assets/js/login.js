$(function () {
    // 点击“去注册账号”的连接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show();
    });


    // 点击“去登录”的连接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show();
    });


    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer

    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()

        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function (response) {
                if (response.status !== 0) {
                    // return console.log(response.message)
                    return layer.msg(response.message)
                }
                // console.log('注册成功！')
                layer.msg('注册成功，请登录！')
                $('#form_reg [name=username]').val('')
                $('#form_reg [name=password]').val('')
                $('#form_reg [name=repassword]').val('')
                $('#link_login').click()
            }
        });
    })


    //监听登录表单的提交事件
    $('#form_login').submit(function (e) { 
        e.preventDefault();


        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (response) {
                if(response.status!==0){
                    return layer.msg(response.message)
                }
                layer.msg('登录成功！')
                //存储token
                localStorage.setItem('token',response.token)
                location.href='/index.html'
                // console.log(response.token);
            }
        });
    });


    //
})