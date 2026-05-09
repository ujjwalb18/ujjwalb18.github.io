/* =========================================
   SKILLS RENDERER
   Reads data/skills.json and builds the
   skill cells inside #skillsWall.
   ========================================= */

export async function renderSkills() {
  const wall = document.getElementById('skillsWall');
  if (!wall) return;

  try {
    const res = await fetch('data/skills.json');
    const skills = await res.json();

    wall.innerHTML = skills.map(s => `
      <div class="skill-cell ${s.color}">
        <span class="skill-num">// ${s.num}</span>
        <div class="skill-name">${s.name}</div>
        <span class="skill-cat">${s.category}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error('failed to load skills.json', err);
  }
}
