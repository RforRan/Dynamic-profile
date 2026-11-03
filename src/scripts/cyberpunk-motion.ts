import anime from 'animejs';
import { createNeonGlitchEngine, type NeonGlitchController } from './neon-glitch-engine';

/**
 * Cyberpunk Motion & Kinetic Engine Orchestrator
 * Integrates sequential grid boot-up with the Impeccable Random Neon Glitch Engine.
 */

let activeGlitchEngine: NeonGlitchController | null = null;

export function initCyberpunkMotion(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Clean up any existing instances first (prevent duplicate listeners on re-run)
  if (activeGlitchEngine) {
    activeGlitchEngine.destroy();
    activeGlitchEngine = null;
  }

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
      duration: 600,
      delay: anime.stagger(30),
    })
    // Step 2: HUD Header & Diagnostics Glitch Entrance
    .add(
      {
        targets: '.hud-header-element',
        opacity: [0, 1, 0.2, 1, 0.6, 1],
        translateX: [-12, 0],
        skewX: [6, 0],
        duration: 260,
        easing: 'steps(5)',
      },
      '-=280'
    )
    // Step 3: Telemetry Matrix Counters rapid digital count
    .add(
      {
        targets: '.hud-telemetry-item',
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 320,
        delay: anime.stagger(25),
      },
      '-=140'
    )
    // Step 4: Staggered Project Cards Boot-Up (25ms stagger)
    .add(
      {
        targets: '.cyber-card',
        opacity: [0, 0.4, 0.1, 1],
        scale: [0.96, 1],
        translateY: [16, 0],
        duration: 380,
        delay: anime.stagger(25, { start: 40 }),
        easing: 'easeOutExpo',
      },
      '-=180'
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
      duration: 1100,
      easing: 'easeOutExpo',
      update: () => {
        el.textContent = obj.val.toString();
      },
    });
  });

  // 3. INITIALIZE IMPECCABLE NEON GLITCH ENGINE
  const glitchEngine = createNeonGlitchEngine({
    textSelectors: ['.cyber-glitch-header', '.cyber-card-title'],
    containerSelectors: ['.cyber-card', '.hud-telemetry-item'],
    svgSelectors: ['.hud-path', '.cyber-status-pulse'],
    minCooldown: 900,
    maxCooldown: 3800,
    minBurstDuration: 45,
    maxBurstDuration: 220,
  });

  activeGlitchEngine = glitchEngine;

  // Start ambient random glitch loop after initial boot animation settles
  setTimeout(() => {
    if (activeGlitchEngine === glitchEngine) {
      glitchEngine.start();
    }
  }, 1000);

  // 4. INTERACTIVE CARD HOVER & FOCUS GLITCH SURGE
  const cards = document.querySelectorAll<HTMLElement>('.cyber-card');
  const cardHandlers = new Map<HTMLElement, { enter: () => void; leave: () => void }>();

  cards.forEach((card) => {
    const borderGlow = card.querySelector<HTMLElement>('.cyber-card-glow');
    const title = card.querySelector<HTMLElement>('.cyber-card-title');

    const handleEnter = () => {
      // Trigger instantaneous electrical spark via the glitch engine
      glitchEngine.triggerBurst(card, 'container');
      if (title) glitchEngine.triggerBurst(title, 'text');

      if (borderGlow) {
        anime({
          targets: borderGlow,
          opacity: [0.3, 0.95],
          duration: 160,
          easing: 'easeOutQuad',
        });
      }
    };

    const handleLeave = () => {
      anime({
        targets: card,
        skewX: 0,
        translateX: 0,
        duration: 140,
        easing: 'easeOutExpo',
      });

      if (borderGlow) {
        anime({
          targets: borderGlow,
          opacity: 0,
          duration: 200,
          easing: 'easeOutQuad',
        });
      }
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);

    cardHandlers.set(card, { enter: handleEnter, leave: handleLeave });
  });

  // 5. RETURN DETERMINISTIC CLEANUP FUNCTION (LIFECYCLE MANAGEMENT)
  return () => {
    glitchEngine.destroy();
    if (activeGlitchEngine === glitchEngine) {
      activeGlitchEngine = null;
    }

    cards.forEach((card) => {
      const handler = cardHandlers.get(card);
      if (handler) {
        card.removeEventListener('mouseenter', handler.enter);
        card.removeEventListener('mouseleave', handler.leave);
      }
      anime.remove(card);
    });

    cardHandlers.clear();
  };
}
