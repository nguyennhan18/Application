/* ==========================================================================
   SHARED JAVASCRIPT UTILITIES & MANAGERS (CS434 Project)
   ========================================================================== */

// Global Toast Manager
function showToast(title, message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
  
  let icon = 'task_alt';
  if (type === 'error') icon = 'error_outline';
  if (type === 'warning') icon = 'warning';
  if (type === 'info') icon = 'info';

  toast.innerHTML = `
    <span class="material-symbols-outlined">${icon}</span>
    <div>
      <div style="font-weight:700; font-size:0.95rem;">${title}</div>
      <div style="font-size:0.85rem; opacity:0.9;">${message}</div>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto dismiss
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Global Modal Manager
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Formatters
function formatDate(date) {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
