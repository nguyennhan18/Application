/* ==========================================================================
   UC9 FRONTEND VIEW CONTROLLER (Giảng viên nhận xét)
   ========================================================================== */

let uc9Students = [];
let currentUc9Index = 0;

async function initUc9View() {
  uc9Students = await ApiClient.getStudents();
  renderUc9Student(0);

  // Range Sliders listeners
  const r1 = document.getElementById('uc9-slider-c1');
  const r2 = document.getElementById('uc9-slider-c2');
  const r3 = document.getElementById('uc9-slider-c3');

  if (r1 && r2 && r3) {
    r1.addEventListener('input', updateUc9ScoreCalculation);
    r2.addEventListener('input', updateUc9ScoreCalculation);
    r3.addEventListener('input', updateUc9ScoreCalculation);
  }
}

function renderUc9Student(index) {
  currentUc9Index = index;
  const st = uc9Students[index] || ApiClient.getMockStudents()[index];

  // Update Scenario Buttons State
  [0, 1, 2].forEach(i => {
    const btn = document.getElementById(`uc9-scen-${i + 1}`);
    if (btn) {
      if (i === index) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  // Update Dossier Info
  document.getElementById('uc9-name').textContent = st.name;
  document.getElementById('uc9-mssv').textContent = `MSSV: ${st.mssv}`;
  document.getElementById('uc9-dept').textContent = st.department;
  document.getElementById('uc9-company').textContent = st.company;
  document.getElementById('uc9-role').textContent = st.role;
  document.getElementById('uc9-avatar').src = st.avatar;

  const statusBadge = document.getElementById('uc9-status-badge');
  statusBadge.textContent = st.uc9Status;

  const bannerA2 = document.getElementById('uc9-banner-a2');
  const commentInput = document.getElementById('uc9-comment');
  const btnSubmit = document.getElementById('btn-submit-uc9');

  if (!st.hasReportSubmitted) {
    // Exception A2: Not submitted
    if (bannerA2) bannerA2.style.display = 'flex';
    if (commentInput) {
      commentInput.disabled = true;
      commentInput.value = '';
      commentInput.placeholder = 'Chưa có dữ liệu báo cáo để nhận xét. Vui lòng yêu cầu SV nộp bài trước.';
    }
    if (btnSubmit) btnSubmit.disabled = true;
    setSlidersDisabled(true);
    setSliderValues(0, 0, 0);
  } else {
    // Normal / Exception A3 (Edit)
    if (bannerA2) bannerA2.style.display = 'none';
    if (commentInput) {
      commentInput.disabled = false;
      commentInput.value = st.id === 3 ? 'Sinh viên xuất sắc. Nắm vững kiến thức backend microservices.' : 'Sinh viên Nguyễn Văn Hoàng có tinh thần học hỏi rất cao, thích nghi tốt với môi trường doanh nghiệp.';
      commentInput.placeholder = 'Nhập nhận xét học thuật chuyên sâu...';
    }
    if (btnSubmit) btnSubmit.disabled = false;
    setSlidersDisabled(false);
    
    if (st.id === 3) setSliderValues(9.5, 9.0, 9.0);
    else setSliderValues(9.0, 8.5, 8.8);
  }

  updateUc9ScoreCalculation();
}

function setSlidersDisabled(disabled) {
  ['uc9-slider-c1', 'uc9-slider-c2', 'uc9-slider-c3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = disabled;
  });
}

function setSliderValues(c1, c2, c3) {
  const r1 = document.getElementById('uc9-slider-c1');
  const r2 = document.getElementById('uc9-slider-c2');
  const r3 = document.getElementById('uc9-slider-c3');
  if (r1) r1.value = c1;
  if (r2) r2.value = c2;
  if (r3) r3.value = c3;
}

function updateUc9ScoreCalculation() {
  const r1 = parseFloat(document.getElementById('uc9-slider-c1').value) || 0;
  const r2 = parseFloat(document.getElementById('uc9-slider-c2').value) || 0;
  const r3 = parseFloat(document.getElementById('uc9-slider-c3').value) || 0;

  document.getElementById('uc9-val-c1').textContent = r1.toFixed(1);
  document.getElementById('uc9-val-c2').textContent = r2.toFixed(1);
  document.getElementById('uc9-val-c3').textContent = r3.toFixed(1);

  const total = Math.round(((r1 * 0.2) + (r2 * 0.5) + (r3 * 0.3)) * 10) / 10;
  
  document.getElementById('uc9-ring-num').textContent = total.toFixed(1);
  
  // Ring SVG animation
  const ringProgress = document.getElementById('uc9-ring-circle');
  if (ringProgress) {
    const dashoffset = 283 - (283 * (total / 10.0));
    ringProgress.style.strokeDashoffset = dashoffset;
  }

  const rankBadge = document.getElementById('uc9-rank-tag');
  if (rankBadge) {
    rankBadge.textContent = total >= 9.0 ? 'Xuất sắc' : total >= 8.0 ? 'Giỏi' : total >= 7.0 ? 'Khá' : 'Trung bình';
  }
}

async function submitUc9Assessment() {
  const st = uc9Students[currentUc9Index] || ApiClient.getMockStudents()[currentUc9Index];
  
  const req = {
    studentId: st.id,
    criteria1Score: parseFloat(document.getElementById('uc9-slider-c1').value),
    criteria2Score: parseFloat(document.getElementById('uc9-slider-c2').value),
    criteria3Score: parseFloat(document.getElementById('uc9-slider-c3').value),
    teacherComment: document.getElementById('uc9-comment').value,
    isPublic: true,
    sendToDepartment: true
  };

  const response = await ApiClient.evaluateUc9(req);

  if (!response.success) {
    showToastNotification('Lỗi Đánh Giá', response.message, 'error');
    return;
  }

  document.getElementById('uc9-status-badge').textContent = 'Đã nhận xét';
  showToastNotification('Lưu thành công!', response.message, 'success');
}
