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
    
    const navLinks = document.querySelectorAll('a[href^="#"]:not([data-toggle]):not([data-target]):not([data-slide])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || targetId.length < 2) {
                return;
            }
            const targetSection = document.querySelector(targetId);
            if (!targetSection) {
                return;
            }
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {

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
    
    const reviewsCarousel = document.getElementById('carouselReviewsInline');
    if (reviewsCarousel) {
        // Play on click overlay or poster
        reviewsCarousel.querySelectorAll('.video-wrapper').forEach(wrapper => {
            const overlay = wrapper.querySelector('.video-play-overlay');
            const poster = wrapper.querySelector('.video-poster');
            const video = wrapper.querySelector('video');
            const icon = wrapper.querySelector('.play-icon');

            const hideOverlay = () => {
                if (poster) poster.style.display = 'none';
                if (overlay) overlay.style.display = 'none';
                wrapper.classList.add('playing');
            };

            const startPlayback = (e) => {
                if (e && typeof e.preventDefault === 'function') e.preventDefault();
                if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
                hideOverlay();
                if (video) {
                    video.controls = true;
                    video.setAttribute('controls', 'controls');
                    try { video.play(); } catch (err) {}
                    try { video.focus(); } catch (err) {}
                }
            };

            if (overlay) overlay.addEventListener('click', startPlayback);
            if (poster) poster.addEventListener('click', startPlayback);
            if (icon) icon.addEventListener('click', startPlayback);
            // Como refuerzo, permitir clic en cualquier parte del wrapper si aún no está reproduciendo
            wrapper.addEventListener('click', (e) => {
                if (!wrapper.classList.contains('playing')) startPlayback(e);
            });

            if (video) {
                video.addEventListener('play', hideOverlay);
                video.addEventListener('ended', () => {
                    // Restaurar estado al terminar
                    wrapper.classList.remove('playing');
                    if (overlay) overlay.style.display = '';
                    if (poster) poster.style.display = '';
                    try { video.pause(); video.currentTime = 0; } catch (err) {}
                    video.controls = false;
                    video.removeAttribute('controls');
                });
            }
        });

        // Pause all videos and restore overlays on slide change
        reviewsCarousel.addEventListener('slide.bs.carousel', function() {
            const wrappers = reviewsCarousel.querySelectorAll('.video-wrapper');
            wrappers.forEach(wrapper => {
                const video = wrapper.querySelector('video');
                const overlay = wrapper.querySelector('.video-play-overlay');
                const poster = wrapper.querySelector('.video-poster');
                if (video) {
                    try { video.pause(); video.currentTime = 0; } catch (e) {}
                    video.controls = false;
                    video.removeAttribute('controls');
                }
                if (overlay) overlay.style.display = '';
                if (poster) poster.style.display = '';
                wrapper.classList.remove('playing');
            });
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