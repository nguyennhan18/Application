using CodeBackend.Models;
using CodeBackend.Data;

namespace CodeBackend.Services
{
    public interface IUc9Service
    {
        Student? GetStudentDossier(int studentId);
        Uc9AssessmentResponse EvaluateRubrics(Uc9AssessmentRequest request);
    }

    public class Uc9Service : IUc9Service
    {
        public Student? GetStudentDossier(int studentId)
        {
            return InMemoryDataStore.Students.FirstOrDefault(s => s.Id == studentId);
        }

        public Uc9AssessmentResponse EvaluateRubrics(Uc9AssessmentRequest request)
        {
            var student = InMemoryDataStore.Students.FirstOrDefault(s => s.Id == request.StudentId);
            if (student == null)
            {
                return new Uc9AssessmentResponse
                {
                    Success = false,
                    Message = "Không tìm thấy sinh viên trong hệ thống."
                };
            }

            // Exception A2: Student has not submitted report
            if (!student.HasReportSubmitted)
            {
                return new Uc9AssessmentResponse
                {
                    Success = false,
                    Message = "Ngoại lệ A2: Sinh viên chưa nộp báo cáo / nhật ký thực tập. Chưa có dữ liệu để nhận xét."
                };
            }

            // Exception A1: Validation on Score and Comment
            if (string.IsNullOrWhiteSpace(request.TeacherComment) || request.TeacherComment.Trim().Length < 10)
            {
                return new Uc9AssessmentResponse
                {
                    Success = false,
                    Message = "Ngoại lệ A1: Nội dung nhận xét của Giảng viên phải đạt ít nhất 10 ký tự."
                };
            }

            if (request.ReportScore < 0 || request.ReportScore > 10 ||
                request.TechScore < 0 || request.TechScore > 10 ||
                request.OralScore < 0 || request.OralScore > 10)
            {
                return new Uc9AssessmentResponse
                {
                    Success = false,
                    Message = "Ngoại lệ A1: Điểm số các tiêu chí phải nằm trong thang điểm [0.0 - 10.0]."
                };
            }

            // Main Flow: Weighted Score Formula = (Báo cáo * 0.3) + (Kỹ thuật * 0.4) + (Vấn đáp * 0.3)
            double finalScore = Math.Round((request.ReportScore * 0.3) + (request.TechScore * 0.4) + (request.OralScore * 0.3), 2);
            
            string rank = finalScore >= 9.0 ? "A+ - Xuất sắc"
                        : finalScore >= 8.0 ? "A - Giỏi"
                        : finalScore >= 7.0 ? "B - Khá"
                        : finalScore >= 5.0 ? "C - Trung bình" : "F - Không đạt";

            // Update State (Supports Exception A3 - Edit assessment)
            student.Uc9Status = "Đã công bố điểm";
            student.RubricReportScore = request.ReportScore;
            student.RubricTechScore = request.TechScore;
            student.RubricOralScore = request.OralScore;

            return new Uc9AssessmentResponse
            {
                Success = true,
                Message = $"Công bố điểm và nhận xét thành công cho SV {student.Name} (MSSV: {student.Mssv}). Kết quả: {finalScore}/10.0 ({rank})",
                FinalScore = finalScore,
                AcademicRank = rank,
                StudentData = student,
                Timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")
            };
        }
    }
}
