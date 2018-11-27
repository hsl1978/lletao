

$(function(){
  // 点击登录按钮，获取用户的用户名和密码，发送ajax请求，进行验证

  $('#loginBtn').click(function(){
    
    // 获取用户名和密码
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    
    // 非空判断
    if(username === ""){
      mui.toast("请输入用户名");
      return;
    }
    if(password === ""){
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password,
      },
      dataType:'json',
      success:function(info){
          console.log(info);  
          if(info.error === 403){
            mui.toast("用户名或密码错误");
            return;
          }  
          if(info.success){
            // 登录成功
            /**
             * (1)有传参，传递了retUrl，需要跳回去
             * (2)没有传参，跳到用户中心页
             * 
             */
            if(location.search.indexOf("retUrl") != -1){
              // 有传参
              var retUrl = location.search.replace("?retUrl=","");

              // 跳回去
              location.href = retUrl;
            }else{
              // 跳到用户中心页
              location.href = "user.html";
            }
          }     
      }
    });

  });





})