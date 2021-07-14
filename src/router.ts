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
      redirect: '/user/chats',
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
      path: '/user/login',
      meta: {
        title: '登录-FWeChat',
      },
      component: () => import('views/Login.vue'),
    },
    {
      path: '/user/register',
      meta: {
        title: '注册-FWeChat',
      },
      component: () => import('views/Register.vue'),
    },
    {
      path: '/user/chats',
      meta: {
        title: '聊天-FWeChat',
      },
      name: 'chats',
      component: () => import('views/Chats.vue'),
    },
    {
      path: '/user/contacts',
      meta: {
        title: '通讯录-FWeChat',
      },
      name: 'contacts',
      component: () => import('views/Contacts.vue'),
    },
    {
      path: '/user/discover',
      meta: {
        title: '发现-FWeChat',
      },
      name: 'discover',
      component: () => import('views/Discover.vue'),
    },
    {
      path: '/user/me',
      meta: {
        title: '我的-FWeChat',
      },
      name: 'me',
      component: () => import('views/Me.vue'),
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
