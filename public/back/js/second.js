// 二级分类的渲染
$(function(){

  var currentPage = 1;
  var pageSize = 5;
    render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        var htmlStr = template("secondTpl",info);
        $(".lt_content tbody").html(htmlStr);

        // 分页
        $('#paginator').bootstrapPaginator({
          // 设置版本号
          bootstrapMajorVersion:3,
          // 设置当前页
          currentPage:info.page,
          // 设置总页数
          totalPages:Math.ceil(info.total / info.size),
          // 点击事件
          onPageClicked:function(a,b,c,page){
            // 当前页
            currentPage = page;
            // 渲染
            render();
          }
        })
        
      }
    })

  }

  // 弹出模态框
  $('#secondAddCatge').click(function(){
    // 显示模态框
    $('#secondModal').modal("show");
    // 下拉列表渲染
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100,
      },
      dataType:'json',
      success:function(info){
        var htmlStr = template('dropdownLine',info);
        $('.dropdown-menu').html(htmlStr);
      }
    });
  });

// 通过事件委托，给a添加点击事件，同步选中的文字
$('.dropdown-menu').on("click","a",function(){
  // 获取选中的文本
  var txt = $(this).text();
  // 拿到categoryId
  var id = $(this).data("id");
  // 修改文本内容
  $('.dropdownText').text(txt);

  // 将选中的id设置到选中的input表单元素中
  $('[name="categoryId"]').val(id);
  // 重置
  $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
});

// 配置图片上传
$('#fileupload').fileupload({
  // 指定数据类型为json
  dataType:'json',
  // done ,当图片上传完成，响应回来时候调用
  done:function(e,data){
    // console.log(data);
    // 获取上传成功的图片的地址
    var picAddr = data.result.picAddr;

    // 设置图片的地址
    $('#imgBox img').attr("src",picAddr);

    // 将图片地址存在隐藏域中
    $('[name="brandLogo"]').val(picAddr);

  //  重置校验状态
  $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");

    
  }
});

// 配置表单校验
$('#form').bootstrapValidator({
  // 将默认的排除项重置掉
  excluded:[],
  // 配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  // 校验字段
  fields:{
    // 品牌名称
    brandName:{
      validators:{
        // 校验规则
        notEmpty:{
          message:"请输入二级分类名称"
        }
      }
    },
    // 一级分类的id
    categoryId:{
      validators:{
        // 校验规则
        notEmpty:{
          message:"请选择一级分类"
        }
      }
    },
    // 图片地址
    brandLogo:{
      validators:{
        // 校验规则
        notEmpty:{
          message:"请上传图片"
        }
      }
    },
  }

});


// 注册校验成功事件，通过ajax进行添加
$("#form").on("success.form.bv",function(e){
  // 阻止默认的提交
  e.preventDefault();

  //通过ajax进行提交
  $.ajax({
    url:'/category/addSecondCategory',
    type:'post',
    data:$('#form').serialize(),
    success:function(info){
      // console.log(info);
      // 关闭模态框
      $('#secondModal').modal("hide");
      // 重置表单里面的内容和校验状态
      $('#form').data("bootstrapValidator").resetForm(true);

      // 重新渲染第一页
      currentPage = 1;
      render();

      // 找到下拉菜单文本重置
      $('.dropdownText').text("请选择一级分类");

      // 找到图片重置
      $('#imgBox img').attr("src","images/default.png");
    }
  }) 
})



})