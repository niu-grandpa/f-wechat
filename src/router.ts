import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      meta: {
        title: '登录-FWeChat',
      },
      component: () => import('views/index/Index.vue'),
    },
    {
      path: '/user/login',
      meta: {
        title: '登录-FWeChat',
      },
      component: () => import('views/index/Login.vue'),
    },
    {
      path: '/user/register',
      meta: {
        title: '注册-FWeChat',
      },
      component: () => import('views/index/Register.vue'),
    },
    {
      path: '/user/chat-window',
      name: 'chat',
      meta: {
        title: '聊天会话-FWeChat',
      },
      component: () => import('views/chats/ChatWindow.vue'),
    },
    {
      path: '/user-panel',
      name: 'userPanel',
      meta: {
        title: '用户面板-FWeChat',
      },
      component: () => import('views/contacts/UserPanel.vue'),
    },
    {
      path: '/personal-home-page',
      name: 'personalPage',
      meta: {
        title: '个人主页-FWeChat',
      },
      component: () => import('views/contacts/PersonalPage.vue'),
    },
    {
      path: '/user/moments',
      meta: {
        title: '朋友圈-FWeChat',
      },
      component: () => import('views/discover/Moments.vue'),
    },
    {
      path: '/user/pay',
      meta: {
        title: '支付-FWeChat',
      },
      component: () => import('views/me/Pay.vue'),
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
  if (isUser && isPassword) {
    next();
  } else {
    next('/home');
  }
});
