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
                Name = "Nguyễn Văn Hoàng",
                Mssv = "20210452",
                ClassName = "KTPM K15",
                Department = "Khoa Kỹ thuật Phần mềm & Hệ thống",
                Company = "FPT Software F-Town 3",
                Role = "Frontend Developer Intern",
                Period = "01/07/2024 - 15/10/2024",
                Avatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuB0pqMh6joAqmW7dEKBS5mW4Jeh2OVB6KMWuxYqo1t17HWMlJMSW70jzBzIg1jqIh0oUJkppXm06lFWBAfseUbl5hecSsB6kuDBrO_Q2CBt9NPRuCABg3LIbMWOyAgzFRMxKKc7xG88iAAdZ1EjDuSGbLkPkfmsVnLb2uUbyMfo2PO2-8lootmpUGBI8w9K5qbLV9DkK1-hgqV-9l0Qz_ChO1DErIy2I04MBqtj4BA7xwFGJNyyA0n-",
                Uc9Status = "Chờ GV chấm điểm",
                HasReportSubmitted = true, // Normal Main Flow
                MentorScore = "9.2",
                MentorCommentSummary = "Hoàng tiếp thu kiến thức hệ thống rất nhanh, chủ động giải quyết ticket backlog thuộc module Admin Portal.",
                ReportFileName = "BaoCao_Tuan9_NguyenVanHoang.pdf",
                Uc10Status = "Đang thực tập (Đủ điều kiện)",
                IsDurationEligible = true,
                CompletedWeeks = 10,
                TotalWeeks = 12
            },
            new Student
            {
                Id = 2,
                Name = "Trần Thị Bảo Châu",
                Mssv = "20210988",
                ClassName = "HTTT K15",
                Department = "Khoa Hệ thống Thông tin",
                Company = "VNG Corporation",
                Role = "Data Analyst Intern",
                Period = "01/07/2024 - 15/10/2024",
                Avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
                Uc9Status = "Chưa nộp báo cáo",
                HasReportSubmitted = false, // Triggers UC9 Exception A2
                MentorScore = "Chưa có",
                MentorCommentSummary = "Sinh viên chưa hoàn tất nộp báo cáo tuần theo lịch.",
                ReportFileName = "Chua_Nop_Bao_Cao.pdf",
                Uc10Status = "Chưa đủ mốc thời gian",
                IsDurationEligible = false, // Triggers UC10 Exception A2
                CompletedWeeks = 6,
                TotalWeeks = 12
            },
            new Student
            {
                Id = 3,
                Name = "Lê Minh Tuấn",
                Mssv = "20210331",
                ClassName = "KHMT K15",
                Department = "Khoa Khoa học Máy tính",
                Company = "Viettel Digital Services",
                Role = "Backend Java Intern",
                Period = "01/06/2024 - 15/09/2024",
                Avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                Uc9Status = "Đã nhận xét", // Triggers UC9 Exception A3 (Edit flow)
                HasReportSubmitted = true,
                MentorScore = "9.6",
                MentorCommentSummary = "Tuấn hoàn thành xuất sắc công việc xây dựng Microservice Payment.",
                ReportFileName = "BaoCao_Tuan9_LeMinhTuan.pdf",
                Uc10Status = "Doanh nghiệp đã đánh giá", // Triggers UC10 Exception A3 (Edit flow)
                IsDurationEligible = true,
                CompletedWeeks = 12,
                TotalWeeks = 12
            }
        };
    }
}
