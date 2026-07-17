// Smooth scrolling for navigation links and close mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-brand');
    const navbarCollapse = document.querySelector('#navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    function closeMobileMenu() {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            // Use Bootstrap's collapse API to close the menu
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                // Create new instance if one doesn't exist
                const newCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                newCollapse.hide();
            }
            // Update aria-expanded on toggler button
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu immediately
                closeMobileMenu();
                
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Listen for Bootstrap collapse events to ensure menu closes
    if (navbarCollapse) {
        navbarCollapse.addEventListener('hidden.bs.collapse', function() {
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Navbar background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(0, 188, 212, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(0, 188, 212, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
// document.querySelectorAll(
//     'section, .project-card-large, .skill-category, .education-item, .achievement-item'
// ).forEach(el => {
//     el.style.opacity = '0';
//     el.style.transform = 'translateY(30px)';
//     el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//     observer.observe(el);
// });

document.querySelectorAll(
    '.project-card-large, .skill-category, .education-item, .achievement-item'
).forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(el);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Handle case when at the top
    if (window.scrollY < 100) {
        current = 'home';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === 'home' && href === '#home')) {
            link.classList.add('active');
        }
    });
}
// ===========================
// Project Image Gallery
// ===========================

let galleryImages = [];
let currentImageIndex = 0;

function openGallery(images, index) {
    galleryImages = images;
    currentImageIndex = index;

    const modal = document.getElementById("galleryModal");
    const image = document.getElementById("galleryImage");

    modal.style.display = "flex";

	setTimeout(() => {
		modal.classList.add("show");
	},10);
    image.src = galleryImages[currentImageIndex];
}

function changeImage(direction) {

    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    const image = document.getElementById("galleryImage");

    // Fade Out
    image.style.opacity = "0";
    image.style.transform = "scale(0.95)";

    setTimeout(() => {

        image.src = galleryImages[currentImageIndex];

        // Fade In
        image.style.opacity = "1";
        image.style.transform = "scale(1)";

    }, 180);
}
function closeGallery(){

    const modal = document.getElementById("galleryModal");

    modal.classList.remove("show");

    setTimeout(()=>{
        modal.style.display="none";
    },300);

}

// Close gallery when clicking outside image
window.addEventListener("click", function (e) {
    const modal = document.getElementById("galleryModal");

    if (e.target === modal) {
        closeGallery();
    }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
    const modal = document.getElementById("galleryModal");

    if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeGallery();
    }
});

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
