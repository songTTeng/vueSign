<template>
  <div id="signBox">
    <canvas id="mobile" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" v-if="mobile">
    </canvas>
    <canvas id="pc" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" @mouseout="mouseout" v-if="pc">
    </canvas>
  </div>
</template>

<script>
let el = ''
let ctx = ''
export default {
  name: 'signature',
  props: {
    lineWidth: {
      type: String,
      default: '6'
    },
    lineColor: {
      type: String,
      default: '#000000'
    },
    background: {
      type: String,
      default: '#ffffff'
    },
    bgOpacity: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      status: [],
      step: -1,
      first: '',
      mp: {}
    }
  },
  mounted () {
    const that = this
    const userAgent = navigator.userAgent.toLowerCase()
    const checkCanvas = function () {
      if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('android') !== -1) {
        return '#mobile'
      } else {
        return '#pc'
      }
    }
    el = document.querySelector(checkCanvas())
    // 动态设置元素的prop => height & width ，防止笔画变形
    el.style.width = '85%'
    el.style.height = '100%'
    el.style.marginLeft = '15%'
    el.style.borderLeft = '1px solid #ddd'
    // el.style.borderRadius = '5px'
    el.height = el.offsetHeight
    el.width = el.offsetWidth
    ctx = el.getContext('2d')
    ctx.lineWidth = that.lineWidth
    ctx.strokeStyle = that.lineColor
    el.style.backgroundColor = that.background
    el.style.opacity = that.bgOpacity
    // let r_a = 0;
    // ctx.fillStyle = "rgba(255, 255, 255, " + r_a + ")";
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, el.width, el.height)
    that.first = that.getBase64PNG()
  },
  methods: {
    touchstart (e) {
      this.mp = { x: e.touches[0].clientX - e.target.offsetLeft, y: e.touches[0].clientY - e.target.offsetTop }
      this.saveStatus()
    },
    touchmove (e) {
      const that = this
      ctx.beginPath()
      ctx.moveTo(that.mp.x, that.mp.y)
      that.mp = { x: e.touches[0].clientX - e.target.offsetLeft, y: e.touches[0].clientY - e.target.offsetTop }
      ctx.lineTo(that.mp.x, that.mp.y)
      ctx.fill()
      ctx.closePath()
      ctx.stroke()
    },
    touchend () {
      this.mp = {}
    },
    mousedown (e) {
      this.mp = {}
      this.mp = { x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop }
      this.saveStatus()
    },
    mousemove (e) {
      const that = this
      if (that.mp.x && that.mp.y) { // 如果这里不做判断，那么只要鼠标移动到画布就自动画了
        ctx.beginPath()
        ctx.moveTo(that.mp.x, that.mp.y)
        that.mp = { x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop }
        ctx.lineTo(that.mp.x, that.mp.y)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
      }
    },
    mouseup () {
      this.mp = {}
    },
    mouseout () {
      this.mp = {}
    },
    reset () {
      const that = this
      ctx.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
      const canvasPic = new Image()
      canvasPic.src = that.firstStatus
      canvasPic.addEventListener('load', () => {
        ctx.drawImage(canvasPic, 0, 0)
      })
      that.step = -1
      that.status = []
    },
    getBase64PNG () {
      return el.toDataURL('image/png')
    },
    getHorizontal (callback) {
      const that = this
      for (const i of document.querySelectorAll('canvas[data-none="1"]')) {
        i.parentNode.removeChild(i)
      }
      const hiddenEl = document.createElement('canvas')
      hiddenEl.dataset.none = '1'
      hiddenEl.width = el.offsetHeight
      hiddenEl.height = el.offsetWidth
      document.getElementById('signBox').appendChild(hiddenEl)
      const hiddenCtx = document.querySelector('canvas[data-none="1"]').getContext('2d')
      const img = new Image()
      img.src = that.getBase64PNG()
      img.onload = function () {
        const width = Math.round(el.offsetHeight / 2)
        const height = Math.round(el.offsetWidth / 2)
        hiddenCtx.save()
        hiddenCtx.translate(width, height)
        hiddenCtx.rotate(-90 * Math.PI / 180)
        hiddenCtx.drawImage(img, -img.width / 2, -img.height / 2)
        hiddenCtx.restore()
        callback(document.querySelector('canvas[data-none="1"]').toDataURL('image/png'))
      }
    },
    getBlob () {
      const that = this
      const arr = that.getBase64PNG().split(','); const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    getFile (filename) {
      const that = this
      const _filename = filename || 'default'
      const dataurl = that.getBase64PNG()
      const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], _filename, { type: mime })
    },
    draw (base64) {
      const canvasPic = new Image()
      canvasPic.src = base64
      canvasPic.addEventListener('load', () => {
        ctx.drawImage(canvasPic, 0, 0)
      })
    },
    saveStatus () {
      const that = this
      that.step++
      if (that.step < that.status.length) {
        that.status.length = that.step // 截断数组
      }
      that.status.push(that.getBase64PNG())
    },
    undo (callback) {
      const that = this
      if (that.step >= 0) {
        ctx.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
        const canvasPic = new Image()
        canvasPic.src = that.status[that.step]
        canvasPic.addEventListener('load', () => {
          ctx.drawImage(canvasPic, 0, 0)
        })
        that.step--
      } else {
        // eslint-disable-next-line
        console.warn('无法再后退了');
        if (callback) callback()
      }
    },
    redo (callback) {
      const that = this
      if (that.step < that.status.length - 2) {
        that.step++
        const canvasPic = new Image()
        if (that.status[that.step + 1]) {
          canvasPic.src = that.status[that.step + 1]
          canvasPic.addEventListener('load', () => {
            ctx.clearRect(0, 0, el.offsetWidth, el.offsetHeight)
            ctx.drawImage(canvasPic, 0, 0)
          })
        }
      } else {
        // eslint-disable-next-line
        console.warn('无法再重做了');
        if (callback) callback()
      }
    },
    // 关闭当前签名页
    closePage () {
      this.reset()
      const isLppzApp = false
      const ua = navigator.userAgent.toLowerCase()
      const uaAndroid = /android/i.test(ua) // test返回的是true/false
      const uaIos = /iphone|ipad|ipod/i.test(ua)
      if (window.WeixinJSBridge) {
        window.WeixinJSBridge.call('closeWindow') // 微信
      } else if (window.AlipayJSBridge) {
        window.AlipayJSBridge.call('closeWebview') // 支付宝
      } else if (isLppzApp && uaAndroid) {
        window.obj.closePageLppzRequest('') // 安卓app
      } else if (isLppzApp && uaIos) {
        window.webkit.messageHandlers.closePageLppzRequest.postMessage('') // ios app
      } else {
        window.close()
      }
    }
  },
  computed: {
    mobile () {
      return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 || navigator.userAgent.toLowerCase().indexOf('android') !== -1
    },
    pc () {
      return !(navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 || navigator.userAgent.toLowerCase().indexOf('android') !== -1)
    }
  }
}
</script>

<style scoped lang="scss">
#signBox {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
