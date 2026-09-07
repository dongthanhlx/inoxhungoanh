/**
 * Cổng chặn phát hành.
 *
 * Cách một website như thế này hỏng thường không phải do lỗi kỹ thuật, mà do
 * lên sóng khi vẫn còn ảnh minh hoạ và câu trả lời chưa ai xác nhận: lúc duyệt
 * thì thấy ổn, rồi không ai nhớ để thay. Script này biến việc đó thành lỗi
 * build thay vì một phát hiện sáu tháng sau.
 *
 * Chạy sau `npm run build`. Trả về mã khác 0 khi còn chỗ chưa hoàn thiện, nên
 * có thể dùng để chặn deploy.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

const walk = (dir, acc = []) => {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, acc);
    else if (entry.endsWith('.html')) acc.push(path);
  }
  return acc;
};

let pages;
try {
  pages = walk(DIST);
} catch {
  console.error(`Chưa có thư mục ${DIST}/. Chạy "npm run build" trước.`);
  process.exit(2);
}

const giaiMa = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const nhom = {
  anhStock: { map: new Map(), nhan: 'ảnh minh hoạ cần thay bằng ảnh thật của xưởng' },
  oTrong: { map: new Map(), nhan: 'ô ảnh chưa có ảnh nào' },
  noiDung: { map: new Map(), nhan: 'chỗ nội dung chưa được xưởng xác nhận' },
};

const dem = (map, page, label) => {
  const key = `${giaiMa(label)}  (${page.replace(/\\/g, '/')})`;
  map.set(key, (map.get(key) ?? 0) + 1);
};

/*
  Trang thiếu stylesheet.

  Đã gặp hai lần: build báo thành công nhưng HTML ra không có thẻ stylesheet nào,
  trang trông như tài liệu Word. Không có dòng lỗi nào hiện ra.

  Nguyên nhân gốc CHƯA xác định. Lần đầu tưởng do cache Vite hỏng, nhưng lần thứ
  hai xảy ra ngay sau khi đã xoá sạch dist, .astro và node_modules/.vite, nên giả
  thuyết đó sai. Hiện tượng là chập chờn: chạy lại đúng lệnh build đó thì CSS có.
  Nghi vấn nằm ở Astro 7.3.1 + @tailwindcss/vite 4.3.3, chưa có bằng chứng chắc.

  Vì chưa chữa được gốc, chốt chặn này là biện pháp thay thế: nó bắt lỗi một cách
  xác định, mỗi lần build. Gặp thì chạy lại `npm run build` rồi kiểm lại.
  TUYỆT ĐỐI không deploy khi chưa chạy lệnh kiểm tra này.
*/
const thieuCss = [];

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const m of html.matchAll(/data-anh-stock="([^"]*)"/g)) dem(nhom.anhStock.map, page, m[1]);
  for (const m of html.matchAll(/data-photo-slot="([^"]*)"/g)) dem(nhom.oTrong.map, page, m[1]);
  for (const m of html.matchAll(/data-cho-noi-dung="([^"]*)"/g)) dem(nhom.noiDung.map, page, m[1]);
  if (!/<link[^>]+rel="stylesheet"/.test(html)) thieuCss.push(page.replace(/\\/g, '/'));
}

/*
  Thiếu trang 404.

  Cloudflare Pages chỉ trả đúng status 404 khi có sẵn dist/404.html. Không có nó,
  mọi URL rác đều nhận nguyên trang chủ kèm status 200, và Google index chúng như
  nội dung trùng lặp. Đã từng xảy ra trên bản live.
*/
if (!existsSync(join(DIST, '404.html'))) {
  console.error('LỖI NGHIÊM TRỌNG: không có dist/404.html.');
  console.error('  Mọi URL sai sẽ trả về trang chủ kèm status 200 (soft 404).');
  console.error('  Tạo src/pages/404.astro rồi build lại.');
  process.exit(2);
}

if (thieuCss.length) {
  console.error(`LỖI NGHIÊM TRỌNG: ${thieuCss.length} trang không có stylesheet.`);
  for (const p of thieuCss) console.error(`  ${p}`);
  console.error('\nXoá dist, .astro và node_modules/.vite rồi chạy lại npm run build.');
  process.exit(2);
}

console.log(`Đã quét ${pages.length} trang trong ${DIST}/\n`);

let tong = 0;
for (const { map, nhan } of Object.values(nhom)) {
  const n = [...map.values()].reduce((a, b) => a + b, 0);
  tong += n;
  if (!n) continue;
  console.log(`Còn ${n} ${nhan}:`);
  for (const [key, lan] of [...map].sort()) {
    console.log(`  ${lan > 1 ? `${lan}x ` : ''}${key}`);
  }
  console.log('');
}

if (!tong) {
  console.log('Không còn chỗ trống nào. Sẵn sàng phát hành.');
  process.exit(0);
}

console.log('Xem CAN-XAC-NHAN.md để biết cần gì cho từng chỗ.');
console.log('Chưa nên trỏ tên miền thật vào bản này.');
process.exit(1);
