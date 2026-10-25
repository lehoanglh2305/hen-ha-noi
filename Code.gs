/**
 * Nhận lựa chọn từ thiệp Hẹn Hà Nội và gửi email về Gmail của Hoàng.
 * Dán toàn bộ file này vào Google Apps Script, rồi triển khai thành Web app.
 */

const EMAIL_NHAN = 'lehoang.lh2305@gmail.com';

const LUA_CHON = {
  thu: 'Tối Thứ Năm 26/11, từ khoảng 19:00',
  cn: 'Sáng Chủ Nhật 29/11, khoảng 8:00 đến 10:30',
  busy: 'Lần này em bận, hẹn anh dịp khác'
};

// Giới hạn số lần gửi mỗi giờ, phòng khi có người gửi thử nhiều lần.
const GIOI_HAN_MOI_GIO = 5;

function doPost(e) {
  try {
    const cache = CacheService.getScriptCache();
    const dem = Number(cache.get('dem') || 0);
    if (dem >= GIOI_HAN_MOI_GIO) return traVe({ ok: false, error: 'qua_nhieu' });
    cache.put('dem', String(dem + 1), 3600);

    const duLieu = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const chon = LUA_CHON[duLieu.choice];
    if (!chon) return traVe({ ok: false, error: 'lua_chon_khong_hop_le' });

    const loiNhan = String(duLieu.note || '').slice(0, 500).trim();
    const luc = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'HH:mm, dd/MM/yyyy');

    const noiDung =
      'Minh Ngọc vừa trả lời thiệp Hẹn Hà Nội.\n\n' +
      'Buổi em chọn: ' + chon + '\n' +
      'Lời nhắn: ' + (loiNhan || '(không có)') + '\n' +
      'Thời điểm gửi: ' + luc + ' (giờ Việt Nam)';

    MailApp.sendEmail({
      to: EMAIL_NHAN,
      subject: 'Thiệp Hẹn Hà Nội: ' + chon,
      body: noiDung
    });

    return traVe({ ok: true });
  } catch (err) {
    return traVe({ ok: false, error: 'loi_may_chu' });
  }
}

// Chạy hàm này một lần trong trình soạn thảo để cấp quyền gửi email và kiểm tra.
function guiThu() {
  MailApp.sendEmail(EMAIL_NHAN, 'Thiệp Hẹn Hà Nội: email thử', 'Nếu bạn nhận được email này, Apps Script đã gửi mail được.');
}

function traVe(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
