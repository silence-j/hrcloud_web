<template>
  <div class="code-k-div" @mouseenter="enterCodeImg" @mouseleave="leaveCodeImg">
    <div class="code-content" :class="imgCodeShow ? 'codeToShow' : 'codeToHide'">
      <template v-if="imgLoading">
        <div class="loading-content">
          <div class="grey-content">
            <i class="el-icon-loading loading-icon"></i>
            加载中
          </div>
        </div>
      </template>
      <template v-else>
        <div class="code-img">
          <div class="code-img-content">
            <div class="code-mask">
              <img ref="frontImg" class="front-img" :src="frontImg"/>
            </div>
            <img ref="backImg" class="back-img" :src="backImg"/>
          </div>
        </div>
      </template>
      <div class="code-reload" @click="reload">
        <span><i class="el-icon-refresh" style="margin: 3px 0 3px 5px"></i></span>
        刷新
      </div>
    </div>
    <div>
      <div class="code-btn" ref="moveArea" v-show="!failBtnShow">
        <div class="progress"></div>
        <div class="placeholderText">{{ placeholderShow ? '向右拖动滑块填充拼图' : '' }}</div>
        <div
          ref="moveBtn"
          class="code-btn-m"
          :class="imgLoading ? 'code-btn-m-disable' : 'code-btn-m-active'"
          @mousedown="mouseDownEvent"
          @mouseenter="mouseEnterEvent"
          @mouseleave="mouseLeaveEvent"
        >
          <template v-if="iconType === 'success'">
            <i class="el-icon-check common-icon" style="color: white;"></i>
          </template>
          <template v-else-if="iconType === 'fail'">
            <i class="el-icon-close common-icon" style="color: white;"></i>
          </template>
          <template v-else>
            <i class="el-icon-arrow-right common-icon right-arrow" style="color: #999"></i>
          </template>
        </div>
      </div>
      <div class="fail-button" v-show="failBtnShow" @click="failBtnClick">
        <span class="fail-icon"><i class="el-icon-circle-close"></i></span>
        <span class="fail-tip">失败过多，点击重试</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getImgCheckCode, checkImgCode } from 'static/api/login/login'
export default {
  name: 'imgCheckCode',
  data () {
    return {
      imgLoading: true, // 图片请求成功时置为false（图片未加载时不允许拖动滑块）
      imgCodeShow: false, // 图片验证码显示标记，鼠标移入滑块时显示，移出时隐藏
      frontImg: '', // 小图地址
      backImg: '', // 大图地址
      codeId: '', // 验证码的ID
      isNeedToCheck: false, // 是否需要去提交验证的标记(一张验证码图片只有在mouseDown事件触发过之后才触发验证，刷新验证码重置)
      isMouseDown: false, // 鼠标是否按下的标记
      imgMaxWidth: '', // 小图可滑动的最大宽度
      sliderMaxWidth: '', // 滑块可拖动区域最大宽度
      divMove: '', // 拖动按钮
      mouseX: 0, // 鼠标x轴
      moveWidth: 0, // 滑块滑动距离
      imgMoveWidth: 0, // 小图的滑动距离
      checkStatus: false, // 校验状态（true表示校验通过）
      placeholderShow: true, // 滑动区域提示文字是否显示，默认显示，滑动过程中不显示
      iconType: 'arrow', // 滑块的icon类型：箭头（arrow）、打勾（success）、打叉（fail）
      failCounter: 0, // 失败次数，当失败次数大于3次时，显示点击重试
      failBtnShow: false, // 失败按钮的显示和隐藏
      timeClock: undefined, // 添加一个计时器，使得鼠标在元素上停留一定时间后才显示图片验证码，防止闪动
      mouseInBtn: false, // 鼠标是否在滑动区域内的标记

      btnEnable: false
    }
  },
  methods: {
    goInBtn () {
      this.mouseInBtn = true
    },
    goOutBtn () {
      this.mouseInBtn = false
    },
    failBtnClick () {
      // 点击失败重试按钮直接显示图片
      this.failBtnShow = false
      this.imgCodeShow = true
    },
    enterCodeImg () {
      this.timeClock = setTimeout(() => {
        if (!this.checkStatus && !this.failBtnShow) {
          this.imgCodeShow = true
        }
      }, 100)
    },
    leaveCodeImg () {
      clearTimeout(this.timeClock)
      if (this.moveWidth <= 0) {
        this.imgCodeShow = false
      }
    },
    mouseEnterEvent () {
      if (!this.checkStatus) {
        if (!this.imgLoading) {
          document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#1991fa'
          document.getElementsByClassName('right-arrow')[0].style.color = '#ffffff'
        }
      }
    },
    mouseLeaveEvent () {
      if (this.moveWidth <= 0) {
        document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#ffffff'
        document.getElementsByClassName('right-arrow')[0].style.color = '#45494c'
      }
    },
    mouseDownEvent (e) {
      if (!this.imgLoading) {
        // 鼠标点击滑块时，首先计算滑块可以滑动的最大宽度
        this.sliderMaxWidth = this.$refs.moveArea.clientWidth - this.$refs.moveBtn.clientWidth
        // 鼠标点击滑块时，首先计算小图可以滑动的最大宽度
        this.imgMaxWidth = this.$refs.backImg.clientWidth - this.$refs.frontImg.clientWidth
        if (!this.checkStatus) {
          e.preventDefault()
          this.isMouseDown = true
          this.isNeedToCheck = true
          // 将鼠标的初始定位记录下来
          this.mouseX = e.pageX
        }
      }
    },
    mouseMoveEvent (e) {
      if (!this.imgLoading && this.isMouseDown) {
        document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#1991fa'
        document.getElementsByClassName('right-arrow')[0].style.color = '#ffffff'
        // 滑块滑动的距离
        this.moveWidth = e.clientX - this.mouseX
        // 限制拼图在外层Wrapper宽度内滑动
        if (this.moveWidth > 0 && this.moveWidth < this.sliderMaxWidth) {
          // 将鼠标拖动的距离动态的加到小拼图和滑块上，产生同步位移效果
          // 小图的滑动距离根据滑块滑动距离的比例来计算
          this.placeholderShow = false
          this.imgMoveWidth = this.moveWidth / this.sliderMaxWidth * this.imgMaxWidth
          document.getElementsByClassName('code-btn-m')[0].style.left = this.moveWidth + 'px'
          document.getElementsByClassName('code-mask')[0].style.left = this.imgMoveWidth + 'px'
          document.getElementsByClassName('progress')[0].style.width = this.moveWidth + 'px'
          document.getElementsByClassName('progress')[0].style.backgroundColor = '#d1e9fe'
          document.getElementsByClassName('progress')[0].style.border = '1px solid #1991fa'
        }
      }
    },
    mouseUpEvent (e) {
      if (!this.imgLoading) {
        this.isMouseDown = false
        if (this.moveWidth > 0) {
          if (this.isNeedToCheck) {
            const movePercent = parseFloat((this.imgMoveWidth / this.$refs.backImg.clientWidth).toFixed(4))
            this.checkCode(movePercent)
          }
        }
      }
    },
    // movePercent是将位移距离相对于大图宽度的百分比，作为传给后台验证的方法
    checkCode (movePercent) {
      const params = {}
      params.id = this.codeId
      params.point_x = movePercent
      checkImgCode(params).then(res => {
        this.checkStatus = res.result
        if (res.result) {
          // 验证通过时传给父组件验证通过状态,并将isNeedToCheck复位为false
          // 如验证通过则向父组件传递关闭图片验证码的参数
          this.isNeedToCheck = false
          this.checkStatus = true
          this.imgCodeShow = false
          this.iconType = 'success'
          // 在这里向上层组件传递验证通过的信息，使得上层组件流程能继续进行
          this.$emit('changeCheckStatus', true)
          // 验证通过时将滑动区域颜色变绿色，表示通过
          document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#52ccba'
          document.getElementsByClassName('progress')[0].style.backgroundColor = '#d2f4ef'
          document.getElementsByClassName('progress')[0].style.borderColor = '#52ccba'
        } else {
          this.isNeedToCheck = false
          this.iconType = 'fail'
          // 验证不通过时将滑动区域颜色变红色，表示不通过
          document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#ff5c57'
          document.getElementsByClassName('progress')[0].style.backgroundColor = '#fce1e1'
          document.getElementsByClassName('progress')[0].style.borderColor = '#ff5c57'
          // 松开滑块后,如验证不通过则延时将滑块复位
          setTimeout(() => {
            this.iconType = 'arrow'
            document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#ffffff'
            document.getElementsByClassName('code-btn-m')[0].style.left = 0 + 'px'
            document.getElementsByClassName('code-mask')[0].style.left = 0 + 'px'
            document.getElementsByClassName('progress')[0].style.width = 0 + 'px'
            document.getElementsByClassName('progress')[0].style.borderColor = '#fff'
            this.mouseX = 0 // 重置鼠标点击的坐标
            this.moveWidth = 0 // 重置滑块位移距离
            this.placeholderShow = true
            this.loadImgCode()
            if (this.mouseInBtn) {
              this.imgCodeShow = true
            } else {
              this.imgCodeShow = false
            }
          }, 600)
          // 每次失败都记一次数
          this.failCounter = this.failCounter + 1
          if (this.failCounter < 3) {
            this.failBtnShow = false
          } else {
            this.failBtnShow = true
            // 显示失败按钮的同时，将计数清0
            this.failCounter = 0
          }
        }
      })
    },
    loadImgCode () {
      this.imgLoading = true
      getImgCheckCode().then(res => {
        const resData = res.result
        if (resData.bigImg && resData.smallImg) {
          this.btnEnable = true
          this.imgLoading = false
          this.frontImg = resData.smallImg
          this.backImg = resData.bigImg
          this.codeId = resData.id
        } else {
          this.imgLoading = true
          this.btnEnable = false
        }
      })
    },
    reload () {
      if (this.btnEnable) {
        this.loadImgCode()
      }
    },
    // 获取实时的登录状态
    _getParams () {
      this.$bus.$on('loginStatus', (status) => {
        if (!status) {
          this.checkStatus = false
          this.$emit('changeCheckStatus', false)
          this.isNeedToCheck = false
          this.failCounter = 0
          this.iconType = 'fail'
          // 验证不通过时将滑动区域颜色变红色，表示不通过
          document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#ff5c57'
          document.getElementsByClassName('progress')[0].style.backgroundColor = '#fce1e1'
          document.getElementsByClassName('progress')[0].style.borderColor = '#ff5c57'
          setTimeout(() => {
            this.iconType = 'arrow'
            document.getElementsByClassName('code-btn-m')[0].style.backgroundColor = '#ffffff'
            document.getElementsByClassName('code-btn-m')[0].style.left = 0 + 'px'
            document.getElementsByClassName('code-mask')[0].style.left = 0 + 'px'
            document.getElementsByClassName('progress')[0].style.width = 0 + 'px'
            this.mouseX = 0 // 重置鼠标点击的坐标
            this.moveWidth = 0 // 重置滑块位移距离
            this.placeholderShow = true
            if (this.mouseInBtn) {
              this.imgCodeShow = true
            } else {
              this.imgCodeShow = false
            }
          }, 600)
        }
      })
    }
  },
  mounted () {
    // 在这里添加事件监听可以在鼠标移出滑块后仍能触发事件
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveEvent)
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.mouseUpEvent)
    document.getElementsByClassName('code-btn')[0].addEventListener('mouseenter', this.goInBtn)
    document.getElementsByClassName('code-btn')[0].addEventListener('mouseleave', this.goOutBtn)
  },
  created () {
    this.loadImgCode()
    this._getParams()
  }
}
</script>

<style lang="less" scoped>
  .code-k-div {
    z-index: 99;
  }
  .codeToShow {
    display: block;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
  .codeToHide {
    display: none;
  }
  .code-content {
    position: absolute;
    top: 140px;
    left: 50%;
    margin-left: -155px;
    background-color: #fff;
    border-radius: 3px;
    width: 310px;
    height: 225px;
  }
  .loading-content {
    width: 310px;
    color: #999;
    height: 162px;
  }
  .grey-content {
    background-color: #e1e1e1;
    padding: 10px 10px 0 10px;
    height: 150px;
    border-radius: 3px;
  }
  .loading-icon {
    font-size: 30px;
    margin-left: 100px;
    margin-top: 45px;
  }
  .code-img {
    border-radius: 3px;
    width: 310px;
  }
  .code-img-content {
    position: relative;
  }
  .code-mask {
    position: absolute;
    top:0;
    left: 0;
    z-index: 10;
  }
  .front-img {
    width: 59px;
  }
  .back-img {
    width: 310px;
    border-radius: 3px;
  }
  .code-reload{
    font-size: 14px;
    color: #999;
    width: 58px;
    cursor: pointer;
  }
  .code-btn{
    position: relative;
    height: 40px;
    text-align: center;
    box-sizing: border-box;
    background-color: #f5f6f7;
    border-radius: 3px;
    border: 1px solid #e1e1e1;
    margin: 35px 0 10px;
  }
  .fail-button {
    position: relative;
    height: 40px;
    line-height: 40px;
    color: #f57a7a;
    text-align: center;
    box-sizing: border-box;
    background-color: #fce1e1;
    border: 1px solid #f57a7a;
    border-radius: 3px;
    margin: 35px 0 10px;
    cursor: pointer;
  }
  .fail-icon {
    font-size: 16px;
    margin-right: 5px;
  }
  .fail-tip:hover {
    text-decoration: underline #f57a7a;
  }
  .code-btn-m{
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 0 3px rgba(0,0,0,.3);
    z-index: 5;
    top: -1px;
    margin-left: -1px; // 解决边框重叠
    background-position: -63px 10px;
    transition: background-color 0.2s linear;
  }
  .code-btn-m-active {
    cursor: pointer;
  }
  .code-btn-m-disable {
    cursor: not-allowed;
  }
  .common-icon {
    font-size: 20px;
    padding-top: 9px;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
  .placeholderText {
    position: absolute;
    line-height: 40px;
    color: #45494c;
    top: 0;
    width: 100%;
    text-align: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
  }
  .progress {
    margin-top: -1px;
    z-index: 5;
    height: 38px;
    width: 0;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }
</style>
