// العصر الصناعي - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const toastPopup = document.getElementById('toastPopup');
  const toastMessage = document.getElementById('toastMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const phone = document.getElementById('phoneInput').value.trim();
      const selectedType = document.querySelector('input[name="request_type"]:checked')?.value || 'استفسار عام';

      if (!name || !phone) {
        showToast('برجاء ملء البيانات الأساسية (الاسم ورقم الهاتف)', true);
        return;
      }

      // Show success toast
      showToast('تم إرسال طلبك بنجاح! سيتواصل معك فريقنا في أقرب وقت لرفع المقاسات.');

      // Reset form fields
      contactForm.reset();
    });
  }

  function showToast(msg, isError = false) {
    if (!toastPopup) return;

    toastMessage.textContent = msg;
    if (isError) {
      toastPopup.style.backgroundColor = '#DC2626';
    } else {
      toastPopup.style.backgroundColor = '#0B1E48';
    }

    toastPopup.classList.add('show');

    setTimeout(() => {
      toastPopup.classList.remove('show');
    }, 4500);
  }
});
