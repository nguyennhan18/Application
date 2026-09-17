using CodeBackend.Models;
using CodeBackend.Data;
using System.Security.Cryptography;
using System.Text;

namespace CodeBackend.Services
{
    public interface IUc10Service
    {
        Student? GetInternDossier(int studentId);
        Uc10EvaluationResponse SubmitEnterpriseEvaluation(Uc10EvaluationRequest request);
    }

    public class Uc10Service : IUc10Service
    {
        public Student? GetInternDossier(int studentId)
        {
            return InMemoryDataStore.Students.FirstOrDefault(s => s.Id == studentId);
        }

        public Uc10EvaluationResponse SubmitEnterpriseEvaluation(Uc10EvaluationRequest request)
        {
            var student = InMemoryDataStore.Students.FirstOrDefault(s => s.Id == request.StudentId);
            if (student == null)
            {
                return new Uc10EvaluationResponse
                {
                    Success = false,
                    Message = "Không tìm thấy thực tập sinh trong hệ thống."
                };
            }

            // Exception A2: Student has not reached min duration
            if (!student.IsDurationEligible && !request.IsEarlyEvaluationConfirmed)
            {
                return new Uc10EvaluationResponse
                {
                    Success = false,
                    Message = "Ngoại lệ A2: Cảnh báo thực tập sinh chưa đủ thời gian thực tập tối thiểu (mới đạt 6/12 tuần). Cần xác nhận đánh giá sớm."
                };
            }

            // Exception A1: Mentor comment validation (min 100 chars)
            if (string.IsNullOrWhiteSpace(request.MentorComment) || request.MentorComment.Trim().Length < 100)
            {
                return new Uc10EvaluationResponse
                {
                    Success = false,
                    Message = "Ngoại lệ A1: Nhận xét chi tiết của Mentor Doanh nghiệp phải có ít nhất 100 ký tự."
                };
            }

            // Calculate Score based on ratings
            double attitudeAvg = request.AttitudeStars.Count > 0 ? request.AttitudeStars.Average() * 2.0 : 9.0;
            double techAvg = request.TechSkillLevels.Count > 0 ? request.TechSkillLevels.Average() * 2.5 : 9.0;

            double enterpriseScore = Math.Round((attitudeAvg * 0.4) + (techAvg * 0.6), 1);
            double convertedFourScale = Math.Round((enterpriseScore / 10.0) * 4.0, 2);

            string rankTag = enterpriseScore >= 9.0 ? "Top 5% Thực tập sinh"
                           : enterpriseScore >= 8.0 ? "Khá / Giỏi" : "Đạt yêu cầu";

            // Generate FPT e-Sign SHA256 Hash Stamp
            string rawSignData = $"{student.Mssv}-{enterpriseScore}-{DateTime.UtcNow.Ticks}";
            string sha256Hash = ComputeSha256(rawSignData);

            // Update State (Supports Exception A3 - Re-edit signed evaluation)
            student.Uc10Status = "Doanh nghiệp đã đánh giá";
            student.MentorScore = enterpriseScore.ToString("F1");

            return new Uc10EvaluationResponse
            {
                Success = true,
                Message = $"Phê duyệt & Ký gửi thành công biên bản cho SV {student.Name}.",
                EnterpriseScore = enterpriseScore,
                RankTag = rankTag,
                ConvertedScoreFourScale = $"Quy đổi: {convertedFourScale}/4.0",
                DigitalSignatureCertificate = "VN-CA-FPT-99824B",
                Sha256Hash = sha256Hash,
                SignatureTimestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + " GMT+7",
                StudentData = student
            };
        }

        private static string ComputeSha256(string rawData)
        {
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
            var builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString().Substring(0, 16);
        }
    }
}
