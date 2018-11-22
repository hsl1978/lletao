$(function(){
   

// 获取数据进行渲染
var currentPage = 1;//当前页
var pageSize = 5;//每页条数
// 一进入页面进行渲染一下
render()

function render(){
  $.ajax({
    type:'get',
    url:'/user/queryUser',
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
    dataType:'json',
    success:function(info){
      // console.log(info);
      
      var htmlStr = template("tpl",info);
      $('tbody').html(htmlStr);


      // 配置分页
      $('#paginator').bootstrapPaginator({
        // 指定bootstrap版本
        bootstrapMajorVersion:3,
        // 当前页
        currentPage:info.page,
        // 总页数
        totalPages:Math.ceil(info.total / info.size),
        // 当页面被点击时触发
        onPageClicked:function(a,b,c,page){
          //  page 当前的页码
          currentPage = page;
          // 调用render重新渲染页面
          render();
        }
      })
    }
  })


}


// 事件委托，注册点击事件
$('.lt_content tbody').on('click','.btn',function(){
  // console.log(hhh);
  
  // 弹出模态框
  $("#userModal").modal("show");
  //  获取当前元素的id 
  var id = $(this).parent().data("id");
  // 获取将来需要将用户设置成什么状态
  var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
  // console.log(id);
  // console.log(isDelete);
  // 先解绑，再绑定事件，可以保证只有一个事件绑定在按钮上
  $('#userBtn').off("click").on("click",function(){

    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete,
      },
      dataType:'json',
      success:function(info){
         console.log(info);
         if(info.success){
          //  关闭模态框
          $("#userModal").modal("hide");

          // 重新渲染
          render();
         }
      }
    })
  })
  
  

})

})