/**
 * The Hạng mục taxonomy. Frozen at launch: these slugs are the URL structure,
 * and changing a URL after it ranks loses the ranking (ARCHITECTURE.md).
 *
 * Publishing rule: a Hạng mục con becomes its own page only once it passes the
 * substance gate in CLAUDE.md. Until then it renders as a section on its parent.
 * That is why `coPage` exists and defaults to false everywhere.
 */

export interface HangMucCon {
  slug: string;
  ten: string;
  /** True once this child has its own real photo, spec table and FAQ. */
  coPage: boolean;
}

export interface HangMucCha {
  slug: string;
  ten: string;
  href: string;
  /** Short, factual description of what the xưởng accepts for this family. */
  moTa: string;
  con: HangMucCon[];
}

const cha = (
  slug: string,
  ten: string,
  moTa: string,
  con: Array<[string, string]>
): HangMucCha => ({
  slug,
  ten,
  href: `/san-pham/${slug}/`,
  moTa,
  con: con.map(([conSlug, conTen]) => ({
    slug: conSlug,
    ten: conTen,
    coPage: false,
  })),
});

export const hangMucCha: HangMucCha[] = [
  cha(
    'cua-cong-inox',
    'Cửa & cổng inox',
    'Cổng, cửa chính, cửa sổ và khung bảo vệ, gia công theo số đo thực tế của từng công trình.',
    [
      ['cong-inox', 'Cổng inox'],
      ['cua-inox', 'Cửa inox'],
      ['cua-so-inox', 'Cửa sổ inox'],
      ['khung-bao-ve-inox', 'Khung bảo vệ cửa sổ'],
    ]
  ),
  cha(
    'cau-thang-lan-can-inox',
    'Cầu thang & lan can inox',
    'Cầu thang, lan can và tay vịn cho nhà ở, ban công. Khảo sát kích thước trước khi gia công.',
    [
      ['cau-thang-inox', 'Cầu thang inox'],
      ['lan-can-inox', 'Lan can inox'],
      ['lan-can-ban-cong-inox', 'Lan can ban công'],
      ['tay-vin-inox', 'Tay vịn inox'],
    ]
  ),
  cha(
    'ban-inox',
    'Bàn & thiết bị bếp inox',
    'Bàn, chậu rửa và xe đẩy cho bếp ăn công nghiệp, nhà hàng và hộ gia đình, thiết kế theo mặt bằng bếp.',
    [
      ['ban-inox-cong-nghiep', 'Bàn inox công nghiệp'],
      ['ban-bep-inox', 'Bàn bếp inox'],
      ['chau-rua-inox', 'Chậu rửa inox'],
      ['xe-day-inox', 'Xe đẩy inox'],
    ]
  ),
  cha(
    'ke-tu-inox',
    'Kệ & tủ inox',
    'Kệ bếp, kệ kho, tủ và giá treo, chia tầng theo chiều cao và tải trọng sử dụng thực tế.',
    [
      ['ke-inox-nha-bep', 'Kệ inox nhà bếp'],
      ['ke-kho-inox', 'Kệ kho, kệ hàng'],
      ['tu-inox', 'Tủ inox'],
      ['gia-treo-inox', 'Giá treo inox'],
    ]
  ),
  cha(
    'mai-che-khung-inox',
    'Mái che & khung inox',
    'Mái che sân, khung mái kính và giàn phơi, tính toán kết cấu theo khẩu độ và điều kiện lắp đặt.',
    [
      ['mai-che-inox', 'Mái che inox'],
      ['khung-mai-kinh-inox', 'Khung mái kính'],
      ['gian-phoi-inox', 'Giàn phơi inox'],
    ]
  ),
  cha(
    'gia-cong-theo-yeu-cau',
    'Gia công theo yêu cầu',
    'Cắt, chấn, hàn và đánh bóng theo bản vẽ hoặc mẫu của khách. Nhận cả đơn hàng số lượng ít.',
    [
      ['cat-inox', 'Cắt inox'],
      ['chan-uon-inox', 'Chấn, uốn inox'],
      ['han-inox', 'Hàn inox'],
      ['danh-bong-inox', 'Đánh bóng inox'],
    ]
  ),
];

export const timHangMucCha = (slug: string): HangMucCha | undefined =>
  hangMucCha.find((muc) => muc.slug === slug);
