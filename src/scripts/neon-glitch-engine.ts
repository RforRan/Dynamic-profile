import anime from 'animejs';

/**
 * IMPECCABLE-GRADE RANDOM NEON GLITCH SYSTEM (POLISHED)
 * 
 * Engine kinetik pencahayaan hardware neon acak frekuensi tinggi dengan
 * durasi lonjakan yang diperpanjang, transisi chromatic text-shadow,
 * dan manajemen lifecycle deterministik.
 */

export interface NeonGlitchConfig {
  textSelectors?: string[];
  containerSelectors?: string[];
  svgSelectors?: string[];
  minCooldown?: number; // Jeda antar lonjakan (ms)
  maxCooldown?: number;
  minBurstDuration?: number; // Durasi lamanya efek transisi glitch (ms)
  maxBurstDuration?: number;
}

export interface NeonGlitchController {
  start: () => void;
  stop: () => void;
  triggerBurst: (target: HTMLElement, type: 'text' | 'container' | 'svg', durationOverride?: number) => void;
  destroy: () => void;
}

export function createNeonGlitchEngine(config: NeonGlitchConfig = {}): NeonGlitchController {
  const {
    textSelectors = ['.cyber-glitch-header', '.cyber-card-title'],
    containerSelectors = ['.cyber-card', '.hud-telemetry-item'],
    svgSelectors = ['.hud-path', '.cyber-status-pulse'],
    minCooldown = 400,       // Frekuensi lebih sering (0.4 detik - 1.6 detik)
    maxCooldown = 1600,
    minBurstDuration = 350,  // Transisi berlangsung lebih lama (350ms - 850ms)
    maxBurstDuration = 850,
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
   * Menggabungkan multi-stage opacity, prolonged jitter skew, dan chromatic split
   */
  function burstText(target: HTMLElement, duration: number) {
    activeElements.add(target);
    target.classList.add('neon-glitch-gpu');

    // 1. Prolonged Multi-stage Opacity & Jitter (Steps Easing)
    anime({
      targets: target,
      opacity: [1, 0.25, 0.95, 0.15, 0.85, 0.35, 1, 0.2, 0.9, 0.4, 0.95, 1],
      skewX: [0, -3.2, 2.4, -1.8, 3.0, -1.2, 1.8, -0.6, 0],
      translateX: [0, -2.5, 3.0, -2.0, 2.2, -1.2, 1.0, 0],
      duration,
      easing: 'steps(5)',
      complete: () => {
        target.style.opacity = '';
        target.style.transform = '';
      },
    });

    // 2. Chromatic Aberration Text-Shadow Burst
    anime({
      targets: target,
      textShadow: [
        '0 0 0 transparent',
        '3px 0 #FF0055, -3px 0 #00F0FF',
        '-2px 0 #FCEE09, 2px 0 #FF0055',
        '2px 0 #00F0FF, -2px 0 #FCEE09',
        '0 0 0 transparent',
      ],
      duration: duration * 0.85,
      easing: 'steps(4)',
      complete: () => {
        target.style.textShadow = '';
      },
    });
  }

  /**
   * Eksekusi Electrical Spark Burst pada target Container / Chassis
   * Memperpanjang lonjakan cahaya neon sasis dan fluktuasi sudut
   */
  function burstContainer(target: HTMLElement, duration: number) {
    activeElements.add(target);
    const glowLayer = target.querySelector<HTMLElement>('.cyber-card-glow');
    target.classList.add('neon-glitch-gpu');

    // Jitter mikro pada kontainer sasis
    anime({
      targets: target,
      skewX: [0, -1.2, 1.0, -0.8, 0.6, 0],
      translateX: [0, -1.5, 1.5, -1.0, 0],
      duration: duration * 0.6,
      easing: 'steps(3)',
      complete: () => {
        target.style.transform = '';
      },
    });

    // Fluktuasi cahaya neon sasis yang diperpanjang
    if (glowLayer) {
      anime({
        targets: glowLayer,
        opacity: [0.15, 0.95, 0.25, 0.85, 0.35, 1, 0.2, 0.75, 0.3, 0.9, 0.15],
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
   * Stroke opacity dan scale berdenyut lebih lama
   */
  function burstSvg(target: HTMLElement, duration: number) {
    activeElements.add(target);
    target.classList.add('neon-glitch-gpu');

    anime({
      targets: target,
      opacity: [1, 0.15, 0.9, 0.1, 0.85, 0.2, 1, 0.3, 0.9, 0.2, 1],
      scale: [1, 1.12, 0.94, 1.08, 0.98, 1],
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
  function triggerBurst(target: HTMLElement, type: 'text' | 'container' | 'svg', durationOverride?: number) {
    if (!target) return;
    const duration = durationOverride || anime.random(minBurstDuration, maxBurstDuration);

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
   * Loop Rekursif Asinkron Non-Uniform Berfrekuensi Tinggi
   * Mengacak jeda secara cepat (400ms - 1600ms) dan mendukung multi-node burst simultan
   */
  function scheduleNextAmbientBurst() {
    if (!isRunning) return;

    const cooldown = anime.random(minCooldown, maxCooldown);

    activeTimeoutId = window.setTimeout(() => {
      if (!isRunning) return;

      const roll = Math.random();
      const burstDuration = anime.random(minBurstDuration, maxBurstDuration);

      if (roll < 0.40) {
        // 40% chance: Random Text anomaly (Header atau card title)
        const texts = getElements(textSelectors);
        if (texts.length > 0) {
          const target = texts[Math.floor(Math.random() * texts.length)];
          burstText(target, burstDuration);
        }
      } else if (roll < 0.70) {
        // 30% chance: Random Container chassis micro-power surge
        const containers = getElements(containerSelectors);
        if (containers.length > 0) {
          const target = containers[Math.floor(Math.random() * containers.length)];
          burstContainer(target, burstDuration);
        }
      } else if (roll < 0.88) {
        // 18% chance: Random SVG circuit path / status pulse flicker
        const svgs = getElements(svgSelectors);
        if (svgs.length > 0) {
          const target = svgs[Math.floor(Math.random() * svgs.length)];
          burstSvg(target, burstDuration);
        }
      } else {
        // 12% chance: Synchronized Dual-Glitch (Text + Container berdenyut bersamaan)
        const texts = getElements(textSelectors);
        const containers = getElements(containerSelectors);
        if (texts.length > 0) {
          burstText(texts[Math.floor(Math.random() * texts.length)], burstDuration);
        }
        if (containers.length > 0) {
          burstContainer(containers[Math.floor(Math.random() * containers.length)], burstDuration);
        }
      }

      // Jadwalkan lonjakan berikutnya dengan interval acak yang cepat
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
   */
  function destroy() {
    stop();

    activeElements.forEach((el) => {
      anime.remove(el);
      const glow = el.querySelector<HTMLElement>('.cyber-card-glow');
      if (glow) anime.remove(glow);

      el.classList.remove('neon-glitch-gpu');
      el.style.opacity = '';
      el.style.transform = '';
      el.style.textShadow = '';
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
