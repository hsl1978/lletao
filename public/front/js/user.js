

// 
$(function(){
  //  获取登录的数据，进行渲染用户
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){

      if(info.error === 400){
        // 未登录，拦截到登录页
        location.href = "login.html";
        return;
      }
      // console.log(info);
      var htmlStr = template("userTpl",info);
      $("#userInfo").html(htmlStr);
      
    }
  });


  // 退出功能
  $('#logout').click(function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      dataType:'json',
      success:function(info){
       console.log(info);
       if(info.success){
        //  退出成功。拦截到登录页
        location.href = "login.html";
       }
       
      }
    })
  })




})