namespace CodeBackend.Models
{
    public class Uc10EvaluationRequest
    {
        public int StudentId { get; set; }
        public List<int> AttitudeStars { get; set; } = new List<int> { 5, 5, 4 }; // 3 criteria
        public List<int> TechSkillLevels { get; set; } = new List<int> { 4, 3, 3 }; // 3 criteria (1-4)
        public string MentorComment { get; set; } = string.Empty;
        public int HiringRecommendationOption { get; set; } // 0: Junior, 1: Extension, 2: Complete
        public bool IsEarlyEvaluationConfirmed { get; set; } = false;
    }

    public class Uc10EvaluationResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public double EnterpriseScore { get; set; }
        public string RankTag { get; set; } = string.Empty;
        public string ConvertedScoreFourScale { get; set; } = string.Empty;
        public string DigitalSignatureCertificate { get; set; } = "VN-CA-FPT-99824B";
        public string Sha256Hash { get; set; } = string.Empty;
        public string SignatureTimestamp { get; set; } = string.Empty;
        public Student? StudentData { get; set; }
    }
}
