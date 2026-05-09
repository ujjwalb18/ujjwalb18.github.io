/* =========================================
   STICKER + CONTACT POPUP
   - Drag the sticker around
   - Click (without dragging) opens contact popup
   - Popup has email + linkedin actions
   - Close on overlay click, X button, or Esc key
   ========================================= */

const DRAG_THRESHOLD = 5; // px — beyond this, treat as drag, not click

export function initSticker() {
  const sticker = document.getElementById('sticker');
  const popup   = document.getElementById('contactPopup');
  const closeBtn = document.getElementById('contactPopupClose');
  if (!sticker || !popup) return;

  // ---------- DRAG ----------
  let dragging = false;
  let didMove  = false;        // tracks whether the user actually dragged
  let startX = 0, startY = 0;
  let offsetX = 0, offsetY = 0;

  const start = (e) => {
    dragging = true;
    didMove  = false;
    const point = e.touches ? e.touches[0] : e;
    const rect = sticker.getBoundingClientRect();
    startX  = point.clientX;
    startY  = point.clientY;
    offsetX = point.clientX - rect.left;
    offsetY = point.clientY - rect.top;
  };

  const move = (e) => {
    if (!dragging) return;
    const point = e.touches ? e.touches[0] : e;
    const dx = Math.abs(point.clientX - startX);
    const dy = Math.abs(point.clientY - startY);

    // only become a drag once we've actually moved
    if (!didMove && (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD)) {
      didMove = true;
      sticker.style.bottom = 'auto';
      sticker.style.right  = 'auto';
    }

    if (didMove) {
      sticker.style.left = (point.clientX - offsetX) + 'px';
      sticker.style.top  = (point.clientY - offsetY) + 'px';
      e.preventDefault();
    }
  };

  const end = () => { dragging = false; };

  sticker.addEventListener('mousedown',  start);
  sticker.addEventListener('touchstart', start, { passive: true });
  document.addEventListener('mousemove', move);
  document.addEventListener('touchmove', move, { passive: false });
  document.addEventListener('mouseup',   end);
  document.addEventListener('touchend',  end);

  // ---------- CLICK ----------
  // open popup if it was a click (not a drag)
  sticker.addEventListener('click', (e) => {
    if (didMove) {
      e.preventDefault();
      didMove = false;
      return;
    }
    openPopup();
  });

  // ---------- POPUP ----------
  const openPopup = () => {
    popup.hidden = false;
    // force a reflow so the transition runs from opacity 0
    void popup.offsetHeight;
    popup.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    popup.classList.remove('open');
    document.body.style.overflow = '';
    // wait for opacity transition to finish before hiding
    setTimeout(() => { popup.hidden = true; }, 220);
  };

  closeBtn?.addEventListener('click', closePopup);

  // click outside the card to close
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });

  // escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popup.hidden) closePopup();
  });
}
