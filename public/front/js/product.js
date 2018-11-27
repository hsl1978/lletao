

$(function(){
  // 从列表页获取传过来的id 
  var id = getSearch("productId");
  // console.log(id);

  // 根据传过来的id发送ajax请求，进行渲染
   $.ajax({
     type:'get',
     url:'/product/queryProductDetail',
     data:{
       id:id,
     },
     dataType:'json',
     success:function(info){
       console.log(info);

       var htmlStr = template("productTpl",info);
       $('.lt_main .mui-scroll').html(htmlStr);

      //  需要手动初始化轮播图
       var gallery = mui('.mui-slider');
       gallery.slider({
           interval:1000 //自动轮播周期，若为0则不自动播放，默认为0；
       });

      //  初始化产品数量
      mui('.mui-numbox').numbox();
       
     }
   });


  //  给尺码添加可选功能
  $('.lt_main').on("click",".lt_size span",function(){
    $(this).addClass("current").siblings().removeClass("current");
  });
  // 加入购物车功能
$('#addCart').click(function(){
  //  获取尺码和数量
  var size = $('.lt_size span.current').text();
  var num = $('.mui-numbox-input').val();

  if(size === null){
    mui.toast("请选择尺码");
    return;
  }
   
  // 发送ajax请求，加入购物车
  $.ajax({
    type:'post',
    url:'/cart/addCart',
    data:{
      productId:id,
      size:size,
      num:num,
    },
    dataType:'json',
    success:function(info){
      if(info.error === 400){
        location.href = "login.html?retUrl=" + location.href;
        return;
      }
      // console.log(info);
      if(info.success){
        // 给用户提示
        mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){

          if(e.index === 0){
            location.href = "cart.html";
          }
        })
      }
      
    }
  })

})

  




})