// ── 언어 색상 정의 ──
const COLORS = {
  HTML:       { bar: '#e34c26', text: '#e34c26' },
  CSS:        { bar: '#264de4', text: '#264de4' },
  JavaScript: { bar: '#c9a800', text: '#b39200' },
};

// ── 프로젝트별 파일 라인 수 데이터 ──
const PROJECTS = [
  { langs: { HTML: 49,   CSS: 23,  JavaScript: 0   } }, // HCJDemo
  { langs: { HTML: 50,   CSS: 23,  JavaScript: 0   } }, // HTML 기본 태그
  { langs: { HTML: 204,  CSS: 290, JavaScript: 57  } }, // 포트폴리오
  { langs: { HTML: 1116, CSS: 936, JavaScript: 549 } }, // 암호학 팀 프로젝트
];

// ── 전체 언어별 합계 계산 ──
const TOTALS = { HTML: 0, CSS: 0, JavaScript: 0 };
PROJECTS.forEach((p) =>
  Object.keys(p.langs).forEach((l) => {
    TOTALS[l] += p.langs[l];
  })
);
const GRAND = Object.values(TOTALS).reduce((a, b) => a + b, 0);

// ── 요약 카드 렌더링 ──
function renderSummary() {
  const wrap = document.getElementById('langSummary');
  Object.entries(TOTALS)
    .sort((a, b) => b[1] - a[1])
    .forEach(([lang, lines]) => {
      const p = ((lines / GRAND) * 100).toFixed(1);
      const c = COLORS[lang];
      wrap.innerHTML += `
        <div class="lang-card" style="--lang-color:${c.bar}">
          <div class="lang-card-top">
            <span class="lang-color-dot" style="background:${c.bar}"></span>
            <span class="lang-card-name">${lang}</span>
          </div>
          <div class="lang-card-lines">${lines.toLocaleString()}</div>
          <div class="lang-card-unit">lines of code</div>
          <div class="lang-card-pct" style="color:${c.text}">${p}%</div>
        </div>`;
    });
}

// ── 통합 비율 바 + 범례 렌더링 ──
function renderOverview() {
  const bar    = document.getElementById('langOverview');
  const legend = document.getElementById('overviewLegend');
  Object.entries(TOTALS).forEach(([lang, lines]) => {
    const p = ((lines / GRAND) * 100).toFixed(1);
    const c = COLORS[lang];
    bar.innerHTML += `
      <div class="lang-overview-seg"
           style="flex:${lines};background:${c.bar}"
           title="${lang} ${p}%"></div>`;
    legend.innerHTML += `
      <span class="legend-item">
        <span class="legend-dot" style="background:${c.bar}"></span>
        ${lang} ${p}%
      </span>`;
  });
}

// ── 언어별 바 차트 렌더링 ──
function renderBars() {
  const wrap = document.getElementById('langBars');
  Object.entries(TOTALS)
    .sort((a, b) => b[1] - a[1])
    .forEach(([lang, lines]) => {
      const p = ((lines / GRAND) * 100).toFixed(1);
      const c = COLORS[lang];
      wrap.innerHTML += `
        <div class="lang-row">
          <div class="lang-name">
            <span class="lang-dot" style="background:${c.bar}"></span>
            ${lang}
          </div>
          <div class="lang-track">
            <div class="lang-fill" data-w="${p}" style="background:${c.bar}"></div>
          </div>
          <div class="lang-stat">
            <div class="lang-pct">${p}%</div>
            <div class="lang-lines-count">${lines.toLocaleString()} lines</div>
          </div>
        </div>`;
    });
}

// ── 스크롤 진입 시 바 애니메이션 ──
function animateBars() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.w + '%';
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.lang-fill').forEach((el) => obs.observe(el));
}

// ── 초기화 ──
document.addEventListener('DOMContentLoaded', () => {
  renderSummary();
  renderOverview();
  renderBars();
  animateBars();
});
