// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navList = document.querySelector('nav ul');

function closeMenu() {
    navList.classList.remove('active');
    mobileMenu.classList.remove('menu-active');
    document.body.style.overflow = 'auto';
}

function openMenu() {
    navList.classList.add('active');
    mobileMenu.classList.add('menu-active');
    document.body.style.overflow = 'hidden';
}

mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navList.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navList.classList.contains('active') && !e.target.closest('nav ul')) {
        closeMenu();
    }
});

// Prevent clicks inside the menu from closing it
navList.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation highlighting
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Reveal elements on scroll
const revealElements = () => {
    const elements = document.querySelectorAll('.skill-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('load', () => {
    revealElements();
    
    // Initial active state for navigation
    const currentSection = document.querySelector('section');
    if (currentSection) {
        const id = currentSection.getAttribute('id');
        document.querySelector(`nav ul li a[href="#${id}"]`)?.classList.add('active');
    }
});