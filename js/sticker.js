/* =========================================
   STICKER
   The draggable circular sticker (HIRE ME).
   Supports both mouse and touch.
   ========================================= */

export function initSticker() {
  const sticker = document.getElementById('sticker');
  if (!sticker) return;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // pointer events handle mouse + touch in one path
  const start = (e) => {
    dragging = true;
    const rect = sticker.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    offsetX = point.clientX - rect.left;
    offsetY = point.clientY - rect.top;
    // detach from bottom-right anchor
    sticker.style.bottom = 'auto';
    sticker.style.right = 'auto';
    e.preventDefault();
  };

  const move = (e) => {
    if (!dragging) return;
    const point = e.touches ? e.touches[0] : e;
    sticker.style.left = (point.clientX - offsetX) + 'px';
    sticker.style.top = (point.clientY - offsetY) + 'px';
  };

  const end = () => { dragging = false; };

  sticker.addEventListener('mousedown',  start);
  sticker.addEventListener('touchstart', start, { passive: false });
  document.addEventListener('mousemove', move);
  document.addEventListener('touchmove', move, { passive: false });
  document.addEventListener('mouseup',   end);
  document.addEventListener('touchend',  end);
}
