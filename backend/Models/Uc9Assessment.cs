namespace CodeBackend.Models
{
    public class Uc9AssessmentRequest
    {
        public int StudentId { get; set; }
        public double Criteria1Score { get; set; } // Kỷ luật & Báo cáo (20%)
        public double Criteria2Score { get; set; } // Khối lượng Chuyên môn (50%)
        public double Criteria3Score { get; set; } // Kết quả & Báo cáo (30%)
        public string TeacherComment { get; set; } = string.Empty;
        public bool IsPublic { get; set; } = true;
        public bool SendToDepartment { get; set; } = true;
    }

    public class Uc9AssessmentResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public double FinalScore { get; set; }
        public string AcademicRank { get; set; } = string.Empty;
        public Student? StudentData { get; set; }
        public string Timestamp { get; set; } = string.Empty;
    }
}
