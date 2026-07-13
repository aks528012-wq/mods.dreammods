// ===== THEME TOGGLE =====
function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    if (icon) icon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
    if (label) label.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
}

// ===== MOBILE SIDEBAR =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// ===== SEARCH =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('[data-search]');

        cards.forEach(card => {
            const text = card.getAttribute('data-search').toLowerCase();
            if (text.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7840465639151341"
     crossorigin="anonymous"></script>

    
// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7840465639151341"
     crossorigin="anonymous"></script>
<!-- top -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7840465639151341"
     data-ad-slot="4257316493"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
// ===== ANIMATE ON SCROLL =====
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.app-card, .featured-card, .info-card, .faq-item, .about-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== NAVBAR ACTIVE LINK =====
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSearch();
    initFAQ();
    initAnimations();
    setActiveNav();
});

