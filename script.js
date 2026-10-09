function initTheme(){var s=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',s);updateThemeIcon(s);}
function toggleTheme(){var c=document.documentElement.getAttribute('data-theme')||'light';var n=c==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',n);localStorage.setItem('theme',n);updateThemeIcon(n);}
function updateThemeIcon(t){var i=document.getElementById('themeIcon'),l=document.getElementById('themeLabel');if(i)i.textContent=t==='dark'?'dark_mode':'light_mode';if(l)l.textContent=t==='dark'?'Dark Mode':'Light Mode';}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('sidebarOverlay').classList.toggle('active');}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebarOverlay').classList.remove('active');}
function initFAQ(){document.querySelectorAll('.faq-item').forEach(function(item){var q=item.querySelector('.faq-question');if(!q)return;q.addEventListener('click',function(){var was=item.classList.contains('active');document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('active')});if(!was)item.classList.add('active');});});}
function setActiveNav(){var p=window.location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.sidebar-nav a').forEach(function(a){a.classList.remove('active');if(a.getAttribute('href')===p)a.classList.add('active');});}
document.addEventListener('DOMContentLoaded',function(){initTheme();initFAQ();setActiveNav();});
