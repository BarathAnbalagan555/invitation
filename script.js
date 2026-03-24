/* ═══════════════════════════════════════════════════════════════
   BARATH ❤ ABIRAMI — Wedding Website Script
   ═══════════════════════════════════════════════════════════════ */

/* ── COUNTDOWN ───────────────────────────────────────────────── */
const WEDDING_DATE = new Date('2026-05-18T09:30:00');

function updateCountdown() {
  const now  = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    ['days','hours','minutes','seconds'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = String(days).padStart(2, '0');
  document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
  // document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  // document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── SCROLL REVEAL ───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── FLOATING HEARTS ─────────────────────────────────────────── */
const heartContainer = document.getElementById('heartsBg');
const heartSymbols   = ['❤', '♡', '❥'];

function spawnHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  const size  = 0.5 + Math.random() * 1.1;
  const left  = Math.random() * 100;
  const dur   = 12 + Math.random() * 16;
  const delay = Math.random() * 4;

  heart.style.cssText = `
    left: ${left}%;
    font-size: ${size}rem;
    animation-duration: ${dur}s;
    animation-delay: -${delay}s;
    color: hsl(${344 + Math.random() * 18}, ${36 + Math.random() * 28}%, ${58 + Math.random() * 18}%);
  `;
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), (dur + delay) * 1000);
}

for (let i = 0; i < 10; i++) spawnHeart();
setInterval(spawnHeart, 2200);

/* ── THEME TOGGLE ────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

themeToggle.addEventListener('click', () => {
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('weddingTheme', html.dataset.theme);
});

const savedTheme = localStorage.getItem('weddingTheme');
if (savedTheme) html.dataset.theme = savedTheme;

/* ── SAVE AS PDF / PRINT ─────────────────────────────────────── */
document.getElementById('downloadCard').addEventListener('click', () => {
  // Open the invitation card in a print-optimised new window
  const card = document.getElementById('invCard');

  const printWin = window.open('', '_blank', 'width=640,height=800');
  if (!printWin) {
    showToast('Please allow pop-ups and try again.');
    return;
  }

  printWin.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Barath ❤ Abirami — Wedding Invitation</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Cinzel:wght@400;500&family=Jost:wght@300;400&display=swap" rel="stylesheet"/>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      margin: 0; background: #fdf5ee;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; padding: 32px 20px;
      font-family: 'Jost', sans-serif;
    }
    .inv-card {
      background: linear-gradient(145deg, #fdf5ee 0%, #f8e9dc 50%, #fdf5ee 100%);
      border: 1px solid #d4b880;
      border-radius: 20px;
      max-width: 520px; width: 100%;
      position: relative;
      box-shadow: 0 16px 64px rgba(42,20,16,0.18);
    }
    .inv-card::before {
      content: ''; position: absolute; inset: 12px;
      border: 1px solid rgba(160,120,56,0.22); border-radius: 12px; pointer-events: none;
    }
    .inv-card-inner {
      padding: 52px 44px; text-align: center;
      display: flex; flex-direction: column; align-items: center; gap: 10px;
    }
    .inv-ornament-top, .inv-ornament-bottom { font-family:'Cinzel',serif; font-size:0.68rem; letter-spacing:0.2em; color:#a07838; opacity:0.65; }
    .inv-with-joy { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.3em; color:#a07838; text-transform:uppercase; }
    .inv-names { font-family:'Cormorant Garamond',serif; font-size:3.2rem; font-weight:300; color:#1e1410; line-height:1; display:flex; align-items:center; gap:12px; }
    .inv-names span { color:#b05c5c; font-size:0.78em; }
    .inv-together { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:0.92rem; color:#5a4238; }
    .inv-invite-text { font-family:'Jost',sans-serif; font-size:0.78rem; color:#9a8070; font-weight:300; }
    .inv-event-title { font-family:'Cinzel',serif; font-size:1.05rem; letter-spacing:0.2em; color:#8a3f3f; text-transform:uppercase; margin:3px 0; }
    .inv-details-row { display:flex; align-items:center; gap:20px; margin:10px 0; width:100%; justify-content:center; flex-wrap:wrap; }
    .inv-divider-v { width:1px; height:52px; background:linear-gradient(to bottom,transparent,#e0b0b0,transparent); }
    .inv-detail { display:flex; flex-direction:column; align-items:center; gap:2px; }
    .inv-d-label { font-family:'Cinzel',serif; font-size:0.52rem; letter-spacing:0.25em; color:#a07838; text-transform:uppercase; }
    .inv-d-value { font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:600; color:#1e1410; }
    .inv-d-sub { font-size:0.75rem; color:#7a6259; }
    .inv-parents-row { display:flex; gap:32px; justify-content:center; flex-wrap:wrap; padding:14px 0 6px; border-top:1px solid rgba(160,120,56,0.2); width:100%; }
    .inv-parent-group { display:flex; flex-direction:column; gap:3px; text-align:center; }
    .inv-p-title { font-family:'Cinzel',serif; font-size:0.52rem; letter-spacing:0.2em; color:#a07838; text-transform:uppercase; }
    .inv-parent-group span:last-child { font-size:0.8rem; color:#7a6259; }
    .print-tip { margin-top:20px; font-size:0.72rem; color:#9a8070; font-family:'Jost',sans-serif; text-align:center; }
    .print-tip strong { color:#b05c5c; }
    @media print { .print-tip { display:none; } body { padding:0; } }
  </style>
</head>
<body>
  ${card.outerHTML}
  <p class="print-tip">Press <strong>Ctrl+P</strong> (or ⌘P) → Select <strong>"Save as PDF"</strong> as the printer to download</p>
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => window.print(), 800);
    });
  <\/script>
</body>
</html>`);
  printWin.document.close();
  showToast('Print dialog opening — choose "Save as PDF" 📄');
});

/* ── SHARE CARD ──────────────────────────────────────────────── */
document.getElementById('shareCard').addEventListener('click', async () => {
  const shareData = {
    title: 'Barath ❤️ Abirami — Wedding Invitation',
    text:  '🌸 You are warmly invited to celebrate the wedding of\n\nBarath ❤️ Abirami\n\n📅 Monday, 18 May 2026\n⏰ 9:30 AM – 10:30 AM\n📍 Thiyagaraja Mahal, Thiruvaiyaru\n\nWe look forward to celebrating with you! 🎊',
    url:   window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch(e) {
      if (e.name !== 'AbortError') copyToClipboard(shareData.text + '\n\n' + shareData.url);
    }
  } else {
    copyToClipboard(shareData.text + '\n\n' + shareData.url);
  }
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Invitation details copied! 🎊');
  }).catch(() => {
    showToast('Share this link: ' + window.location.href);
  });
}

/* ── TOAST ───────────────────────────────────────────────────── */
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:32px; left:50%;
    transform:translateX(-50%) translateY(20px);
    background:linear-gradient(135deg,#8a3f3f,#b05c5c);
    color:#fff; padding:12px 28px; border-radius:60px;
    font-family:'Jost',sans-serif; font-size:0.86rem;
    z-index:9999; box-shadow:0 8px 28px rgba(138,63,63,0.38);
    opacity:0; transition:all 0.4s cubic-bezier(.16,1,.3,1);
    letter-spacing:0.04em; max-width:90vw; text-align:center;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ── SAVE THE DATE SCROLL ────────────────────────────────────── */
document.querySelector('.save-date-btn').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('wedding').scrollIntoView({ behavior: 'smooth' });
});

/* ── HERO PARALLAX ───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero     = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.16}px)`;
    hero.style.opacity   = 1 - scrolled / (window.innerHeight * 0.88);
  }
}, { passive: true });

/* ── GALLERY STAGGER ─────────────────────────────────────────── */
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.setProperty('--delay', `${i * 0.1}s`);
});

console.log('%c❤️ Barath & Abirami — 18 May 2026 | 9:30 AM – 10:30 AM ❤️',
  'color:#b05c5c;font-family:Georgia,serif;font-size:16px;font-style:italic;padding:8px;');
