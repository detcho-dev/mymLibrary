function goToPurchasePage(bookName, bookPrice) {
    // تحويل المستخدم إلى صفحة الشراء مع تمرير البيانات في الرابط
    window.location.href = `order.html?name=${encodeURIComponent(bookName)}&price=${encodeURIComponent(bookPrice)}`;
}

function goToPurchasePage1(bookName) {
    // تحويل المستخدم إلى صفحة الشراء مع تمرير البيانات في الرابط
    const encodedBookName = encodeURIComponent(bookName);
    window.location.href = `order1.html?book=${encodedBookName}`;
  }

        
        document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة عند الإرسال

    // الحصول على القيم من الإدخال
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // إرسال البيانات عبر EmailJS
    emailjs.send("service_6ewqm85", "template_2w9x0ot", {
        name: name,  
        email: email,  
        message: message
    }, "nnP-kvyjBP356LpcZ")
    .then(function(response) {
        console.log("✅ Email sent successfully!", response);
        
        // عرض رسالة نجاح داخل الفورم بدلاً من alert
        const form = document.getElementById("contact-form");
        form.innerHTML = `
            <div class="text-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-sm">
                ✅ Your message has been sent successfully! We will get back to you soon.
            </div>
        `;
    }, function(error) {
        console.log("❌ Failed to send email:", error);

        // عرض رسالة خطأ داخل الفورم
        const form = document.getElementById("contact-form");
        form.innerHTML += `
            <div class="text-center p-4 mt-4 bg-red-100 border border-red-400 text-red-700 rounded-sm">
                ❌ An error occurred while sending your message. Please try again later.
            </div>
        `;
    });
});


const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function animateSwitch(fromIcon, toIcon) {
  fromIcon.classList.add('spin-out');
  toIcon.classList.remove('spin-out');
  toIcon.classList.add('spin-in');
  toIcon.style.display = 'block';

  setTimeout(() => {
    fromIcon.style.display = 'none';
    fromIcon.classList.remove('spin-out');
    toIcon.classList.remove('spin-in');
  }, 500);
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = body.classList.contains('dark-mode');
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  localStorage.setItem('theme', isDark ? 'light' : 'dark');

  if (isDark) {
    animateSwitch(sunIcon, moonIcon);
  } else {
    animateSwitch(moonIcon, sunIcon);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.classList.add(savedTheme + '-mode');
  if (savedTheme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
});


