<template>
  <!--<el-scrollbar wrapClass="scrollbar-wrapper">-->
    <div class="siderbar">
      <div class="siderbar-logo">
        <img src="@/assets/logo_2X.png" class="icon-computer" />
        <span class="sidebar-title">数据追踪管理</span>
        <hr class="divid" >
        <p class="big-center">土巴兔大数据中心</p>
      </div>
      <el-menu
        style="height: 100%;"
        mode="vertical"
        class="app-siderbar"
        :show-timeout="200"
        :default-active="$route.path"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#deedfe"
      >
        <el-submenu v-for="(parent_router,index) in permission_routers"
          :key="index"
          :index="parent_router.path">
          <template slot="title">
            <i class="iconfont"
              :class="[parent_router.icon]"></i>
            <span>{{parent_router.name}}</span>
          </template>
          <el-menu-item v-for="(rute,$index) in parent_router.children"
            :key="$index"
            :index="parent_router.path + rute.path"
          >
            {{rute.name}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  <!--</el-scrollbar>-->
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      permission_routers: [
        {
          name: '可视化圈选',
          path: '/usertrackingsdk',
          icon: 'icon-Menu_circle',
          children: [
            {
              name: '事件圈选',
              path: '/index'
            }
          ]
        }
      ]
    }
  },
  computed: {
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>
.scrollbar-wrapper {
  overflow-x: hidden!important;
}
.scrollbar-wrapper .el-scrollbar__view {
  height: 100%;
}
.el-menu{
  overflow-x: hidden;

}
.el-submenu__title{
  color:#9DA0AD!important;
}
.el-menu-item{
  background-color: #000C17!important;
  color: rgba(255,255,255, 0.65)!important;
}
.el-menu-item.is-active{
  background-color: #2184f9!important;
  color: #fff!important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
}

.siderbar{
  background: #3C415C;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.app-siderbar{
  height: auto;
  width: 161px;
}
.siderbar-logo{
  height:105px;
  background-color: #002140;
  width: 160px;
  color: #fff;
  text-align: center;
  padding-top: 25px;
}
.siderbar-logo *{
  vertical-align: middle;
}
.siderbar-logo+span{
  font-weight: 700;
  font-size: 16px;
}
.sidebar-title{
  font-size: 15px;
  font-weight: 700;
  display: block;
  margin-top:12px;
}
.icon-computer{
  width: 24px;
  height: 22px;
}
.divid{
  border: 0;
  background: rgba(255,255,255 , 0.5);
  height: 1px;
  width:92px;
  margin: 0 auto;
}
.big-center{
  font-size: 12px;
  letter-spacing: 1.78px;
  color: #fff;
  transform: scale(0.8333333333333)
}
</style>
