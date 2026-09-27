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

            if (request.Criteria1Score < 0 || request.Criteria1Score > 10 ||
                request.Criteria2Score < 0 || request.Criteria2Score > 10 ||
                request.Criteria3Score < 0 || request.Criteria3Score > 10)
            {
                return new Uc9AssessmentResponse
                {
                    Success = false,
                    Message = "Ngoại lệ A1: Điểm số các tiêu chí phải nằm trong thang điểm [0.0 - 10.0]."
                };
            }

            // Main Flow: Score Calculation Formula: Total = (C1 * 0.2) + (C2 * 0.5) + (C3 * 0.3)
            double finalScore = Math.Round((request.Criteria1Score * 0.2) + (request.Criteria2Score * 0.5) + (request.Criteria3Score * 0.3), 1);
            
            string rank = finalScore >= 9.0 ? "Xuất sắc"
                        : finalScore >= 8.0 ? "Giỏi"
                        : finalScore >= 7.0 ? "Khá"
                        : finalScore >= 5.0 ? "Trung bình" : "Không đạt";

            // Update State (Supports Exception A3 - Edit assessment)
            student.Uc9Status = "Đã nhận xét";

            return new Uc9AssessmentResponse
            {
                Success = true,
                Message = $"Lưu nhận xét và điểm số thành công cho SV {student.Name}.",
                FinalScore = finalScore,
                AcademicRank = rank,
                StudentData = student,
                Timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")
            };
        }
    }
}
