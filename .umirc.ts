import { defineConfig } from 'umi';

export default defineConfig({
  devServer: {
    port: 2345
  },
  history: {
    type: 'hash'
  },
  base: './',
  publicPath: './',
  outputPath: '/Gan_PostMan_Web/',
  hash: true,
  // dynamicImport: true, // 是否启用按需加载
  // exportStatic: {
  //   dynamicRoot: '/Gan_PostMan_Web'
  // },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/PostMan/index' },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
    lazyLoad: true
  },
  cssLoader: {
    localsConvention: 'camelCase'
  },
  targets: {
    ie: 11,
  },
});
