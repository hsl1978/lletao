$(function(){
  // 发送ajax渲染商品页面
  var currentPage = 1;
  var pageSize = 2;//一页两条数据

  var picArr = [];

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


  // 点击添加商品按钮，显示模态框
  $('#addProduct').click(function(){
    $('#productModal').modal("show");

    // 发送ajax请求，请求二级分类列表数据，进行渲染下拉菜单
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100,
      },
      success:function(info){
        var htmlStr = template('prodTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });

// 3.利用事件委托，给a注册点击事件
$('.dropdown-menu').on("click","a",function(){
    // 获取当前a里面的内容
    var txt = $(this).text();

    // 给到上面的下拉文字
    $('#dropdownText').text(txt);

    // 获取自定义属性的id
    var id = $(this).data("id");

    // 给到隐藏域
    $('[name="brandId"]').val(id);
    

    // 重置校验状态
    $('#form').data("bootstrapValidator").updateStatus("brandId","VALID")

});

// 4.配置上传图片的回调函数
$('#fileupload').fileupload({
  // 返回数据类型
  dataType:'json',
  // 上传完图片，响应的回调函数的配置
  // 每一张图片上传，都会响应一次
  done:function(e,data){
    // 获取图片的地址对象
    var picObj = data.result;
    // 获取图片地址
    var picUrl = picObj.picAddr;
    // 新得到的图片的对象，应该推送到数组的最前面
    picArr.unshift(picObj);
    // 新的图片，应该添加到imgBox最前面
    $('#imgBox').prepend('<img src="'+ picUrl +'" width="100">');
    // 如果上传的图片大于三个，需要将最后面的那个删除
    if(picArr.length > 3){
      // 删除数组的最后的一项
      picArr.pop();

      $("#imgBox img:last-of-type").remove();
    }


    // 如果处理后，图片数组的长度为3，说明已经选择了三张图片，可以进行提交
    // 需要将表单的校验状态 置成VALID
    if(picArr.length === 3){
      $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");


    }
  }
});


// 5.配置表单校验
$('#form').bootstrapValidator({
  // 重置默认值的排除项
  excluded:[],

   // 配置图标
   feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  // 配置校验字段
  fields:{
    // 二级分类id，归属品牌
    brandId:{
      validators:{
        notEmpty:{
          message:"请选择二级分类"
        }
      }
    },
     // 商品名称
     proName:{
      validators:{
        notEmpty:{
          message:"请输入商品名称"
        }
      }
    },
     // 商品描述
     proDesc:{
      validators:{
        notEmpty:{
          message:"请输入商品描述"
        }
      }
    },
     // 商品库存
    //  要求：必须是非零开头的数字，非零开头，也就是只能以1-9开头

     num:{
      validators:{
        notEmpty:{
          message:"请输入商品库存"
        },
        regexp:{
          regexp:/^[1-9]\d*$/,
          message:"商品库存格式，必须是非零开头的数字"
        }
      }
    },
    // 尺码校验，规则必须是32-40，两个数字-两个数字
    size:{
      validators:{
        notEmpty:{
          message:"请输入商品尺码"
        },
        // 正则校验
        regexp:{
          regexp:/^\d{2}-\d{2}$/,
          message:"尺码格式，必须是 32-40"
        }
      }
    },
     // 商品价格
     price:{
      validators:{
        notEmpty:{
          message:"请输入商品价格"
        }
      }
    },
     // 商品原价
      oldPrice:{
      validators:{
        notEmpty:{
          message:"请输入商品原价"
        }
      }
    },
     // 标记图片是否上传满三张
     picStatus:{
      validators:{
        notEmpty:{
          message:"请上传三张图片"
        }
      }
    },
  }
});

// 6.注册校验成功事件
  $('#form').on("success.form.bv",function(e){
    //  阻止表单默认事件的提交
    e.preventDefault();

    var paramsStr = $("#form").serialize();//获取所有的表单元素

    // 还需要拼接上图片的地址和名称
    paramsStr += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    paramsStr += "&picName2="+picArr[0].picName+"&picAddr2="+picArr[0].picAddr;
    paramsStr += "&picName3="+picArr[0].picName+"&picAddr3="+picArr[0].picAddr;
  
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:paramsStr,
      dataType:'json',
      success:function(info){

        if(info.success){
          //关闭模态框
          $('#productModal').modal("hide");
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 表单重置
          $('#form').data('bootstrapValidator').resetForm(true);

          // 重置下拉菜单和图片
          $('#dropdownText').text("请输入二级分类");

          // 删除图片的同时，清空数组
          $('#imgBox img').remove();

          picArr = [];
        }
      }
    })
  
  })



})