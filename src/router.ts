import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      meta: {
        title: 'FWeChat',
        isLogin: true,
      },
      component: () => import('views/Chats.vue'),
    },
    {
      path: '/home',
      meta: {
        title: '首页',
      },
      component: () => import('views/Home.vue'),
    },
    {
      path: '/login',
      meta: {
        title: '登录-FWeChat',
      },
      component: () => import('views/Login.vue'),
    },
    {
      path: '/register',
      meta: {
        title: '注册-FWeChat',
      },
      component: () => import('views//Register.vue'),
    },
    {
      path: '/chats',
      meta: {
        title: '消息-FWeChat',
      },
      name: 'chats',
      component: () => import('views//Chats.vue'),
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const { title, isLogin } = to.meta;
  const isUser = localStorage.getItem('userName');
  const isPassword = localStorage.getItem('password');

  if (title) {
    document.title = title as string;
  }
  // 判断该路由是否需要登录权限
  if (isLogin) {
    if (isUser && isPassword) {
      next();
    } else {
      next('/home');
    }
  } else {
    next(); // 确保一定要有next()被调用
  }
});
