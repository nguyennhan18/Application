/* ==========================================================================
   UC9 FRONTEND VIEW CONTROLLER (Giảng viên nhận xét - Stitch Mockup Design)
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

  // Comment Textarea live character counter listener
  const commentBox = document.getElementById('uc9-comment');
  if (commentBox) {
    commentBox.addEventListener('input', updateCommentCharCounter);
  }
}

function renderUc9Student(index) {
  currentUc9Index = index;
  const st = (uc9Students && uc9Students[index]) ? uc9Students[index] : ApiClient.getMockStudents()[index];

  // Update Scenario Chips State
  [0, 1, 2].forEach(i => {
    const btn = document.getElementById(`uc9-scen-${i + 1}`);
    if (btn) {
      if (i === index) {
        if (i === 0) btn.className = 'scen-chip active-primary';
        else if (i === 1) btn.className = 'scen-chip active-amber';
        else btn.className = 'scen-chip active-rose';
      } else {
        btn.className = 'scen-chip';
      }
    }
  });

  // Top MSSV Chip
  const topMssv = document.getElementById('uc9-top-mssv');
  if (topMssv) topMssv.textContent = `MSSV: ${st.mssv}`;

  // Col 1: Dossier Info
  document.getElementById('uc9-name').textContent = st.name;
  document.getElementById('uc9-meta-info').textContent = `MSSV: ${st.mssv} • ${st.className} • GPA: ${st.gpa || '3.74'}`;
  document.getElementById('uc9-company').textContent = st.company;
  document.getElementById('uc9-division').textContent = st.division || 'ZaloPay Core';
  document.getElementById('uc9-mentor').textContent = st.mentorName || 'Trần Đình Vũ';
  document.getElementById('uc9-avatar-circle').textContent = st.initials || 'AN';

  // Business Rating Quote & Bars
  document.getElementById('uc9-mentor-score').textContent = `${st.mentorScore || '8.8'} / 10`;
  document.getElementById('uc9-mentor-quote').textContent = `"${st.mentorQuote || 'Nắm bắt kiến trúc tốt, tối ưu hóa latency xử lý dữ liệu vượt chỉ tiêu được giao.'}"`;
  
  document.getElementById('uc9-score-attitude').textContent = (st.attitudeScore || 9.5).toFixed(1);
  document.getElementById('uc9-score-tech').textContent = (st.techScore || 8.8).toFixed(1);
  document.getElementById('uc9-score-learn').textContent = (st.learnScore || 9.0).toFixed(1);

  document.getElementById('uc9-bar-attitude').style.width = `${(st.attitudeScore || 9.5) * 10}%`;
  document.getElementById('uc9-bar-tech').style.width = `${(st.techScore || 8.8) * 10}%`;
  document.getElementById('uc9-bar-learn').style.width = `${(st.learnScore || 9.0) * 10}%`;

  // Status Badge & Banner
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
      if (st.id === 3) {
        commentInput.value = 'Sinh viên xuất sắc. Nắm vững kiến trúc Backend Microservices với Kafka.';
      } else {
        commentInput.value = 'Sinh viên hoàn thành xuất sắc đợt thực tập tại VNG ZaloPay Core.';
      }
      commentInput.placeholder = 'Nhập nhận xét chi tiết...';
    }
    if (btnSubmit) btnSubmit.disabled = false;
    setSlidersDisabled(false);
    
    if (st.id === 3) setSliderValues(9.5, 9.5, 9.0);
    else setSliderValues(9.0, 8.8, 9.0);
  }

  updateCommentCharCounter();
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

  // Formula: (Báo cáo * 0.3) + (Kỹ thuật * 0.4) + (Vấn đáp * 0.3)
  const total = Math.round(((r1 * 0.3) + (r2 * 0.4) + (r3 * 0.3)) * 100) / 100;
  
  // Display score (e.g. 8.87 / 10.0 or calculated total)
  const ringNum = document.getElementById('uc9-ring-num');
  if (ringNum) {
    ringNum.textContent = total > 0 ? total.toFixed(2) : '0.00';
  }
  
  // Ring SVG Arc Animation (strokeDasharray 283)
  const ringProgress = document.getElementById('uc9-ring-circle');
  if (ringProgress) {
    const dashoffset = 283 - (283 * (total / 10.0));
    ringProgress.style.strokeDashoffset = Math.max(0, Math.min(283, dashoffset));
  }

  const rankBadge = document.getElementById('uc9-rank-tag');
  if (rankBadge) {
    rankBadge.textContent = total >= 9.0 ? 'A+ - Xuất sắc' : total >= 8.0 ? 'A - Giỏi' : total >= 7.0 ? 'B - Khá' : total >= 5.0 ? 'C - Trung bình' : 'F - Không đạt';
  }
}

function updateCommentCharCounter() {
  const commentBox = document.getElementById('uc9-comment');
  const counter = document.getElementById('uc9-char-counter');
  if (commentBox && counter) {
    const len = commentBox.value.length;
    counter.textContent = `${len} ký tự`;
  }
}

function appendUc9Tag(tagText) {
  const commentBox = document.getElementById('uc9-comment');
  if (!commentBox || commentBox.disabled) return;

  if (commentBox.value.trim().length === 0) {
    commentBox.value = tagText;
  } else if (!commentBox.value.includes(tagText)) {
    commentBox.value += ` ${tagText}`;
  }
  updateCommentCharCounter();
}

function selectWeekTab(weekNum) {
  const tabs = document.querySelectorAll('.week-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  
  const activeTab = Array.from(tabs).find(t => t.textContent.includes(`W${weekNum}`));
  if (activeTab) activeTab.classList.add('active');

  const titleEl = document.getElementById('uc9-week-title');
  const bulletsEl = document.getElementById('uc9-week-bullets');

  if (weekNum === 16) {
    titleEl.textContent = 'Tuần 16: Tổng kết & Nghiệm thu';
    bulletsEl.innerHTML = `
      <li>Tối ưu hóa API Gateway ZaloPay Core đạt <strong class="text-emerald-400 font-mono">100,000 TPS</strong></li>
      <li>Hoàn thiện tài liệu kỹ thuật &amp; Báo cáo tổng kết đợt thực tập</li>
      <li>Báo cáo kết quả trước Hội đồng &amp; Mentor Doanh nghiệp</li>
    `;
  } else if (weekNum === 15) {
    titleEl.textContent = 'Tuần 15: Kiểm thử hiệu năng High-load';
    bulletsEl.innerHTML = `
      <li>Thực hiện Stress Test hệ thống thanh toán với kịch bản Peak Load</li>
      <li>Fix memory leak trên worker thread pool</li>
      <li>Báo cáo kết quả Benchmark ban đầu</li>
    `;
  } else if (weekNum === 14) {
    titleEl.textContent = 'Tuần 14: Xây dựng Redis Caching Layer';
    bulletsEl.innerHTML = `
      <li>Tích hợp Redis Cluster giảm 45% database query latency</li>
      <li>Viết Unit Test &amp; Integration Test cho cache invalidation</li>
    `;
  } else {
    titleEl.textContent = `Tuần ${weekNum}: Triển khai Module Core`;
    bulletsEl.innerHTML = `
      <li>Nghiên cứu kiến trúc Microservice ZaloPay</li>
      <li>Khởi tạo mã nguồn và cấu hình CI/CD Pipeline</li>
    `;
  }
}

async function submitUc9Assessment() {
  const st = (uc9Students && uc9Students[currentUc9Index]) ? uc9Students[currentUc9Index] : ApiClient.getMockStudents()[currentUc9Index];
  
  const req = {
    studentId: st.id,
    reportScore: parseFloat(document.getElementById('uc9-slider-c1').value),
    techScore: parseFloat(document.getElementById('uc9-slider-c2').value),
    oralScore: parseFloat(document.getElementById('uc9-slider-c3').value),
    teacherComment: document.getElementById('uc9-comment').value,
    isPublic: true,
    sendToDepartment: true
  };

  const response = await ApiClient.evaluateUc9(req);

  if (!response.success) {
    showToastNotification('Lỗi Đánh Giá', response.message, 'error');
    return;
  }

  document.getElementById('uc9-status-badge').textContent = 'Đã công bố điểm';
  showToastNotification('Công bố điểm thành công!', response.message, 'success');
}
