# Hẹn Hà Nội

Thiệp mời đi cà phê ở Hà Nội. Khi người nhận chọn một buổi và bấm Gửi, Google Apps Script gửi email thông báo về Gmail.

## Các file

| File | Vai trò |
|---|---|
| index.html | Thiệp, chạy trên GitHub Pages |
| Code.gs | Mã Google Apps Script nhận lựa chọn và gửi email |

## Cài đặt Apps Script

1. Mở script.google.com, chọn New project, đặt tên Hẹn Hà Nội.
2. Xoá mã có sẵn, dán toàn bộ nội dung Code.gs, bấm Save.
3. Chọn hàm guiThu ở thanh công cụ, bấm Run, cấp quyền khi Google hỏi. Kiểm tra Gmail có email thử.
4. Bấm Deploy, chọn New deployment, loại Web app.
   Execute as: Me. Who has access: Anyone.
5. Bấm Deploy, chép đường link Web app (kết thúc bằng /exec).
6. Mở index.html, tìm dòng const ENDPOINT='' và dán link vào giữa hai dấu nháy đơn.

Nếu sửa Code.gs sau này, vào Deploy, Manage deployments, chọn bản hiện tại, Edit, Version: New version để link giữ nguyên.

## Bật GitHub Pages

Settings, Pages, Source: Deploy from a branch, Branch: main, thư mục / (root), Save. Sau khoảng một đến vài phút, link thiệp có dạng https://lehoanglh2305.github.io/hen-ha-noi/
