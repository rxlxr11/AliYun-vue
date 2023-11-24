<template>
  <el-container>
<!--    <el-header>Header</el-header>-->
    <el-main>
      <el-row style="height: 100%">
        <el-col style="height: 100%;width: 50%">
          <el-card style="height: 90%;width: 90%">

            <r-image></r-image>
          </el-card>
        </el-col>
        <el-col style="height: 100%;width: 50%">
          <el-card style="height: 90%;width: 90%">
            <span class="spanCls">
              <span>泊松分布公式：</span>
              {{poissonFormat}}
              <br>
              <span>输入</span>
              {{lambda}}
            </span>


            <el-input-number v-model="input"></el-input-number>
            <el-button @click="submitPoisson">提交</el-button>

            <r-chart></r-chart>
          </el-card>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import RImage from "@/components/RImage.vue";
import RChart from "@/components/RChart.vue";
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default {
  name: "IndexView",
  components: {RChart, RImage},

  data() {
    return {
      poissonFormat: `$$P(X=k)=\\frac {e^{-\\lambda}\\lambda^k} {k!}$$`,
      lambda: `$$\\lambda$$`,
      input: 0.0
    };
  },
  mounted() {
    this.formatMath();
  },
  methods: {
    formatMath(){
      setTimeout(()=>{
        this.$nextTick(()=>{
          if(this.MathJax.isMathjaxConfig){
            this.MathJax.initMathjaxConfig();
          }
          //这个地方的hello是对应要渲染数学公式的dom的class
          this.MathJax.MathQueue('spanCls');
        })
      },500)
    },
    submitPoisson ()
    {
      const data = this.input

      axios.post('http://localhost:8080/poisson', data)
          .then(response => {
            console.log(response.data.message);
          })
          .catch(error => {
            // 请求失败处理
            console.error(error);
          });
      alert("请求已发送");
    }
  }

}
</script>

<style scoped>
body,html{
  height: 100%;
}

.el-container{
  height: 100vh;
  padding: 0;
}
.el-row{
  display: flex;
  align-content: center;
  justify-content: center;
}

.el-col{
  display: flex;
  align-content: center;
  justify-content: center;
}
.el-header{
  background-color: #B3C0D1;
  color: #333;
  padding: 10px;
  justify-content: center ;
  text-align: center;
  line-height: 10%;
}


.el-main {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 90%;
  padding: 0;
}

body>.el-container {
  margin-bottom: 40px;
  height: 100vh;
}

.el-card{
  margin: 50px;
  padding: 10px;
}

.picture{
  height: 80%;
  width: 90%;
  border: #333333;
}
</style>