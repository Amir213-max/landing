// العصر الصناعي - Main JavaScript with FormSubmit Integration
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const toastPopup = document.getElementById('toastPopup');
  const toastMessage = document.getElementById('toastMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const phone = document.getElementById('phoneInput').value.trim();
      const selectedType = document.querySelector('input[name="request_type"]:checked')?.value || 'عرض سعر';
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !phone) {
        showToast('برجاء ملء البيانات الأساسية (الاسم ورقم الهاتف)', true);
        return;
      }

      // Disable button & show loader text
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري إرسال الطلب...';

      try {
        // Send request directly to info@era-industrial.com via FormSubmit AJAX service
        const response = await fetch('https://formsubmit.co/ajax/info@era-industrial.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `طلب جديد (${selectedType}) - العصر الصناعي`,
            _template: 'table',
            "الاسم الكامل": name,
            "البريد الإلكتروني": email || 'غير محدد',
            "رقم الهاتف": phone,
            "نوع الطلب": selectedType,
            "ملاحظات والرسالة": message || 'لا يوجد'
          })
        });

        if (response.ok) {
          showToast('تم إرسال طلبك بنجاح وسيتواصل معك فريقنا في أقرب وقت!');
          contactForm.reset();
        } else {
          // If AJAX response is not ok, submit form natively
          contactForm.submit();
        }
      } catch (err) {
        console.log('Sending via standard form submit fallback...', err);
        // Fallback native submit
        contactForm.submit();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
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
    }, 5000);
  }
});
