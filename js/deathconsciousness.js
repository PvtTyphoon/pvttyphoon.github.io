// Deathconsciousness Website JavaScript

// Album timeline data for carousel
const albumTimelineData = [
    {
        id: 1,
        title: 'The Beginning',
        description: '2002: Dan Barrett and Tim Macuga start recording in home studios with minimal gear, whatever equipment they can find. The foundation for a five-year journey begins.',
        image: 'images/have a nice life/073550af7afcdd23148f4dad5d46ca11.webp',
        tech: ['Home Studio', 'DIY Recording', 'Minimal Budget']
    },
    {
        id: 2,
        title: 'Building the Wall',
        description: '2003-2005: They develop their signature sound through extensive layering—dozens of layers per track, everything run through multiple generations of tape. Barrett uses his laptop\'s built-in mic.',
        image: 'images/have a nice life/1facf3bcb16a1640671d6757fa4d98c2.webp',
        tech: ['Tape Saturation', 'Multi-Layering', 'Lo-Fi Production']
    },
    {
        id: 3,
        title: 'The Ghost in the Machine',
        description: '2006: A mysterious sound appears in the mix. They genuinely think it might be a ghost for the longest time. Turns out it\'s just one of their friends making noise in the background.',
        image: 'images/have a nice life/2ffef355a49c26cc11dcf1bab3b1b95a.webp',
        tech: ['Field Recordings', 'Found Sounds', 'Happy Accidents']
    },
    {
        id: 4,
        title: 'The Breaking Point',
        description: '2007: While recording "Earthmover," Barrett gets so overwhelmed he drops his bass and walks out. The sound of the bass hitting the floor becomes the "bass solo" in the final mix.',
        image: 'images/have a nice life/34e1109848d2419fb22645d2e9ab16e4.webp',
        tech: ['Emotional Recording', 'Improvisation', 'Raw Moments']
    },
    {
        id: 5,
        title: 'The Lost Masters',
        description: '2008: Deathconsciousness releases as only 100 CD-R copies on Enemies List Home Recordings, complete with a 70-page booklet. Tragically, the original masters get lost.',
        image: 'images/have a nice life/661f3c1066324fa3bc02e6989c08dc6c.webp',
        tech: ['Limited Release', 'CD-R Format', 'Lost Masters']
    },
    {
        id: 6,
        title: 'Word Spreads',
        description: '2008-2010: Word spreads through 4chan\'s /mu/ board and Rate Your Music. Despite the limited release, a devoted cult following develops around its raw honesty.',
        image: 'images/have a nice life/8ef6af414897da3656f8fabfd8fc71a4.webp',
        tech: ['Online Communities', 'Word of Mouth', 'Cult Status']
    },
    {
        id: 7,
        title: 'Underground Classic',
        description: '2010-Present: Deathconsciousness becomes recognized as a landmark album. Its influence echoes through blackgaze, dark ambient, and other heavy emotional genres.',
        image: 'images/have a nice life/91d8e7c7ff754797bf24190cbe6cc2d0.webp',
        tech: ['Musical Influence', 'Underground Classic', 'Lasting Impact']
    }
];

// Musical elements data
const musicalElementsData = [
    { name: 'Wall of Sound', icon: '🌊', level: 98, category: 'frontend' },
    { name: 'Distortion', icon: '⚡', level: 95, category: 'frontend' },
    { name: 'Reverb', icon: '🌫️', level: 92, category: 'frontend' },
    { name: 'Dark Ambience', icon: '🌑', level: 94, category: 'cloud' },
    { name: 'Drone', icon: '🌀', level: 88, category: 'cloud' },
    { name: 'Bass Lines', icon: '🎸', level: 90, category: 'backend' },
    { name: 'Drum Programming', icon: '🥁', level: 85, category: 'backend' },
    { name: 'Field Recordings', icon: '📼', level: 87, category: 'backend' },
    { name: 'Noise Collage', icon: '📻', level: 82, category: 'emerging' },
    { name: 'Tape Saturation', icon: '📟', level: 91, category: 'emerging' },
    { name: 'Layered Vocals', icon: '🎤', level: 89, category: 'frontend' },
    { name: 'Dynamic Range', icon: '📊', level: 93, category: 'backend' }
];

// Navigate to page function (for separate pages)
function navigateToPage(page) {
    window.location.href = page;
}

// Initialize particles for philosophy section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Start particles at random vertical positions throughout the section
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay for natural movement
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration for variety
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;
    
    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-image">
                <img src="${data.image}" alt="${data.title}">
            </div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
        </div>
    `;
    
    return item;
}

function initCarousel() {
    // Create carousel items
    albumTimelineData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    items.forEach((item, index) => {
        // Calculate relative position
        let offset = index - currentIndex;
        
        // Wrap around for continuous rotation
        if (offset > totalItems / 2) {
            offset -= totalItems;
        } else if (offset < -totalItems / 2) {
            offset += totalItems;
        }
        
        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;
        
        // Reset transform
        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
        
        // Adjust spacing based on screen size
        let spacing1 = 400;
        let spacing2 = 600;
        let spacing3 = 750;
        
        if (isMobile) {
            spacing1 = 280;
            spacing2 = 420;
            spacing3 = 550;
        } else if (isTablet) {
            spacing1 = 340;
            spacing2 = 520;
            spacing3 = 650;
        }
        
        if (absOffset === 0) {
            // Center item
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            // Side items
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            // Further side items
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            // Even further items
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            // Hidden items (behind)
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % albumTimelineData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + albumTimelineData.length) % albumTimelineData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Initialize hexagonal skills grid
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';
        
        const filteredSkills = category === 'all' 
            ? musicalElementsData 
            : musicalElementsData.filter(skill => skill.category === category);
        
        filteredSkills.forEach((skill, index) => {
            const hexagon = document.createElement('div');
            hexagon.className = 'skill-hexagon';
            hexagon.style.animationDelay = `${index * 0.1}s`;
            
            hexagon.innerHTML = `
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level">
                            <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                        </div>
                        <div class="skill-percentage-hex">${skill.level}%</div>
                    </div>
                </div>
            `;
            
            skillsGrid.appendChild(hexagon);
        });
    }
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });
    
    displaySkills();
}

// Event listeners - only if elements exist
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}
if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Auto-rotate carousel - only if carousel exists
if (carousel && indicatorsContainer) {
    setInterval(nextSlide, 5000);
}

// Keyboard navigation - only if carousel exists
if (carousel && indicatorsContainer) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Update carousel on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 250);
});

// Initialize on load - only run if elements exist
if (carousel && indicatorsContainer) {
    initCarousel();
}

const skillsGrid = document.getElementById('skillsGrid');
if (skillsGrid) {
    initSkillsGrid();
}

const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    initParticles();
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Update active navigation based on current page
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if this link matches current page
        if (currentPage === 'index.html' && (href === 'index.html' || href === 'home.html' || href === '#home')) {
            link.classList.add('active');
        } else if (currentPage === 'about.html' && (href === 'about.html' || href === '#about')) {
            link.classList.add('active');
        }
    });
}

// Update active nav on page load
updateActiveNav();

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (navMenu && menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Form submission - only if form exists
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert(`Thank you ${data.name}! Your message has been transmitted successfully. We'll respond within 24 hours.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Background Music Control
const backgroundAudio = document.getElementById('backgroundAudio');
const musicToggle = document.getElementById('musicToggle');

if (backgroundAudio && musicToggle) {
    // Set volume to 50%
    backgroundAudio.volume = 0.5;
    
    // Try to play on page load (may require user interaction)
    const playPromise = backgroundAudio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay was prevented, user will need to interact first
            console.log('Autoplay prevented:', error);
            musicToggle.classList.add('paused');
        });
    }
    
    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play().catch(error => {
                console.log('Play failed:', error);
            });
            musicToggle.classList.remove('paused');
        } else {
            backgroundAudio.pause();
            musicToggle.classList.add('paused');
        }
    });
    
    // Update button state based on audio state
    backgroundAudio.addEventListener('play', () => {
        musicToggle.classList.remove('paused');
    });
    
    backgroundAudio.addEventListener('pause', () => {
        musicToggle.classList.add('paused');
    });
}
