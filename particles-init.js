/* ============================================
   CANVAS PARTICLES — grid-based, full page,
   with cursor grab interaction
   ============================================ */

function initParticles() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Attach canvas to body so it covers ALL sections
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  /* ============================================
     CONFIG — edit these
     ============================================ */
  const COLOR        = '40,160,160'; // particle & line colour (RGB of #825AC8)
  const COUNT        = 500;         // total particles — more = denser grid
  const DIST         = 145;         // link distance (px) — higher = more connections
  const SPEED        = 0.15;        // drift speed — lower = slower
  const JITTER       = 0.35;        // grid randomness: 0 = rigid grid, 1 = fully random
  const DOT_OPACITY  = { min: 0.5, max: 0.85 }; // dot brightness range
  const LINE_OPACITY = 0.5;         // max line opacity (scales with distance)
  const DOT_SIZE     = { min: 1.2, max: 2.6 };  // dot radius range (px)
  const CURSOR_DIST  = 160;         // cursor grab radius (px)
  const CURSOR_OPACITY = 0.75;      // max opacity of cursor grab lines
  /* ============================================ */

  let W, H, particles, raf;
  const mouse = { x: null, y: null };

  /* ── Track cursor ── */
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  /* ── Grid-based init: one particle per cell, small random jitter ── */
  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;

    const aspect = W / H;
    const cols   = Math.round(Math.sqrt(COUNT * aspect));
    const rows   = Math.round(COUNT / cols);
    const cellW  = W / cols;
    const cellH  = H / rows;

    particles = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const angle = Math.random() * Math.PI * 2;
        const spd   = SPEED * (0.5 + Math.random() * 0.8);
        particles.push({
          x:  (c + 0.5 + (Math.random() - 0.5) * JITTER) * cellW,
          y:  (r + 0.5 + (Math.random() - 0.5) * JITTER) * cellH,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          r:  DOT_SIZE.min + Math.random() * (DOT_SIZE.max - DOT_SIZE.min),
          a:  DOT_OPACITY.min + Math.random() * (DOT_OPACITY.max - DOT_OPACITY.min),
        });
      }
    }
  }

  /* ── Animation loop ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const n = particles.length;

    for (let i = 0; i < n; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges — keeps distribution even over time
      if (p.x < -10)  p.x = W + 10;
      if (p.x > W+10) p.x = -10;
      if (p.y < -10)  p.y = H + 10;
      if (p.y > H+10) p.y = -10;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR},${p.a})`;
      ctx.fill();

      // Draw links to nearby particles
      for (let j = i + 1; j < n; j++) {
        const q  = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${COLOR},${(1 - d / DIST) * LINE_OPACITY})`;
          ctx.lineWidth   = 0.9;
          ctx.stroke();
        }
      }

      // Draw cursor grab lines
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CURSOR_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${COLOR},${(1 - d / CURSOR_DIST) * CURSOR_OPACITY})`;
          ctx.lineWidth   = 1.2;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    init();
    draw();
  });
}
