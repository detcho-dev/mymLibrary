const body = document.body;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function updateIcons(mode) {
  if (mode === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentMode);
  updateIcons(currentMode);
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.classList.remove('light-mode', 'dark-mode');
  body.classList.add(savedTheme + '-mode');
  updateIcons(savedTheme);
});

function goToPurchasePage(bookName, bookPrice) {
    // تحويل المستخدم إلى صفحة الشراء مع تمرير البيانات في الرابط
    window.location.href = `/order?name=${encodeURIComponent(bookName)}&price=${encodeURIComponent(bookPrice)}`;
}

function goToPurchasePage1(bookName) {
    // تحويل المستخدم إلى صفحة الشراء مع تمرير البيانات في الرابط
    const encodedBookName = encodeURIComponent(bookName);
    window.location.href = `/order1?book=${encodedBookName}`;
  }

        
// المتغيرات الأساسية
const form = document.getElementById("contact-form");
const requestTypeSelect = document.getElementById("request-type");
let uploadedFileUrl = "";

// إنشاء Cloudinary Upload Widget
const cloudinaryWidget = cloudinary.createUploadWidget({
  cloudName: 'dh328ytl3',          // عوضها باسم حسابك في Cloudinary
  uploadPreset: 'MYM_Library',  // عوضها باسم Upload Preset اللي عملته (Unsigned)
  multiple: false,
  sources: ['local'],
  folder: 'MYM_Library_requests'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    uploadedFileUrl = result.info.secure_url;
    alert("File uploaded successfully!");
  }
});

// دالة لتحديث الفورم حسب اختيار المستخدم
function updateForm() {
  // إزالة زر رفع الملف إذا كان موجود
  const existingUploadBtn = document.getElementById("upload-widget-btn");
  if (existingUploadBtn) {
    existingUploadBtn.remove();
    uploadedFileUrl = "";
  }

  // إذا نوع الطلب 'book-request' نضيف زر رفع الملف
  if (requestTypeSelect.value === "book-request") {
    const uploadBtn = document.createElement("button");
    uploadBtn.type = "button";
    uploadBtn.id = "upload-widget-btn";
    uploadBtn.className = "btn-primary w-full mb-4";
    uploadBtn.textContent = "Upload Book File";
    uploadBtn.addEventListener("click", () => {
      cloudinaryWidget.open();
    });

    // نضيف الزر قبل زر الإرسال
    form.insertBefore(uploadBtn, form.querySelector("button[type='submit']"));
  }
}

// تفعيل تحديث الفورم عند تغيير اختيار المستخدم
requestTypeSelect.addEventListener("change", updateForm);

// تفعيل تحديث الفورم عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", updateForm);

// التعامل مع إرسال الفورم
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // لو نوع الطلب 'book-request' بدون رفع ملف، نمنع الإرسال
  if (requestTypeSelect.value === "book-request" && !uploadedFileUrl) {
    alert("Please upload the book file before submitting.");
    return;
  }

  // تحضير بيانات الإرسال
  const templateParams = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    request_type: requestTypeSelect.value === "contact-us" ? "Contact Us" : "Request Adding Book",
    file_url: uploadedFileUrl ? `<a href="${uploadedFileUrl}" target="_blank">${uploadedFileUrl}</a>` : "No file attached"
  };


  // إرسال البيانات لـ EmailJS
  emailjs.send("service_6ewqm85", "template_2w9x0ot", templateParams, "nnP-kvyjBP356LpcZ")
  .then(function(response) {
    form.innerHTML = `
      <div class="text-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-sm">
        ✅ Your message has been sent successfully! We will get back to you soon.
      </div>
    `;
  }, function(error) {
    form.innerHTML += `
      <div class="text-center p-4 mt-4 bg-red-100 border border-red-400 text-red-700 rounded-sm">
        ❌ An error occurred while sending your message. Please try again later.
      </div>
    `;
  });
});


const words = ["Books", "Stories", "Knowledge", "Games"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textElement = document.getElementById("typewriter");

    function type() {
      const current = words[wordIndex];
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      textElement.textContent = current.substring(0, charIndex);

      let delay = isDeleting ? 60 : Math.random() * (300 - 100) + 100;

      if (!isDeleting && charIndex === current.length) {
        delay = 1000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 600;
      }

      setTimeout(type, delay);
    }

    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(type, 800);
    });
