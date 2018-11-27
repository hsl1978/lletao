

// 首先实现区域滚动
mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条,不显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


// 自动轮播
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});


// 解析地址栏参数的功能的方法
function getSearch(k){
  // 拿到地址栏中的？号后面的数据
  var str = location.search;
  
  // 进行中文转码
  str = decodeURI(str);

  // 去掉第一个问号
  str = str.slice(1);

  // 根据&符号分割成数组
  var arr = str.split('&');

  var obj = {};

  arr.forEach(function(v,i){
    // 根据=号分割成键和值
    var key = v.split('=')[0];//键
    var value = v.split('=')[1];//值

    obj[key] = value;

  });

  return obj[ k ];

   


}