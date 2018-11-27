

$(function(){
  
 // 1.得到搜索框中的值，赋值给商品详情页的搜索框，
// 点击搜索按钮，发送ajax请求，拿到数据

var key = getSearch("key");
// console.log(key);

//2. 赋值给input搜索框
 $('.search_input').val(key);

// 3.根据搜索关键字。发送ajax请求，获取数据，进行渲染
render();

//  5.点击搜索按钮的时候，从新发送请求
$('.search_btn').click(function(){
  render();
})

// 4.点击排序的按钮，实现高亮效果

  //  (1)如果当前a没有current类，就要加上current类，其他的去掉
      
  //  (2)如果当前a有current类，切换箭头的方向(切换类)
 
$('.lt_sort a[data-type]').click(function(){

  if($(this).hasClass("current")){
    // 有，切换箭头的方向，fa-angle-down  fa-angle-up
    $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }else{
    // 没有current类
    $(this).addClass("current").siblings().removeClass("current");
  }

  // 调用render
  render();
})






function render(){
  /**
   * 发送请求，从新渲染前
   */

   $('.lt_product').html('<div class="loading"></div>');

   var paramsObj = {};
  //  三个必传的参数
  paramsObj.proName = $('.search_input').val();
  paramsObj.page = 1;
  paramsObj.pageSize = 100;

  // 根据是否有高亮的a 决定是否需要排序
  var $current = $('.lt_sort a.current');
  // console.log($current);
  if($current.length === 1){
    // 有高亮的a 从自定义属性中获取需要传递的参数
    var sortName = $current.data("type");
    // 通过箭头的方向来决定排序的值，1升序 2降序
    var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

    // 添加到参数中
    paramsObj[ sortName ] = sortValue;

  }
  
  setTimeout(function(){

    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data: paramsObj,
      dataType:'json',
      success:function(info){
    
        // console.log(info);
        var htmlStr = template("searchListTpl",info);

        $('.lt_product').html(htmlStr);
    
      }
    });
  },500)


}




})