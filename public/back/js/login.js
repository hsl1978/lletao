$(function(){
// 进行表单校验
  //  使用插件bootstrapValidator

  // 初始化表单校验，读使用文档
  //使用表单校验插件
$('#form').bootstrapValidator({

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 2,
          max: 6,
          message: '用户名长度必须在2到6之间'
        },
      }
    },
    password: {
      validators: {
        //不能为空
        notEmpty: {
          message: '密码不能为空'
        },
        //长度校验
        stringLength: {
          min: 6,
          max: 12,
          message: '密码长度必须在6到12之间'
        },
      }
    },
  }

});

// 表单校验成功事件
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      // console.log(info);
      if(info.success){
        location.href = "index.html";
      }
      if(info.error === 1000){
        // 用户名不存在
        alert(info.message);
      }
      if(info.error === 1001){
        // 密码错误
        alert(info.message);
      }
      
    }
  })
});

// 重置功能
$('[type="reset"]').click(function(){

 $('#form').data("bootstrapValidator").resetForm();//重置表单，并且会隐藏所有的错误提示和图标

})

})