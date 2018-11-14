export default {
  data () {
    return {
      iframeHeight: 0,
      items: []
    }
  },
  mounted () {
    let that = this
    window.addEventListener('message', function (event) {
      if (typeof event.data !== typeof '') {
        // that.$alert(that.url + ' 不支持圈选')
        // console.error('%s 不支持圈选', that.url)
        return
      }
      try {
        let data = JSON.parse(event.data)
        if(typeof data !== typeof {} || !data.status) {
          return
        }
        let { status, eles, height } = data
        switch (status) {
          case 200:
            if (eles) {
              that.items = eles
              that.iframeHeight = height
            }
            break
          case 500:
            that.$alert('当前页面暂不支持圈选功能, 请先引入jquery 库')
            break
        }
      } catch (error) {
        console.error('error: %o', error)
      }
    })
  },
  methods: {

  }
}