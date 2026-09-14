import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages 的项目站点通常位于 /仓库名/；使用相对路径以兼容该子目录。
  base: './',
  // 页面中有部分像素素材通过 /assets/... 直接引用；发布时原样复制它们。
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        admin: resolve(import.meta.dirname, 'admin/index.html'),
      },
    },
  },
})
