import anime from 'animejs';

/**
 * Cyberpunk Impeccable Motion Controller
 * Powered by Anime.js with high-speed easings, erratic glitch keyframes,
 * sequential stagger boot-ups, and SVG vector tech animations.
 */

export function initCyberpunkMotion() {
  if (typeof window === 'undefined') return;

  // 1. SEQUENTIAL GRID BOOT-UP TIMELINE
  const bootTimeline = anime.timeline({
    easing: 'easeOutExpo',
  });

  // Step 1: SVG Tech Circuit & Line Animation
  bootTimeline
    .add({
      targets: '.hud-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 650,
      delay: anime.stagger(40),
    })
    // Step 2: HUD Header & Diagnostics Glitch Entrance
    .add(
      {
        targets: '.hud-header-element',
        opacity: [0, 1, 0.2, 1, 0.6, 1],
        translateX: [-15, 0],
        skewX: [8, 0],
        duration: 280,
        easing: 'steps(5)',
      },
      '-=300'
    )
    // Step 3: Telemetry Matrix Counters rapid digital count
    .add(
      {
        targets: '.hud-telemetry-item',
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 350,
        delay: anime.stagger(30),
      },
      '-=150'
    )
    // Step 4: Staggered Project Cards Boot-Up (Very rapid, 20ms stagger)
    .add(
      {
        targets: '.cyber-card',
        opacity: [0, 0.4, 0.1, 1],
        scale: [0.95, 1],
        translateY: [20, 0],
        duration: 400,
        delay: anime.stagger(30, { start: 50 }),
        easing: 'easeOutExpo',
      },
      '-=200'
    );

  // 2. COUNTER DIGITAL BOOT SEQUENCE
  const counterElements = document.querySelectorAll<HTMLElement>('.cyber-counter');
  counterElements.forEach((el) => {
    const targetValue = parseInt(el.getAttribute('data-value') || '0', 10);
    const obj = { val: 0 };

    anime({
      targets: obj,
      val: targetValue,
      round: 1,
      duration: 1200,
      easing: 'easeOutExpo',
      update: () => {
        el.textContent = obj.val.toString();
      },
    });
  });

  // 3. INTERACTIVE CARD HOVER GLITCH & BORDER SURGE
  const cards = document.querySelectorAll<HTMLElement>('.cyber-card');
  cards.forEach((card) => {
    const borderGlow = card.querySelector<HTMLElement>('.cyber-card-glow');
    const title = card.querySelector<HTMLElement>('.cyber-card-title');

    card.addEventListener('mouseenter', () => {
      // Rapid erratic glitch transform
      anime({
        targets: card,
        skewX: [0, -1.8, 1.2, -0.6, 0],
        translateX: [0, -2, 2, 0],
        duration: 160,
        easing: 'steps(4)',
      });

      // Neon pulse surge
      if (borderGlow) {
        anime({
          targets: borderGlow,
          opacity: [0.3, 1, 0.6, 0.95],
          duration: 180,
          easing: 'easeOutQuad',
        });
      }

      // Title neon color glitch flash
      if (title) {
        anime({
          targets: title,
          color: ['#00F0FF', '#FF0055', '#FCEE09', '#00F0FF'],
          duration: 220,
          easing: 'steps(3)',
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      anime({
        targets: card,
        skewX: 0,
        translateX: 0,
        duration: 150,
        easing: 'easeOutExpo',
      });

      if (borderGlow) {
        anime({
          targets: borderGlow,
          opacity: 0.2,
          duration: 250,
          easing: 'easeOutQuad',
        });
      }
    });
  });

  // 4. PERIODIC AMBIENT POWER SURGE & TELEMETRY FLICKER
  function triggerAmbientFlicker() {
    const statusDot = document.querySelector<HTMLElement>('.cyber-status-pulse');
    const headerTitle = document.querySelector<HTMLElement>('.cyber-glitch-header');

    if (statusDot) {
      anime({
        targets: statusDot,
        opacity: [1, 0.1, 0.9, 0.2, 1],
        scale: [1, 1.4, 0.9, 1.2, 1],
        duration: 180,
        easing: 'steps(5)',
      });
    }

    if (headerTitle && Math.random() > 0.4) {
      anime({
        targets: headerTitle,
        skewX: [0, -2.5, 1.5, 0],
        opacity: [1, 0.7, 1],
        duration: 120,
        easing: 'steps(3)',
      });
    }

    // Schedule next erratic surge between 3000ms and 7000ms
    const nextInterval = 3000 + Math.random() * 4000;
    setTimeout(triggerAmbientFlicker, nextInterval);
  }

  // Start periodic ambient flicker after initial boot
  setTimeout(triggerAmbientFlicker, 1500);
}
