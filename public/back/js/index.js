$(function(){
  // 图表，echarts的使用
  // 基于准备好的dom，初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

  // 指定图表的配置项和数据
  var option = {
      title: {
          text: '2017年注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [253, 200, 337, 410, 130, 20]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option);


  // 右侧的饼图
  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

  // 指定图表的配置项和数据
  var option1 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年11月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','阿迪王','花花公子','特步']
    },
    series : [
        {
            name: '品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'阿迪王'},
                {value:135, name:'花花公子'},
                {value:1548, name:'特步'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option1);
})