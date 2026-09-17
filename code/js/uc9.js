/* ==========================================================================
   UC9 BUSINESS LOGIC & SCENARIOS (Giảng viên nhận xét)
   ========================================================================== */

const studentsData = [
  {
    id: 0,
    name: 'Nguyễn Văn Hoàng',
    mssv: 'MSSV: 20210452',
    className: 'KTPM K15',
    dept: 'Khoa Kỹ thuật Phần mềm & Hệ thống',
    company: 'FPT Software F-Town 3',
    role: 'Frontend Developer Intern',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0pqMh6joAqmW7dEKBS5mW4Jeh2OVB6KMWuxYqo1t17HWMlJMSW70jzBzIg1jqIh0oUJkppXm06lFWBAfseUbl5hecSsB6kuDBrO_Q2CBt9NPRuCABg3LIbMWOyAgzFRMxKKc7xG88iAAdZ1EjDuSGbLkPkfmsVnLb2uUbyMfo2PO2-8lootmpUGBI8w9K5qbLV9DkK1-hgqV-9l0Qz_ChO1DErIy2I04MBqtj4BA7xwFGJNyyA0n-',
    status: 'Chờ GV chấm điểm',
    statusClass: 'rank-fair',
    hasReport: true,
    mentorScore: '9.2',
    mentorComment: '"Hoàng tiếp thu kiến thức hệ thống rất nhanh, chủ động giải quyết ticket backlog thuộc module Admin Portal. Tác phong công nghiệp chuẩn mực."',
    scores: { c1: 9.0, c2: 8.5, c3: 8.8 },
    comment: 'Sinh viên Nguyễn Văn Hoàng có tinh thần học hỏi rất cao, thích nghi tốt với môi trường doanh nghiệp quy mô lớn. Hoàn thành đầy đủ các cam kết mục tiêu chuyên môn giai đoạn 1 và 2. Đề tài áp dụng sát thực tế.',
    reportFileName: 'BaoCao_Tuan9_NguyenVanHoang.pdf'
  },
  {
    id: 1,
    name: 'Trần Thị Bảo Châu',
    mssv: 'MSSV: 20210988',
    className: 'HTTT K15',
    dept: 'Khoa Hệ thống Thông tin',
    company: 'VNG Corporation',
    role: 'Data Analyst Intern',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'Chưa nộp báo cáo',
    statusClass: 'rank-fail',
    hasReport: false,
    mentorScore: 'Chưa có',
    mentorComment: '"Sinh viên chưa hoàn tất báo cáo tuần đúng hạn theo lịch làm việc."',
    scores: { c1: 0, c2: 0, c3: 0 },
    comment: '',
    reportFileName: 'Chua_Nop_Bao_Cao.pdf'
  },
  {
    id: 2,
    name: 'Lê Minh Tuấn',
    mssv: 'MSSV: 20210331',
    className: 'KHMT K15',
    dept: 'Khoa Khoa học Máy tính',
    company: 'Viettel Digital Services',
    role: 'Backend Java Intern',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Đã nhận xét',
    statusClass: 'rank-excellent',
    hasReport: true,
    mentorScore: '8.8',
    mentorComment: '"Tuấn hoàn thành tốt công việc xây dựng Microservice Payment, nắm chắc Spring Boot."',
    scores: { c1: 9.5, c2: 9.0, c3: 9.0 },
    comment: 'Sinh viên xuất sắc. Nắm vững kiến thức backend microservices, xử lý bài toán hiệu năng tốt. Đạt điểm tối đa đồ án thực tập.',
    reportFileName: 'BaoCao_Tuan9_LeMinhTuan.pdf'
  }
];

let currentStudentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initUC9Events();
  switchStudent(0);
});

function initUC9Events() {
  const range1 = document.getElementById('range-crit1');
  const range2 = document.getElementById('range-crit2');
  const range3 = document.getElementById('range-crit3');

  if (range1 && range2 && range3) {
    range1.addEventListener('input', calculateFinalScore);
    range2.addEventListener('input', calculateFinalScore);
    range3.addEventListener('input', calculateFinalScore);
  }

  // Quick Comment Tags Listener
  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', function() {
      const commentBox = document.getElementById('teacher-comment');
      if (commentBox && !commentBox.disabled) {
        const text = this.innerText.replace(/^\+\s*/, '').trim();
        if (!commentBox.value.includes(text)) {
          commentBox.value = commentBox.value.trim() ? commentBox.value.trim() + ' ' + text + '.' : text + '.';
        }
      }
    });
  });
}

function calculateFinalScore() {
  const r1 = parseFloat(document.getElementById('range-crit1').value) || 0;
  const r2 = parseFloat(document.getElementById('range-crit2').value) || 0;
  const r3 = parseFloat(document.getElementById('range-crit3').value) || 0;

  document.getElementById('val-crit1').innerHTML = `${r1.toFixed(1)}<span style="font-size:0.75rem; font-weight:normal; color:var(--text-muted);">/10</span>`;
  document.getElementById('val-crit2').innerHTML = `${r2.toFixed(1)}<span style="font-size:0.75rem; font-weight:normal; color:var(--text-muted);">/10</span>`;
  document.getElementById('val-crit3').innerHTML = `${r3.toFixed(1)}<span style="font-size:0.75rem; font-weight:normal; color:var(--text-muted);">/10</span>`;

  const total = (r1 * 0.2) + (r2 * 0.5) + (r3 * 0.3);
  const rounded = total.toFixed(1);

  document.getElementById('final-score-display').textContent = rounded;
  
  const badge = document.getElementById('rating-badge');
  if (badge) {
    badge.textContent = total >= 9.0 ? 'Xuất sắc' : total >= 8.0 ? 'Giỏi' : total >= 7.0 ? 'Khá' : total >= 5.0 ? 'Trung bình' : 'Không đạt';
    badge.className = `rank-badge ${total >= 8.0 ? 'rank-excellent' : total >= 7.0 ? 'rank-fair' : total >= 5.0 ? 'rank-average' : 'rank-fail'}`;
  }
}

function switchStudent(index) {
  currentStudentIndex = index;
  const st = studentsData[index];
  
  const selector = document.getElementById('student-selector');
  if (selector) selector.selectedIndex = index;

  // Scenario Buttons Highlighting
  [0, 1, 2].forEach(i => {
    const btn = document.getElementById(`btn-scenario-${i + 1}`);
    if (btn) {
      if (i === index) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  // Populate Details
  document.getElementById('student-name').textContent = st.name;
  document.getElementById('student-mssv').textContent = st.mssv;
  document.getElementById('student-class').textContent = st.className;
  document.getElementById('student-dept').textContent = st.dept;
  document.getElementById('student-company').textContent = st.company;
  document.getElementById('student-role').textContent = st.role;
  document.getElementById('student-avatar').src = st.avatar;

  const stBadge = document.getElementById('student-status-badge');
  stBadge.textContent = st.status;
  stBadge.className = `rank-badge ${st.statusClass}`;

  document.getElementById('mentor-score-tag').textContent = `Điểm DN: ${st.mentorScore}`;
  document.getElementById('mentor-comment-summary').textContent = st.mentorComment;

  const r1 = document.getElementById('range-crit1');
  const r2 = document.getElementById('range-crit2');
  const r3 = document.getElementById('range-crit3');
  const commentBox = document.getElementById('teacher-comment');
  const btnSubmit = document.getElementById('btn-submit-score');
  const bannerA2 = document.getElementById('banner-exception-a2');

  if (!st.hasReport) {
    // Exception A2: Student has not submitted report!
    if (bannerA2) bannerA2.classList.remove('hidden');
    if (r1) r1.disabled = true;
    if (r2) r2.disabled = true;
    if (r3) r3.disabled = true;
    if (commentBox) {
      commentBox.disabled = true;
      commentBox.value = '';
      commentBox.placeholder = 'Chưa có dữ liệu báo cáo để nhận xét. Vui lòng yêu cầu sinh viên nộp bài trước.';
    }
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.5';
      btnSubmit.style.cursor = 'not-allowed';
    }
    r1.value = 0; r2.value = 0; r3.value = 0;
    calculateFinalScore();
  } else {
    // Main Flow or Edit Flow (A3)
    if (bannerA2) bannerA2.classList.add('hidden');
    if (r1) r1.disabled = false;
    if (r2) r2.disabled = false;
    if (r3) r3.disabled = false;
    if (commentBox) {
      commentBox.disabled = false;
      commentBox.value = st.comment;
      commentBox.placeholder = 'Nhập nhận xét học thuật chuyên sâu về thái độ, năng lực chuyên môn và triển vọng...';
    }
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = '1';
      btnSubmit.style.cursor = 'pointer';
    }
    r1.value = st.scores.c1;
    r2.value = st.scores.c2;
    r3.value = st.scores.c3;
    calculateFinalScore();
  }
}

function submitAssessment() {
  const st = studentsData[currentStudentIndex];
  if (!st.hasReport) {
    showToast('Lỗi Chấm Điểm', 'Sinh viên chưa nộp báo cáo. Không thể thực hiện nhận xét (Ngoại lệ A2).', 'error');
    return;
  }

  const commentBox = document.getElementById('teacher-comment');
  const commentText = commentBox.value.trim();

  // Validation A1
  if (!commentText || commentText.length < 10) {
    commentBox.style.borderColor = 'var(--error)';
    showToast('Lỗi Kiểm Tra (A1)', 'Nội dung nhận xét không được rỗng và phải từ 10 ký tự trở lên.', 'error');
    return;
  }
  commentBox.style.borderColor = 'var(--border)';

  st.scores.c1 = parseFloat(document.getElementById('range-crit1').value);
  st.scores.c2 = parseFloat(document.getElementById('range-crit2').value);
  st.scores.c3 = parseFloat(document.getElementById('range-crit3').value);
  st.comment = commentText;
  st.status = 'Đã nhận xét';
  st.statusClass = 'rank-excellent';

  document.getElementById('student-status-badge').textContent = 'Đã nhận xét';
  document.getElementById('student-status-badge').className = 'rank-badge rank-excellent';

  showToast('Lưu thành công!', `Đã cập nhật điểm và nhận xét của SV ${st.name}.`, 'success');
}

function saveDraft() {
  showToast('Đã lưu bản nháp', 'Tự động sao lưu dữ liệu nhận xét tạm thời.', 'info');
}

function openPdfModal() {
  const st = studentsData[currentStudentIndex];
  document.getElementById('pdf-student-name').textContent = st.name;
  document.getElementById('pdf-student-mssv').textContent = st.mssv.replace('MSSV: ', '');
  document.getElementById('pdf-student-company').textContent = st.company;

  const c1 = parseFloat(document.getElementById('range-crit1').value) || 0;
  const c2 = parseFloat(document.getElementById('range-crit2').value) || 0;
  const c3 = parseFloat(document.getElementById('range-crit3').value) || 0;
  const total = (c1 * 0.2 + c2 * 0.5 + c3 * 0.3).toFixed(1);

  document.getElementById('pdf-score-c1').textContent = c1.toFixed(1);
  document.getElementById('pdf-score-c2').textContent = c2.toFixed(1);
  document.getElementById('pdf-score-c3').textContent = c3.toFixed(1);
  document.getElementById('pdf-total-score').textContent = `${total} / 10.0`;

  document.getElementById('pdf-teacher-comment').textContent = document.getElementById('teacher-comment').value || st.comment;

  openModal('pdf-modal');
}
