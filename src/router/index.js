import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import User from '@/pages/user/user'
import Login from '@/pages/login'
Vue.use(Router)

let myRouter = new Router({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index', // 首页
      name: 'Index',
      component: Index
    },
    {
      path: '/user', // 个人中心
      name: 'User',
      component: User,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
      },
    {
      path: '/userAgree', // 用户协议
      name: 'userAgree',
      component:()=> import('./../pages/userAgree')
      },
    {
      path: '/serviceAgreement', // 服务协议
      name: 'serviceAgreement',
      component:()=> import('./../pages/serviceAgreement')
    },
    {
      path: '/protocol', // 服务协议
      name: 'protocol',
      component:()=> import('./../pages/protocol')
    },
    {
      path: '/InstitutionalBinding', // 机构绑定
      name: 'InstitutionalBinding',
      component:()=> import('./../pages/InstitutionalBinding')
    },
    {
      path: '/success', // 绑定成功
      name: 'success',
      component:()=> import('./../pages/success')
    },
    {
      path: '/identityAuthentication',
      name: 'identityAuthentication',
      component:()=> import('./../pages/identityAuthentication')
    },
    {
      path: '/CertificationSuccess', // 认证成功
      name: 'CertificationSuccess',
      component:()=> import('./../pages/CertificationSuccess')
    },
    {
      path: '/activity', // 我的活动页
      name: 'activity',
      component:()=> import('./../pages/activity')
    },
    {
      path: '/SubmitInformation', // 提交汇款信息
      name: 'SubmitInformation',
      component:()=> import('./../pages/SubmitInformation')
      },
      {
      path: '/SubmitSuccess', // 汇款信息提交成功
      name: 'SubmitSuccess',
      component:()=> import('./../pages/SubmitSuccess')
    },
    {
      path: '/remittanceInformation', // 查看汇款
      name: 'remittanceInformation',
      component:()=> import('./../pages/remittanceInformation')
    },
    {
      path: '/CustomerCase',
      name: 'CustomerCase',
      component:()=> import('./../pages/CustomerCase')
    },
    {
      path: '/activityorder',
      name: 'activityorder',
      component:()=> import('./../pages/activity/order'),
      children:[
        {
          path: 'indent',
          name: 'indent',
          component:()=> import('./../pages/activity/indent'),
         
        },
        {
          path: '/pay/:id',
          name: 'pay',
          component:()=> import('./../pages/activity/pay'),
          
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component:()=> import('./../pages/activity/detail'),
         
        },
        {
          path: '/orderdetail/:id',
          name: 'orderdetail',
          component:()=> import('./../pages/order/order'),
         
        }
      ]

    },
  ]
})
myRouter.beforeEach((to, from, next) => {
  let pathName = to.path.split('/')[1]
  // console.log(pathName)
  let isLogin = Vue.$cookies.get('sessionId')
  // 未登录可以访问的页面
  let arr = ['index','serviceAgreement','userAgree','protocol']
  let sarr = ['login']
  // 已经登陆过 要跳转login时
  if (sarr.indexOf(to.name) !== -1 && isLogin) {
    next('/index')
    return false
  }
  if (!isLogin) {
    if (arr.indexOf(pathName) === -1) {
      // 如果是登录页面路径，就直接next()
      if (to.path === '/login') {
        next()
      } else { // 不然就跳转到登录；
        next('/login')
      }
    } else {
      next()
    }
    return false
  } else {
    next()
  }
})
export default myRouter