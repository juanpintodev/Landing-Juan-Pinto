document.addEventListener('DOMContentLoaded', function() {
    

    const header = document.getElementById('header');
    const coursesSection = document.getElementById('courses');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const coursesSectionTop = coursesSection ? coursesSection.offsetTop : 0;
        const headerHeight = header.offsetHeight;
        
        //"The Most Popular"
        if (scrollY >= coursesSectionTop - headerHeight - 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.navbarToggle('show');
        });
    }
    else{
             const navItems = document.querySelectorAll('.navbar-nav .nav-link');
             navItems.forEach(item => {
                 item.addEventListener('click', function() {
                     navbarCollapse.classList.remove('show');
                 });
             });
            
        }
    
    
    const videoModal = document.getElementById('videoModal');
    const videoElement = document.querySelector('#videoModal video');
    
    if (videoModal) {
        const videoPreview = document.querySelector('[data-toggle="modal"]');
        if (videoPreview) {
            videoPreview.addEventListener('click', function() {
                const modal = new bootstrap.Modal(videoModal);
                modal.show();
            });
        }
        
        videoModal.addEventListener('hidden.bs.modal', function() {
            if (videoElement) {
                videoElement.pause();
                videoElement.currentTime = 0;
            }
        });
        
        videoModal.addEventListener('hide.bs.modal', function() {
            if (videoElement) {
                videoElement.pause();
            }
        });
    }
    
    const registrationForm = document.querySelector('.registration-form form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && phone && subject && message) {
                alert('¡Gracias por registrarte! Te contactaremos pronto.');
                this.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert('¡Gracias por suscribirte a nuestro newsletter!');
                this.reset();
            } else {
                alert('Por favor, ingresa tu email.');
            }
        });
    }
    
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
} 