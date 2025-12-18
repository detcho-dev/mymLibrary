document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Language switching
    const languageSwitcher = document.getElementById('language-switcher');
    let currentLang = 'en';
    
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Toggle visibility of language-specific elements
        document.querySelectorAll('.lang-en').forEach(el => {
            el.classList.toggle('hidden', lang !== 'en');
        });
        
        document.querySelectorAll('.lang-ar').forEach(el => {
            el.classList.toggle('hidden', lang !== 'ar');
        });
        
        // Update language switcher button
        if (lang === 'ar') {
            languageSwitcher.innerHTML = `<span>AR</span>`;
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        } else {
            languageSwitcher.innerHTML = `<span>EN</span>`;
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl');
        }
    }
    
    languageSwitcher.addEventListener('click', function() {
        switchLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
    
    // Form submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Get button reference
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="lang-en">Sending...</span><span class="lang-ar hidden">جاري الإرسال...</span>';
        
        // Prepare template parameters
        const templateParams = {
            name: name,
            email: email,
            message: message,
            request_type: "Contact Us"
        };
        
        // Send email using EmailJS
        emailjs.send("service_6ewqm85", "template_2w9x0ot", templateParams)
            .then(function(response) {
                // Show success message
                contactForm.innerHTML = `
                    <div class="text-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-sm">
                        <span class="lang-en">✅ Your message has been sent successfully! We will get back to you soon.</span>
                        <span class="lang-ar hidden">✅ تم إرسال رسالتك بنجاح! سوف نرد عليك قريباً.</span>
                    </div>
                `;
                
                // Update language elements after form submit
                if (currentLang === 'ar') {
                    document.querySelector('.lang-en').classList.add('hidden');
                    document.querySelector('.lang-ar').classList.remove('hidden');
                }
            }, function(error) {
                // Show error message
                contactForm.innerHTML += `
                    <div class="text-center p-4 mt-4 bg-red-100 border border-red-400 text-red-700 rounded-sm">
                        <span class="lang-en">❌ An error occurred while sending your message. Please try again later.</span>
                        <span class="lang-ar hidden">❌ حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة لاحقاً.</span>
                    </div>
                `;
                
                // Re-enable submit button
                contactForm.querySelector('button[type="submit"]').disabled = false;
                contactForm.querySelector('button[type="submit"]').innerHTML = originalText;
            });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
