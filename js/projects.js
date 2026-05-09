/* =========================================
   PROJECTS RENDERER
   Reads data/projects.json and builds the
   project cards inside #projectsStack.
   ========================================= */

export async function renderProjects() {
  const stack = document.getElementById('projectsStack');
  if (!stack) return;

  try {
    const res = await fetch('data/projects.json');
    const projects = await res.json();

    stack.innerHTML = projects.map(p => `
      <div class="pcard">
        <div class="pcard-body">
          <div class="pcard-head">
            <span class="pcard-id">${p.id}</span>
            <span class="pcard-meta">${p.meta}</span>
          </div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="ptags">
            ${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="pcard-side">
          ${p.stats.map(s => `
            <div class="pcard-stat">
              <div class="v">${s.value}</div>
              <div class="l">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('failed to load projects.json', err);
  }
}
