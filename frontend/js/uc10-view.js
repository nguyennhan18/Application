/* ==========================================================================
   UC10 FRONTEND VIEW CONTROLLER (Doanh nghiệp đánh giá)
   ========================================================================== */

let uc10Students = [];
let currentUc10Index = 0;
let selectedHiringOption = 0;
let isEarlyEvalConfirmed = false;

async function initUc10View() {
  uc10Students = await ApiClient.getStudents();
  renderUc10Student(0);

  const commentBox = document.getElementById('uc10-comment');
  if (commentBox) {
    commentBox.addEventListener('input', updateUc10CharCount);
  }
}

function renderUc10Student(index) {
  currentUc10Index = index;
  const st = uc10Students[index] || ApiClient.getMockStudents()[index];

  // Highlight active Scenario Button
  [0, 1, 2].forEach(i => {
    const btn = document.getElementById(`uc10-scen-${i + 1}`);
    if (btn) {
      if (i === index) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  // Handle Exception A2 Modal
  if (!st.isDurationEligible && !isEarlyEvalConfirmed) {
    openModalOverlay('modal-uc10-a2');
  }

  // Populate Dossier
  document.getElementById('uc10-name').textContent = st.name;
  document.getElementById('uc10-mssv').textContent = `MSSV: ${st.mssv}`;
  document.getElementById('uc10-role').textContent = st.role;
  document.getElementById('uc10-avatar').src = st.avatar;
  document.getElementById('uc10-status-badge').textContent = st.uc10Status;

  const commentBox = document.getElementById('uc10-comment');
  if (commentBox) {
    commentBox.value = st.id === 3 ? 'Thư thiết kế UI/UX xuất sắc. Đã đóng góp xây dựng thành công 40+ components cho thư viện Design System của FPT Software.' : 'Em Hoàng hòa nhập rất nhanh vào văn hóa dự án tại FPT Software. Về mặt kỹ thuật, Hoàng nắm rất vững nền tảng React và tư duy Component logic. Em đã giải quyết tốt mô đun Billing Analytics vượt tiến độ.';
    updateUc10CharCount();
  }
}

function updateUc10CharCount() {
  const commentBox = document.getElementById('uc10-comment');
  const counter = document.getElementById('uc10-char-counter');
  if (!commentBox || !counter) return;

  const count = commentBox.value.trim().length;
  counter.textContent = `${count}/100 ký tự (Min 100)`;
  counter.style.color = count < 100 ? 'var(--rose)' : 'var(--teal)';
}

function selectTechSkillPill(btn, level) {
  const parent = btn.parentElement;
  if (!parent) return;
  parent.querySelectorAll('.pill-badge').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectHiringCard(card, optionIndex) {
  selectedHiringOption = optionIndex;
  document.querySelectorAll('.recommend-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

function confirmEarlyEval() {
  isEarlyEvalConfirmed = true;
  closeModalOverlay('modal-uc10-a2');
  showToastNotification('Đã xác nhận', 'Đã mở khóa đánh giá sớm cho thực tập sinh (Ngoại lệ A2).', 'info');
}

function cancelEarlyEval() {
  isEarlyEvalConfirmed = false;
  closeModalOverlay('modal-uc10-a2');
  renderUc10Student(0); // Fallback to normal flow
}

async function submitUc10Evaluation() {
  const st = uc10Students[currentUc10Index] || ApiClient.getMockStudents()[currentUc10Index];
  
  const req = {
    studentId: st.id,
    attitudeStars: [5, 5, 4],
    techSkillLevels: [4, 3, 3],
    mentorComment: document.getElementById('uc10-comment').value,
    hiringRecommendationOption: selectedHiringOption,
    isEarlyEvaluationConfirmed: isEarlyEvalConfirmed
  };

  const response = await ApiClient.evaluateUc10(req);

  if (!response.success) {
    showToastNotification('Lỗi Phê Duyệt', response.message, 'error');
    return;
  }

  // Update FPT e-Sign Stamp Animation
  document.getElementById('uc10-timestamp').textContent = response.signatureTimestamp;
  document.getElementById('uc10-hash').textContent = response.sha256Hash;
  
  const stamp = document.getElementById('uc10-digital-seal');
  if (stamp) {
    stamp.classList.remove('animate-seal');
    void stamp.offsetWidth;
    stamp.classList.add('animate-seal');
  }

  document.getElementById('uc10-status-badge').textContent = 'Doanh nghiệp đã đánh giá';
  showToastNotification('Ký gửi thành công!', response.message, 'success');
}
