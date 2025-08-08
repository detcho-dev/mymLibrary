// =========== Theme Handler ===========
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(darkMode) {
  document.body.classList.toggle('dark', darkMode);
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}
function updateThemeFromSystem() {
  applyTheme(darkModeMediaQuery.matches);
}
darkModeMediaQuery.addEventListener('change', updateThemeFromSystem);
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme === 'dark');
} else {
  updateThemeFromSystem();
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
    file_url: uploadedFileUrl ? <a href="${uploadedFileUrl}" target="_blank">${uploadedFileUrl}</a> : "No file attached"
  };


  // إرسال البيانات لـ EmailJS
  emailjs.send("service_6ewqm85", "template_2w9x0ot", templateParams, "nnP-kvyjBP356LpcZ")
  .then(function(response) {
    form.innerHTML = 
      <div class="text-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-sm">
        ✅ Your message has been sent successfully! We will get back to you soon.
      </div>
    ;
  }, function(error) {
    form.innerHTML += 
      <div class="text-center p-4 mt-4 bg-red-100 border border-red-400 text-red-700 rounded-sm">
        ❌ An error occurred while sending your message. Please try again later.
      </div>
    ;
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

// =========== Firebase Setup ===========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKOBUtjR7AE00VKibQdB7Sy6I6Aj_WMoo",
  authDomain: "mym-library.firebaseapp.com",
  projectId: "mym-library",
  storageBucket: "mym-library.appspot.com",
  messagingSenderId: "81380727019",
  appId: "1:81380727019:web:b622d1f038e8f9ee6de13b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========== Book Reads Handling ===========
async function incrementRead(bookId) {
  try {
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      reads: increment(1)
    });
    // Local count
    const current = parseInt(localStorage.getItem(`read_${bookId}`)) || 0;
    localStorage.setItem(`read_${bookId}`, current + 1);
  } catch (e) {
    console.error("Error incrementing read count:", e);
  }
}

window.markAsRead = async function(bookId) {
  await incrementRead(bookId);
  highlightMostReadBook();
};

async function highlightMostReadBook() {
  const booksSnapshot = await getDocs(collection(db, "books"));
  let maxReads = -1;
  let mostReadBookId = null;

  booksSnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.reads > maxReads) {
      maxReads = data.reads;
      mostReadBookId = docSnap.id;
    }
  });

  document.querySelectorAll('.book').forEach(book => {
    book.classList.remove('most-read');
  });
  const mostReadElem = document.querySelector(`[data-book-id="${mostReadBookId}"]`);
  if (mostReadElem) {
    mostReadElem.classList.add('most-read');
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".read-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const bookId = btn.dataset.bookId;
      await incrementRead(bookId);
      highlightMostReadBook();
    });
  });
  highlightMostReadBook();
});
