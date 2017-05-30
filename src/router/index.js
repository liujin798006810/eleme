import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'


Vue.use(Router)

const routes=[
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },{
      path: '/seller',
      name: 'seller',
      component: seller
    },{
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }
  ]

const router=new Router
//主页打开默认跳到商品界面
router.push('/goods')

export default new Router({
  routes
})

