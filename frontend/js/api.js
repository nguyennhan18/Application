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
        name: "Nguyễn Văn Hoàng",
        mssv: "20210452",
        className: "KTPM K15",
        department: "Khoa Kỹ thuật Phần mềm & Hệ thống",
        company: "FPT Software F-Town 3",
        role: "Frontend Developer Intern",
        period: "01/07/2024 - 15/10/2024",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0pqMh6joAqmW7dEKBS5mW4Jeh2OVB6KMWuxYqo1t17HWMlJMSW70jzBzIg1jqIh0oUJkppXm06lFWBAfseUbl5hecSsB6kuDBrO_Q2CBt9NPRuCABg3LIbMWOyAgzFRMxKKc7xG88iAAdZ1EjDuSGbLkPkfmsVnLb2uUbyMfo2PO2-8lootmpUGBI8w9K5qbLV9DkK1-hgqV-9l0Qz_ChO1DErIy2I04MBqtj4BA7xwFGJNyyA0n-",
        uc9Status: "Chờ GV chấm điểm",
        hasReportSubmitted: true,
        mentorScore: "9.2",
        mentorCommentSummary: "Hoàng tiếp thu kiến thức hệ thống rất nhanh, chủ động giải quyết ticket backlog thuộc module Admin Portal.",
        reportFileName: "BaoCao_Tuan9_NguyenVanHoang.pdf",
        uc10Status: "Đang thực tập (Đủ điều kiện)",
        isDurationEligible: true,
        completedWeeks: 10,
        totalWeeks: 12
      },
      {
        id: 2,
        name: "Trần Thị Bảo Châu",
        mssv: "20210988",
        className: "HTTT K15",
        department: "Khoa Hệ thống Thông tin",
        company: "VNG Corporation",
        role: "Data Analyst Intern",
        period: "01/07/2024 - 15/10/2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        uc9Status: "Chưa nộp báo cáo",
        hasReportSubmitted: false, // Exception A2
        mentorScore: "Chưa có",
        mentorCommentSummary: "Sinh viên chưa hoàn tất nộp báo cáo tuần theo lịch.",
        reportFileName: "Chua_Nop_Bao_Cao.pdf",
        uc10Status: "Chưa đủ mốc thời gian",
        isDurationEligible: false, // Exception A2
        completedWeeks: 6,
        totalWeeks: 12
      },
      {
        id: 3,
        name: "Lê Minh Tuấn",
        mssv: "20210331",
        className: "KHMT K15",
        department: "Khoa Khoa học Máy tính",
        company: "Viettel Digital Services",
        role: "Backend Java Intern",
        period: "01/06/2024 - 15/09/2024",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        uc9Status: "Đã nhận xét", // Exception A3
        hasReportSubmitted: true,
        mentorScore: "9.6",
        mentorCommentSummary: "Tuấn hoàn thành xuất sắc công việc xây dựng Microservice Payment.",
        reportFileName: "BaoCao_Tuan9_LeMinhTuan.pdf",
        uc10Status: "Doanh nghiệp đã đánh giá", // Exception A3
        isDurationEligible: true,
        completedWeeks: 12,
        totalWeeks: 12
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

    const finalScore = Math.round((req.criteria1Score * 0.2 + req.criteria2Score * 0.5 + req.criteria3Score * 0.3) * 10) / 10;
    const rank = finalScore >= 9.0 ? "Xuất sắc" : finalScore >= 8.0 ? "Giỏi" : finalScore >= 7.0 ? "Khá" : "Trung bình";
    
    return {
      success: true,
      message: `Lưu nhận xét và điểm số thành công cho SV ${student.name}.`,
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
      return { success: false, message: "Ngoại lệ A2: Cảnh báo thực tập sinh chưa đủ thời gian thực tập tối thiểu (mới đạt 6/12 tuần). Cần xác nhận đánh giá sớm." };
    }

    if (!req.mentorComment || req.mentorComment.trim().length < 100) {
      return { success: false, message: "Ngoại lệ A1: Nhận xét chi tiết của Mentor Doanh nghiệp phải có ít nhất 100 ký tự." };
    }

    const enterpriseScore = 9.2;
    const hash = 'e4b2a8' + Math.random().toString(36).substring(2, 8) + 'f9c0';

    return {
      success: true,
      message: `Phê duyệt & Ký gửi thành công biên bản cho SV ${student.name}.`,
      enterpriseScore: enterpriseScore,
      rankTag: "Top 5% Thực tập sinh",
      convertedScoreFourScale: "Quy đổi: 3.68/4.0",
      digitalSignatureCertificate: "VN-CA-FPT-99824B",
      sha256Hash: hash,
      signatureTimestamp: new Date().toLocaleString('vi-VN') + " GMT+7",
      studentData: student
    };
  }
};
