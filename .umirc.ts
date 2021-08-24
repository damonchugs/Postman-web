import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/PostMan/index' },
  ],
  fastRefresh: {},
  dva: {
    lazyLoad: true
  },
  cssLoader: {
    localsConvention: 'camelCase'
  }
});
