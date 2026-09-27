namespace CodeBackend.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Mssv { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Division { get; set; } = string.Empty;
        public string MentorName { get; set; } = string.Empty;
        public string MentorQuote { get; set; } = string.Empty;
        public string Gpa { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string Initials { get; set; } = string.Empty;

        // Ratings & Evidence
        public double AttitudeScore { get; set; } = 9.5;
        public double TechScore { get; set; } = 8.8;
        public double LearnScore { get; set; } = 9.0;
        public string SourceCodeStatus { get; set; } = "Đạt";
        public string ReportStatus { get; set; } = "Đạt";
        public int AttendancePercent { get; set; } = 100;
        public string AttendanceSessions { get; set; } = "78/78 buổi";
        public string TeacherNote { get; set; } = string.Empty;

        // UC9 State
        public string Uc9Status { get; set; } = "Chờ GV chấm điểm";
        public bool HasReportSubmitted { get; set; } = true;
        public string MentorScore { get; set; } = "8.8";
        public string ReportFileName { get; set; } = string.Empty;
        public double RubricReportScore { get; set; } = 9.0;
        public double RubricTechScore { get; set; } = 8.8;
        public double RubricOralScore { get; set; } = 9.0;

        // UC10 State
        public string Uc10Status { get; set; } = "Đang thực tập";
        public bool IsDurationEligible { get; set; } = true;
        public int CompletedWeeks { get; set; } = 16;
        public int TotalWeeks { get; set; } = 16;
        public string Week16Summary { get; set; } = string.Empty;
    }
}
