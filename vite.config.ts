
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/utils/svgBuilder.js'
import legacy from '@vitejs/plugin-legacy'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import refreshPlugin from './src/utils/refreshPlugin.js'
const now = new Date().getTime();


const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '/@': pathResolve('./src/'),
};
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  let dist = "";
  if (process.env.VITE_MODE == 'test') {
    dist = "dist";
  } else {
    dist = "dist";
  }
  return defineConfig({
    plugins: [vue(), svgBuilder("./src/assets/svg/"), refreshPlugin({ version: now }),ViteImageOptimizer(), legacy()],
    build: {
      sourcemap: false,
      outDir: dist,
    },
    // esbuild: {
    //   drop: ['console', 'debugger'],
    // },
    resolve: { alias },
    base: process.env.VITE_MODE == 'production' ? '/' : '/',
    server: {
      proxy: {
        '/api': {
          // target: '', //后端本地
          // target: '', //测试环境
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      }
    },
    define: {
      __APP_VERSION__: now,
    }
  });
};

