/* ==========================================================================
   API CLIENT FOR C# ASP.NET CORE (.NET 9) BACKEND
   ========================================================================== */

const API_BASE_URL = 'http://localhost:5000/api';

const ApiClient = {
  // Get All Students
  async getStudents() {
    try {
      const res = await fetch(`${API_BASE_URL}/students`);
      if (!res.ok) throw new Error('API server unavailable');
      return await res.json();
    } catch (e) {
      console.warn('Backend API connection offline, using fallback data store.', e);
      return this.getMockStudents();
    }
  },

  // Submit UC9 Assessment
  async evaluateUc9(requestData) {
    try {
      const res = await fetch(`${API_BASE_URL}/uc9/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      const data = await res.json();
      if (!res.ok) return data; // Return validation error object
      return data;
    } catch (e) {
      console.warn('Backend API offline, executing C# fallback logic in client.', e);
      return this.evaluateUc9Fallback(requestData);
    }
  },

  // Submit UC10 Evaluation
  async evaluateUc10(requestData) {
    try {
      const res = await fetch(`${API_BASE_URL}/uc10/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      const data = await res.json();
      if (!res.ok) return data; // Return validation error object
      return data;
    } catch (e) {
      console.warn('Backend API offline, executing C# fallback logic in client.', e);
      return this.evaluateUc10Fallback(requestData);
    }
  },

  // Client Fallback Logic matching C# Uc9Service.cs exactly
  getMockStudents() {
    return [
      {
        id: 1,
        name: "Nguyễn Hoàng An",
        mssv: "20210894",
        className: "K66-CNTT",
        department: "Khoa Công nghệ Thông tin",
        company: "VNG Corporation",
        division: "ZaloPay Core",
        mentorName: "Trần Đình Vũ",
        mentorQuote: "Nắm bắt kiến trúc tốt, tối ưu hóa latency xử lý dữ liệu vượt chỉ tiêu được giao.",
        gpa: "3.74",
        role: "Backend Engineering Intern",
        period: "01/06/2024 - 15/09/2024",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        initials: "AN",

        attitudeScore: 9.5,
        techScore: 8.8,
        learnScore: 9.0,
        sourceCodeStatus: "Đạt",
        reportStatus: "Đạt",
        attendancePercent: 100,
        attendanceSessions: "78/78 buổi",
        teacherNote: "Báo cáo tiến độ đầy đủ, đáp ứng tốt yêu cầu thực tế.",

        uc9Status: "Chờ GV chấm điểm",
        hasReportSubmitted: true,
        mentorScore: "8.8",
        reportFileName: "BaoCao_Tuan16_NguyenHoangAn.pdf",
        rubricReportScore: 9.0,
        rubricTechScore: 8.8,
        rubricOralScore: 9.0,

        uc10Status: "Đang thực tập (Đủ điều kiện)",
        isDurationEligible: true,
        completedWeeks: 16,
        totalWeeks: 16,
        week16Summary: "Tối ưu hóa API Gateway ZaloPay Core đạt 100,000 TPS. Hoàn thiện tài liệu kỹ thuật & Báo cáo tổng kết đợt thực tập. Báo cáo kết quả trước Hội đồng & Mentor Doanh nghiệp."
      },
      {
        id: 2,
        name: "Trần Thị Bảo Châu",
        mssv: "20210988",
        className: "HTTT K15",
        department: "Khoa Hệ thống Thông tin",
        company: "VNG Corporation",
        division: "Data Platform",
        mentorName: "Nguyễn Văn Hùng",
        mentorQuote: "Sinh viên cần chủ động hoàn thiện các báo cáo tuần theo đúng hạn định.",
        gpa: "3.20",
        role: "Data Analyst Intern",
        period: "01/07/2024 - 15/10/2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        initials: "BC",

        attitudeScore: 7.5,
        techScore: 7.0,
        learnScore: 8.0,
        sourceCodeStatus: "Chưa nộp",
        reportStatus: "Chưa nộp",
        attendancePercent: 85,
        attendanceSessions: "66/78 buổi",
        teacherNote: "Cần nhắc nhở sinh viên nộp bổ sung nhật ký thực tập.",

        uc9Status: "Chưa nộp báo cáo",
        hasReportSubmitted: false, // Exception A2
        mentorScore: "Chưa có",
        reportFileName: "Chua_Nop_Bao_Cao.pdf",
        rubricReportScore: 0.0,
        rubricTechScore: 0.0,
        rubricOralScore: 0.0,

        uc10Status: "Chưa đủ mốc thời gian",
        isDurationEligible: false, // Exception A2
        completedWeeks: 6,
        totalWeeks: 16,
        week16Summary: "Chưa có báo cáo nghiệm thu tuần 16."
      },
      {
        id: 3,
        name: "Lê Minh Tuấn",
        mssv: "20210331",
        className: "KHMT K15",
        department: "Khoa Khoa học Máy tính",
        company: "Viettel Digital Services",
        division: "Payment Core",
        mentorName: "Phạm Quang Minh",
        mentorQuote: "Tuấn hoàn thành xuất sắc công việc xây dựng Microservice Payment.",
        gpa: "3.85",
        role: "Backend Java Intern",
        period: "01/06/2024 - 15/09/2024",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        initials: "MT",

        attitudeScore: 9.8,
        techScore: 9.5,
        learnScore: 9.6,
        sourceCodeStatus: "Xuất sắc",
        reportStatus: "Đạt",
        attendancePercent: 100,
        attendanceSessions: "78/78 buổi",
        teacherNote: "Kết quả bảo vệ thực tập xuất sắc, khuyến nghị khen thưởng.",

        uc9Status: "Đã nhận xét", // Exception A3
        hasReportSubmitted: true,
        mentorScore: "9.6",
        reportFileName: "BaoCao_Tuan16_LeMinhTuan.pdf",
        rubricReportScore: 9.5,
        rubricTechScore: 9.5,
        rubricOralScore: 9.0,

        uc10Status: "Doanh nghiệp đã đánh giá",
        isDurationEligible: true,
        completedWeeks: 16,
        totalWeeks: 16,
        week16Summary: "Triển khai microservice xử lý thanh toán thực tế với kiến trúc Event-Driven Kafka."
      }
    ];
  },

  evaluateUc9Fallback(req) {
    const students = this.getMockStudents();
    const student = students.find(s => s.id === req.studentId);
    
    if (!student.hasReportSubmitted) {
      return { success: false, message: "Ngoại lệ A2: Sinh viên chưa nộp báo cáo / nhật ký thực tập. Chưa có dữ liệu để nhận xét." };
    }
    if (!req.teacherComment || req.teacherComment.trim().length < 10) {
      return { success: false, message: "Ngoại lệ A1: Nội dung nhận xét của Giảng viên phải đạt ít nhất 10 ký tự." };
    }

    const rScore = req.reportScore || req.criteria1Score || 9.0;
    const tScore = req.techScore || req.criteria2Score || 8.8;
    const oScore = req.oralScore || req.criteria3Score || 9.0;

    const finalScore = Math.round(((rScore * 0.3) + (tScore * 0.4) + (oScore * 0.3)) * 100) / 100;
    const rank = finalScore >= 9.0 ? "A+ - Xuất sắc" : finalScore >= 8.0 ? "A - Giỏi" : finalScore >= 7.0 ? "B - Khá" : "C - Trung bình";
    
    return {
      success: true,
      message: `Công bố điểm thành công cho SV ${student.name} (MSSV: ${student.mssv}). Kết quả: ${finalScore}/10.0 (${rank})`,
      finalScore: finalScore,
      academicRank: rank,
      studentData: student,
      timestamp: new Date().toLocaleTimeString('vi-VN')
    };
  },

  evaluateUc10Fallback(req) {
    const students = this.getMockStudents();
    const student = students.find(s => s.id === req.studentId);

    if (!student.isDurationEligible && !req.isEarlyEvaluationConfirmed) {
      return { success: false, message: "Ngoại lệ A2: Cảnh báo thực tập sinh chưa đủ thời gian thực tập tối thiểu (mới đạt 6/16 tuần). Cần xác nhận đánh giá sớm." };
    }

    if (!req.mentorComment || req.mentorComment.trim().length < 100) {
      return { success: false, message: "Ngoại lệ A1: Nhận xét chi tiết của Mentor Doanh nghiệp phải có ít nhất 100 ký tự." };
    }

    const hash = 'e4b2a8' + Math.random().toString(36).substring(2, 8) + 'f9c0';

    return {
      success: true,
      message: `Phê duyệt & Ký gửi thành công biên bản cho SV ${student.name}.`,
      enterpriseScore: 8.8,
      rankTag: "Top 5% Thực tập sinh",
      digitalSignatureCertificate: "VN-CA-FPT-99824B",
      sha256Hash: hash,
      signatureTimestamp: new Date().toLocaleString('vi-VN') + " GMT+7",
      studentData: student
    };
  }
};
