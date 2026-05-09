/* =========================================
   NAVIGATION
   - URL hashes (#about, #projects, etc) work
   - Scrolling updates the active sidebar file
   - Clicking a nav link smooth-scrolls
   ========================================= */

export function initNav() {
  // 1. handle initial URL hash on page load
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      // wait one frame so layout is finished
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  // 2. update sidebar active state on scroll
  const sections = document.querySelectorAll('main > section[id], main .hero-block[id]');
  const fileLinks = document.querySelectorAll('.tree-file');

  if (!sections.length || !fileLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          fileLinks.forEach(f => f.classList.toggle('active', f.dataset.target === id));
          // sync URL hash without scroll-jumping
          if (history.replaceState) {
            history.replaceState(null, '', `#${id}`);
          }
        }
      });
    },
    {
      // section is "active" once 40% of it is visible
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    }
  );

  sections.forEach(s => observer.observe(s));
}
