namespace CodeBackend.Models
{
    public class Uc9AssessmentRequest
    {
        public int StudentId { get; set; }
        public double ReportScore { get; set; } = 9.0; // Báo cáo (30%)
        public double TechScore { get; set; } = 8.8;   // Kỹ thuật (40%)
        public double OralScore { get; set; } = 9.0;   // Vấn đáp (30%)

        // Legacy compatibility properties
        public double Criteria1Score { get => ReportScore; set => ReportScore = value; }
        public double Criteria2Score { get => TechScore; set => TechScore = value; }
        public double Criteria3Score { get => OralScore; set => OralScore = value; }

        public string TeacherComment { get; set; } = string.Empty;
        public List<string> Tags { get; set; } = new List<string>();
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
