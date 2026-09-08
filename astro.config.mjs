// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://inoxhungoanh.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      /*
        /cong-trinh/ chưa có công trình nào nên đang để trống có chủ ý. Nộp một
        trang rỗng cho Google là tự chuốc đánh giá thin content cho cả tên miền.
        Bỏ dòng lọc này ngay khi công trình thật được nhập vào, và bỏ luôn cờ
        noindex trong src/pages/cong-trinh.astro.
      */
      filter: (page) => !page.endsWith('/cong-trinh/'),
    }),
    icon({ iconDir: 'src/icons' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
