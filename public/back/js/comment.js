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
})