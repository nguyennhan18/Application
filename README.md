# Hệ Thống Quản Lý Thực Tập (CS434) — Use Cases 09 & 10

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**Tác giả:** Nguyễn Văn Nhân  
**Mã Sinh Viên:** 29211135779  
**Môn học:** CS434 • Đồ án Phân tích & Thiết kế Hệ thống  

---

## 📌 Giới Thiệu Dự Án

Dự án phát triển và nâng cấp toàn bộ giao diện (UI) và logic chức năng cho **Giai đoạn Đánh giá Thực tập**, tập trung vào 2 Use Case trung tâm:
1. **UC-9: Giảng viên nhận xét (Academic Internship Evaluation)**
2. **UC-10: Doanh nghiệp đánh giá (Enterprise Mentor Evaluation)**

Mã nguồn được thiết kế theo phong cách hiện đại, tối giản, tăng khoảng thở (whitespace), tích hợp hiệu ứng chuyển động mượt mà và phân tách hoàn toàn các tệp **HTML**, **CSS**, và **JavaScript**.

---

## 📁 Cấu Trúc Repository

```
CS434/
├── README.md               # Tài liệu hướng dẫn sử dụng repository
├── .gitignore              # Bỏ qua tệp rác hệ thống & tệp tạm
├── code/                   # [MAIN CODE] Thư mục dự án web chính
│   ├── index.html          # Trang Cổng điều hướng Dashboard
│   ├── uc9.html            # Giao diện UC9 (Giảng viên nhận xét)
│   ├── uc10.html           # Giao diện UC10 (Doanh nghiệp đánh giá)
│   ├── css/
│   │   ├── main.css        # Shared styles, variables & animations
│   │   ├── uc9.css         # Styles riêng cho UC9
│   │   └── uc10.css        # Styles riêng cho UC10
│   └── js/
│       ├── main.js         # Modal & Toast managers
│       ├── uc9.js          # Logic nghiệp vụ & Activity Diagram UC9
│       └── uc10.js         # Logic nghiệp vụ & Activity Diagram UC10
├── docs/                   # Báo cáo & Tài liệu đặc tả (.docx)
│   └── NguyenVanNhan_29211135779.docx
├── REPORT_NguyenVanNhan/   # Ảnh thiết kế UI & Biểu đồ hoạt động
└── BDHD/                   # Biểu đồ hoạt động (Activity Diagrams)
```

---

## 🚀 Hướng Dẫn Khởi Chạy (Quick Start)

### Cách 1: Mở trực tiếp bằng Trình duyệt Web
Double click tệp **`code/index.html`** (hoặc nhấp chuột phải chọn *Open with -> Chrome/Safari/Edge*).

### Cách 2: Khởi chạy Local HTTP Server
Mở Terminal tại thư mục dự án và chạy:

```bash
# Sử dụng Python 3 HTTP Server
python3 -m http.server 8000 --directory code
```

Sau đó mở trình duyệt web và truy cập địa chỉ: **`http://localhost:8000`**

---

## ✨ Điểm Nổi Bật Về Chức Năng (Activity Diagram Scenarios)

Cả hai ứng dụng đều hỗ trợ công cụ kiểm thử **Scenario Switcher** ở đầu trang để thử nghiệm trực tiếp mọi luồng xử lý:

- **Luồng chính (Main Flow):** Chấm điểm, đánh giá thái độ / kỹ năng, ký số FPT e-Sign và lưu kết quả thành công.
- **Ngoại lệ A1 (Validation):** Rào chắn kiểm tra rỗng hoặc thiếu ký tự tối thiểu.
- **Ngoại lệ A2 (SV chưa đủ điều kiện):** Banner cảnh báo chưa nộp bài (UC9) và Modal cảnh báo chưa đủ mốc thời gian tối thiểu (UC10).
- **Ngoại lệ A3 (Chỉnh sửa đánh giá):** Nạp lại bài chấm cũ và cho phép cập nhật lại.
