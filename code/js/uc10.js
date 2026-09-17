/* ==========================================================================
   UC10 BUSINESS LOGIC & SCENARIOS (Doanh nghiệp đánh giá)
   ========================================================================== */

const internsData = [
  {
    id: 0,
    name: 'Nguyễn Văn Hoàng',
    mssv: 'MSSV: 20216012',
    role: 'AI & Cloud Solutions Intern',
    project: 'Customer Portal Web',
    period: '01/07/2024 - 15/10/2024',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8EPITGbJQuB4ZXUW7P-5XzSw-I079b2CbfFVgm4HAAimcwCQW5YoFc05nd9BYSgC5sznuTNVy9dnm8oNXDpsM2NjUdatVwOiCGfydUIJ8n9KU-O1bsstSylIWX4bJnzxeFLM7RDgQBn3fI8Ld_2OfQtuwhLCa-RwFIDihjRUKBi_qaTd-HY1E8gllry6lDTDzGEkDN3xfwS88mcNBaLZnzMZIUC5D9UDk4cXPKtLqiON3jDn9yU3f',
    status: 'Đang thực tập (Đủ điều kiện)',
    statusClass: 'rank-excellent',
    isEligible: true,
    finalScore: '9.2',
    rank: 'Top 5% Thực tập sinh',
    converted: 'Quy đổi: 3.68/4.0',
    comment: "Em Hoàng hòa nhập rất nhanh vào văn hóa dự án tại FPT Software. Về mặt kỹ thuật, Hoàng nắm rất vững nền tảng React và tư duy Component logic. Em đã giải quyết tốt mô đun 'Customer Billing Analytics' vượt tiến độ 1 tuần mà không phát sinh critical bug. Điểm cần phát huy thêm là tiếp tục đào sâu các pattern kiến trúc Cloud microservices và tự tin hơn khi trình bày demo trước khách hàng quốc tế. Xứng đáng là nhân tố tiềm năng cho vị trí Junior Developer.",
    hiringRec: 0
  },
  {
    id: 1,
    name: 'Phạm Quốc Bảo',
    mssv: 'MSSV: 20214432',
    role: 'DevOps & CI/CD Intern',
    project: 'Cloud Infra Automation',
    period: '01/08/2024 - 15/11/2024 (Tuần 6/12)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Chưa đủ thời gian tối thiểu',
    statusClass: 'rank-fail',
    isEligible: false,
    finalScore: '7.5',
    rank: 'Khá / Đang rèn luyện',
    converted: 'Quy đổi: 3.0/4.0',
    comment: 'Sinh viên Bảo có kỹ năng hệ thống Linux tốt, tuy nhiên thời gian thực tập hiện mới đạt 6 tuần (chưa đạt mốc đánh giá chính thức).',
    hiringRec: 1
  },
  {
    id: 2,
    name: 'Trần Anh Thư',
    mssv: 'MSSV: 20217721',
    role: 'UI/UX & Product Design Intern',
    project: 'Enterprise Design System',
    period: '01/06/2024 - 15/09/2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Doanh nghiệp đã đánh giá',
    statusClass: 'rank-excellent',
    isEligible: true,
    finalScore: '9.6',
    rank: 'Xuất sắc / Top 1%',
    converted: 'Quy đổi: 3.84/4.0',
    comment: 'Thư thiết kế UI/UX xuất sắc. Đã đóng góp xây dựng thành công 40+ components cho thư viện Design System của FPT Software.',
    hiringRec: 0
  }
];

let currentInternIndex = 0;
let selectedHiringRec = 0;

document.addEventListener('DOMContentLoaded', () => {
  initUC10Events();
  switchIntern(0);
});

function initUC10Events() {
  const mentorComment = document.getElementById('mentor-comment');
  if (mentorComment) {
    mentorComment.addEventListener('input', updateCharCount);
  }
}

function switchIntern(index) {
  currentInternIndex = index;
  const it = internsData[index];

  // Highlight active Scenario Button
  [0, 1, 2].forEach(i => {
    const btn = document.getElementById(`btn-scenario-${i + 1}`);
    if (btn) {
      if (i === index) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  // Handle Exception A2 Warning Modal
  if (!it.isEligible) {
    openModal('modal-exception-a2');
  }

  // Update Intern Dossier
  document.getElementById('intern-name').textContent = it.name;
  document.getElementById('intern-mssv').textContent = it.mssv;
  document.getElementById('intern-role').textContent = it.role;
  document.getElementById('intern-project').textContent = it.project;
  document.getElementById('intern-period').textContent = it.period;
  document.getElementById('intern-avatar').src = it.avatar;

  const badge = document.getElementById('intern-status-badge');
  badge.textContent = it.status;
  badge.className = `rank-badge ${it.statusClass}`;

  document.getElementById('dn-final-score').textContent = it.finalScore;
  document.getElementById('dn-rank-badge').textContent = it.rank;
  document.getElementById('dn-converted-score').textContent = it.converted;

  const commentBox = document.getElementById('mentor-comment');
  if (commentBox) {
    commentBox.value = it.comment;
    updateCharCount();
  }

  selectRecOption(it.hiringRec);
}

function cancelEarlyEvaluation() {
  closeModal('modal-exception-a2');
  switchIntern(0);
}

function confirmEarlyEvaluation() {
  closeModal('modal-exception-a2');
  showToast('Đã mở khóa đánh giá sớm', 'Bạn đã mở khóa phiếu đánh giá sớm cho SV Phạm Quốc Bảo (Ngoại lệ A2).', 'info');
}

function updateCharCount() {
  const commentBox = document.getElementById('mentor-comment');
  const counter = document.getElementById('char-counter');
  if (!commentBox || !counter) return;

  const count = commentBox.value.trim().length;
  counter.innerHTML = `Đã ghi: <strong class="${count < 100 ? 'text-error' : 'text-success'}">${count}</strong>/100 ký tự`;
  counter.className = `char-count-badge ${count < 100 ? 'invalid' : 'valid'}`;
}

function selectTechPill(btn, groupNum, level) {
  const group = document.getElementById(`tech-group-${groupNum}`);
  if (!group) return;

  const buttons = group.querySelectorAll('.tech-pill');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectRecOption(index) {
  selectedHiringRec = index;
  [0, 1, 2].forEach(i => {
    const card = document.getElementById(`opt-card-${i}`);
    if (card) {
      const radio = card.querySelector('input[type="radio"]');
      if (i === index) {
        card.classList.add('selected');
        if (radio) radio.checked = true;
      } else {
        card.classList.remove('selected');
        if (radio) radio.checked = false;
      }
    }
  });
}

function insertTag(tagText) {
  const textarea = document.getElementById('mentor-comment');
  if (!textarea) return;
  const currentText = textarea.value.trim();
  if (!currentText.includes(tagText)) {
    textarea.value = currentText ? currentText + ' ' + tagText : tagText;
    updateCharCount();
  }
}

function submitEnterpriseEvaluation() {
  const commentBox = document.getElementById('mentor-comment');
  const commentText = commentBox.value.trim();

  // Validation A1
  if (commentText.length < 100) {
    commentBox.style.borderColor = 'var(--error)';
    showToast('Lỗi Dữ Liệu (A1)', 'Nhận xét chi tiết của Mentor phải đạt tối thiểu 100 ký tự.', 'error');
    return;
  }
  commentBox.style.borderColor = 'var(--border)';

  const it = internsData[currentInternIndex];
  it.status = 'Doanh nghiệp đã đánh giá';
  it.statusClass = 'rank-excellent';
  it.comment = commentText;

  const now = new Date();
  const timeStr = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN')} GMT+7`;
  const randomHash = 'e4b2a8' + Math.random().toString(36).substring(2, 8) + 'f9c0';

  document.getElementById('sign-timestamp').textContent = timeStr;
  document.getElementById('sign-hash').textContent = randomHash;

  const stamp = document.getElementById('digital-stamp-badge');
  if (stamp) {
    stamp.classList.remove('digital-seal-stamp');
    void stamp.offsetWidth; // trigger reflow
    stamp.classList.add('digital-seal-stamp');
  }

  document.getElementById('intern-status-badge').textContent = 'Doanh nghiệp đã đánh giá';
  document.getElementById('intern-status-badge').className = 'rank-badge rank-excellent';

  showToast('Phê duyệt & Ký gửi thành công!', `Biên bản đánh giá của SV ${it.name} đã được ký số FPT e-Sign và gửi tới Nhà trường.`, 'success');
}

function saveDraft() {
  showToast('Lưu bản nháp thành công', 'Phiếu đánh giá đã được tự động sao lưu.', 'info');
}

function openPdfModal() {
  const it = internsData[currentInternIndex];
  document.getElementById('pdf-intern-name').textContent = it.name;
  document.getElementById('pdf-intern-mssv').textContent = it.mssv.replace('MSSV: ', '');
  document.getElementById('pdf-intern-role').textContent = it.role;

  document.getElementById('pdf-score-num').textContent = `${document.getElementById('dn-final-score').textContent} / 10.0`;
  document.getElementById('pdf-rank-str').textContent = document.getElementById('dn-rank-badge').textContent;

  const recTitles = [
    'Ký hợp đồng chính thức (Junior/Fresher)',
    'Gia hạn thực tập có hưởng lương',
    'Hoàn thành kỳ thực tập'
  ];
  document.getElementById('pdf-rec-str').textContent = recTitles[selectedHiringRec];

  document.getElementById('pdf-mentor-comment').textContent = document.getElementById('mentor-comment').value;

  openModal('pdf-modal');
}
