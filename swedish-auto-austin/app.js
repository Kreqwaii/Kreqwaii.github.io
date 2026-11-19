(() => {
  'use strict';

  const VEHICLE_CATALOG = {
    volvo: {
      label: 'Volvo',
      multiplier: 1.0,
      dealerMarkup: 1.38,
      models: ['XC60', 'XC90', 'S60', 'V60', 'S90', 'XC40', 'V90']
    },
    saab: {
      label: 'Saab',
      multiplier: 1.04,
      dealerMarkup: 1.35,
      models: ['9-3 Sedan / SportCombi', '9-5 Sedan', '9-4X Crossover']
    },
    subaru: {
      label: 'Subaru',
      multiplier: 0.9,
      dealerMarkup: 1.32,
      models: ['Outback', 'Forester', 'Crosstrek', 'Legacy', 'WRX']
    },
    bmw: {
      label: 'BMW',
      multiplier: 1.14,
      dealerMarkup: 1.42,
      models: ['3 Series (328i / 330i)', '5 Series (530i / 540i)', 'X3', 'X5']
    },
    mercedes: {
      label: 'Mercedes-Benz',
      multiplier: 1.18,
      dealerMarkup: 1.44,
      models: ['C-Class (C300)', 'E-Class (E350)', 'GLC 300', 'GLE 350']
    },
    lexus: {
      label: 'Lexus / Infiniti',
      multiplier: 0.98,
      dealerMarkup: 1.36,
      models: ['Lexus RX 350', 'Lexus ES 350', 'Lexus IS 300', 'Infiniti Q50', 'Infiniti QX60']
    }
  };

  const SERVICES_CATALOG = [
    {
      id: 'scheduled_oil',
      title: 'Scheduled Maintenance & Oil',
      tag: 'Synthetic + OEM filter',
      minBase: 145,
      maxBase: 215,
      hours: [1.0, 1.5],
      defaultSelected: true,
      checks: ['Full synthetic Euro-spec motor oil & OEM filter', 'Fluid levels, belts, battery load & tire pressure check']
    },
    {
      id: 'brakes',
      title: 'Brake Pads & Rotors (Axle)',
      tag: 'OEM pads + coated rotors',
      minBase: 410,
      maxBase: 540,
      hours: [2.0, 3.0],
      defaultSelected: false,
      checks: ['OEM brake pad & coated rotor replacement', 'Caliper slide lubrication & hydraulic line check']
    },
    {
      id: 'check_engine',
      title: 'Engine / Check Engine Scan',
      tag: 'Factory-grade diagnostics',
      minBase: 135,
      maxBase: 195,
      hours: [1.0, 1.5],
      defaultSelected: false,
      checks: ['Full ECU fault scan & live sensor telemetry', 'Smoke-test / boost-leak or ignition coil verification']
    },
    {
      id: 'ac_service',
      title: 'A/C Performance & Recharge',
      tag: 'Texas climate service',
      minBase: 195,
      maxBase: 295,
      hours: [1.5, 2.0],
      defaultSelected: false,
      checks: ['Refrigerant evacuation, vacuum leak test & recharge', 'Compressor clutch & cabin filter airflow inspection']
    },
    {
      id: 'transmission',
      title: 'Transmission / Clutch Service',
      tag: 'Fluid exchange or clutch',
      minBase: 320,
      maxBase: 490,
      hours: [2.0, 3.5],
      defaultSelected: false,
      checks: ['OEM transmission / Haldex AWD fluid service', 'Mount integrity & shift-quality road verification']
    },
    {
      id: 'suspension',
      title: 'Suspension & Steering',
      tag: 'Struts, bushings, arms',
      minBase: 390,
      maxBase: 620,
      hours: [2.5, 4.0],
      defaultSelected: false,
      checks: ['Control arm bushing & strut mount inspection', 'Steering tie-rod play & chassis torque check']
    },
    {
      id: 'electrical',
      title: 'Electrical System Repair',
      tag: 'Battery, alternator, CAN',
      minBase: 165,
      maxBase: 340,
      hours: [1.5, 2.5],
      defaultSelected: false,
      checks: ['Charging output & parasitic draw load testing', 'Module wiring, fuse relay & grounding diagnostics']
    },
    {
      id: 'bodywork',
      title: 'Auto Body / Scratch & Panel',
      tag: 'Bodywork division',
      minBase: 360,
      maxBase: 790,
      hours: [3.0, 8.0],
      defaultSelected: false,
      checks: ['Color-matched clear-coat blending or panel restoration', 'Bumper alignment, trim fitment & exterior finish check']
    }
  ];

  const MILEAGE_NOTES = {
    15000: '15,000 mi interval: Synthetic oil service, cabin air filter, tire rotation, and brake pad thickness check.',
    30000: '30,000 mi interval: Cabin & engine air filters, brake fluid flush, and chassis inspection.',
    45000: '45,000 mi interval: Synthetic service, coolant concentration test, and belt/hose inspection.',
    60000: '60,000 mi major interval: Spark plugs (platform dependent), transmission/AWD fluid service, and brake fluid flush.',
    75000: '75,000 mi interval: Suspension bushing check, cooling hoses, battery health, and fluid top-offs.',
    90000: '90,000 mi major interval: Timing belt/chain inspection, drive belt, PCV/breather system, and drivetrain fluids.',
    105000: '105,000 mi interval: Timing service verification (if due at 105k/120k), water pump check, and motor mounts.',
    120000: '120,000 mi major interval: Full driveline fluids, spark plugs, cooling system hoses, and strut inspection.',
    135000: '135,000+ mi inspection: Oil leak seals, suspension wear items, alternator load test, and A/C efficiency.',
    150000: '150,000+ mi high-mileage care: Comprehensive seal, cooling, drivetrain, and chassis restoration plan.'
  };

  const state = {
    make: 'volvo',
    model: 'XC60',
    mileage: 60000,
    selectedServices: new Set(['scheduled_oil'])
  };

  // DOM References
  const makeChips = document.querySelectorAll('.make-chip');
  const makeSelect = document.getElementById('makeSelect');
  const modelSelect = document.getElementById('modelSelect');
  const mileageRange = document.getElementById('mileageRange');
  const mileageReadout = document.getElementById('mileageReadout');
  const intervalHint = document.getElementById('intervalHint');
  const serviceSelectorGrid = document.getElementById('serviceSelectorGrid');
  const resetServicesBtn = document.getElementById('resetServicesBtn');

  const shopEstimateRange = document.getElementById('shopEstimateRange');
  const dealerEstimateRange = document.getElementById('dealerEstimateRange');
  const savingsBadge = document.getElementById('savingsBadge');
  const shopBarFill = document.getElementById('shopBarFill');
  const bayTimeReadout = document.getElementById('bayTimeReadout');
  const recommendedChecklist = document.getElementById('recommendedChecklist');

  const syncedVehicleText = document.getElementById('syncedVehicleText');
  const syncedServicesText = document.getElementById('syncedServicesText');
  const syncedCostText = document.getElementById('syncedCostText');

  const dropoffForm = document.getElementById('dropoffForm');
  const dropoffDateInput = document.getElementById('dropoffDate');
  const formError = document.getElementById('formError');
  const mailtoQuickBtn = document.getElementById('mailtoQuickBtn');
  const confirmationBox = document.getElementById('confirmationBox');
  const confRefCode = document.getElementById('confRefCode');
  const confDetails = document.getElementById('confDetails');
  const confMailtoBtn = document.getElementById('confMailtoBtn');
  const editRequestBtn = document.getElementById('editRequestBtn');
  const copyAddressBtn = document.getElementById('copyAddressBtn');

  function formatCurrency(val) {
    return '$' + Math.round(val).toLocaleString('en-US');
  }

  function formatNumber(val) {
    return Number(val).toLocaleString('en-US');
  }

  function getMileageFactor(mileage) {
    if (mileage >= 120000) return 1.12;
    if (mileage >= 90000) return 1.08;
    if (mileage >= 60000) return 1.04;
    return 1.0;
  }

  function getNearestMileageNote(mileage) {
    const keys = Object.keys(MILEAGE_NOTES).map(Number).sort((a, b) => a - b);
    let best = keys[0];
    for (const k of keys) {
      if (Math.abs(k - mileage) <= Math.abs(best - mileage)) {
        best = k;
      }
    }
    return MILEAGE_NOTES[best];
  }

  function populateModels(makeKey) {
    const cfg = VEHICLE_CATALOG[makeKey];
    modelSelect.innerHTML = '';
    cfg.models.forEach((m) => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      modelSelect.appendChild(opt);
    });
    state.model = cfg.models[0];
    modelSelect.value = state.model;
  }

  function syncMakeUI(makeKey) {
    state.make = makeKey;
    makeSelect.value = makeKey;
    makeChips.forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.make === makeKey);
    });
    populateModels(makeKey);
    renderEstimate();
  }

  function renderServiceButtons() {
    serviceSelectorGrid.innerHTML = '';
    SERVICES_CATALOG.forEach((svc) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'service-option' + (state.selectedServices.has(svc.id) ? ' is-selected' : '');
      btn.dataset.serviceId = svc.id;
      btn.setAttribute('aria-pressed', String(state.selectedServices.has(svc.id)));

      const left = document.createElement('span');
      const title = document.createElement('span');
      title.className = 'svc-opt-title';
      title.textContent = svc.title;
      const tag = document.createElement('span');
      tag.className = 'svc-opt-tag';
      tag.textContent = svc.tag;
      left.appendChild(title);
      left.appendChild(tag);

      const price = document.createElement('span');
      price.className = 'svc-opt-price';
      const mult = VEHICLE_CATALOG[state.make].multiplier;
      price.textContent = formatCurrency(svc.minBase * mult) + '+';

      btn.appendChild(left);
      btn.appendChild(price);

      btn.addEventListener('click', () => {
        if (state.selectedServices.has(svc.id)) {
          if (state.selectedServices.size > 1) {
            state.selectedServices.delete(svc.id);
          }
        } else {
          state.selectedServices.add(svc.id);
        }
        renderServiceButtons();
        renderEstimate();
      });

      serviceSelectorGrid.appendChild(btn);
    });
  }

  function computeEstimate() {
    const vehicle = VEHICLE_CATALOG[state.make];
    const mileageFactor = getMileageFactor(state.mileage);
    let minTotal = 0;
    let maxTotal = 0;
    let minHours = 0;
    let maxHours = 0;
    const selectedTitles = [];
    const checkItems = [];

    SERVICES_CATALOG.forEach((svc) => {
      if (state.selectedServices.has(svc.id)) {
        const factor = vehicle.multiplier * (svc.id === 'bodywork' ? 1.0 : mileageFactor);
        minTotal += svc.minBase * factor;
        maxTotal += svc.maxBase * factor;
        minHours += svc.hours[0];
        maxHours += svc.hours[1];
        selectedTitles.push(svc.title);
        svc.checks.forEach((c) => checkItems.push(c));
      }
    });

    // Multi-service overlap efficiency discount (8% when 2+ services combined)
    if (state.selectedServices.size >= 2) {
      minTotal *= 0.92;
      maxTotal *= 0.92;
      minHours = Math.max(1.5, minHours - 0.5);
      maxHours = Math.max(2.0, maxHours - 0.5);
    }

    const dealerMin = minTotal * vehicle.dealerMarkup;
    const dealerMax = maxTotal * vehicle.dealerMarkup;
    const avgSavings = ((dealerMin + dealerMax) / 2) - ((minTotal + maxTotal) / 2);

    return {
      vehicleLabel: vehicle.label,
      minTotal: Math.round(minTotal / 5) * 5,
      maxTotal: Math.round(maxTotal / 5) * 5,
      dealerMin: Math.round(dealerMin / 5) * 5,
      dealerMax: Math.round(dealerMax / 5) * 5,
      avgSavings: Math.round(avgSavings / 5) * 5,
      minHours: minHours.toFixed(1).replace('.0', ''),
      maxHours: maxHours.toFixed(1).replace('.0', ''),
      selectedTitles,
      checkItems: checkItems.slice(0, 5)
    };
  }

  function buildMailtoHref(summaryObj, customerObj) {
    const subject = encodeURIComponent(
      'Service Drop-Off Request: ' + summaryObj.vehicleLabel + ' ' + state.model + ' (' + formatNumber(state.mileage) + ' mi)'
    );
    const lines = [
      'Swedish Auto Service - Online Drop-Off & Estimate Request',
      'Location: 11008 North Lamar Boulevard, Austin, TX 78758',
      '',
      'Vehicle: ' + summaryObj.vehicleLabel + ' ' + state.model + (customerObj && customerObj.year ? ' (' + customerObj.year + ')' : ''),
      'Mileage: ' + formatNumber(state.mileage) + ' mi',
      'Requested Services: ' + summaryObj.selectedTitles.join(', '),
      'Estimated Range: ' + formatCurrency(summaryObj.minTotal) + ' - ' + formatCurrency(summaryObj.maxTotal) + ' (1-Yr / 12k-Mi Warranty)'
    ];
    if (customerObj) {
      lines.push('');
      lines.push('Customer Name: ' + customerObj.name);
      lines.push('Phone: ' + customerObj.phone);
      lines.push('Email: ' + customerObj.email);
      lines.push('Preferred Date: ' + customerObj.date);
      lines.push('Drop-Off Window: ' + customerObj.window);
      lines.push('Loaner / Waiting Option: ' + customerObj.mobility);
      if (customerObj.notes) {
        lines.push('Notes: ' + customerObj.notes);
      }
    }
    const body = encodeURIComponent(lines.join('\n'));
    return 'mailto:info@swedishautoservice.com?subject=' + subject + '&body=' + body;
  }

  function renderEstimate() {
    const est = computeEstimate();
    const shopRangeStr = formatCurrency(est.minTotal) + ' - ' + formatCurrency(est.maxTotal);
    const dealerRangeStr = formatCurrency(est.dealerMin) + ' - ' + formatCurrency(est.dealerMax);

    shopEstimateRange.textContent = shopRangeStr;
    dealerEstimateRange.textContent = dealerRangeStr;
    savingsBadge.textContent = 'Save ~' + formatCurrency(est.avgSavings) + ' vs. Dealer';

    const ratioPct = Math.round(((est.minTotal + est.maxTotal) / (est.dealerMin + est.dealerMax)) * 100);
    shopBarFill.style.width = Math.min(90, Math.max(45, ratioPct)) + '%';

    bayTimeReadout.textContent = 'Est. Bay Time: ' + est.minHours + ' - ' + est.maxHours + ' hrs';
    mileageReadout.textContent = formatNumber(state.mileage) + ' mi';
    intervalHint.textContent = getNearestMileageNote(state.mileage);

    recommendedChecklist.innerHTML = '';
    est.checkItems.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      recommendedChecklist.appendChild(li);
    });
    if (state.mileage >= 60000) {
      const li = document.createElement('li');
      li.textContent = formatNumber(state.mileage) + ' mi interval inspection & OEM parts verification';
      recommendedChecklist.appendChild(li);
    }

    // Sync right-hand scheduler summary
    syncedVehicleText.textContent = est.vehicleLabel + ' ' + state.model + ' / ' + formatNumber(state.mileage) + ' mi';
    syncedServicesText.textContent = est.selectedTitles.join(' + ');
    syncedCostText.textContent = 'Est. ' + shopRangeStr + ' (Save ~' + formatCurrency(est.avgSavings) + ' vs. Dealer)';

    mailtoQuickBtn.href = buildMailtoHref(est, null);
  }

  // Event Listeners
  makeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      syncMakeUI(chip.dataset.make);
      renderServiceButtons();
    });
  });

  makeSelect.addEventListener('change', (e) => {
    syncMakeUI(e.target.value);
    renderServiceButtons();
  });

  modelSelect.addEventListener('change', (e) => {
    state.model = e.target.value;
    renderEstimate();
  });

  mileageRange.addEventListener('input', (e) => {
    state.mileage = Number(e.target.value);
    renderEstimate();
  });

  resetServicesBtn.addEventListener('click', () => {
    state.selectedServices = new Set(['scheduled_oil']);
    renderServiceButtons();
    renderEstimate();
  });

  document.querySelectorAll('[data-jump-make]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetMake = btn.dataset.jumpMake;
      syncMakeUI(targetMake);
      renderServiceButtons();
      document.getElementById('estimator').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-preset-body="true"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedServices.add('bodywork');
      renderServiceButtons();
      renderEstimate();
    });
  });

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addr = '11008 North Lamar Boulevard, Austin, TX 78758';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(() => {
          copyAddressBtn.textContent = 'Address Copied';
          setTimeout(() => {
            copyAddressBtn.textContent = 'Copy Address';
          }, 2200);
        });
      } else {
        copyAddressBtn.textContent = addr;
      }
    });
  }

  // Set default drop-off date to tomorrow (skipping Sunday if needed)
  function setDefaultDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) {
      d.setDate(d.getDate() + 1);
    }
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const minStr = yyyy + '-' + mm + '-' + dd;
    dropoffDateInput.min = minStr;
    dropoffDateInput.value = minStr;
  }

  dropoffForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formError.hidden = true;

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const year = document.getElementById('vehicleYear').value.trim();
    const dateVal = dropoffDateInput.value;
    const windowVal = document.getElementById('dropoffWindow').value;
    const mobilityVal = document.getElementById('mobilityOption').value;
    const notesVal = document.getElementById('driverNotes').value.trim();

    if (!name || !phone || !email || !dateVal) {
      formError.textContent = 'Please provide your name, phone number, email address, and preferred drop-off date.';
      formError.hidden = false;
      return;
    }

    const est = computeEstimate();
    const refNum = 'SAS-' + String(Math.floor(1000 + Math.random() * 8999));
    confRefCode.textContent = refNum;

    const rows = [
      ['Vehicle', (year ? year + ' ' : '') + est.vehicleLabel + ' ' + state.model + ' (' + formatNumber(state.mileage) + ' mi)'],
      ['Selected Scope', est.selectedTitles.join(', ')],
      ['Estimated Cost', formatCurrency(est.minTotal) + ' - ' + formatCurrency(est.maxTotal) + ' (1-Year / 12k-Mi Warranty)'],
      ['Drop-Off Schedule', dateVal + ' / ' + windowVal],
      ['Logistics', mobilityVal],
      ['Contact', name + ' / ' + phone + ' / ' + email]
    ];

    if (notesVal) {
      rows.push(['Driver Notes', notesVal]);
    }

    confDetails.innerHTML = '';
    rows.forEach(([k, v]) => {
      const div = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = k + ': ';
      const span = document.createElement('span');
      span.textContent = v;
      div.appendChild(strong);
      div.appendChild(span);
      confDetails.appendChild(div);
    });

    confMailtoBtn.href = buildMailtoHref(est, {
      name,
      phone,
      email,
      year,
      date: dateVal,
      window: windowVal,
      mobility: mobilityVal,
      notes: notesVal
    });

    dropoffForm.hidden = true;
    confirmationBox.hidden = false;
  });

  editRequestBtn.addEventListener('click', () => {
    confirmationBox.hidden = true;
    dropoffForm.hidden = false;
  });

  // Initialize
  setDefaultDate();
  syncMakeUI('volvo');
  renderServiceButtons();
  renderEstimate();
})();
