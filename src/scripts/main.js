/**
 * NEOLATOR — Landing Page Interactions & Motion Controller
 * High-performance, vanilla JavaScript logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initMobileDrawer();
  initCrtToggle();
  initVideoSoundToggles();
  initDeviceTilt();
  initControllerSandbox();
  initScreenshotCarousel();
  initFaqAccordion();
  initCoinEasterEgg();
  initScrollReveals();
});

/* --------------------------------------------------------------------------
   1. STICKY NAVIGATION
   -------------------------------------------------------------------------- */
function initStickyNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when clicking nav links
  drawer.querySelectorAll('.nav-link, .btn').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   3. CRT SCANLINE TOGGLE
   -------------------------------------------------------------------------- */
function initCrtToggle() {
  const crtBtn = document.getElementById('crtToggleBtn');
  if (!crtBtn) return;

  const savedState = localStorage.getItem('neolator_crt_mode');
  if (savedState === 'off') {
    document.body.classList.add('crt-off');
    crtBtn.setAttribute('aria-pressed', 'false');
  }

  crtBtn.addEventListener('click', () => {
    const isOff = document.body.classList.toggle('crt-off');
    localStorage.setItem('neolator_crt_mode', isOff ? 'off' : 'on');
    crtBtn.setAttribute('aria-pressed', String(!isOff));
  });
}

/* --------------------------------------------------------------------------
   4. VIDEO SOUND TOGGLES
   -------------------------------------------------------------------------- */
function initVideoSoundToggles() {
  const heroVideo = document.getElementById('heroVideo');
  const heroSoundBtn = document.getElementById('heroSoundBtn');

  if (heroVideo && heroSoundBtn) {
    heroSoundBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      updateSoundButtonIcon(heroSoundBtn, !heroVideo.muted);
    });
  }

  // Showcase videos
  document.querySelectorAll('[data-sound-toggle]').forEach((btn) => {
    const targetId = btn.getAttribute('data-sound-toggle');
    const targetVideo = document.getElementById(targetId);
    if (!targetVideo) return;

    btn.addEventListener('click', () => {
      targetVideo.muted = !targetVideo.muted;
      updateSoundButtonIcon(btn, !targetVideo.muted);
    });
  });
}

function updateSoundButtonIcon(btn, isAudible) {
  if (isAudible) {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>`;
    btn.setAttribute('aria-label', 'Mute audio');
  } else {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>`;
    btn.setAttribute('aria-label', 'Unmute audio');
  }
}

/* --------------------------------------------------------------------------
   5. 3D DEVICE PERSPECTIVE TILT (Desktop)
   -------------------------------------------------------------------------- */
function initDeviceTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 1024) return;

  const heroSection = document.getElementById('hero');
  const phone = document.querySelector('.phone-mockup');
  if (!heroSection || !phone) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotX = -y * 14 + 4;
    const rotY = x * 16 - 8;

    phone.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    phone.style.transform = `rotateY(-8deg) rotateX(4deg)`;
  });
}

/* --------------------------------------------------------------------------
   6. CONTROLLER CUSTOMIZATION INTERACTIVE SANDBOX
   -------------------------------------------------------------------------- */
function initControllerSandbox() {
  const dpad = document.getElementById('sandboxDpad');
  const btnCluster = document.getElementById('sandboxButtons');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const sizeSlider = document.getElementById('controlSizeSlider');
  const opacitySlider = document.getElementById('controlOpacitySlider');
  const arcadeButtons = document.querySelectorAll('.arcade-btn');

  if (!dpad || !btnCluster) return;

  // Layout Configurations
  const presets = {
    classic: {
      dpadPos: 'bottom: 28px; left: 36px;',
      clusterPos: 'bottom: 28px; right: 36px; transform: rotate(-12deg); grid-template-columns: repeat(2, 62px); grid-gap: 16px;',
      buttons: ['A', 'B', 'C', 'D'],
      desc: 'Standard 4-button Neo Geo diagonal arcade layout'
    },
    fightstick: {
      dpadPos: 'bottom: 36px; left: 44px;',
      clusterPos: 'bottom: 24px; right: 28px; transform: rotate(0deg); grid-template-columns: repeat(3, 52px); grid-gap: 12px;',
      buttons: ['LP', 'MP', 'HP', 'LK', 'MK', 'HK'],
      desc: '6-button Capcom/Fight stick layout for competitive fighters'
    },
    ergonomic: {
      dpadPos: 'bottom: 60px; left: 24px;',
      clusterPos: 'bottom: 60px; right: 24px; transform: rotate(-24deg); grid-template-columns: repeat(2, 60px); grid-gap: 20px;',
      buttons: ['A', 'B', 'C', 'D'],
      desc: 'Thumb-friendly curved arc for modern large-screen phones'
    },
    compact: {
      dpadPos: 'bottom: 16px; left: 16px;',
      clusterPos: 'bottom: 16px; right: 16px; transform: rotate(-8deg); grid-template-columns: repeat(2, 48px); grid-gap: 10px;',
      buttons: ['A', 'B', 'C', 'D'],
      desc: 'Minimal thumb footprint maximizing active screen space'
    }
  };

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const presetKey = btn.getAttribute('data-preset');
      const cfg = presets[presetKey];
      if (!cfg) return;

      presetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Animate D-Pad position
      dpad.style.cssText = cfg.dpadPos;

      // Animate Buttons Cluster
      btnCluster.style.cssText = cfg.clusterPos;

      // Update button labels if fightstick
      if (presetKey === 'fightstick') {
        renderFightstickButtons();
      } else {
        renderStandardButtons();
      }
    });
  });

  function renderFightstickButtons() {
    btnCluster.innerHTML = `
      <div class="arcade-btn btn-arcade-b" data-key="LP">LP</div>
      <div class="arcade-btn btn-arcade-c" data-key="MP">MP</div>
      <div class="arcade-btn btn-arcade-a" data-key="HP">HP</div>
      <div class="arcade-btn btn-arcade-b" data-key="LK">LK</div>
      <div class="arcade-btn btn-arcade-c" data-key="MK">MK</div>
      <div class="arcade-btn btn-arcade-a" data-key="HK">HK</div>
    `;
    attachArcadeButtonEvents();
  }

  function renderStandardButtons() {
    btnCluster.innerHTML = `
      <div class="arcade-btn btn-arcade-a" data-key="A">A</div>
      <div class="arcade-btn btn-arcade-b" data-key="B">B</div>
      <div class="arcade-btn btn-arcade-c" data-key="C">C</div>
      <div class="arcade-btn btn-arcade-d" data-key="D">D</div>
    `;
    attachArcadeButtonEvents();
  }

  function attachArcadeButtonEvents() {
    btnCluster.querySelectorAll('.arcade-btn').forEach((b) => {
      b.addEventListener('pointerdown', () => {
        b.classList.add('pressed');
        playArcadeHapticTone(600, 0.04);
      });
      b.addEventListener('pointerup', () => b.classList.remove('pressed'));
      b.addEventListener('pointerleave', () => b.classList.remove('pressed'));
    });
  }

  attachArcadeButtonEvents();

  // Size Slider
  if (sizeSlider) {
    sizeSlider.addEventListener('input', (e) => {
      const scale = e.target.value / 100;
      dpad.style.transform = `scale(${scale})`;
      btnCluster.style.transform = `${btnCluster.style.transform.replace(/scale\([^)]*\)/, '')} scale(${scale})`;
    });
  }

  // Opacity Slider
  if (opacitySlider) {
    opacitySlider.addEventListener('input', (e) => {
      const opacity = e.target.value / 100;
      dpad.style.opacity = opacity;
      btnCluster.style.opacity = opacity;
    });
  }
}

/* --------------------------------------------------------------------------
   7. SCREENSHOT CAROUSEL
   -------------------------------------------------------------------------- */
function initScreenshotCarousel() {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsContainer = document.getElementById('galleryDots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.gallery-slide');
  let currentIndex = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('gallery-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.gallery-dot');

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    currentIndex = index;

    const slideWidth = slides[0].getBoundingClientRect().width + 28; // slide width + gap
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Touch Swipe
  let startX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   8. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items without touching their scroll reveal .active class
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question-btn');
          const otherAns = other.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('is-open');
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. WEB AUDIO "INSERT COIN" EASTER EGG
   -------------------------------------------------------------------------- */
function initCoinEasterEgg() {
  const coinBtn = document.getElementById('coinEasterEggBtn');
  if (!coinBtn) return;

  coinBtn.addEventListener('click', () => {
    playRetroCoinChime();
    showCoinToast();
  });
}

function playRetroCoinChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Dual-tone classic arcade bell chime (B5 987.77 Hz -> E6 1318.51 Hz)
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(987.77, now);
    osc1.frequency.setValueAtTime(1318.51, now + 0.08);

    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.45);
  } catch (e) {
    console.log('AudioContext not allowed or supported', e);
  }
}

function playArcadeHapticTone(freq, dur) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.001, now + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur);
  } catch (e) {}
}

function showCoinToast() {
  let toast = document.getElementById('coinToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'coinToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #00F2FE;
      color: #050608;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 0 24px rgba(0, 242, 254, 0.6);
      z-index: 1000;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = 'CREDIT 01 // PRESS START';
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
  }, 2200);
}

/* --------------------------------------------------------------------------
   10. SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
    return;
  }

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => observer.observe(el));
}
