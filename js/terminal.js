/* =========================================
   TERMINAL
   Loads command outputs from data/terminal-commands.json,
   handles input, history, special commands (clear, hack).
   ========================================= */

export async function initTerminal() {
  const screen = document.getElementById('termScreen');
  const input  = document.getElementById('termInput');
  if (!screen || !input) return;

  // load command output map
  let cmds = {};
  try {
    const res = await fetch('data/terminal-commands.json');
    cmds = await res.json();
  } catch (err) {
    console.error('failed to load terminal-commands.json', err);
  }

  const history = [];
  let historyIdx = -1;

  const print = (html, cls = 'term-out') => {
    const div = document.createElement('div');
    div.className = 'term-line ' + cls;
    div.innerHTML = html;
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
  };

  const escape = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // matrix easter egg
  const runHack = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテト█▓▒░';
    let n = 0;
    const interval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 50; i++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      print(`<span style="color:var(--rose)">${line}</span>`);
      n++;
      if (n > 7) {
        clearInterval(interval);
        print('<span class="ok">access granted. (jk you already had access.)</span>');
        print('&nbsp;');
      }
    }, 70);
  };

  // commands that need code (not just static text)
  const dynamicCmds = {
    date:  () => [new Date().toString()],
    clear: () => { screen.innerHTML = ''; return null; },
    hack:  () => { runHack(); return null; },
    matrix:() => { runHack(); return null; },
    '.secret': () => cmds.secret,
  };

  const exec = (raw) => {
    const cmd = raw.trim();
    print(
      `<span class="p-user">ujjwal</span><span class="p-host">@portfolio</span>` +
      `<span class="p-host">:</span><span class="p-path">~</span>$ ${escape(raw)}`
    );

    if (!cmd) { print('&nbsp;'); return; }

    history.push(raw);
    historyIdx = history.length;

    const key = cmd.toLowerCase();

    // dynamic first, then static JSON map
    if (dynamicCmds[key]) {
      const out = dynamicCmds[key]();
      if (out) out.forEach(line => print(line));
    } else if (cmds[key]) {
      cmds[key].forEach(line => print(line));
    } else {
      print(
        `<span class="err">command not found:</span> ${escape(cmd)}. ` +
        `try <span class="hl">help</span>.`
      );
    }
    print('&nbsp;');
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      exec(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx] || '';
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx] || '';
      } else {
        historyIdx = history.length;
        input.value = '';
      }
      e.preventDefault();
    }
  });

  // click anywhere on the terminal to focus the input
  document.querySelector('.term-wrap')?.addEventListener('click', () => input.focus());
}
