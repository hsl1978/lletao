

$(function(){


  render();
  function render(){
  
    $.ajax({
      type:'get',
      url:'/cart/queryCart',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.error === 400){
          // 拦截到登录页
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        var htmlStr = template("cartTpl",{list:info});

        $('.mui-scroll').html(htmlStr);
        
      }
    });
   


  }


  // 2.删除功能
  $('.lt_main').on("click",".btn_delete",function(){
    // 获取id
    var id = $(this).data("id");
    // 发送删除请求
    $.ajax({
      type:'get',
      url:'/cart/deleteCart',
      data:{
        id:[id],
      },
      dataType:'json',
      success:function(info){
        if(info.success){
          // 删除成功，页面重新渲染
          render();
        }
      }
    })
  })


})