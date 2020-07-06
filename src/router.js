/*
 * @Date: 2020-05-31 21:56:54
 * @LastEditors: hanjiawang
 * @LastEditTime: 2020-06-24 10:46:50
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import NotFound from './views/404.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/UserLayout.vue'),
      children: [
        {
          path: '/user',
          redirect: '/user/login'
        },
        {
          path: '/user/login',
          name: 'login',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/User/Login.vue')
        },
        {
          path: '/user/Register',
          name: 'register',
          component: () =>
            import(/* webpackChunkName: "user" */ './views/User/Register.vue')
        }
      ]
    },
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "layout" */ './layouts/BasicLayout.vue'),
      children: [
        // dashboard
        {
          path: '/',
          redirect: '/dashboard/analysis'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ './views/Dashboard/Analysis'
                )
            }
          ]
        },
        // form
        {
          path: '/form',
          name: 'form',
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/form/basic-form',
              name: 'basicForm',
              component: () =>
                import(/* webpackChunkName: "form" */ './views/Forms/BasicForm')
            },
            {
              path: '/form/step-form',
              name: 'stepForm',
              component: () =>
                import(/* webpackChunkName: "form" */ './views/Forms/StepForm'),
              children: [
                {
                  path: '/form/step-form',
                  redirect: '/form/step-form/info'
                },
                {
                  path: '/form/step-form/info',
                  name: 'info',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/Forms/StepForm/Step1'
                    )
                },
                {
                  path: '/form/step-form/confirm',
                  name: 'confirm',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/Forms/StepForm/Step2'
                    )
                },
                {
                  path: '/form/step-form/result',
                  name: 'result',
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ './views/Forms/StepForm/Step3'
                    )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
