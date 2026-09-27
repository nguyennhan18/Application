using CodeBackend.Models;

namespace CodeBackend.Data
{
    public static class InMemoryDataStore
    {
        public static List<Student> Students { get; } = new List<Student>
        {
            new Student
            {
                Id = 1,
                Name = "Nguyễn Hoàng An",
                Mssv = "20210894",
                ClassName = "K66-CNTT",
                Department = "Khoa Công nghệ Thông tin",
                Company = "VNG Corporation",
                Division = "ZaloPay Core",
                MentorName = "Trần Đình Vũ",
                MentorQuote = "Nắm bắt kiến trúc tốt, tối ưu hóa latency xử lý dữ liệu vượt chỉ tiêu được giao.",
                Gpa = "3.74",
                Role = "Backend Engineering Intern",
                Period = "01/06/2024 - 15/09/2024",
                Avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                Initials = "AN",

                AttitudeScore = 9.5,
                TechScore = 8.8,
                LearnScore = 9.0,
                SourceCodeStatus = "Đạt",
                ReportStatus = "Đạt",
                AttendancePercent = 100,
                AttendanceSessions = "78/78 buổi",
                TeacherNote = "Báo cáo tiến độ đầy đủ, đáp ứng tốt yêu cầu thực tế.",

                Uc9Status = "Chờ GV chấm điểm",
                HasReportSubmitted = true, // Main Flow (Tiêu chuẩn)
                MentorScore = "8.8",
                ReportFileName = "BaoCao_Tuan16_NguyenHoangAn.pdf",
                RubricReportScore = 9.0,
                RubricTechScore = 8.8,
                RubricOralScore = 9.0,

                Uc10Status = "Đang thực tập (Đủ điều kiện)",
                IsDurationEligible = true,
                CompletedWeeks = 16,
                TotalWeeks = 16,
                Week16Summary = "Tối ưu hóa API Gateway ZaloPay Core đạt 100,000 TPS. Hoàn thiện tài liệu kỹ thuật & Báo cáo tổng kết đợt thực tập. Báo cáo kết quả trước Hội đồng & Mentor Doanh nghiệp."
            },
            new Student
            {
                Id = 2,
                Name = "Trần Thị Bảo Châu",
                Mssv = "20210988",
                ClassName = "HTTT K15",
                Department = "Khoa Hệ thống Thông tin",
                Company = "VNG Corporation",
                Division = "Data Platform",
                MentorName = "Nguyễn Văn Hùng",
                MentorQuote = "Sinh viên cần chủ động hoàn thiện các báo cáo tuần theo đúng hạn định.",
                Gpa = "3.20",
                Role = "Data Analyst Intern",
                Period = "01/07/2024 - 15/10/2024",
                Avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
                Initials = "BC",

                AttitudeScore = 7.5,
                TechScore = 7.0,
                LearnScore = 8.0,
                SourceCodeStatus = "Chưa nộp",
                ReportStatus = "Chưa nộp",
                AttendancePercent = 85,
                AttendanceSessions = "66/78 buổi",
                TeacherNote = "Cần nhắc nhở sinh viên nộp bổ sung nhật ký thực tập.",

                Uc9Status = "Chưa nộp báo cáo",
                HasReportSubmitted = false, // Exception A2 (Nộp trễ)
                MentorScore = "Chưa có",
                ReportFileName = "Chua_Nop_Bao_Cao.pdf",
                RubricReportScore = 0.0,
                RubricTechScore = 0.0,
                RubricOralScore = 0.0,

                Uc10Status = "Chưa đủ mốc thời gian",
                IsDurationEligible = false, // Exception A2
                CompletedWeeks = 6,
                TotalWeeks = 16,
                Week16Summary = "Chưa có báo cáo nghiệm thu tuần 16."
            },
            new Student
            {
                Id = 3,
                Name = "Lê Minh Tuấn",
                Mssv = "20210331",
                ClassName = "KHMT K15",
                Department = "Khoa Khoa học Máy tính",
                Company = "Viettel Digital Services",
                Division = "Payment Core",
                MentorName = "Phạm Quang Minh",
                MentorQuote = "Tuấn hoàn thành xuất sắc công việc xây dựng Microservice Payment.",
                Gpa = "3.85",
                Role = "Backend Java Intern",
                Period = "01/06/2024 - 15/09/2024",
                Avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                Initials = "MT",

                AttitudeScore = 9.8,
                TechScore = 9.5,
                LearnScore = 9.6,
                SourceCodeStatus = "Xuất sắc",
                ReportStatus = "Đạt",
                AttendancePercent = 100,
                AttendanceSessions = "78/78 buổi",
                TeacherNote = "Kết quả bảo vệ thực tập xuất sắc, khuyến nghị khen thưởng.",

                Uc9Status = "Đã nhận xét", // Exception A3 (Edit flow) / Lệch điểm
                HasReportSubmitted = true,
                MentorScore = "9.6",
                ReportFileName = "BaoCao_Tuan16_LeMinhTuan.pdf",
                RubricReportScore = 9.5,
                RubricTechScore = 9.5,
                RubricOralScore = 9.0,

                Uc10Status = "Doanh nghiệp đã đánh giá",
                IsDurationEligible = true,
                CompletedWeeks = 16,
                TotalWeeks = 16,
                Week16Summary = "Triển khai microservice xử lý thanh toán thực tế với kiến trúc Event-Driven Kafka."
            }
        };
    }
}
