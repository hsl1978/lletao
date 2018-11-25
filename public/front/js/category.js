// 
$(function(){
  // 左侧区域，通过发送ajax动态渲染一级分类
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      // console.log(info);
      var htmlStr = template("categoryLeftTpl",info);
      $(".lt_category_left ul").html(htmlStr);

      // 默认渲染第一条, 对应的二级分类
      renderById( info.rows[0].id )
      
    }
  }); 
  // 2.给a注册点击事件，点击的时候，添加current类，注册事件委托
  $('.lt_category_left').on("click","a",function(){
    //排它 让当前元素的父元素的兄弟元素的子元素，移除current类
      $(this).parent().siblings().children().removeClass('current');
    // 让当前的元素添加current类，
      $(this).addClass('current');

      //点击的时候，保存id
      var id = $(this).data('id');
      // console.log(id);
      renderById(id);
  });


  // 根据id渲染二级分类
     function renderById(id){
       $.ajax({
         type:'get',
         url:'/category/querySecondCategory',
         data:{
           id:id,
         },
         dataType:'json',
         success:function(info){
            // console.log(info);
            var htmlStr = template("categoryRightTpl",info);
            $(".lt_category_right ul").html(htmlStr);
          }
         })

     }







  
})