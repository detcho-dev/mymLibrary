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
    window.location.href = `order.html?name=${encodeURIComponent(bookName)}&price=${encodeURIComponent(bookPrice)}`;
}

function goToPurchasePage1(bookName) {
    // تحويل المستخدم إلى صفحة الشراء مع تمرير البيانات في الرابط
    const encodedBookName = encodeURIComponent(bookName);
    window.location.href = `order1.html?book=${encodedBookName}`;
  }

        
        // ----------------------------------------------
// 1. تعريف المتغيرات الأساسية من DOM
// ----------------------------------------------
const form = document.getElementById("contact-form");       // الفورم
const requestType = document.getElementById("request-type"); // select لاختيار نوع الطلب
let uploadedFileUrl = "";  // لتخزين رابط الملف بعد رفعه

// ----------------------------------------------
// 2. إعداد Cloudinary Upload Widget
// ----------------------------------------------
const myWidget = cloudinary.createUploadWidget({
  cloudName: 'dh328ytl3',          // غيرها باسم حسابك في Cloudinary
  uploadPreset: 'MYM_Library',       // الـ upload preset اللي عملته unsigned
  multiple: false,
  sources: ['local', 'url', 'camera'],
  folder: 'meem_library_uploads'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    console.log('File Uploaded Sucessfully');
    uploadedFileUrl = result.info.secure_url;
    alert("File Uploaded Sucessfully");
  }
});

// ----------------------------------------------
// 3. دالة لتحديث محتوى الفورم بناءً على اختيار نوع الطلب
// ----------------------------------------------
function updateFormContent() {
  // أولاً نحذف زر رفع الملف لو موجود (لتجنب تكرار الزر)
  const existingUploadBtn = document.getElementById("upload-widget-btn");
  if (existingUploadBtn) {
    existingUploadBtn.remove();
    uploadedFileUrl = "";  // نفضي الرابط عند تغيير النوع
  }

  // لو اخترنا "طلب إضافة كتاب"
  if (requestType.value === "book-request") {
    // نضيف زر رفع ملف قبل زر الإرسال مباشرة
    const uploadBtn = document.createElement("button");
    uploadBtn.type = "button";
    uploadBtn.id = "upload-widget-btn";
    uploadBtn.className = "btn-primary w-full mb-4";
    uploadBtn.textContent = "Upload Book File";
    uploadBtn.addEventListener("click", () => {
      myWidget.open();
    });

    form.insertBefore(uploadBtn, form.querySelector("button[type='submit']"));
  }
}

// ----------------------------------------------
// 4. استدعاء الدالة فور تغيير اختيار الـ<select>
// ----------------------------------------------
requestType.addEventListener("change", updateFormContent);

// ----------------------------------------------
// 5. التأكد من تحديث الفورم عند تحميل الصفحة
// ----------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  updateFormContent();
});

// ----------------------------------------------
// 6. التعامل مع إرسال الفورم
// ----------------------------------------------
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // لو نوع الطلب "طلب إضافة كتاب" نتأكد من رفع الملف
  if (requestType.value === "book-request" && !uploadedFileUrl) {
    alert("يرجى رفع ملف الكتاب أولاً قبل الإرسال.");
    return;
  }

  // إعداد بيانات الإرسال مع رابط الملف (لو موجود)
  const templateParams = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    file_url: uploadedFileUrl || "No File Uploaded"
  };

  emailjs.send("service_6ewqm85", "template_2w9x0ot", templateParams, "nnP-kvyjBP356LpcZ")
    .then(function(response) {
      console.log("✅ Email sent successfully!", response);
      form.innerHTML = `
        <div class="text-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-sm">
          ✅ Your message has been sent successfully! We will get back to you soon.
        </div>
      `;
    }, function(error) {
      console.log("❌ Failed to send email:", error);
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
