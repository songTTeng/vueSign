<!--
 * @Description:
 * @Version: 1.00
 * @Autor: songTeng
 * @Date: 2021-08-10 22:34:46
 * @LastEditors: songTeng
 * @LastEditTime: 2021-09-06 14:56:38
-->
<!-- 在线签字 -->
<template>
  <div class="sign">
    <sign-ature ref="signature" :lineWidth="lineWidth" :lineColor='lineColor' :background='background' :bgOpacity="bgOpacity" />
    <div class="operButton">
      <el-button @click="handleReset" type="danger" class="elButton">清空签名</el-button>
      <el-button @click="handleSubmit" type="primary" class="elButton">生成签名</el-button>
    </div>
  </div>
</template>
<script>
import signAture from './sign'
export default {
  name: 'sign',
  components: {
    signAture
  },
  data () {
    return {
      showFlag: true,
      lineWidth: '6',
      lineColor: '#000000',
      background: '#ffffff',
      bgOpacity: '1',
      resultImg: ''
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    handleSubmit () {
      this.resultImg = this.$refs.signature.getBase64PNG()
      //  console.log("000",this.$refs.signature.draw(this.resultImg))
      // let arr = that.getBase64PNG().split(','), mime = arr[0].match(/:(.*?);/)[1]
      console.log('22222', this.$refs.signature.getBase64PNG())
      console.log('3333', this.$refs.signature.getBase64PNG().split(',')[0].match(/:(.*?);/)[1])
    },
    handleReset () {
      this.resultImg = ''
      this.$refs.signature.reset()
    }
  }
}
</script>
<style lang='scss' scoped>
.sign {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;
  .operButton {
    position: absolute;
    left: -110px;
    bottom: 50%;
    z-index: 99999;
    transform: rotate(90deg);
    .elButton {
      margin: 0 20px;
    }
  }
}
</style>
