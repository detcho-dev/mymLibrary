const body = document.body;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function updateIcons(mode) {
  if (mode === 'dark') {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
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

    function openChatBot() {
    if (window.innerWidth < 768) {
      document.getElementById("chat-bot-full").classList.remove("hidden");
    } else {
      const container = document.getElementById("chat-bot-container");
      container.classList.toggle("hidden");
    }
  }

  function closeChatBot() {
    document.getElementById("chat-bot-full").classList.add("hidden");
  }

// ================= Firebase Config =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlOVx-YSmPFeq3lp-gAGe576yG1RhMLYs",
  authDomain: "mymlibraryreads.firebaseapp.com",
  projectId: "mymlibraryreads",
  storageBucket: "mymlibraryreads.firebasestorage.app",
  messagingSenderId: "11947740896",
  appId: "1:11947740896:web:87482eb72210acdba50a85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= Local Storage Functions =================
function getReadBooks() {
  return JSON.parse(localStorage.getItem("readBooks") || "[]");
}

function setReadBooks(books) {
  localStorage.setItem("readBooks", JSON.stringify(books));
}

function updateReadCounterUI() {
  const counterEl = document.getElementById("read-count");
  if (counterEl) {
    const count = getReadBooks().length || 0; // يتأكد انها 0 لو مفيش حاجة
    counterEl.textContent = count;
  }
}


// ================= Mark Book as Read =================
async function markAsRead(bookId) {
  let readBooks = getReadBooks();

  // لو الكتاب لسه ما اتقرأش
  if (!readBooks.includes(bookId)) {
    // 1. أضفه للـ localStorage
    readBooks.push(bookId);
    setReadBooks(readBooks);
    updateReadCounterUI();

    // 2. زوّد في Firestore
    try {
      const bookRef = doc(db, "Books", bookId);
      await updateDoc(bookRef, {
        Reads: increment(1)
      });
      console.log(`Book ${bookId} read count updated.`);
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  } else {
    console.log(`Book ${bookId} already read before.`);
  }
}

// ================= Event Binding =================
document.addEventListener("DOMContentLoaded", () => {
  updateReadCounterUI();

  document.querySelectorAll(".read-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const bookId = btn.dataset.bookId;
      if (bookId) {
        markAsRead(bookId);
      }
    });
  });
});
