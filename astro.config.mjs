// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// 构建输出为纯静态站点（dist/），部署方式与旧版一致
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [icon()],
});
