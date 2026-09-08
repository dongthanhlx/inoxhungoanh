/**
 * FAQ.
 *
 * Ba trạng thái của một câu hỏi:
 *
 *   traLoi     — đã được xưởng xác nhận. ĐƯỢC đăng và ĐƯỢC đưa vào structured
 *                data để Google và các công cụ AI trích dẫn.
 *   traLoiNhap — bản nháp tôi soạn sẵn. KHÔNG đăng, KHÔNG vào structured data.
 *                Chỉ nằm ở đây cho chủ xưởng đọc và sửa.
 *   cả hai null — chưa có gì.
 *
 * Cách hoàn thiện: đọc `traLoiNhap`, điền các chỗ trong [ngoặc vuông], sửa cho
 * đúng thực tế, rồi đổi tên trường từ `traLoiNhap` thành `traLoi`. Xong là câu
 * đó tự lên trang và tự vào FAQPage schema.
 *
 * Vì sao phải qua bước xác nhận: giá, thời gian giao, phạm vi khảo sát và điều
 * khoản bảo hành là cam kết kinh doanh. Một con số bịa ra sẽ thành thứ khách
 * cầm theo khi gọi điện, và xưởng phải chịu trách nhiệm cho lời hứa mình chưa
 * từng đưa ra. Xem CLAUDE.md, mục Content integrity.
 *
 * Câu hỏi nên thay bằng câu khách hỏi thật qua điện thoại. Câu hỏi thật luôn
 * hiệu quả hơn câu tôi nghĩ ra, vì nó trùng với cách người ta gõ vào Google.
 */

export interface CauHoi {
  hoi: string;
  traLoi: string | null;
  traLoiNhap?: string;
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
    // Câu này soạn được gần trọn vẹn mà không cần bịa số: thay vì đưa một con
    // số, nó giải thích cái gì quyết định giá. Đây cũng là cách trả lời có lợi
    // cho xưởng, vì nó dẫn khách tới cuộc gọi thay vì để khách tự so con số
    // rời rạc với nơi khác.
    traLoiNhap: `Giá một bộ cổng inox phụ thuộc vào bốn yếu tố: mác inox dùng để làm (201 hay 304), độ dày vật liệu, kích thước thông thuỷ của cổng, và độ phức tạp của hoa văn. Cổng mở tay và cổng lắp motor tự động cũng chênh nhau đáng kể.

Vì vậy một con số báo qua điện thoại khi chưa biết bốn thông tin trên thường không sát, và cũng khiến quý khách khó so sánh giữa các đơn vị. Cách nhanh nhất là gọi 0943 623 708, cho biết chiều rộng và chiều cao cổng cùng vị trí lắp đặt. Xưởng báo giá ghi rõ mác inox và độ dày để quý khách đối chiếu trên cùng một mặt bằng.

[TUỲ CHỌN, điền nếu muốn: một khoảng giá tham khảo giúp khách yên tâm gọi. Ví dụ "Cổng inox 304 hai cánh loại phổ thông hiện dao động khoảng ... đồng/m²". Nếu không muốn công bố giá thì xoá đoạn này.]`,
  },

  {
    hoi: 'Có xuống tận nơi đo đạc không?',
    traLoi: null,
    traLoiNhap: `[CẦN ĐIỀN: Có / Không]. Xưởng nhận khảo sát và đo tại công trình trong phạm vi [CẦN ĐIỀN: bán kính hoặc các huyện/xã nhận đi]. [CẦN ĐIỀN: Miễn phí, hay có phí ... đồng và được trừ vào đơn hàng nếu quý khách đặt làm].

Với các hạng mục như cổng, cầu thang và lan can, kích thước thực tế tại công trình thường lệch so với bản vẽ hoặc so với số đo tự đo. Đo tại chỗ trước khi cắt giúp tránh phải chỉnh sửa lúc lắp đặt.`,
  },

  {
    hoi: 'Từ lúc chốt đến lúc lắp xong mất bao lâu?',
    traLoi: null,
    traLoiNhap: `Thời gian phụ thuộc vào hạng mục và tình trạng vật tư tại thời điểm đặt. Tính từ khi chốt mẫu và số đo:

- Bàn, kệ, giá treo: [CẦN ĐIỀN: ... ngày]
- Cửa, cổng: [CẦN ĐIỀN: ... ngày]
- Cầu thang, lan can, mái che: [CẦN ĐIỀN: ... ngày]

[CẦN ĐIỀN nếu đúng: Đơn cần gấp, quý khách báo trước để xưởng sắp xếp thứ tự sản xuất.]`,
  },

  {
    hoi: 'Có nhận làm theo bản vẽ hoặc theo ảnh mẫu không?',
    traLoi: null,
    // Website đã khẳng định điều này ở nhiều trang, nên bản nháp chỉ diễn giải
    // lại cho nhất quán chứ không thêm cam kết mới. Vẫn cần xác nhận một lần.
    traLoiNhap: `Có. Quý khách gửi bản vẽ kỹ thuật, ảnh chụp sản phẩm mẫu, hoặc ảnh tham khảo tìm được trên mạng qua Zalo 0943 623 708 đều được.

Xưởng sẽ trao đổi lại về kích thước, mác inox nên dùng và những điểm cần điều chỉnh cho phù hợp với vị trí lắp đặt thực tế, rồi mới báo giá. Nhận cả đơn số lượng ít, kể cả một chi tiết lẻ.

[XÁC NHẬN: có đúng là xưởng nhận đơn lẻ một chi tiết không? Nếu có mức tối thiểu thì ghi rõ ở đây.]`,
  },

  {
    hoi: 'Bảo hành thế nào nếu sau này bị hoen hoặc lỏng mối hàn?',
    traLoi: null,
    // Đoạn về hiện tượng hoen của inox 201 là đặc tính vật liệu, kiểm chứng độc
    // lập được, nên an toàn để viết sẵn. Phần thời hạn và phạm vi bảo hành là
    // cam kết pháp lý, bắt buộc chủ xưởng tự quyết.
    traLoiNhap: `Xưởng bảo hành [CẦN ĐIỀN: thời hạn, ví dụ 12 tháng] cho [CẦN ĐIỀN: phạm vi, ví dụ mối hàn và kết cấu]. Trong thời gian bảo hành, nếu lỗi thuộc về gia công thì xưởng [CẦN ĐIỀN: xử lý ra sao, ví dụ sửa tại chỗ hoặc thu về xưởng, không tính phí].

Riêng về hiện tượng hoen bề mặt, cần phân biệt rõ: inox 201 dùng ở nơi ẩm hoặc ngoài trời lâu ngày có thể xuất hiện vết hoen. Đây là đặc tính của vật liệu, không phải lỗi gia công. Vì vậy xưởng luôn ghi rõ mác inox trên báo giá và tư vấn dùng inox 304 cho các vị trí ngoài trời, gần nước hoặc gần bếp.`,
  },
];

/** Chỉ câu đã xác nhận mới được đưa vào structured data. */
export const faqDaXacNhan = faq.filter(
  (item): item is CauHoi & { traLoi: string } => item.traLoi !== null
);
