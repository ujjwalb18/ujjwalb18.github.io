/* =========================================
   SIDEBAR
   File-tree toggle + smooth-scroll navigation.
   ========================================= */

export function initSidebar() {
  // folder expand/collapse
  document.querySelectorAll('.tree-folder').forEach(folder => {
    folder.addEventListener('click', () => folder.classList.toggle('open'));
  });

  // file click → scroll to corresponding section
  document.querySelectorAll('.tree-file').forEach(file => {
    file.addEventListener('click', () => {
      // mark active
      document.querySelectorAll('.tree-file').forEach(f => f.classList.remove('active'));
      file.classList.add('active');

      // scroll
      const targetId = file.dataset.target;
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
