// استخراج القيم من الـ URL
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // ملء البيانات تلقائيًا عند تحميل الصفحة
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("book-name").value = getQueryParam("name") || "Unknown Book";
            document.getElementById("book-price").value = getQueryParam("price") || "0.00 L.E.";
        });

        // إعداد EmailJS
        (function(){
            emailjs.init("h43f0gQjAVupGqnPd"); // استبدل YOUR_PUBLIC_KEY بالمفتاح الخاص بك من EmailJS
        })();

       // إرسال الطلب عند الضغط على "Confirm Order"
document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const serviceID = "service_2j2mr61"; // استبدل بـ Service ID الخاص بك
    const templateID = "template_lqjv3pg"; // استبدل بـ Template ID الخاص بك

    const formData = {
        book_name: document.getElementById("book-name").value,
        book_price: document.getElementById("book-price").value,
        customer_name: document.getElementById("customer-name").value,
        customer_phone: document.getElementById("customer-phone").value,
        customer_email: document.getElementById("customer-email").value
    };

    emailjs.send(serviceID, templateID, formData)
        .then(() => {
            document.getElementById("success-message").classList.remove("hidden");
            document.getElementById("order-form").reset();

            // بعد 3 ثواني يعمل ريديركت
            setTimeout(() => {
                window.location.href = "https://mymlibrary.vercel.app"; // استبدل بالصفحة اللي عايزهم يروحوا ليها
            }, 3000);
        })
        .catch(error => console.error("EmailJS Error:", error));
});
