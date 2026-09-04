/**
 * FAQ.
 *
 * `traLoi: null` means the owner has not confirmed the answer yet. Those render
 * as a visible gap on the page and are EXCLUDED from FAQPage structured data,
 * so the site never publishes an answer nobody at the xưởng has agreed to
 * (CLAUDE.md, Content integrity).
 *
 * The questions themselves are drafts. Replace them with the questions customers
 * actually ask on the phone - see assets-goc/THONG-TIN.md section 5. Real
 * questions outrank invented ones, and they are what AI search engines quote.
 */

export interface CauHoi {
  hoi: string;
  traLoi: string | null;
}

export const faq: CauHoi[] = [
  {
    hoi: 'Inox 304 và inox 201 khác nhau thế nào, nên chọn loại nào?',
    traLoi:
      'Inox 304 chứa khoảng 18% crôm và 8% niken nên chống gỉ tốt hơn hẳn, hợp với chỗ ngoài trời, gần bếp, gần nước hoặc vùng không khí mặn. Inox 201 dùng mangan thay một phần niken nên rẻ hơn, chấp nhận được ở nơi khô ráo trong nhà, nhưng dễ xuống mã hơn khi ẩm lâu ngày. Chênh lệch giá giữa hai loại thường nhỏ hơn chi phí làm lại, nên với cổng, lan can hay bàn bếp thì 304 gần như luôn đáng tiền hơn.',
  },
  {
    hoi: 'Làm một bộ cổng inox hết bao nhiêu tiền?',
    traLoi: null,
  },
  {
    hoi: 'Có xuống tận nơi đo đạc không?',
    traLoi: null,
  },
  {
    hoi: 'Từ lúc chốt đến lúc lắp xong mất bao lâu?',
    traLoi: null,
  },
  {
    hoi: 'Có nhận làm theo bản vẽ hoặc theo ảnh mẫu không?',
    traLoi: null,
  },
  {
    hoi: 'Bảo hành thế nào nếu sau này bị hoen hoặc lỏng mối hàn?',
    traLoi: null,
  },
];

/** Only confirmed answers become structured data. */
export const faqDaXacNhan = faq.filter(
  (item): item is CauHoi & { traLoi: string } => item.traLoi !== null
);
