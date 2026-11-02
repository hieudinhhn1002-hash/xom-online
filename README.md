XÓM ONLINE MULTIPLAYER - starter prototype

YÊU CẦU
- Node.js 20+ (khuyên dùng Node 22)
- Kết nối Internet để tải npm packages

CHẠY LOCAL
1. Giải nén ZIP
2. Mở terminal trong thư mục xom_online_multiplayer
3. Chạy: npm install
4. Chạy: npm start
5. Mở http://localhost:3000 trên trình duyệt

TEST MULTIPLAYER TRÊN MÁY
- Mở 2 tab trình duyệt hoặc 2 cửa sổ ẩn danh
- Nhập tên khác nhau và bấm VÀO XÓM
- Hai nhân vật sẽ thấy nhau; chat đồng bộ realtime.

ĐƯA LÊN INTERNET (ví dụ Render)
1. Đẩy thư mục này lên GitHub repo.
2. Tạo Web Service trên Render, kết nối repo.
3. Build Command: npm install
4. Start Command: npm start
5. Render cấp URL HTTPS. Chia sẻ URL cho bạn bè.
   Lưu ý: đây là prototype; cần kiểm thử và hardening trước khi mở công khai rộng.

GIỚI HẠN
- Multiplayer realtime cơ bản: vị trí + chat, một phòng mặc định.
- Chưa có tài khoản, database, chống gian lận, lưu tiến trình, moderation, rate limit.
- Vị trí đang đồng bộ theo client; chưa có server-authoritative movement.
- Không cam kết 1.000 CCU. Cần load test, tối ưu và triển khai nhiều instance/room trước khi mở rộng.
