(function () {
  'use strict';

  var MATERIALS = {
    shingles: {
      label: 'Architectural Shingles Scope',
      shortName: 'Architectural Shingles',
      ratePerSq: 385,
      tearOffRate: 56,
      warranty: 'Lifetime Workmanship Warranty + GAF Golden Pledge / System Plus Eligible'
    },
    metal: {
      label: 'Standing Seam Metal Scope',
      shortName: 'Standing Seam Metal',
      ratePerSq: 890,
      tearOffRate: 58,
      warranty: 'Lifetime Workmanship Warranty + Cool-Roof Metal Finish Coverage'
    },
    tpo: {
      label: 'Commercial TPO / Flat Membrane Scope',
      shortName: 'Commercial TPO / Flat',
      ratePerSq: 620,
      tearOffRate: 68,
      warranty: 'Written Workmanship Warranty + GAF Diamond Pledge NDL (Up to 25 Yrs)'
    },
    storm: {
      label: 'Storm & Hail Restoration Scope',
      shortName: 'Storm Repair & Claim Assessment',
      ratePerSq: 195,
      baseMobilization: 950,
      tearOffRate: 34,
      warranty: 'Written Repair Workmanship Guarantee + Full Adjuster Photo Packet'
    }
  };

  var PITCH_CONFIG = {
    low: {
      label: 'Low (2/12 - 4/12)',
      areaFactor: 1.13,
      laborFactor: 1.00
    },
    standard: {
      label: 'Standard (5/12 - 7/12)',
      areaFactor: 1.22,
      laborFactor: 1.04
    },
    steep: {
      label: 'Steep (8/12 - 12/12)',
      areaFactor: 1.38,
      laborFactor: 1.15
    }
  };

  var STORY_CONFIG = {
    1: {
      label: '1 Story',
      planRatio: 1.05,
      accessFactor: 1.00
    },
    2: {
      label: '2 Stories',
      planRatio: 0.62,
      accessFactor: 1.08
    },
    3: {
      label: '3+ Stories',
      planRatio: 0.48,
      accessFactor: 1.17
    }
  };

  var COUNTY_CONFIG = {
    davidson: {
      badge: 'DAVIDSON COUNTY',
      cityDefault: 'Nashville',
      label: 'Davidson County (Nashville / Madison / Goodlettsville)'
    },
    williamson: {
      badge: 'WILLIAMSON COUNTY',
      cityDefault: 'Brentwood',
      label: 'Williamson County (Brentwood / Franklin / Spring Hill)'
    },
    sumner: {
      badge: 'SUMNER COUNTY',
      cityDefault: 'Hendersonville',
      label: 'Sumner County (Hendersonville / Gallatin)'
    },
    wilson: {
      badge: 'WILSON COUNTY',
      cityDefault: 'Mount Juliet',
      label: 'Wilson County (Mount Juliet / Lebanon)'
    }
  };

  var TERMS = {
    60: { months: 60, apr: 0.0799, label: '60 mos @ 7.99% APR' },
    120: { months: 120, apr: 0.0849, label: '120 mos @ 8.49% APR' },
    144: { months: 144, apr: 0.0899, label: '144 mos @ 8.99% APR' }
  };

  var els = {
    navToggle: document.getElementById('navToggle'),
    mobileNav: document.getElementById('mobileNav'),
    sqftSlider: document.getElementById('sqftSlider'),
    sqftDisplay: document.getElementById('sqftDisplay'),
    presetBtns: document.querySelectorAll('.preset-btn'),
    pitchRadios: document.querySelectorAll('input[name="pitch"]'),
    storyRadios: document.querySelectorAll('input[name="stories"]'),
    materialRadios: document.querySelectorAll('input[name="material"]'),
    pitchNote: document.getElementById('pitchNote'),
    optTearOff: document.getElementById('optTearOff'),
    optGutters: document.getElementById('optGutters'),
    optVentilation: document.getElementById('optVentilation'),
    countySelect: document.getElementById('countySelect'),
    termSelect: document.getElementById('termSelect'),
    geometrySummary: document.getElementById('geometrySummary'),
    resultMaterialTitle: document.getElementById('resultMaterialTitle'),
    zoneBadge: document.getElementById('zoneBadge'),
    priceRange: document.getElementById('priceRange'),
    priceMidpoint: document.getElementById('priceMidpoint'),
    monthlyPayment: document.getElementById('monthlyPayment'),
    monthlyTermLabel: document.getElementById('monthlyTermLabel'),
    installTimeline: document.getElementById('installTimeline'),
    roofSquares: document.getElementById('roofSquares'),
    roofAdjustedSqft: document.getElementById('roofAdjustedSqft'),
    breakdownList: document.getElementById('breakdownList'),
    warrantySummary: document.getElementById('warrantySummary'),
    mailtoDirectBtn: document.getElementById('mailtoDirectBtn'),
    inspectionForm: document.getElementById('inspectionForm'),
    leadName: document.getElementById('leadName'),
    leadPhone: document.getElementById('leadPhone'),
    leadEmail: document.getElementById('leadEmail'),
    leadWindow: document.getElementById('leadWindow'),
    leadStreet: document.getElementById('leadStreet'),
    leadCity: document.getElementById('leadCity'),
    leadZip: document.getElementById('leadZip'),
    leadNotes: document.getElementById('leadNotes'),
    formFeedback: document.getElementById('formFeedback')
  };

  var cityTouched = false;
  var latestEstimate = null;

  function formatCurrency(val) {
    return '$' + Math.round(val).toLocaleString('en-US');
  }

  function roundTo10(val) {
    return Math.round(val / 10) * 10;
  }

  function getCheckedValue(nodeList, fallback) {
    for (var i = 0; i < nodeList.length; i += 1) {
      if (nodeList[i].checked) {
        return nodeList[i].value;
      }
    }
    return fallback;
  }

  function computeMonthlyPayment(principal, months, apr) {
    var r = apr / 12;
    if (r === 0) {
      return principal / months;
    }
    var factor = Math.pow(1 + r, months);
    return principal * ((r * factor) / (factor - 1));
  }

  function getTimeline(materialKey, squares, stories) {
    if (materialKey === 'storm') {
      return 'Same-Day Tarping / 1 - 2 Days';
    }
    if (materialKey === 'metal') {
      if (squares <= 24) return '2 - 4 Days';
      if (squares <= 38) return '4 - 6 Days';
      return '5 - 7 Days';
    }
    if (materialKey === 'tpo') {
      if (squares <= 26) return '2 - 4 Days';
      if (squares <= 42) return '4 - 6 Days';
      return '6 - 9 Days (Phased)';
    }
    if (squares <= 25 && stories === 1) return '1 - 2 Days';
    if (squares <= 40) return '2 - 3 Days';
    return '3 - 4 Days';
  }

  function updateSliderProgress(sqft) {
    var min = Number(els.sqftSlider.min) || 1200;
    var max = Number(els.sqftSlider.max) || 5500;
    var pct = ((sqft - min) / (max - min)) * 100;
    els.sqftSlider.style.setProperty('--slider-pct', pct.toFixed(1) + '%');

    for (var i = 0; i < els.presetBtns.length; i += 1) {
      var btn = els.presetBtns[i];
      var presetVal = Number(btn.getAttribute('data-sqft'));
      btn.classList.toggle('is-active', presetVal === sqft);
    }
  }

  function buildMailtoHref(state, contact) {
    var subject = 'Roof Inspection & Estimate Request - ' + state.materialSpec.shortName + ' (' + state.sqft.toLocaleString('en-US') + ' sq ft)';
    var lines = [
      'Nashville Roofing Company - Inspection & Estimate Request',
      '-------------------------------------------------------',
      'Estimated System: ' + state.materialSpec.shortName,
      'Home Area: ' + state.sqft.toLocaleString('en-US') + ' sq ft (' + state.storySpec.label + ')',
      'Roof Pitch: ' + state.pitchSpec.label,
      'Calculated Roof Area: ' + state.adjustedSqft.toLocaleString('en-US') + ' sq ft (' + state.squares.toFixed(1) + ' Roofing Squares)',
      'Tear-Off & Decking Audit: ' + (state.tearOff ? 'Included' : 'Excluded'),
      'Seamless Gutters: ' + (state.gutters ? 'Included (' + state.perimeterFt + ' lf est.)' : 'No'),
      'Balanced Ventilation: ' + (state.ventilation ? 'Included' : 'Standard'),
      'Service Zone: ' + state.countySpec.label,
      'Preliminary USD Estimate: ' + formatCurrency(state.lowUSD) + ' - ' + formatCurrency(state.highUSD),
      'Estimated Monthly Financing: ' + formatCurrency(state.monthlyUSD) + '/mo (' + state.termSpec.label + ')',
      'Estimated Timeline: ' + state.timeline
    ];

    if (contact) {
      lines.push('');
      lines.push('Property & Contact Details:');
      lines.push('Name: ' + contact.name);
      lines.push('Phone: ' + contact.phone);
      lines.push('Email: ' + contact.email);
      lines.push('Address: ' + contact.street + ', ' + contact.city + ', TN ' + contact.zip);
      lines.push('Preferred Window: ' + contact.window);
      if (contact.notes) {
        lines.push('Notes: ' + contact.notes);
      }
      lines.push('Reference ID: ' + contact.refId);
    }

    return 'mailto:info@nashvilleroofingco.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function renderBreakdown(items) {
    els.breakdownList.textContent = '';
    for (var i = 0; i < items.length; i += 1) {
      var li = document.createElement('li');
      var labelSpan = document.createElement('span');
      labelSpan.textContent = items[i].label;
      var valueSpan = document.createElement('span');
      valueSpan.className = 'mono-num';
      valueSpan.textContent = formatCurrency(items[i].amount);
      li.appendChild(labelSpan);
      li.appendChild(valueSpan);
      els.breakdownList.appendChild(li);
    }
  }

  function calculateAndRender() {
    var sqft = Number(els.sqftSlider.value);
    var pitchKey = getCheckedValue(els.pitchRadios, 'standard');
    var stories = Number(getCheckedValue(els.storyRadios, '1'));
    var materialKey = getCheckedValue(els.materialRadios, 'shingles');
    var tearOff = Boolean(els.optTearOff.checked);
    var gutters = Boolean(els.optGutters.checked);
    var ventilation = Boolean(els.optVentilation.checked);
    var countyKey = els.countySelect.value || 'davidson';
    var termKey = Number(els.termSelect.value) || 120;

    var materialSpec = MATERIALS[materialKey] || MATERIALS.shingles;
    var pitchSpec = PITCH_CONFIG[pitchKey] || PITCH_CONFIG.standard;
    var storySpec = STORY_CONFIG[stories] || STORY_CONFIG[1];
    var countySpec = COUNTY_CONFIG[countyKey] || COUNTY_CONFIG.davidson;
    var termSpec = TERMS[termKey] || TERMS[120];

    var isTpo = materialKey === 'tpo';
    els.pitchNote.hidden = !(isTpo && pitchKey !== 'low');

    var effectiveAreaFactor = isTpo ? 1.07 : pitchSpec.areaFactor;
    var effectiveLaborFactor = isTpo ? 1.00 : pitchSpec.laborFactor;

    var planSqft = Math.round(sqft * storySpec.planRatio);
    var adjustedSqft = Math.round(planSqft * effectiveAreaFactor);
    var squares = Math.max(10, Math.round((adjustedSqft / 100) * 10) / 10);

    var baseSystemCost = Math.round(
      squares * materialSpec.ratePerSq * effectiveLaborFactor * storySpec.accessFactor +
      (materialSpec.baseMobilization || 0)
    );

    var tearOffCost = tearOff
      ? Math.max(650, Math.round(squares * materialSpec.tearOffRate * storySpec.accessFactor))
      : 0;

    var perimeterFt = Math.round(Math.sqrt(planSqft) * 4.2);
    var guttersCost = gutters ? Math.round(perimeterFt * 12.5) : 0;
    var ventilationCost = ventilation ? Math.round(750 + squares * 14) : 0;

    var midpoint = baseSystemCost + tearOffCost + guttersCost + ventilationCost;
    var lowUSD = roundTo10(midpoint * 0.93);
    var highUSD = roundTo10(midpoint * 1.07);
    var perSquare = Math.round(midpoint / squares);
    var monthlyUSD = Math.round(computeMonthlyPayment(midpoint, termSpec.months, termSpec.apr));
    var timeline = getTimeline(materialKey, squares, stories);

    els.sqftDisplay.textContent = sqft.toLocaleString('en-US');
    updateSliderProgress(sqft);

    els.geometrySummary.textContent =
      'Roof Plan: ' + planSqft.toLocaleString('en-US') + ' sq ft | Adjusted Slope Area: ' +
      adjustedSqft.toLocaleString('en-US') + ' sq ft (' + squares.toFixed(1) + ' Squares)';

    els.resultMaterialTitle.textContent = materialSpec.label;
    els.zoneBadge.textContent = countySpec.badge;
    els.priceRange.textContent = formatCurrency(lowUSD) + ' - ' + formatCurrency(highUSD);
    els.priceMidpoint.textContent =
      'Midpoint Estimate: ' + formatCurrency(midpoint) + ' (' + formatCurrency(perSquare) + ' / roofing square effective)';

    els.monthlyPayment.textContent = formatCurrency(monthlyUSD) + '/mo';
    els.monthlyTermLabel.textContent = termSpec.label;
    els.installTimeline.textContent = timeline;
    els.roofSquares.textContent = squares.toFixed(1) + ' sq';
    els.roofAdjustedSqft.textContent = adjustedSqft.toLocaleString('en-US') + ' sq ft slope';

    var breakdownItems = [
      {
        label: materialKey === 'storm'
          ? 'Storm Restoration Scope, Flashing & Claim Documentation'
          : materialSpec.shortName + ' System & Underlayment (' + squares.toFixed(1) + ' sq)',
        amount: baseSystemCost
      }
    ];

    if (tearOff) {
      breakdownItems.push({
        label: materialKey === 'storm'
          ? 'Damaged Section Tear-Off & Ice/Water Shield'
          : 'Full Layer Tear-Off, Disposal & Wood Decking Audit',
        amount: tearOffCost
      });
    }

    if (gutters) {
      breakdownItems.push({
        label: 'Seamless Aluminum Gutters & Downspouts (' + perimeterFt + ' lf est.)',
        amount: guttersCost
      });
    }

    if (ventilation) {
      breakdownItems.push({
        label: 'Balanced Intake Soffit & Ridge Exhaust Ventilation',
        amount: ventilationCost
      });
    }

    renderBreakdown(breakdownItems);
    els.warrantySummary.textContent = materialSpec.warranty;

    latestEstimate = {
      sqft: sqft,
      planSqft: planSqft,
      adjustedSqft: adjustedSqft,
      squares: squares,
      perimeterFt: perimeterFt,
      materialKey: materialKey,
      materialSpec: materialSpec,
      pitchKey: pitchKey,
      pitchSpec: pitchSpec,
      stories: stories,
      storySpec: storySpec,
      tearOff: tearOff,
      gutters: gutters,
      ventilation: ventilation,
      countyKey: countyKey,
      countySpec: countySpec,
      termSpec: termSpec,
      midpoint: midpoint,
      lowUSD: lowUSD,
      highUSD: highUSD,
      monthlyUSD: monthlyUSD,
      timeline: timeline
    };

    els.mailtoDirectBtn.setAttribute('href', buildMailtoHref(latestEstimate, null));
  }

  function showFormFeedback(isError, titleText, detailText, mailHref) {
    els.formFeedback.hidden = false;
    els.formFeedback.className = 'form-feedback ' + (isError ? 'is-error' : 'is-success');
    els.formFeedback.textContent = '';

    var strong = document.createElement('strong');
    strong.textContent = titleText;
    els.formFeedback.appendChild(strong);

    var p = document.createElement('p');
    p.style.marginTop = '4px';
    p.textContent = detailText;
    els.formFeedback.appendChild(p);

    if (!isError && mailHref) {
      var actions = document.createElement('div');
      actions.className = 'feedback-actions';

      var mailBtn = document.createElement('a');
      mailBtn.className = 'btn btn-primary btn-sm';
      mailBtn.href = mailHref;
      mailBtn.textContent = 'Send Estimate Packet via Email';

      var callBtn = document.createElement('a');
      callBtn.className = 'btn btn-outline btn-sm';
      callBtn.href = 'tel:+16158004355';
      callBtn.textContent = 'Call +1-615-800-4355';

      actions.appendChild(mailBtn);
      actions.appendChild(callBtn);
      els.formFeedback.appendChild(actions);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    var name = els.leadName.value.trim();
    var phone = els.leadPhone.value.trim();
    var email = els.leadEmail.value.trim();
    var street = els.leadStreet.value.trim();
    var city = els.leadCity.value.trim();
    var zip = els.leadZip.value.trim();
    var windowChoice = els.leadWindow.value;
    var notes = els.leadNotes.value.trim();

    var digitsOnly = phone.replace(/\D/g, '');
    if (name.length < 2) {
      showFormFeedback(true, 'Contact Name Required', 'Please enter your full name so our Nashville desk can address your inspection report.');
      els.leadName.focus();
      return;
    }
    if (digitsOnly.length < 7) {
      showFormFeedback(true, 'Valid Phone Number Required', 'Please provide a 10-digit callback number or call +1-615-800-4355 directly.');
      els.leadPhone.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormFeedback(true, 'Valid Email Address Required', 'Please enter a valid email address for your written inspection packet.');
      els.leadEmail.focus();
      return;
    }
    if (street.length < 4 || city.length < 2 || zip.length < 5) {
      showFormFeedback(true, 'Property Address Required', 'Please include the street address, city, and 5-digit Tennessee ZIP code for dispatch routing.');
      els.leadStreet.focus();
      return;
    }

    var refId = 'NRC-' + String(Math.floor(100000 + Math.random() * 900000));
    var mailHref = buildMailtoHref(latestEstimate, {
      name: name,
      phone: phone,
      email: email,
      street: street,
      city: city,
      zip: zip,
      window: windowChoice,
      notes: notes,
      refId: refId
    });

    showFormFeedback(
      false,
      'Inspection Packet Prepared (' + refId + ')',
      'Your ' + latestEstimate.materialSpec.shortName + ' scope (' +
        formatCurrency(latestEstimate.lowUSD) + ' - ' + formatCurrency(latestEstimate.highUSD) +
        ') for ' + street + ', ' + city + ' TN ' + zip +
        ' is ready. Click below to open your pre-filled email to info@nashvilleroofingco.com or call our office during business hours (MON-TH 8am-5pm / FRI 8am-3pm).',
      mailHref
    );
  }

  function bindEvents() {
    if (els.navToggle && els.mobileNav) {
      els.navToggle.addEventListener('click', function () {
        var expanded = els.navToggle.getAttribute('aria-expanded') === 'true';
        els.navToggle.setAttribute('aria-expanded', String(!expanded));
        els.mobileNav.hidden = expanded;
      });

      var mobileLinks = els.mobileNav.querySelectorAll('a');
      for (var i = 0; i < mobileLinks.length; i += 1) {
        mobileLinks[i].addEventListener('click', function () {
          els.navToggle.setAttribute('aria-expanded', 'false');
          els.mobileNav.hidden = true;
        });
      }
    }

    els.sqftSlider.addEventListener('input', calculateAndRender);

    for (var p = 0; p < els.presetBtns.length; p += 1) {
      els.presetBtns[p].addEventListener('click', function (e) {
        var val = e.currentTarget.getAttribute('data-sqft');
        els.sqftSlider.value = val;
        calculateAndRender();
      });
    }

    var allInputs = [].concat(
      Array.prototype.slice.call(els.pitchRadios),
      Array.prototype.slice.call(els.storyRadios),
      Array.prototype.slice.call(els.materialRadios),
      [els.optTearOff, els.optGutters, els.optVentilation, els.countySelect, els.termSelect]
    );

    for (var k = 0; k < allInputs.length; k += 1) {
      allInputs[k].addEventListener('change', calculateAndRender);
    }

    els.leadCity.addEventListener('input', function () {
      cityTouched = true;
    });

    els.countySelect.addEventListener('change', function () {
      if (!cityTouched) {
        var c = COUNTY_CONFIG[els.countySelect.value];
        if (c) {
          els.leadCity.value = c.cityDefault;
        }
      }
    });

    els.inspectionForm.addEventListener('submit', handleFormSubmit);
  }

  bindEvents();
  calculateAndRender();
})();
