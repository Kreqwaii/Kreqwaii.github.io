(() => {
  'use strict';

  const SCOPES = {
    single: {
      label: 'Single Tooth Implant',
      baseMin: 4200,
      baseMax: 5800,
      cbctMin: 350,
      cbctMax: 550,
      graftMin: 750,
      graftMax: 1650,
      sedationMin: 850,
      sedationMax: 1350
    },
    bridge: {
      label: 'Implant Bridge (3-4 Teeth)',
      baseMin: 8800,
      baseMax: 13200,
      cbctMin: 350,
      cbctMax: 550,
      graftMin: 1100,
      graftMax: 2200,
      sedationMin: 950,
      sedationMax: 1500
    },
    'full-arch': {
      label: 'Full Arch (Upper or Lower)',
      baseMin: 24500,
      baseMax: 31500,
      cbctMin: 350,
      cbctMax: 550,
      graftMin: 1600,
      graftMax: 3400,
      sedationMin: 1400,
      sedationMax: 2100
    },
    'dual-arch': {
      label: 'Dual Arch Full Mouth',
      baseMin: 46000,
      baseMax: 59000,
      cbctMin: 350,
      cbctMax: 550,
      graftMin: 2800,
      graftMax: 5600,
      sedationMin: 1800,
      sedationMax: 2700
    }
  };

  const APR = 0.0899;

  const state = {
    scope: 'single',
    cbct: true,
    graft: false,
    sedation: false,
    term: 48
  };

  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  function formatRange(min, max) {
    return `${usdFormatter.format(min)} - ${usdFormatter.format(max)}`;
  }

  function calcMonthly(principal, months) {
    if (months <= 0) {
      return principal;
    }
    const monthlyRate = APR / 12;
    const factor = Math.pow(1 + monthlyRate, -months);
    return Math.round((principal * monthlyRate) / (1 - factor));
  }

  // Elements
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const scopeButtons = Array.from(document.querySelectorAll('.scope-card'));
  const termButtons = Array.from(document.querySelectorAll('.term-tab'));
  const procSelectButtons = Array.from(document.querySelectorAll('[data-select-scope]'));

  const optCbct = document.getElementById('optCbct');
  const optGraft = document.getElementById('optGraft');
  const optSedation = document.getElementById('optSedation');

  const feeCbct = document.getElementById('feeCbct');
  const feeGraft = document.getElementById('feeGraft');
  const feeSedation = document.getElementById('feeSedation');

  const summaryTag = document.getElementById('summaryTag');
  const summaryTermBadge = document.getElementById('summaryTermBadge');
  const summaryTotal = document.getElementById('summaryTotal');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const summaryMonthly = document.getElementById('summaryMonthly');
  const monthlyFootnote = document.getElementById('monthlyFootnote');
  const breakdownList = document.getElementById('breakdownList');
  const directMailLink = document.getElementById('directMailLink');

  const consultForm = document.getElementById('consultForm');
  const patientName = document.getElementById('patientName');
  const patientPhone = document.getElementById('patientPhone');
  const patientEmail = document.getElementById('patientEmail');
  const preferredWindow = document.getElementById('preferredWindow');
  const clinicalNotes = document.getElementById('clinicalNotes');
  const formError = document.getElementById('formError');

  const consultConfirmation = document.getElementById('consultConfirmation');
  const confirmSummaryText = document.getElementById('confirmSummaryText');
  const confirmMailto = document.getElementById('confirmMailto');
  const editEstimateBtn = document.getElementById('editEstimateBtn');

  function getEstimateData() {
    const cfg = SCOPES[state.scope];
    let min = cfg.baseMin;
    let max = cfg.baseMax;

    const lines = [
      {
        label: cfg.label,
        value: formatRange(cfg.baseMin, cfg.baseMax),
        active: true
      }
    ];

    if (state.cbct) {
      min += cfg.cbctMin;
      max += cfg.cbctMax;
      lines.push({
        label: '3D CBCT Consultation',
        value: `+${formatRange(cfg.cbctMin, cfg.cbctMax)}`,
        active: true
      });
    } else {
      lines.push({
        label: '3D CBCT Consultation',
        value: 'Not included',
        active: false
      });
    }

    if (state.graft) {
      min += cfg.graftMin;
      max += cfg.graftMax;
      lines.push({
        label: 'Bone Grafting (if needed)',
        value: `+${formatRange(cfg.graftMin, cfg.graftMax)}`,
        active: true
      });
    } else {
      lines.push({
        label: 'Bone Grafting (if needed)',
        value: 'Not selected',
        active: false
      });
    }

    if (state.sedation) {
      min += cfg.sedationMin;
      max += cfg.sedationMax;
      lines.push({
        label: 'IV Sedation (Anesthesiologist)',
        value: `+${formatRange(cfg.sedationMin, cfg.sedationMax)}`,
        active: true
      });
    } else {
      lines.push({
        label: 'IV Sedation (Anesthesiologist)',
        value: 'Not selected',
        active: false
      });
    }

    let monthlyMin = 0;
    let monthlyMax = 0;
    let paymentDisplay = '';

    if (state.term === 0) {
      paymentDisplay = 'Phased Surgical & Prosthetic Milestones';
    } else {
      monthlyMin = calcMonthly(min, state.term);
      monthlyMax = calcMonthly(max, state.term);
      paymentDisplay = `${formatRange(monthlyMin, monthlyMax)} / mo`;
    }

    return {
      cfg,
      min,
      max,
      totalDisplay: formatRange(min, max),
      monthlyDisplay: paymentDisplay,
      lines
    };
  }

  function buildMailtoHref(extraPatientDetails) {
    const est = getEstimateData();
    const selectedOptions = [];
    if (state.cbct) selectedOptions.push('3D CBCT Consultation');
    if (state.graft) selectedOptions.push('Bone Grafting (if needed)');
    if (state.sedation) selectedOptions.push('IV Sedation');

    const termText = state.term === 0 ? 'Cash / Full Milestone Payment' : `${state.term} Months Financing`;
    const lines = [
      'Consultation Request: Scottsdale Center for Implant Dentistry',
      '',
      `Restoration Scope: ${est.cfg.label}`,
      `Selected Options: ${selectedOptions.length > 0 ? selectedOptions.join(', ') : 'None'}`,
      `Payment Preference: ${termText}`,
      `Estimated Investment Range: ${est.totalDisplay}`,
      `Estimated Monthly Range: ${est.monthlyDisplay}`
    ];

    if (extraPatientDetails) {
      lines.push('');
      lines.push(`Patient Name: ${extraPatientDetails.name}`);
      lines.push(`Phone: ${extraPatientDetails.phone}`);
      lines.push(`Email: ${extraPatientDetails.email}`);
      lines.push(`Preferred Visit Window: ${extraPatientDetails.window}`);
      if (extraPatientDetails.notes) {
        lines.push(`Notes: ${extraPatientDetails.notes}`);
      }
    }

    const subject = encodeURIComponent(`Implant Consultation Request - ${est.cfg.label}`);
    const body = encodeURIComponent(lines.join('\n'));
    return `mailto:info@michaellbleekerdmd.com?subject=${subject}&body=${body}`;
  }

  function render() {
    const est = getEstimateData();

    scopeButtons.forEach((btn) => {
      const isSelected = btn.dataset.scope === state.scope;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-checked', String(isSelected));
    });

    termButtons.forEach((btn) => {
      const termVal = Number(btn.dataset.term);
      const isSelected = termVal === state.term;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-checked', String(isSelected));
    });

    feeCbct.textContent = `+${formatRange(est.cfg.cbctMin, est.cfg.cbctMax)}`;
    feeGraft.textContent = `+${formatRange(est.cfg.graftMin, est.cfg.graftMax)}`;
    feeSedation.textContent = `+${formatRange(est.cfg.sedationMin, est.cfg.sedationMax)}`;

    summaryTag.textContent = est.cfg.label;
    summaryTotal.textContent = est.totalDisplay;

    if (state.term === 0) {
      summaryTermBadge.textContent = 'Cash / Full';
      monthlyLabel.textContent = 'Direct Payment Structure';
      summaryMonthly.textContent = est.monthlyDisplay;
      monthlyFootnote.textContent = 'Zero financing fees when paid in full or split across surgical placement and final prosthetic delivery milestones.';
    } else {
      summaryTermBadge.textContent = `${state.term}-Mo Plan`;
      monthlyLabel.textContent = `Estimated Monthly Payment (${state.term} Mos)`;
      summaryMonthly.textContent = est.monthlyDisplay;
      monthlyFootnote.textContent = 'Calculated at 8.99% representative APR with $0 down. Qualified applicants may access 0% promotional periods through CareCredit or Cherry.';
    }

    breakdownList.textContent = '';
    est.lines.forEach((line) => {
      const li = document.createElement('li');
      if (!line.active) {
        li.className = 'is-muted';
      }
      const spanName = document.createElement('span');
      spanName.textContent = line.label;

      const spanVal = document.createElement('span');
      spanVal.className = 'mono-num';
      spanVal.textContent = line.value;

      li.appendChild(spanName);
      li.appendChild(spanVal);
      breakdownList.appendChild(li);
    });

    directMailLink.href = buildMailtoHref(null);
  }

  // Event Listeners
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.hidden = expanded;
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  scopeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextScope = btn.dataset.scope;
      if (nextScope && SCOPES[nextScope]) {
        state.scope = nextScope;
        render();
      }
    });
  });

  procSelectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetScope = btn.dataset.selectScope;
      if (targetScope && SCOPES[targetScope]) {
        state.scope = targetScope;
        render();
        const estimatorEl = document.getElementById('estimator');
        if (estimatorEl) {
          estimatorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  termButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTerm = Number(btn.dataset.term);
      if ([0, 24, 48, 60].includes(nextTerm)) {
        state.term = nextTerm;
        render();
      }
    });
  });

  if (optCbct) {
    optCbct.addEventListener('change', () => {
      state.cbct = optCbct.checked;
      render();
    });
  }

  if (optGraft) {
    optGraft.addEventListener('change', () => {
      state.graft = optGraft.checked;
      render();
    });
  }

  if (optSedation) {
    optSedation.addEventListener('change', () => {
      state.sedation = optSedation.checked;
      render();
    });
  }

  if (consultForm) {
    consultForm.addEventListener('submit', (event) => {
      event.preventDefault();
      formError.hidden = true;
      formError.textContent = '';

      const nameVal = patientName.value.trim();
      const phoneVal = patientPhone.value.trim();
      const emailVal = patientEmail.value.trim();
      const windowVal = preferredWindow.value;
      const notesVal = clinicalNotes.value.trim();

      if (nameVal.length < 2) {
        formError.textContent = 'Please enter your full name to prepare the consultation request.';
        formError.hidden = false;
        patientName.focus();
        return;
      }

      if (phoneVal.length < 7) {
        formError.textContent = 'Please enter a valid contact phone number.';
        formError.hidden = false;
        patientPhone.focus();
        return;
      }

      if (!emailVal.includes('@') || !emailVal.includes('.')) {
        formError.textContent = 'Please enter a valid email address.';
        formError.hidden = false;
        patientEmail.focus();
        return;
      }

      const est = getEstimateData();
      const mailHref = buildMailtoHref({
        name: nameVal,
        phone: phoneVal,
        email: emailVal,
        window: windowVal,
        notes: notesVal
      });

      const termSummary = state.term === 0 ? 'Cash or phased milestone payment' : `${state.term}-month financing plan`;
      confirmSummaryText.textContent = `Prepared for ${nameVal} (${phoneVal}). Selected scope: ${est.cfg.label} at ${est.totalDisplay} (${termSummary}). Use the email button below or call (480) 306-8510 to confirm your ${windowVal} visit.`;
      confirmMailto.href = mailHref;

      consultForm.hidden = true;
      consultConfirmation.hidden = false;
    });
  }

  if (editEstimateBtn) {
    editEstimateBtn.addEventListener('click', () => {
      consultConfirmation.hidden = true;
      consultForm.hidden = false;
    });
  }

  render();
})();
