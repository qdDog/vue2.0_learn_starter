import Vue from 'vue';
import Router from 'vue-router';

import Recommend from '../components/recommend/recommend.vue';
import Rank from '../components/rank/rank.vue';
import Singer from '../components/singer/singer.vue';
import SingerDetail from '../components/singer-detail/index.vue';
import Search from '../components/search/search.vue';
import Disc from '../components/disc/disc.vue';
import TopList from '../components/top-list/top-list.vue';
import userCenter from '../components/user-center/user-center.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: () => import(/* webpackChunkName: "recommend" */ '../components/recommend/recommend.vue'),
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "disc" */ '../components/disc/disc.vue'),
        },
      ],
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import(/* webpackChunkName: "rank" */ '../components/rank/rank.vue'),
      children: [{
        path: ':id',
        component: () => import(/* webpackChunkName: "toplist" */ '../components/top-list/top-list.vue')
      }],
    },
    {
      path: '/singer',
      name: 'Singer',
      component: () => import(/* webpackChunkName: "Singer" */ '../components/singer/singer.vue'),
      children: [
        {
          path: ':id',
          name: 'SingerDetail',
          component: () => import(/* webpackChunkName: "SingerDetail" */ '../components/singer-detail/index.vue'),
        },
      ],
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import(/* webpackChunkName: "search" */ '../components/search/search.vue'),
      children: [
        {
          path: ':id',
          name: 'SingerDetail',
          component: () => import(/* webpackChunkName: "SingerDetail" */ '../components/singer-detail/index.vue'),
        },
      ],
    },
    {
      path: '/user',
      name: 'user',
      component: import(/* webpackChunkName: "user" */ '../components/user-center/user-center.vue'),
    },
  ],
});
