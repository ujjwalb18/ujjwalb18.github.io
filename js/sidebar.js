/* =========================================
   SIDEBAR
   File-tree toggle + smooth-scroll for the
   anchor links (since they're real <a href="#x">
   tags now, we intercept the default jump).
   ========================================= */

export function initSidebar() {
  // folder expand/collapse
  document.querySelectorAll('.tree-folder').forEach(folder => {
    folder.addEventListener('click', () => folder.classList.toggle('open'));
  });

  // smooth-scroll on file click
  document.querySelectorAll('.tree-file').forEach(file => {
    file.addEventListener('click', (e) => {
      e.preventDefault(); // stop the instant hash-jump

      // active highlight
      document.querySelectorAll('.tree-file').forEach(f => f.classList.remove('active'));
      file.classList.add('active');

      // scroll
      const targetId = file.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update URL hash
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });
}
