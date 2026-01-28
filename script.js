// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Staggered reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatableElements = document.querySelectorAll('.project-card, .section-title, #about p, #contact p');

animatableElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
});

// Modal Logic
const modal = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const projectCards = document.querySelectorAll('.project-card');

// Modal Elements
const modalImage = modal.querySelector('.modal-image img');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');
const modalTags = modal.querySelector('.modal-tags');

function openModal(card) {
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    const image = card.getAttribute('data-image');
    const tags = card.getAttribute('data-tags').split(',');

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImage.src = image;

    // Clear existing tags
    modalTags.innerHTML = '';
    tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag.trim();
        modalTags.appendChild(span);
    });

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

projectCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
});

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Skills Tab Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding tab pane
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});
