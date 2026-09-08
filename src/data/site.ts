/**
 * Nguồn dữ liệu duy nhất cho thông tin doanh nghiệp và liên hệ.
 *
 * Phần `phapLy` lấy từ dữ liệu đăng ký doanh nghiệp công khai (masothue.com,
 * mã số thuế 2500673624). Đây là thông tin có thể tra cứu độc lập, nên nó là
 * bằng chứng minh bạch mạnh nhất mà website này có. Không sửa các giá trị này
 * trừ khi bản đăng ký thay đổi.
 *
 * CLAUDE.md floor rule 6: tên và địa chỉ phải trùng từng ký tự với Google
 * Business Profile. Sửa ở đây, không sửa chỗ khác.
 */

const PHONE_DISPLAY = '0943 623 708';
const PHONE_DIGITS = '0943623708';

export const site = {
  /** Tên thương hiệu, dùng trong tiêu đề và giao diện. */
  name: 'Inox Hùng Oanh',

  tagline: 'Sản xuất và gia công inox theo yêu cầu',

  domain: 'https://inoxhungoanh.com',

  phone: {
    display: PHONE_DISPLAY,
    e164: '+84943623708',
    href: `tel:+84${PHONE_DIGITS.slice(1)}`,
  },

  zalo: {
    display: PHONE_DISPLAY,
    href: `https://zalo.me/${PHONE_DIGITS}`,
  },

  /**
   * Địa chỉ duy nhất của công ty, trùng với giấy đăng ký kinh doanh.
   * Chủ doanh nghiệp đã xác nhận đây là địa chỉ chính xác.
   * Chuỗi `full` phải trùng từng ký tự với Google Business Profile.
   */
  address: {
    street: 'Khu 3',
    ward: 'Thị trấn Tứ Trưng',
    district: 'Huyện Vĩnh Tường',
    province: 'Tỉnh Vĩnh Phúc',
    country: 'VN',
    full: 'Khu 3, Thị trấn Tứ Trưng, Huyện Vĩnh Tường, Tỉnh Vĩnh Phúc',
  },

  /**
   * Thông tin đăng ký doanh nghiệp. Tra cứu được tại masothue.com hoặc
   * Cổng thông tin quốc gia về đăng ký doanh nghiệp.
   */
  phapLy: {
    tenCongTy: 'CÔNG TY TNHH HÙNG OANH VĨNH PHÚC',
    maSoThue: '2500673624',
    nguoiDaiDien: 'Nguyễn Mạnh Hùng',
    ngayHoatDong: '04/11/2021',
    namThanhLap: 2021,
    loaiHinh: 'Công ty trách nhiệm hữu hạn',
    nganhChinh: 'Hoàn thiện công trình xây dựng',
    trangThai: 'Đang hoạt động',
    /** Trang tra cứu công khai, để khách tự kiểm chứng. */
    linkTraCuu:
      'https://masothue.com/2500673624-cong-ty-tnhh-hung-oanh-vinh-phuc',
  },

  /**
   * Đăng ký website với Bộ Công Thương (online.gov.vn).
   *
   * Logo "Đã thông báo Bộ Công Thương" CHỈ được gắn sau khi website được duyệt
   * trên online.gov.vn, và logo phải trỏ về đúng bản ghi đăng ký của website
   * này. Gắn logo khi chưa đăng ký là thông tin sai và bị xử phạt theo quy định
   * về thương mại điện tử.
   *
   * Ngoài ra, nghĩa vụ thông báo áp dụng cho website thương mại điện tử BÁN
   * HÀNG (có đặt hàng, giỏ hàng, thanh toán trực tuyến). Trang này hiện chỉ
   * giới thiệu và nhận liên hệ qua điện thoại/Zalo nên thường chưa thuộc diện
   * bắt buộc. Nếu sau này thêm chức năng đặt hàng trực tuyến thì phải đăng ký.
   *
   * Điền `urlXacNhan` sau khi có bản ghi, logo sẽ tự hiện ở footer.
   */
  boCongThuong: {
    daDangKy: false,
    urlXacNhan: null as string | null,
  },

  /**
   * Cloudflare Web Analytics.
   *
   * Không cookie, không theo dõi cá nhân, nên không cần banner đồng ý cookie.
   * Beacon chỉ được chèn khi có token, vì vậy khi `token` còn null thì site vẫn
   * giữ đúng 0 JavaScript như thiết kế ban đầu (ADR-001).
   *
   * Lấy token: Cloudflare dashboard -> Web Analytics -> Add a site ->
   * inoxhungoanh.com -> copy giá trị "token" trong đoạn script.
   * Token này công khai (nằm trong mã nguồn trang) nên commit vào repo là bình
   * thường, không phải bí mật.
   *
   * LƯU Ý: nếu bật Web Analytics thẳng trong phần cài đặt của Pages project,
   * Cloudflare tự chèn beacon ở tầng edge. Khi đó phải để `token` là null,
   * nếu không beacon bị nạp hai lần và số liệu đếm gấp đôi.
   */
  analytics: {
    cloudflareToken: null as string | null,
  },
} as const;

/** Hai kênh chuyển đổi duy nhất của website. */
export const cta = {
  call: { label: 'Gọi ngay', href: site.phone.href },
  zalo: { label: 'Nhắn Zalo', href: site.zalo.href },
} as const;
