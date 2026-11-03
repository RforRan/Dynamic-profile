import anime from 'animejs';

/**
 * IMPECCABLE-GRADE RANDOM NEON GLITCH SYSTEM
 * 
 * Engine kinetik pencahayaan hardware neon acak dengan manajemen lifecycle ketat,
 * optimasi layer GPU (will-change & CSS variables), dan mitigasi layout repaint.
 */

export interface NeonGlitchConfig {
  textSelectors?: string[];
  containerSelectors?: string[];
  svgSelectors?: string[];
  minCooldown?: number; // Default: 800ms
  maxCooldown?: number; // Default: 4200ms
  minBurstDuration?: number; // Default: 50ms
  maxBurstDuration?: number; // Default: 240ms
}

export interface NeonGlitchController {
  start: () => void;
  stop: () => void;
  triggerBurst: (target: HTMLElement, type: 'text' | 'container' | 'svg') => void;
  destroy: () => void;
}

export function createNeonGlitchEngine(config: NeonGlitchConfig = {}): NeonGlitchController {
  const {
    textSelectors = ['.cyber-glitch-header', '.cyber-card-title'],
    containerSelectors = ['.cyber-card', '.hud-telemetry-item'],
    svgSelectors = ['.hud-path', '.cyber-status-pulse'],
    minCooldown = 800,
    maxCooldown = 4200,
    minBurstDuration = 50,
    maxBurstDuration = 240,
  } = config;

  let isRunning = false;
  let activeTimeoutId: number | null = null;
  const activeElements = new Set<HTMLElement>();

  // Helper untuk mendapatkan list elemen DOM yang valid
  function getElements(selectors: string[]): HTMLElement[] {
    if (typeof document === 'undefined') return [];
    return selectors.flatMap((sel) => Array.from(document.querySelectorAll<HTMLElement>(sel)));
  }

  /**
   * Eksekusi Electrical Spark Burst pada target Text Node
   * Menggunakan drop-shadow dan text-shadow tanpa merusak kontras tipografi dasar
   */
  function burstText(target: HTMLElement, duration: number) {
    activeElements.add(target);
    target.classList.add('neon-glitch-gpu');

    // Multi-stage irregular micro-stutter keyframes (50ms - 240ms)
    anime({
      targets: target,
      opacity: [1, 0.35, 1, 0.2, 0.9, 0.45, 1],
      skewX: [0, -1.8, 1.4, -0.6, 0],
      translateX: [0, -1.5, 1.5, -0.5, 0],
      duration,
      easing: 'steps(3)',
      complete: () => {
        target.style.opacity = '';
        target.style.transform = '';
      },
    });
  }

  /**
   * Eksekusi Electrical Spark Burst pada target Container / Chassis
   * Mengisolasi mutasi ke border glow & opacity layer GPU
   */
  function burstContainer(target: HTMLElement, duration: number) {
    activeElements.add(target);
    const glowLayer = target.querySelector<HTMLElement>('.cyber-card-glow');
    target.classList.add('neon-glitch-gpu');

    // Fluktuasi tegangan kontainer
    anime({
      targets: target,
      skewX: [0, -0.8, 0.6, 0],
      translateX: [0, -1, 1, 0],
      duration: Math.min(duration, 140),
      easing: 'steps(2)',
      complete: () => {
        target.style.transform = '';
      },
    });

    // Fluktuasi cahaya neon pada chassis
    if (glowLayer) {
      anime({
        targets: glowLayer,
        opacity: [0.15, 0.9, 0.3, 1, 0.25, 0.85, 0.15],
        duration,
        easing: 'linear',
        complete: () => {
          glowLayer.style.opacity = '';
        },
      });
    }
  }

  /**
   * Eksekusi Electrical Spark Burst pada SVG Vector Node
   * Menggunakan stroke-opacity dan drop-shadow
   */
  function burstSvg(target: HTMLElement, duration: number) {
    activeElements.add(target);
    target.classList.add('neon-glitch-gpu');

    anime({
      targets: target,
      opacity: [1, 0.1, 0.8, 0.2, 1, 0.4, 1],
      scale: [1, 1.08, 0.96, 1],
      duration,
      easing: 'steps(4)',
      complete: () => {
        target.style.opacity = '';
        target.style.transform = '';
      },
    });
  }

  /**
   * Pemicu Burst Terpadu (Manual / Hover)
   */
  function triggerBurst(target: HTMLElement, type: 'text' | 'container' | 'svg') {
    if (!target) return;
    const duration = anime.random(minBurstDuration, maxBurstDuration);

    switch (type) {
      case 'text':
        burstText(target, duration);
        break;
      case 'container':
        burstContainer(target, duration);
        break;
      case 'svg':
        burstSvg(target, duration);
        break;
    }
  }

  /**
   * Loop Rekursif Asinkron Non-Uniform
   * Mengeliminasi pattern setInterval repetitif yang monoton
   */
  function scheduleNextAmbientBurst() {
    if (!isRunning) return;

    const cooldown = anime.random(minCooldown, maxCooldown);

    activeTimeoutId = window.setTimeout(() => {
      if (!isRunning) return;

      const roll = Math.random();
      const burstDuration = anime.random(minBurstDuration, maxBurstDuration);

      if (roll < 0.45) {
        // 45% chance: Random text anomaly (Header atau card title)
        const texts = getElements(textSelectors);
        if (texts.length > 0) {
          const target = texts[Math.floor(Math.random() * texts.length)];
          burstText(target, burstDuration);
        }
      } else if (roll < 0.8) {
        // 35% chance: Random container chassis micro-power surge
        const containers = getElements(containerSelectors);
        if (containers.length > 0) {
          const target = containers[Math.floor(Math.random() * containers.length)];
          burstContainer(target, burstDuration);
        }
      } else {
        // 20% chance: Random SVG circuit path flicker
        const svgs = getElements(svgSelectors);
        if (svgs.length > 0) {
          const target = svgs[Math.floor(Math.random() * svgs.length)];
          burstSvg(target, burstDuration);
        }
      }

      // Jadwalkan lonjakan berikutnya dengan interval acak
      scheduleNextAmbientBurst();
    }, cooldown);
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    scheduleNextAmbientBurst();
  }

  function stop() {
    isRunning = false;
    if (activeTimeoutId !== null) {
      clearTimeout(activeTimeoutId);
      activeTimeoutId = null;
    }
  }

  /**
   * Lifecycle Cleanup Routine
   * Mencegah memory leak dengan menghapus seluruh instance Anime.js dan event listener
   */
  function destroy() {
    stop();

    // Hapus seluruh animasi Anime.js pada semua target aktif
    activeElements.forEach((el) => {
      anime.remove(el);
      const glow = el.querySelector<HTMLElement>('.cyber-card-glow');
      if (glow) anime.remove(glow);

      el.classList.remove('neon-glitch-gpu');
      el.style.opacity = '';
      el.style.transform = '';
    });

    activeElements.clear();
  }

  return {
    start,
    stop,
    triggerBurst,
    destroy,
  };
}
