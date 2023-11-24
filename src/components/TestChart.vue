//在Echarts.vue文件中
<template>
  <div class="Echarts">
    <div :style="{ height: height, width: width }" :id="id"></div>
  </div>
</template>

<script>

let echarts = require("echarts/lib/echarts");
function func(x) {
  return x*0.01;
}

function generateData() {
  let data = [];
  for (let i = 0; i <= 400; i += 0.1) {
    data.push([i, func(i)]);
  }
  alert(data);
  return data;
}
export default {


  name: "TestChart",
  props: {
    height: {
      type: String,
      default: "600px",
    },
    width: {
      type: String,
      default: "800px",
    },
    id: {
      type: String,
      default: "demo",
    },
  },
  data() {
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      console.log(this.id);
      alert(this.id);
      let myChart = echarts.init(document.getElementById(this.id));
      // 绘制图表
      myChart.setOption({
        animation: false,
        grid: {
          top: 40,
          left: 50,
          right: 40,
          bottom: 50
        },
        xAxis: {
          name: 'x',
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        yAxis: {
          name: 'y',
          min: 0,
          max: 1,
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        dataZoom: [
          {
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: -20,
            endValue: 20
          },
          {
            show: true,
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: [0],
            startValue: -20,
            endValue: 20
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            clip: true,
            data: generateData()
          }
        ]
      });
    },
  },
};
</script>


<style>

</style>