// ── 다크모드 토글 ──
(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;

  // 저장된 테마 또는 시스템 설정 불러오기
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
      const icon  = btn.querySelector('.icon');
      const label = btn.querySelector('.label');
      if (theme === 'dark') {
        if (icon)  icon.textContent  = '☀️';
        if (label) label.textContent = 'Light';
      } else {
        if (icon)  icon.textContent  = '🌙';
        if (label) label.textContent = 'Dark';
      }
    }

    applyTheme(initial);

    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
})();
