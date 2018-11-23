$(function(){
  // 发送ajax渲染商品页面
  var currentPage = 1;
  var pageSize = 2;//一页两条数据

  // 一进入页面，渲染一次
  render();
  function render(){
    $.ajax({
     type:'get',
     url:'/product/queryProductDetailList',
     data:{
       page:currentPage,
       pageSize:pageSize,
     },
     dataType:'json',
     success:function(info){
      //  console.log(info);
      
      var htmlStr = template("productTpl",info);
      $(".lt_content tbody").html(htmlStr);

      // 分页
      $("#paginator").bootstrapPaginator({
        // 设置版本号
        bootstrapMajorVersion:3,
        // 设置当前页数
        currentPage:info.page,
        // 设置总页数
        totalPages:Math.ceil(info.total / info.size),

        // 点击事件
        onPageClicked:function(a,b,c,page){
          // 设置当前页
          currentPage = page;
          // 渲染
          render();
        }
      })
     }
    })

  }



})