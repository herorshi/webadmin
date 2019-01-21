import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(Router)
var router = new Router() 
export default new Router({
  routes: [
    // {
    // path:'/',
    // name:'hom', 
    // component:() => import( './components/hom'),
    // mode:'history',
    // },
    {
    path:'*',
    name:'error',
    component:() => import( './components/error'),
    mode:'history',
    redirect:{name:'home'}
    },
    {
      path: '/home',
      name: 'home',
      component:() => import( './components/home'),
      children:[
        {
          path:'manage_data',
          name:'manage_data',
          component:() => import( './components/manage_data'),
          mode:'history',
          children: [
            {
            path:'job_info',
            name:'job_info',
            component:() => import('./components/job_info/job_info'),
            mode:'history',
                children: [
                  {
                  path:'data_job_info',
                  name:'data_job_info',
                  component:() => import('./components/job_info/data_job_info'),
                  mode:'history',
                  },
                  {
                    path:'creatework',
                    name:'creatework',
                    component:() => import( './components/job_info/creatework'),
                    mode:'history',
                  },
                  {
                  path:'update_job_info/:id',
                  name:'update_job_info',
                  component:() => import('./components/job_info/update_job_info.vue'),
                  mode:'history',
                  },
                ]
            },
      
          ],
          beforeEnter: (to, from, next) => {
              console.log("home");
              if(VueCookie.get('username')==null) next('/login');
              next();
          }
          
          },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( './views/About.vue')
    },
    {
    path:'/login',
    name:'login',
    component:() => import( './components/login'),
    mode:'history',
    beforeEnter: (to, from, next) => {
      console.log("Login");
      if(VueCookie.get('username')!=null) next('/home');
      else  next();
    }
    },

    {
      path:'/accept_work',
      name:'accept_work',
      component:() => import('./components/accept_work/accept_work'),
      mode:'history',
      children: [
        {
        path:'accept_data',
        name:'accept_data',
        component:() => import('./components/accept_work/accept_data'),
        mode:'history',
        },
      ]
    },

  ]
})
