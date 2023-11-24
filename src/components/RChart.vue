//在Echarts.vue文件中
<template>
  <div>
    <i class="el-icon-refresh"  @click="getChart"></i>
    <div class="Echarts">
      <div :style="{ height: height, width: width }" :id="id"></div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

let echarts = require("echarts/lib/echarts");

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "RChart",
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
    return {
      chartData: [],
      loading: true
    };
  },
  mounted() {
    this.getChart();

  },
  methods: {
    getChart(){
      axios.get("http://localhost:8080/chartData").then((result) => {

        this.chartData = result.data.payload;
        this.drawLine(this.chartData);
      });
    },
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      console.log(this.id);
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
            data: data
          }
        ]
      });
    },
  },
};
</script>


<style scoped>
.el-icon-refresh{
  font-size: 100px;
}

.el-icon-refresh:hover{
  color: #407eff;
}
</style>