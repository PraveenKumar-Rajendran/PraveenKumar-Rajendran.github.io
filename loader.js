/* ============================================
   SECTION LOADER
   Fetches each section HTML file and injects
   it into <main id="app">, then boots script.js
   ============================================ */

const SECTIONS = [
  'hero',
  'about',
  'experience',
  'publications',
  'projects',
  'education',
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
