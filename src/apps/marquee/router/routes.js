import Index from '@/apps/marquee/modules/Index'

export default [
  {
    path: '/',
    redirect: '/marquee',
	},
  {
    name: 'Index',
    path: '/marquee',
    component: Index,
    meta: {
      title: '可视化圈选'
    }
  }
]
