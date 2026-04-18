/* ============================================
   SECTION LOADER
   Fetches each section HTML file and injects
   it into <main id="app">, then boots script.js
   ============================================ */

/* ── Circular favicon ── */
(function () {
  const img = new Image();
  img.src = 'profile.png';
  img.onload = () => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0, size, size);
    const link = document.querySelector("link[rel='icon']");
    link.type = 'image/png';
    link.href = canvas.toDataURL('image/png');
  };
})();

const SECTIONS = [
  'hero',
  'about',
  'education',
  'experience',
  'publications',
  'projects',
  'awards',
  'certifications',
  'contact',
];

(async () => {
  const app = document.getElementById('app');

  for (const name of SECTIONS) {
    try {
      const res  = await fetch(`sections/${name}.html`);
      const html = await res.text();
      const tmp  = document.createElement('div');
      tmp.innerHTML = html;
      while (tmp.firstChild) app.appendChild(tmp.firstChild);
    } catch (err) {
      console.error(`Failed to load section: ${name}`, err);
    }
  }

  // All sections are in the DOM — boot the page script
  const s = document.createElement('script');
  s.src = 'script.js';
  document.body.appendChild(s);

  // Init custom canvas particles in hero
  initParticles();
})();
