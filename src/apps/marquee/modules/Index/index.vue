<template lang="pug">
.page
  el-container
    el-aside(width='160px')
      sidebar
    el-main(style='padding: 0')
      .t8t-events-viewer(:style='{height: `${mainHeight}px`}' style='overflow: hidden')
        .t8t-events-viewer__hd(style='border-bottom: 1px solid #ededef')
          el-container
            el-main
              el-input(v-model="input_url" placeholder="http[s]://")
            div(style='padding: 20px 20px 20px 0')
              el-button(type="primary" @click='handleOnClickStart') 开始圈选
        .t8t-events-viewer__bd(style='background: #fff; position: relative')
          iframe(:src='url' id='targetIframe' @load='handleOnFrameLoad' frameborder='0' width='100%' height='100%')
          .t8t-events-picker(@mousedown='beforeDraw' @mousemove='onDraw' @mouseup='afterDraw' :style='{height: iframeHeight + "px"}')
            .t8t-draw-box(:style='{width: mouseObj.width + "px", height: mouseObj.height + "px", transform: `translate3d(${mouseObj.left}px, ${mouseObj.top}px, 0)`}')
            .t8t-events-ele(v-for='(item, index) in items' :key='item.path' :class='{draw: item.drawing}'
                             :style='{top: item.top + "px", left: item.left + "px", width: item.width + "px", height: item.height + "px"}')
    el-aside(width='260px' style='border-left: 1px solid #ededef; background: #fff' )
      .t8t-events-viewer(:style='{height: `${mainHeight}px`}')
        .t8t-events-viewer__hd(style='padding: 20px 0; height: 80px; line-height: 40px')
          .t8t-lbar-tilte  当前页面事件
        .t8t-events-viewer__bd(style='border-top: 1px solid #ededef; overflow: auto')
          ul.t8t-events-list
            li(v-for='event in events') {{ event.eventName }}
        .t8t-events-viewer__ft(style='border-top: 1px solid #ededef; padding: 20px; background-color: #f6f6f6')
          el-button(type='primary' style='width: 100%') 保存
  el-dialog(:visible.sync='dialogVisible' width='30%')
    template(slot='title')
      p(style='text-align:center') {{evtOpts.type == 'edit' ? '编辑事件': '新增事件'}}
    el-row
      el-col
        span 名称
      el-col
        .el-input
          input.el-input__inner
    .dialog-footer(slot='footer')
      el-button 取消
      el-button 保存
</template>

<script>
import marqueeServices from '@/apps/marquee/services'
import Sidebar from './Sidebar'
import eventsMixin from './events'
import marqueeMixin from './marquee'

export default {
  components: {
    Sidebar
  },
  mixins: [eventsMixin, marqueeMixin],
  data () {
    return {
      input_url: 'http://sz.to8to.com/',
      url: '',
      dialogVisible: false,
      events: [],
      evtOpts: {
        opr: false,
        type: 'add',
        evt: ''
      },
      mouseObj: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    }
  },
  computed:{
    clientHeight (){
      return document.documentElement.clientHeight || window.innerHeight
    },
    mainHeight () {
      return this.clientHeight
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    fetchEvents () {
      if (!/^http[s]?:\/\/.+$/.test(this.url)) {
        return this.$alert('URL格式错误')
      }

      marqueeServices.fetch({
        url: this.url,
        uid: 0
      }).then(res => {
        this.events = res.events
      })
    },
    handleOnClickStart () {
      this.url = this.input_url
      this.fetchEvents()
    },
    handleOnFrameLoad (event) {
      try {
        let iframe = event.target.contentWindow;
        iframe.postMessage(JSON.stringify({start: true, getall: true}), "*")
      } catch (error) {
        console.log(error)
      }
    },
    beforeDraw (event) {
      // let opr = document.getElementById('operateArea').getBoundingClientRect();
      //   let win = window;
      //   let docElem = document.documentElement;
      //   this.$data.mouseObj.available = true;
      //   this.$data.mouseObj.left = event.pageX - (opr.left + (win.pageXoffset || docElem.scrollLeft) - (docElem.clientLeft || 0));
      //   this.$data.mouseObj.top = event.pageY - (opr.top + (win.pageYoffset || docElem.scrollTop) - (docElem.clientTop || 0));
      //   this.$data.mouseObj.width = 0;
      //   this.$data.mouseObj.height = 0;
      //   this.$data.startPoint = {
      //     x: this.$data.mouseObj.left,
      //     y: this.$data.mouseObj.top
      //   }
      let pickerDom = document.querySelector('.t8t-events-picker')
      console.log(pickerDom, event.target, pickerDom === event.target)
    },
    onDraw (event) {

    },
    afterDraw (event) {

    }
  }
}
</script>

<style lang="stylus">
@require 'index'

.t8t-events-picker
  position: absolute
  width: 100%
  top: 0
  left: 0
  cursor: crosshair
  overflow: hidden

.t8t-events-ele
  position: absolute;
  background: rgba(252,49,66,0.12)
  outline: 2px solid #FC3142
  display: none
  &.draw
    display: block

.t8t-draw-box
  position: absolute
  border: 1px solid red
  z-index: 1
</style>
