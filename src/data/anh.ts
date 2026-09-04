/**
 * Ảnh đang dùng trên site.
 *
 * TẤT CẢ ảnh trong `src/assets/stock/` là ảnh minh hoạ tải từ Pexels
 * (giấy phép Pexels: miễn phí dùng thương mại, không bắt buộc ghi công).
 * Chúng KHÔNG phải sản phẩm của Inox Hùng Oanh.
 *
 * Vì vậy mỗi mục dưới đây mang cờ `stock: true`. `npm run kiem-tra` đếm cờ này
 * và báo còn bao nhiêu ảnh cần thay bằng ảnh thật của xưởng. Khi thay, đổi
 * đường dẫn import sang `src/assets/that/` và bỏ cờ `stock`.
 *
 * CLAUDE.md (Content integrity) cấm trình bày ảnh của người khác như công trình
 * của Hùng Oanh. Do đó ảnh stock chỉ được dùng ở vị trí MINH HOẠ chủng loại
 * (ảnh nền, ảnh nhóm sản phẩm), không được dùng ở trang Công trình.
 */
import type { ImageMetadata } from 'astro';

import xuongHanInox from '../assets/stock/xuong-han-inox.jpg';
import xuongToanCanh from '../assets/stock/xuong-toan-canh.jpg';
import mayCat from '../assets/stock/may-cat.jpg';
import mayChan from '../assets/stock/may-chan.jpg';
import thoHan from '../assets/stock/tho-han.jpg';
import danhBong from '../assets/stock/danh-bong.jpg';
import vatTuInox from '../assets/stock/vat-tu-inox.jpg';
import cuaCongInox from '../assets/stock/cua-cong-inox.jpg';
import cauThangLanCanInox from '../assets/stock/cau-thang-lan-can-inox.jpg';
import banInox from '../assets/stock/ban-inox.jpg';
import keTuInox from '../assets/stock/ke-tu-inox.jpg';
import maiCheKhungInox from '../assets/stock/mai-che-khung-inox.jpg';
import lanCanKinh from '../assets/stock/lan-can-kinh.jpg';
import giaCongTheoYeuCau from '../assets/stock/gia-cong-theo-yeu-cau.jpg';
import ctKhungCuaSo from '../assets/stock/ct-khung-cua-so.jpg';
import ctKhoVatTu from '../assets/stock/ct-kho-vat-tu.jpg';
import ctChauRua from '../assets/stock/ct-chau-rua.jpg';

export interface Anh {
  src: ImageMetadata;
  /** Alt text, mô tả đúng thứ trong ảnh. */
  alt: string;
  /** true = ảnh minh hoạ, chưa phải ảnh thật của xưởng. */
  stock?: boolean;
  /** Ảnh thật cần chụp để thay thế. Hiện trong báo cáo kiểm tra. */
  canThay?: string;
}

const s = (src: ImageMetadata, alt: string, canThay: string): Anh => ({
  src,
  alt,
  stock: true,
  canThay,
});

export const anh = {
  /*
    Ảnh hero cố ý chọn sản phẩm inox hoàn thiện, chụp sáng, thay vì ảnh xưởng
    thiếu sáng. Đây là hình đầu tiên khách nhìn thấy: nó phải nói được "chỗ này
    làm ra đồ sạch sẽ, chắc chắn". Ảnh xưởng và thợ nằm ở mục Năng lực bên dưới,
    đúng chỗ chúng thuyết phục nhất.
  */
  hero: s(
    cauThangLanCanInox,
    'Lan can inox tay vịn tròn hoàn thiện, bề mặt sáng bóng',
    'Ảnh một sản phẩm hoàn thiện tiêu biểu của xưởng'
  ),

  xuongHan: s(
    xuongHanInox,
    'Thợ hàn đang gia công một chi tiết inox lớn trong xưởng',
    'Ảnh thợ của xưởng đang làm việc'
  ),

  xuong: {
    toanCanh: s(xuongToanCanh, 'Toàn cảnh sàn xưởng cơ khí với dãy máy', 'Toàn cảnh xưởng Hùng Oanh'),
    mayCat: s(mayCat, 'Máy cắt đang cắt tấm kim loại', 'Máy cắt của xưởng'),
    mayChan: s(mayChan, 'Đầu máy gia công kim loại đang hoạt động', 'Máy chấn của xưởng'),
    thoHan: s(thoHan, 'Thợ hàn hồ quang với tia lửa hàn', 'Thợ của xưởng đang hàn'),
    danhBong: s(danhBong, 'Máy mài đánh bóng bề mặt kim loại, tia lửa bắn ra', 'Khu đánh bóng của xưởng'),
    vatTu: s(vatTuInox, 'Ống inox xếp thành bó trong kho vật tư', 'Vật tư inox tại xưởng'),
  },

  hangMuc: {
    'cua-cong-inox': s(cuaCongInox, 'Cổng kim loại sơn trắng trước sân nhà', 'Cổng inox do xưởng làm'),
    'cau-thang-lan-can-inox': s(
      lanCanKinh,
      'Cầu thang trong nhà với lan can và tay vịn inox, ánh sáng tự nhiên',
      'Cầu thang hoặc lan can do xưởng làm'
    ),
    'ban-inox': s(banInox, 'Bếp công nghiệp với mặt bàn và giá inox', 'Bàn bếp inox do xưởng làm'),
    'ke-tu-inox': s(keTuInox, 'Hệ kệ kim loại nhiều tầng trong kho', 'Kệ inox do xưởng làm'),
    'mai-che-khung-inox': s(
      maiCheKhungInox,
      'Kết cấu khung thép và mái kính lấy sáng',
      'Mái che hoặc khung inox do xưởng làm'
    ),
    'gia-cong-theo-yeu-cau': s(
      giaCongTheoYeuCau,
      'Đầu cắt laser đang cắt chi tiết trên tấm kim loại',
      'Công đoạn gia công tại xưởng'
    ),
  },

  minhHoa: {
    khungCuaSo: s(ctKhungCuaSo, 'Khung bảo vệ cửa sổ bằng kim loại nhìn ra vườn', 'Khung cửa sổ do xưởng làm'),
    khoVatTu: s(ctKhoVatTu, 'Kho chứa ống kim loại các cỡ', 'Kho vật tư của xưởng'),
    chauRua: s(ctChauRua, 'Khu chậu rửa inox trong bếp', 'Chậu rửa inox do xưởng làm'),
  },
} as const;
