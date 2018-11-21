$(function(){
  // 开启进度条
  // 结束进度条


  // ajax全局事件

  $(document).ajaxStart(function(){
    // 开启进度条
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    // 关闭进度条
   setTimeout(function(){
     NProgress.done();
   },500)
  });

  // 公用的功能

  // 1.左侧的二级菜单切换完成
  $('.category').click(function(){
    $(this).next().stop().slideToggle();
  });

  // 2.左侧的菜单切换功能
  $('.lt_topbar .icon-left').click(function(){
    // 让左侧的菜单切换，通过toggleClass切换类
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
  });

  // 3.公共退出功能。
  $('.lt_topbar .icon-right').click(function(){
      // 显示退出模态框
      $('#logoutModal').modal("show");
  });

  // 点击退出按钮，退出登录
  $('#logoutBtn').click(function(){
      // 发送ajax进行校验
      $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:'json',
        success:function(info){
          if(info.success){
            // 销毁登录状态，退出成功，跳转登录
            location.href = "login.html";
          }
        }
      })

  })


})