import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import cesium from 'vite-plugin-cesium';
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      port: 3030,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [vue(), cesium(), AutoImport({
      imports: ["vue"],
      dts: "src/auto-import.d.ts"
    })],
  }
})
