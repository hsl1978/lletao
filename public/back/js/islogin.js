$(function(){

  // 登录校验
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){
       if(info.success){
        //  该用户已经登陆过
         console.log("该用户已经登陆过");
         
       }

       if(info.error === 400){
        //  未登录，拦截到登录页
         location.href = "login.html";
       }
    }
  })
})