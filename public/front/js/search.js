/**
 * 由于整个页面都在本地历史记录中操作的，所以约定键名：search_list
 * 功能分析
 *  1.本地历史记录渲染展示
 */

 /**
  * 以下三条代码，用于在控制台执行，添加假数据
   var arr = ["耐克","阿迪","新百伦","特步","花花"];
   var jsonStr = JSON.stringify(arr);
   localStorage.setItem("search_list",jsonStr);
  */


 

   $(function(){
    /**
     * 功能分析
        1.本地历史记录渲染展示
   */
  render();
  // 获取本地历史记录的数组
    function getHistory(){

      //  获取本地历史的jsonStr字符串
        //  没有数据的时候进行默认值处理
      var str = localStorage.getItem('search_list') || '[]';
      // console.log(str);
      // 转成数组
       var arr = JSON.parse(str);
        return arr;
     }

    // 读取本地历史数据，根据数据进行渲染
    function render(){
      var arr = getHistory();

      var htmlStr = template("searchTpl",{list:arr});

      $('.lt_history').html(htmlStr);
    }
    


    // 功能2，点击清空历史记录，清空所有的记录
    $('.lt_history').on("click",".btn-empty",function(){
       mui.confirm("您确定要清空历史记录吗？","温馨提示",["取消","确定"],function(e){
           
        if(e.index === 1){
          // 确定清空
          localStorage.removeItem("search_list");
          // 重新渲染页面
          render();
        }

       })

    });


    // 功能3：获取删除符号，删除一条数据
    $('.lt_history').on("click",".btn_delete",function(){
      // 获取对应下标
      var index = $(this).data("index");
      // console.log(index);
      var arr = getHistory();

      // 删除数组中的index下标的项
      arr.splice(index,1);

      // 把数据转成jsonStr字符串，存入本地存储
      var str = JSON.stringify(arr);

      localStorage.setItem("search_list",str);

      // 重新渲染
      render();
        
    })

// 功能4:点击搜索按钮获取input的value值，加到数组的最前面，满10条删除数组的最后一项

   $('.search_btn').click(function(){
    //  获取value的值
    var key =  $('.search_input').val().trim();
    // console.log(key);
    // 判断值不为空，就加到数组的最前面
     if(key === ""){
       mui.toast("请输入搜索关键字");
       return;
     }

    //  获取数组
    var arr = getHistory();
     
    // 1.如果已经有了重复项，需要将重复项删除
    var index = arr.indexOf(key);
    if(index != -1){
      // 有重复项，将重复项删掉
      arr.splice(index,1);
    }

    // 2.如果长度超过10，要删除最后一个
    if(arr.length >= 10){
      arr.pop();
    }

    // 往数组的最前面追加
    arr.unshift(key);

    // 转json字符串

    var jsonStr = JSON.stringify(arr);
    
    // 存储到本地存储中
    localStorage.setItem("search_list",jsonStr);

    // 重新渲染
    render();

    // 清空搜索框的内容
    $('.search_input').val("");

    // 跳转到商品列表页

    location.href  = "searchList.html?key=" + key;
    
   })



   })