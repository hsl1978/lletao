
// 一级分类功能
$(function(){
  //  获取数据并渲染

  var currentPage = 1;//当前页
  var pageSize = 5;//每页的条数

// 一进入页面渲染一次
     render();
  function render(){
   $.ajax({
     type:'get',
     url:'/category/queryTopCategoryPaging',
     data:{
       page:currentPage,
       pageSize:pageSize,
     },
     dataType:'json',
     success:function(info){
      //  console.log(info);

       var htmlStr = template('firstTpl' , info);
       $(".lt_content tbody").html(htmlStr);

      //  分页功能的实现
      $('#paginator').bootstrapPaginator({
        // 设置版本号
        bootstrapMajorVersion:3,
        // 设置当前页
        currentPage:info.page,
        // 设置总页数
        totalPages:Math.ceil(info.total / info.size),

        // 注册点击事件
       onPageClicked:function(a,b,c,page){
          // 重置当前页
          currentPage = page;
          // 重新渲染
          render();
       }
      })
       
     }
   })



  }


  // 2.点击添加分类按钮弹除模态框
  $("#firstAddBtn").click(function(){
    // 显示模态框
    $('#firstModal').modal("show");
  })
   

  //点击添加按钮的时候，先做表单验证
  $('#form').bootstrapValidator({
    //1. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称",
          }
        }
      }
    }
  })
  
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          // 隐藏模态框
          $('#firstModal').modal("hide");
          // 渲染
          currentPage = 1;
          render();

          // 表单重置
          $('#form').data('bootstrapValidator').resetForm(true);
        }
        
      }
    })
    });

})