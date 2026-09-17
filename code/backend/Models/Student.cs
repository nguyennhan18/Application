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
        public string Role { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;

        // UC9 State
        public string Uc9Status { get; set; } = "Chờ GV chấm điểm";
        public bool HasReportSubmitted { get; set; } = true;
        public string MentorScore { get; set; } = "9.2";
        public string MentorCommentSummary { get; set; } = string.Empty;
        public string ReportFileName { get; set; } = string.Empty;

        // UC10 State
        public string Uc10Status { get; set; } = "Đang thực tập";
        public bool IsDurationEligible { get; set; } = true;
        public int CompletedWeeks { get; set; } = 10;
        public int TotalWeeks { get; set; } = 12;
    }
}
