const launchView = document.getElementById('launch-view');
const analysisView = document.getElementById('analysis-view');
const reportView = document.getElementById('report-view');
const generateBtn = document.getElementById('generate-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const progressFill = document.getElementById('progress-fill');
const progressCount = document.getElementById('progress-count');
const progressPercent = document.getElementById('progress-percent');
const analysisTitle = document.getElementById('analysis-title');
const analysisSubtitle = document.getElementById('analysis-subtitle');
const stepsEl = document.getElementById('analysis-steps');

const steps = [
  ['Reading application', 'Extracting business and ownership profile...'],
  ['Reading bank statements', 'Analyzing cash flow, deposits, and obligations...'],
  ['Building business profile', 'Mapping industry, risk, and relationship signals...'],
  ['Comparing 187 lending programs', 'Matching criteria across the partner network...'],
  ['Evaluating underwriting criteria', 'Testing capacity, eligibility, and approval likelihood...'],
  ['Building submission strategy', 'Optimizing product, partner, and submission order...']
];

function renderSteps(active) {
  stepsEl.innerHTML = steps.map((step, index) => {
    const state = index < active ? 'done' : index === active ? 'current' : '';
    const icon = index < active ? 'OK' : index === active ? '...' : String(index + 1);
    return `<div class="analysis-step ${state}"><span class="step-icon">${icon}</span><span>${step[0]}</span></div>`;
  }).join('');
}

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function runAnalysis() {
  launchView.classList.add('hidden');
  reportView.classList.add('hidden');
  analysisView.classList.remove('hidden');
  progressFill.style.width = '0%';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  for (let i = 0; i < steps.length; i++) {
    analysisTitle.textContent = steps[i][0];
    analysisSubtitle.textContent = steps[i][1];
    progressCount.textContent = `${i + 1} of ${steps.length}`;
    const percent = Math.round(((i + .7) / steps.length) * 100);
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
    renderSteps(i);
    await wait(i === 3 ? 1050 : 850);
  }

  renderSteps(steps.length);
  analysisTitle.textContent = 'Placement strategy complete';
  analysisSubtitle.textContent = 'Report ready for advisor review.';
  progressCount.textContent = '6 of 6';
  progressPercent.textContent = '100%';
  progressFill.style.width = '100%';
  await wait(650);
  analysisView.classList.add('hidden');
  reportView.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  revealSections();
}

function revealSections() {
  document.querySelectorAll('.report-section').forEach((section, i) => {
    section.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: i * 65, fill: 'both', easing: 'ease-out' });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

generateBtn.addEventListener('click', runAnalysis);
regenerateBtn.addEventListener('click', runAnalysis);

document.querySelectorAll('.report-nav button').forEach(button => {
  button.addEventListener('click', () => document.getElementById(button.dataset.target).scrollIntoView({ behavior: 'smooth' }));
});

document.getElementById('copy-summary').addEventListener('click', async () => {
  const text = document.getElementById('summary-text').innerText;
  try { await navigator.clipboard.writeText(text); showToast('Underwriter summary copied'); }
  catch { showToast('Select the summary to copy'); }
});

document.getElementById('export-btn').addEventListener('click', () => { showToast('Report prepared for export'); setTimeout(() => window.print(), 600); });
document.querySelectorAll('.row-action').forEach(btn => btn.addEventListener('click', () => showToast(btn.textContent.includes('Prepare') ? 'Submission package opened' : 'Program criteria opened')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.report-nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.target === entry.target.id));
    }
  });
}, { rootMargin: '-20% 0px -65% 0px' });
document.querySelectorAll('.report-section').forEach(section => observer.observe(section));

renderSteps(0);
