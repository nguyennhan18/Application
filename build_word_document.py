import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def add_callout(doc, text, title="PROMPT CHO STITCH AI"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, "F0FDFA") # Light Teal
    set_cell_margins(cell, top=140, bottom=140, left=200, right=200)
    
    # Left border teal, top/bottom/right none
    tcPr = cell._element.get_or_add_tcPr()
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="single" w:sz="36" w:space="0" w:color="0D9488"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(4)
    run_t = p.add_run(f"✨ {title}\n")
    run_t.bold = True
    run_t.font.name = "Arial"
    run_t.font.size = Pt(11)
    run_t.font.color.rgb = RGBColor(13, 148, 136)
    
    run_b = p.add_run(text)
    run_b.font.name = "Consolas"
    run_b.font.size = Pt(9.5)
    run_b.font.color.rgb = RGBColor(15, 23, 42)

doc = docx.Document()

# Configure Margins
for section in doc.sections:
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

# Colors
NAVY = RGBColor(15, 23, 42)
TEAL = RGBColor(13, 148, 136)
DARK_GRAY = RGBColor(51, 65, 85)

# Document Title
p_title = doc.add_paragraph()
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_title.paragraph_format.space_after = Pt(4)
run_title = p_title.add_run("TÀI LIỆU ĐẶC TẢ CHI TIẾT USE CASE 9 & USE CASE 10")
run_title.font.name = "Arial"
run_title.font.size = Pt(20)
run_title.font.bold = True
run_title.font.color.rgb = NAVY

p_sub = doc.add_paragraph()
p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_sub.paragraph_format.space_after = Pt(20)
run_sub = p_sub.add_run("HỆ THỐNG QUẢN LÝ THỰC TẬP (IMS PORTAL - CS434)\nĐỊNH HƯỚNG TẠO GIAO DIỆN HIỆN ĐẠI CHO CÔNG CỤ STITCH / AI UI GENERATOR")
run_sub.font.name = "Arial"
run_sub.font.size = Pt(11)
run_sub.font.bold = True
run_sub.font.color.rgb = TEAL

# Author Table Box
tbl_info = doc.add_table(rows=2, cols=2)
tbl_info.alignment = WD_TABLE_ALIGNMENT.CENTER
for row in tbl_info.rows:
    for cell in row.cells:
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=80, bottom=80, left=120, right=120)

cell_00 = tbl_info.cell(0, 0)
cell_00.paragraphs[0].add_run("Họ và tên sinh viên: Nguyễn Văn Nhân").bold = True
cell_01 = tbl_info.cell(0, 1)
cell_01.paragraphs[0].add_run("Mã sinh viên: 29211135779").bold = True

cell_10 = tbl_info.cell(1, 0)
cell_10.paragraphs[0].add_run("Môn học: CS434 - Phân tích Thiết kế HT").italic = True
cell_11 = tbl_info.cell(1, 1)
cell_11.paragraphs[0].add_run("Chủ đề: Đánh giá Thực tập (UC9 & UC10)").italic = True

doc.add_paragraph().paragraph_format.space_after = Pt(12)

# Function for Headings
def add_h1(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(15)
    r.font.bold = True
    r.font.color.rgb = NAVY
    return p

def add_h2(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(13)
    r.font.bold = True
    r.font.color.rgb = TEAL
    return p

def add_h3(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(11)
    r.font.bold = True
    r.font.color.rgb = DARK_GRAY
    return p

def add_p(text, bold_prefix="", italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        rb = p.add_run(bold_prefix)
        rb.font.name = "Times New Roman"
        rb.font.size = Pt(11)
        rb.bold = True
        rb.font.color.rgb = NAVY
    rt = p.add_run(text)
    rt.font.name = "Times New Roman"
    rt.font.size = Pt(11)
    rt.italic = italic
    rt.font.color.rgb = DARK_GRAY
    return p

# SECTION 1
add_h1("PHẦN 1: TỔNG QUAN HỆ THỐNG VÀ NGUYÊN TẮC THIẾT KẾ UI/UX (DESIGN SYSTEM)")

add_p("Tài liệu này cung cấp toàn bộ nội dung đặc tả use case, quy tắc nghiệp vụ, luồng sự kiện chính/ngoại lệ và hướng dẫn thiết kế giao diện (Wireframe Specification) cùng bộ Prompt được tối ưu sẵn cho công cụ Stitch (AI UI Generator) nhằm tạo ra giao diện đẹp mắt, hiện đại, tối giản văn bản và mượt mà nhất.", "Mục đích tài liệu: ")

add_h2("1.1. Context Hệ thống & Tác giả nghiệp vụ (Actors)")
add_p("Hệ thống Quản lý Thực tập (IMS Portal - Khoa Công nghệ Thông tin) phục vụ việc đánh giá thực tập cuối kỳ của sinh viên thông qua hai vai trò chính:")
add_p("Đăng nhập hệ thống, xem nhật ký thực tập và báo cáo định kỳ theo tuần (Include UC 'Xem báo cáo/nhật ký'), thực hiện chấm điểm 3 tiêu chí Rubrics học thuật và nạp ý kiến nhận xét.", "• Actor 1 - Giảng viên hướng dẫn (Academic Lecturer): ")
add_p("Đăng nhập hệ thống, đánh giá thái độ làm việc (sao 1-5), kỹ năng chuyên môn (4 cấp độ), nạp nhận xét định tính của Mentor (tối thiểu 100 ký tự), đưa ra đề xuất kế hoạch tuyển dụng và thực hiện ký số điện tử FPT e-Sign.", "• Actor 2 - Mentor Doanh nghiệp (Enterprise Mentor): ")

add_h2("1.2. Design Tokens & Bảng màu thiết kế (Color Palette)")
add_p("Được thiết kế theo định hướng hiện đại, sang trọng, tương phản cao trên nền tối (Dark Glassmorphism Canvas) hoặc nền sáng tối giản (Minimal Light Surface):")
add_p("#0F172A (Deep Slate Navy) — Dùng cho Header, Sidebar, Text tiêu đề và Container chính.", "• Primary Color: ")
add_p("#0D9488 / #10B981 (Vibrant Teal / Emerald) — Dùng cho Nút hành động chính, Ring progress meter, Badge trạng thái thành công.", "• Secondary Color: ")
add_p("#F59E0B (Warm Amber) — Dùng cho Đánh giá sao, Cảnh báo thời hạn.", "• Accent Color: ")
add_p("#F43F5E (Rose Red) — Dùng cho Trạng thái chưa nộp bài, Cảnh báo ngoại lệ A2 & Lỗi validation A1.", "• Danger/Alert Color: ")

add_h2("1.3. Định hướng Trải nghiệm người dùng (UX Principles for Stitch)")
add_p("Ưu tiên các biểu đồ vòng tròn (Ring Progress Meters), thanh trượt điểm số (Visual Sliders), ngôi sao tương tác (Star Rating Widgets) và thẻ chọn cấp độ (Pill Badges) thay cho ô nhập liệu truyền thống.", "1. Tối giản văn bản ('Ít chữ'): ")
add_p("Sử dụng hiệu ứng kính mờ (Glassmorphism), thẻ Bo tròn góc rộng (rounded-2xl) và đổ bóng mờ mịn (subtle drop-shadows).", "2. Thiết kế Thẻ nổi (Modern Glass Cards): ")
add_p("Hỗ trợ hiệu ứng trượt góc nhìn 3D / Slide mượt mà giữa UC9 và UC10 trên cùng một giao diện Single Page Application (SPA).", "3. Motion & Animation: ")

# SECTION 2
add_h1("PHẦN 2: ĐẶC TẢ CHI TIẾT USE CASE 9 — GIẢNG VIÊN NHẬN XÉT (UC9)")

add_h2("2.1. Bảng Đặc Tả Nghiệp Vụ Use Case 9")

tbl_uc9 = doc.add_table(rows=8, cols=2)
tbl_uc9.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_uc9.autofit = False

uc9_data = [
    ("Mã & Tên Use Case", "UC9: Giảng viên nhận xét (Academic Evaluation)"),
    ("Actor chính / Actor phụ", "Giảng viên hướng dẫn (Chính) | Sinh viên, Quản trị viên (Phụ)"),
    ("Mô tả tóm tắt", "Giảng viên hướng dẫn thẩm định nhật ký và báo cáo thực tập do sinh viên nộp, chấm điểm 3 tiêu chí Rubrics theo trọng số nhà trường và nạp nhận xét đánh giá học thuật."),
    ("Tiền điều kiện", "Giảng viên đã đăng nhập hệ thống hợp lệ. Sinh viên thuộc danh sách được phân công hướng dẫn (UC5) và đã nộp báo cáo (UC7, UC8)."),
    ("Hậu điều kiện", "Nhận xét và điểm số của GV được lưu vào hệ thống, trạng thái nộp bài đổi thành 'Đã nhận xét', gửi thông báo tới Sinh viên và Doanh nghiệp."),
    ("Quan hệ Use Case", "Include: 'Xem báo cáo/nhật ký thực tập'. Extend: 'Nhập điểm thành phần' (dùng chung cho UC11 - Chấm điểm)."),
    ("Công thức tính điểm", "Score = (C1 x 0.2) + (C2 x 0.5) + (C3 x 0.3) với thang điểm [0.0 - 10.0]."),
    ("Phân loại danh hiệu", ">= 9.0: Xuất sắc | >= 8.0: Giỏi | >= 7.0: Khá | >= 5.0: Trung bình | < 5.0: Không đạt.")
]

for idx, (k, v) in enumerate(uc9_data):
    row = tbl_uc9.rows[idx]
    c0, c1 = row.cells[0], row.cells[1]
    c0.width = Inches(2.0)
    c1.width = Inches(4.5)
    set_cell_background(c0, "0F172A" if idx == 0 else "F1F5F9")
    set_cell_background(c1, "0F172A" if idx == 0 else "FFFFFF")
    set_cell_margins(c0, 100, 100, 120, 120)
    set_cell_margins(c1, 100, 100, 120, 120)
    
    p0 = c0.paragraphs[0]
    r0 = p0.add_run(k)
    r0.bold = True
    r0.font.size = Pt(10)
    r0.font.color.rgb = RGBColor(255, 255, 255) if idx == 0 else NAVY
    
    p1 = c1.paragraphs[0]
    r1 = p1.add_run(v)
    r1.font.size = Pt(10)
    r1.font.color.rgb = RGBColor(255, 255, 255) if idx == 0 else DARK_GRAY

doc.add_paragraph().paragraph_format.space_after = Pt(6)

add_h2("2.2. Luồng Sự Kiện (Activity Diagram Flow)")
add_p("1. Giảng viên chọn menu 'Danh sách sinh viên hướng dẫn' và chọn một sinh viên từ danh sách.", "• Bước 1: ")
add_p("2. Hệ thống hiển thị nhật ký và báo cáo định kỳ theo tuần do sinh viên đã nộp (Include UC 'Xem báo cáo/nhật ký').", "• Bước 2: ")
add_p("3. Hệ thống kiểm tra: Sinh viên đã nộp bài chưa? Nếu CHƯA NỘP -> Kích hoạt Ngoại lệ A2 (Hiển thị cảnh báo 'Chưa có dữ liệu để nhận xét' và tạm khóa form). Nếu ĐÃ NỘP -> Cho phép tiếp tục.", "• Bước 3 (Decision A2): ")
add_p("4. Giảng viên điều chỉnh 3 thanh trượt Rubrics: Tiêu chí 1 (Kỷ luật 20%), Tiêu chí 2 (Chuyên môn 50%), Tiêu chí 3 (Báo cáo tổng kết 30%). Hệ thống tự động tính điểm tổng kết realtime.", "• Bước 4: ")
add_p("5. Giảng viên nhập nội dung nhận xét (hoặc bấm chọn các thẻ tag gợi ý nhanh) và nhấn 'Xác nhận & Hoàn tất chấm điểm'.", "• Bước 5: ")
add_p("6. Hệ thống kiểm tra tính hợp lệ dữ liệu (Ngoại lệ A1): Đảm bảo điểm trong dải [0-10] và nhận xét không rỗng (tối thiểu 10 ký tự).", "• Bước 6 (Validation A1): ")
add_p("7. Hệ thống lưu kết quả chấm điểm, chuyển trạng thái sinh viên sang 'Đã nhận xét' và hiển thị Toast thông báo thành công.", "• Bước 7: ")
add_p("Giảng viên mở lại sinh viên đã nhận xét trước đó -> Hệ thống nạp lại điểm và nhận xét cũ, cho phép chỉnh sửa và cập nhật lại.", "• Ngoại lệ A3 (Chỉnh sửa nhận xét): ")

add_h2("2.3. Hướng dẫn Cấu trúc Giao diện UC9 (Wireframe Specs for Stitch)")
add_p("Giao diện UC9 cần được tổ chức thành 3 khu vực chính trên một bố cục Grid 12 cột thoáng mắt:")
add_p("Hiển thị ảnh đại diện bo tròn, Họ tên, MSSV, Lớp, Tên doanh nghiệp thực tập, Vị trí và điểm đánh giá sơ bộ của Mentor DN.", "1. Cột trái (Thông tin Sinh viên): ")
add_p("Hiển thị danh sách báo cáo tuần (Tuần 1-10), Tỷ lệ nộp đúng hạn (Widget 90%), xem trước nội dung tóm tắt và nút xem tệp PDF.", "2. Cột giữa (Xem báo cáo/nhật ký): ")
add_p("Hiển thị Vòng tròn tiến độ điểm (Ring Progress Meter 0.0 - 10.0), 3 thanh trượt Rubric phẳng, Thẻ gợi ý nhận xét nhanh, Textarea nhận xét và Nút Xác nhận chấm điểm.", "3. Cột phải (Khung chấm điểm Rubrics): ")

# Prompt UC9 Box
prompt_uc9_text = """Design a sleek, modern UI for Academic Internship Evaluation (UC-9) for a University Portal.
Style: Dark mode glassmorphism (Deep Slate Navy #0F172A, Emerald Green #10B981, Indigo Accent #6366F1). Minimal text density, visual-first components.

Key Components to include:
1. Scenario Switcher Bar at top: 3 quick pill buttons to switch test cases (Main Flow: Submitted, Exception A2: Not Submitted Warning, Exception A3: Edited).
2. Student Dossier Card (Left Column): Circular avatar with verified ring, Name 'Nguyễn Văn Hoàng', MSSV '20210452', Company 'FPT Software', Intern Role 'Frontend Developer'.
3. Weekly Journal & Report Viewer (Middle Column): Progress card showing 90% on-time submission rate, week selector tabs (Week 1-10), PDF file attachment card with view icon.
4. Rubric Grading Panel (Right Column):
   - Animated SVG Ring Meter displaying final score (e.g. 8.7 / 10.0) with rank badge 'Giỏi'.
   - 3 smooth visual range sliders: Criteria 1 (Discipline 20%), Criteria 2 (Tech Volume 50%), Criteria 3 (Final Report 30%).
   - Quick comment suggestion tags (+ Student proactive, + On-time report).
   - Minimal feedback textarea and prominent Primary Action Button 'Confirm & Publish Score'.
5. Toast notification pop-up sliding from bottom-right.
6. Exception A2 Red Banner: Displays 'Warning: Student has not submitted report yet. Evaluation locked' when selecting student 2."""

add_callout(doc, prompt_uc9_text, "STITCH PROMPT MẪU CHO USE CASE 9 (GIẢNG VIÊN NHẬN XÉT)")

# SECTION 3
add_h1("PHẦN 3: ĐẶC TẢ CHI TIẾT USE CASE 10 — DOANH NGHIỆP ĐÁNH GIÁ (UC10)")

add_h2("3.1. Bảng Đặc Tả Nghiệp Vụ Use Case 10")

tbl_uc10 = doc.add_table(rows=8, cols=2)
tbl_uc10.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_uc10.autofit = False

uc10_data = [
    ("Mã & Tên Use Case", "UC10: Doanh nghiệp đánh giá (Enterprise Evaluation)"),
    ("Actor chính / Actor phụ", "Mentor Doanh nghiệp (Chính) | Sinh viên, Giảng viên, HR Talent (Phụ)"),
    ("Mô tả tóm tắt", "Đại diện doanh nghiệp đánh giá thái độ làm việc, năng lực kỹ thuật thực tế, đưa ra nhận xét định tính, đề xuất hướng nhân sự tuyển dụng và ký số FPT e-Sign."),
    ("Tiền điều kiện", "Doanh nghiệp đã được cấp tài khoản hợp lệ. Sinh viên đã được duyệt thực tập tại đơn vị (UC4) và đạt mốc thời gian thực tập theo kế hoạch."),
    ("Hậu điều kiện", "Phiếu đánh giá kèm chữ ký số FPT e-Sign (mã SHA256) được lưu hệ thống, gửi thông báo tới Giảng viên hướng dẫn và Sinh viên."),
    ("Quan hệ Use Case", "Extend: 'Nhập điểm thành phần' (điểm từ DN là đầu vào quan trọng cho UC11 - Chấm điểm)."),
    ("Hình thức đánh giá", "Thái độ (Đánh giá sao 1-5) | Kỹ thuật (4 cấp độ Pill) | Đề xuất tuyển dụng (3 Radio cards)."),
    ("Xác thực bảo mật", "Ký số FPT e-Sign, Mã chứng thư VN-CA-FPT-99824B, Mã băm SHA256 kèm Dấu thời gian (Timestamp).")
]

for idx, (k, v) in enumerate(uc10_data):
    row = tbl_uc10.rows[idx]
    c0, c1 = row.cells[0], row.cells[1]
    c0.width = Inches(2.0)
    c1.width = Inches(4.5)
    set_cell_background(c0, "0F172A" if idx == 0 else "F1F5F9")
    set_cell_background(c1, "0F172A" if idx == 0 else "FFFFFF")
    set_cell_margins(c0, 100, 100, 120, 120)
    set_cell_margins(c1, 100, 100, 120, 120)
    
    p0 = c0.paragraphs[0]
    r0 = p0.add_run(k)
    r0.bold = True
    r0.font.size = Pt(10)
    r0.font.color.rgb = RGBColor(255, 255, 255) if idx == 0 else NAVY
    
    p1 = c1.paragraphs[0]
    r1 = p1.add_run(v)
    r1.font.size = Pt(10)
    r1.font.color.rgb = RGBColor(255, 255, 255) if idx == 0 else DARK_GRAY

doc.add_paragraph().paragraph_format.space_after = Pt(6)

add_h2("3.2. Luồng Sự Kiện (Activity Diagram Flow)")
add_p("1. Doanh nghiệp đăng nhập và chọn danh sách sinh viên thực tập tại đơn vị.", "• Bước 1: ")
add_p("2. Hệ thống kiểm tra điều kiện (Decision A2): Sinh viên đã đủ thời gian thực tập tối thiểu chưa (ví dụ đạt 10/12 tuần)? Nếu CHƯA ĐỦ -> Kích hoạt Ngoại lệ A2 (Hiển thị Modal cảnh báo 'Chưa đủ thời gian tối thiểu' và yêu cầu bấm 'Xác nhận đánh giá sớm' để mở khóa).", "• Bước 2 (Decision A2): ")
add_p("3. Doanh nghiệp chọn số sao (1-5 sao) cho nhóm Thái độ (Kỷ luật, Cầu thị, Teamwork) và chọn Thẻ 4 cấp độ kỹ thuật (Cần cải thiện, Đạt yêu cầu, Khá/Tốt, Xuất sắc).", "• Bước 3: ")
add_p("4. Doanh nghiệp nhập nội dung nhận xét chi tiết của Mentor và chọn 1 trong 3 thẻ đề xuất hướng nhân sự (Ký HĐ chính thức Junior, Gia hạn thực tập có lương, Hoàn thành thực tập).", "• Bước 4: ")
add_p("5. Doanh nghiệp bấm 'Phê duyệt & Ký gửi Trường ĐH'. Hệ thống kiểm tra dữ liệu bắt buộc (Ngoại lệ A1): Đảm bảo nhận xét chi tiết đạt từ 100 ký tự trở lên.", "• Bước 5 (Validation A1): ")
add_p("6. Hệ thống thực hiện ký số FPT e-Sign, sinh mã băm SHA256 ngẫu nhiên kèm dấu thời gian, cập nhật trạng thái 'Doanh nghiệp đã đánh giá' và hiển thị Toast thành công.", "• Bước 6: ")
add_p("Doanh nghiệp mở lại phiếu đã ký gửi trước đó -> Hệ thống nạp lại thông tin cũ, cho phép điều chỉnh và ký lại.", "• Ngoại lệ A3 (Chỉnh sửa đánh giá): ")

add_h2("3.3. Hướng dẫn Cấu trúc Giao diện UC10 (Wireframe Specs for Stitch)")
add_p("Giao diện UC10 tập trung vào tính trực quan, hiện đại và ít chữ:")
add_p("Thẻ màu gradient tối nổi bật thông tin Thực tập sinh, Điểm DN đề xuất (9.2 / 10.0), Xếp loại Top 5% và Điểm quy đổi thang 4.0.", "1. Hero Dossier Banner (Đỉnh trang): ")
add_p("Gồm 2 nhóm widget: Đánh giá thái độ (Star Rating Widget 1-5 sao có hiệu ứng hover xoay nhẹ) và Đánh giá kỹ thuật (Bộ 4 nút Pill Badge phẳng).", "2. Cột trái (Đánh giá Chuyên môn & Thái độ): ")
add_p("Gồm: Textarea nhận xét Mentor có bộ đếm ký tự (Validation min 100 chars), Thẻ Radio chọn hướng tuyển dụng HR, và Badge Chữ ký số FPT e-Sign có con dấu xoay mượt.", "3. Cột phải (Nhận xét Mentor & Ký số): ")

# Prompt UC10 Box
prompt_uc10_text = """Design an ultra-modern Enterprise Mentor Evaluation UI (UC-10) for an Internship Portal.
Style: Dark mode futuristic glassmorphism (Slate Navy #0F172A, Emerald Teal #10B981, Amber Stars #F59E0B). Clean layout with low text density.

Key Components to include:
1. Scenario Switcher Bar at top: 3 quick pill buttons (Main Flow: Eligible, Exception A2: Insufficient Duration Warning, Exception A3: Edit Signed Evaluation).
2. Hero Dossier Banner: Gradient card displaying Intern 'Nguyễn Văn Hoàng', MSSV '20216012', Big Enterprise Score '9.2 / 10.0', Rank 'Top 5% Intern', Converted Score '3.68/4.0'.
3. Attitude & Tech Assessment Section (Left Column):
   - Interactive Star Rating Widgets (1-5 amber stars with hover glow) for Discipline & Self-learning.
   - Tech Competence Pill Badges (4 levels: 1. Needs Improvement, 2. Meets Expectations, 3. Good, 4. Excellent).
4. Mentor Feedback & Digital Signature Section (Right Column):
   - Minimal feedback textarea with live character counter badge ('428/100 characters').
   - Hiring Recommendation Selection Cards: 3 radio cards ('Official Junior Contract', 'Paid Extension', 'Completed').
   - FPT e-Sign Digital Badge: Dark card with animated rotating seal stamp, Certificate 'VN-CA-FPT-99824B', SHA256 Hash code, Timestamp.
   - Action Button: 'Approve & Submit Digital Signature'.
5. Modal Dialog for Exception A2: Warning popup 'Intern has not reached minimum duration (6/12 weeks)' with 'Confirm Early Evaluation' button."""

add_callout(doc, prompt_uc10_text, "STITCH PROMPT MẪU CHO USE CASE 10 (DOANH NGHIỆP ĐÁNH GIÁ)")

# SECTION 4
add_h1("PHẦN 4: HƯỚNG DẪN KẾT HỢP SPA VÀ PROMPT TỔNG HỢP NỘP STITCH")

add_h2("4.1. Giải pháp Single Page Application (SPA) Đa Use Case")
add_p("Để tạo ra một ứng dụng ấn tượng nhất trên Stitch, bạn nên sử dụng cấu trúc Single Page Application (SPA) kết hợp cả UC9 và UC10 trên cùng một trang với thanh chuyển đổi góc nhìn mượt mượt (View Toggle Switcher):")
add_p("Đặt ở đỉnh màn hình với 2 nút: [ 👨‍🏫 UC-9: Giảng viên nhận xét ] <---> [ 🏢 UC-10: Doanh nghiệp đánh giá ].", "• Segmented View Toggle Switcher: ")
add_p("Sử dụng hiệu ứng chuyển View 3D / Slide mượt 350ms (Keyframes panelEntrance) giúp chuyển đổi qua lại giữa giao diện UC9 và UC10 không bị giật trang.", "• Motion Transition: ")

# Full Combined Prompt Box
prompt_full_text = """Create a single-page web app for an Academic Internship System (CS434) featuring two seamlessly switchable views: UC-9 (Lecturer Evaluation) and UC-10 (Enterprise Mentor Evaluation).

Global UI Style:
- Dark mode glassmorphism (Navy #0F172A canvas, Emerald #10B981 primary accent, Amber #F59E0B ratings).
- Minimalist text density ('ít chữ'), visually rich UI with SVG Ring Progress Meters, Custom Range Sliders, Interactive Star Rating Widgets, and Pill Badges.
- Smooth CSS 3D/slide view transitions when toggling views.

Top Navigation:
- Brand title 'IMS Portal • CS434'.
- Segmented View Toggle Switcher at center: '[ 👨‍🏫 UC-9: Lecturer ]' <---> '[ 🏢 UC-10: Enterprise Mentor ]'.

Panel 1: UC-9 (Lecturer Evaluation View):
- Activity Diagram Test Bench (3 scenario switcher pills).
- Student Dossier card (Avatar, Name, Company).
- Rubric Assessment Card: Animated SVG Ring Score Meter (8.7/10.0), 3 visual range sliders (20%, 50%, 30% weights), quick comment tags, feedback textarea, 'Confirm & Publish Score' button.
- Exception A2 red alert banner for unsubmitted reports.

Panel 2: UC-10 (Enterprise Mentor View):
- Activity Diagram Test Bench (3 scenario switcher pills).
- Hero Dossier Card: Enterprise Score '9.2/10.0', Rank 'Top 5%', 4.0 scale conversion.
- Attitude Star Rating Widgets (1-5 amber stars).
- Tech Competence Pill Badges (4 levels).
- Mentor feedback textarea with live char counter ('428/100 chars').
- 3 HR Hiring Recommendation Cards.
- FPT e-Sign Digital Badge with animated rotating seal stamp, SHA256 hash code, timestamp.
- Exception A2 Warning Modal for early evaluation.

Make all buttons, sliders, star icons, view toggle buttons, and modal popups fully interactive with smooth hover and active state transitions."""

add_callout(doc, prompt_full_text, "PROMPT TỔNG HỢP FULL SPA CHO STITCH (TẠO TRỌN BỘ UI UC9 & UC10)")

# Save Document
output_path_root = "/Users/nguyennhan18/Documents/CS434/Mo_Ta_Use_Case_UC9_UC10_Design_Stitch.docx"
output_path_docs = "/Users/nguyennhan18/Documents/CS434/docs/Mo_Ta_Use_Case_UC9_UC10_Design_Stitch.docx"

doc.save(output_path_root)
doc.save(output_path_docs)

print(f"File created successfully:\n1. {output_path_root}\n2. {output_path_docs}")
