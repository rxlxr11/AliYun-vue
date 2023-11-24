<template>
  <div>
    <i class="el-icon-refresh"  @click="getImage"></i>
    <el-image :src=src></el-image>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-upload
          class="upload-demo"
          ref="upload"
          :on-change= "getFile"
          :limit="1"
          list-type="picture"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">上 传</el-button>
              </span>
    </el-dialog>
  </div>

</template>

<script>

import axios from "axios";
axios.defaults.headers.common['Content-Type'] = 'application/json';
export default {
  name: "RImage",
  data(){
    return{
      dialogVisible: false,
      src: '',
      base64: ''
    }
  },
  mounted() {
      this.getImage();
  },
  methods: {
    getImage(){
      axios.get("http://localhost:8080/imageBase64").then((result) => {
        this.src = result.data.payload;
        this.src = this.src.substring(1,this.src.length-1);
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
      const data = this.base64;

      axios.post('http://localhost:8080/uploadImage', data)
          .then(response => {
            console.log(response.data.message);
          })
          .catch(error => {
            // 请求失败处理
            console.error(error);
          });
      alert("请求已发送");
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    getFile(file) {
      this.getBase64(file.raw).then(res => {
        console.log(res);
        this.base64 = res;
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    }

  }
}
</script>

<style scoped>

.el-icon-refresh{
  font-size: 100px;
}

.el-icon-refresh:hover{
  color: #407eff;
}
</style>