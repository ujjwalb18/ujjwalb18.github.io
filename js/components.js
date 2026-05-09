/* =========================================
   COMPONENT LOADER
   Fetches HTML partials from /components/
   and injects them into placeholder elements.

   Usage in index.html:
   <div data-component="topbar"></div>
   ========================================= */

export async function loadComponent(name, target) {
  try {
    const res = await fetch(`components/${name}.html`);
    if (!res.ok) throw new Error(`failed to load ${name}: ${res.status}`);
    const html = await res.text();
    target.outerHTML = html;
  } catch (err) {
    console.error(err);
    target.innerHTML = `<div style="color:red;padding:8px">// failed to load ${name}.html</div>`;
  }
}

export async function loadAllComponents() {
  const slots = document.querySelectorAll('[data-component]');
  // load all in parallel — components don't depend on each other
  await Promise.all(
    [...slots].map(slot => loadComponent(slot.dataset.component, slot))
  );
}
