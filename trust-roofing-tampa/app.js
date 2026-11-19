(function () {
  'use strict';

  const MATERIALS = {
    shingle: {
      label: 'Florida Impact Shingle',
      minRate: 5.40,
      maxRate: 6.50,
      areaMultiplier: 1.22,
      windRating: '130+ mph FBC',
      durationSmall: '2 - 3 Working Days',
      durationLarge: '3 - 4 Working Days'
    },
    tile: {
      label: 'Concrete / Clay Tile',
      minRate: 10.50,
      maxRate: 13.20,
      areaMultiplier: 1.24,
      windRating: '150+ mph Uplift',
      durationSmall: '5 - 7 Working Days',
      durationLarge: '7 - 9 Working Days'
    },
    metal: {
      label: 'Standing Seam Metal',
      minRate: 11.80,
      maxRate: 14.60,
      areaMultiplier: 1.22,
      windRating: '160+ mph Coastal',
      durationSmall: '4 - 6 Working Days',
      durationLarge: '6 - 8 Working Days'
    },
    flat: {
      label: 'Flat / Modified Bitumen',
      minRate: 6.80,
      maxRate: 8.40,
      areaMultiplier: 1.08,
      windRating: 'Low-Slope FBC Rated',
      durationSmall: '2 - 4 Working Days',
      durationLarge: '4 - 5 Working Days'
    }
  };

  const AGE_FACTORS = {
    under10: {
      shortLabel: '0 - 9 yrs',
      pctAdd: 0.0,
      advisoryTitle: 'Preventative Maintenance & Early Storm Protection',
      advisoryBody: 'Roofs under 10 years old typically meet current Florida insurer age thresholds. If storm damage or localized flashing wear is suspected, a certified Trust Roofing inspection can determine whether targeted repair or early upgrade is most cost-effective.'
    },
    '10to14': {
      shortLabel: '10 - 14 yrs',
      pctAdd: 0.03,
      advisoryTitle: 'Pre-15-Year Florida Carrier Renewal Planning',
      advisoryBody: 'Between 10 and 14 years, many Tampa Bay insurers begin requesting roof condition updates ahead of renewal. Scheduling a pre-emptive replacement with OIR-B1-1802 Wind Mitigation locks in long-term insurability before emergency surcharges apply.'
    },
    '15plus': {
      shortLabel: '15+ yrs',
      pctAdd: 0.07,
      advisoryTitle: 'Florida 15+ Year Carrier Threshold Advisory',
      advisoryBody: 'Roofs aged 15+ years frequently face mandatory replacement or strict 4-Point scrutiny from Florida property insurers. This scope pairs full tear-off with Secondary Water Barrier and OIR-B1-1802 Wind Mitigation verification to support underwriting approval.'
    }
  };

  const MITIGATION_FEES = {
    none: {
      label: 'Standard FBC Permit Inspection Only',
      fee: 0
    },
    wind: {
      label: 'Certified Wind Mitigation (OIR-B1-1802)',
      fee: 225
    },
    combo: {
      label: 'Wind Mitigation + 4-Point Insurance Bundle',
      fee: 375
    }
  };

  const SWR_RATE_PER_SQFT = 0.55;
  const DEPOSIT_THRESHOLD = 30000;

  const els = {
    navToggle: document.getElementById('navToggle'),
    mobileDrawer: document.getElementById('mobileDrawer'),
    sqftSlider: document.getElementById('sqftSlider'),
    sqftInput: document.getElementById('sqftInput'),
    presetChips: document.querySelectorAll('.preset-chip'),
    materialRadios: document.querySelectorAll('input[name="roofMaterial"]'),
    materialCards: document.querySelectorAll('.material-radio-card'),
    systemSelectBtns: document.querySelectorAll('.select-system-btn'),
    roofAge: document.getElementById('roofAge'),
    mitigationPackage: document.getElementById('mitigationPackage'),
    swrUpgrade: document.getElementById('swrUpgrade'),
    estPriceRange: document.getElementById('estPriceRange'),
    depositBadge: document.getElementById('depositBadge'),
    depositBadgeText: document.getElementById('depositBadgeText'),
    estRoofArea: document.getElementById('estRoofArea'),
    estDuration: document.getElementById('estDuration'),
    estWindRating: document.getElementById('estWindRating'),
    lineBaseCost: document.getElementById('lineBaseCost'),
    ageLabelShort: document.getElementById('ageLabelShort'),
    lineAgeCost: document.getElementById('lineAgeCost'),
    lineSwrCost: document.getElementById('lineSwrCost'),
    lineMitCost: document.getElementById('lineMitCost'),
    advisoryTitle: document.getElementById('advisoryTitle'),
    advisoryBody: document.getElementById('advisoryBody'),
    inspectionForm: document.getElementById('inspectionForm'),
    leadName: document.getElementById('leadName'),
    leadPhone: document.getElementById('leadPhone'),
    leadEmail: document.getElementById('leadEmail'),
    leadWindow: document.getElementById('leadWindow'),
    leadAddress: document.getElementById('leadAddress'),
    leadZip: document.getElementById('leadZip'),
    leadNotes: document.getElementById('leadNotes'),
    formError: document.getElementById('formError'),
    directMailtoBtn: document.getElementById('directMailtoBtn'),
    bookingConfirmation: document.getElementById('bookingConfirmation'),
    confirmSummaryText: document.getElementById('confirmSummaryText'),
    confirmMailtoLink: document.getElementById('confirmMailtoLink')
  };

  let latestEstimate = null;

  function formatUSD(amount) {
    return '$' + Math.round(amount).toLocaleString('en-US');
  }

  function clampSqft(val) {
    const num = parseInt(val, 10);
    if (Number.isNaN(num)) {
      return 2400;
    }
    return Math.max(1400, Math.min(5500, Math.round(num / 100) * 100));
  }

  function getSelectedMaterialKey() {
    for (let i = 0; i < els.materialRadios.length; i += 1) {
      if (els.materialRadios[i].checked) {
        return els.materialRadios[i].value;
      }
    }
    return 'shingle';
  }

  function updateMaterialCardStyles() {
    els.materialCards.forEach(function (card) {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        card.classList.add('is-selected');
      } else {
        card.classList.remove('is-selected');
      }
    });
  }

  function updatePresetChipStyles(sqft) {
    els.presetChips.forEach(function (chip) {
      const chipVal = parseInt(chip.getAttribute('data-sqft'), 10);
      if (chipVal === sqft) {
        chip.classList.add('is-active');
      } else {
        chip.classList.remove('is-active');
      }
    });
  }

  function buildMailtoHref(includeLeadFields) {
    if (!latestEstimate) {
      return 'mailto:info@trustroofing.com';
    }
    const e = latestEstimate;
    const subject = 'Westchase Roof & Wind Mitigation Inspection Request - ' + e.materialLabel + ' (' + e.livingSqFt.toLocaleString('en-US') + ' sq ft)';
    const lines = [
      'Trust Roofing - Westchase Inspection Request',
      'Office: 12635 Race Track Road, Tampa, FL 33626 | (813) 640-4044',
      '',
      '--- ESTIMATOR CONFIGURATION ---',
      'Home Living Area: ' + e.livingSqFt.toLocaleString('en-US') + ' sq ft',
      'Derived Roof Surface: ' + e.roofArea.toLocaleString('en-US') + ' sq ft',
      'Selected Material: ' + e.materialLabel + ' (' + e.windRating + ')',
      'Current Roof Age: ' + e.ageShortLabel,
      'Secondary Water Barrier (SWR): ' + (e.swrIncluded ? 'Included' : 'Not Selected'),
      'Wind Mitigation / 4-Point: ' + e.mitigationLabel,
      'Estimated Investment Range: ' + formatUSD(e.totalLow) + ' - ' + formatUSD(e.totalHigh),
      'Estimated Build Time: ' + e.duration,
      'Deposit Policy: ' + e.depositStatus
    ];

    if (includeLeadFields) {
      lines.push('');
      lines.push('--- HOMEOWNER CONTACT DETAILS ---');
      lines.push('Name: ' + (els.leadName.value.trim() || 'Not provided'));
      lines.push('Phone: ' + (els.leadPhone.value.trim() || 'Not provided'));
      lines.push('Email: ' + (els.leadEmail.value.trim() || 'Not provided'));
      lines.push('Address: ' + (els.leadAddress.value.trim() || 'Westchase / Tampa') + ', FL ' + (els.leadZip.value.trim() || '33626'));
      lines.push('Preferred Window: ' + els.leadWindow.value);
      if (els.leadNotes.value.trim()) {
        lines.push('Notes: ' + els.leadNotes.value.trim());
      }
    }

    return 'mailto:info@trustroofing.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function recalculateEstimate() {
    const livingSqFt = clampSqft(els.sqftSlider.value);
    const matKey = getSelectedMaterialKey();
    const mat = MATERIALS[matKey] || MATERIALS.shingle;
    const ageKey = els.roofAge.value;
    const ageInfo = AGE_FACTORS[ageKey] || AGE_FACTORS['15plus'];
    const mitKey = els.mitigationPackage.value;
    const mitInfo = MITIGATION_FEES[mitKey] || MITIGATION_FEES.combo;
    const swrChecked = els.swrUpgrade.checked;

    const roofArea = Math.round(livingSqFt * mat.areaMultiplier);
    const baseLow = roofArea * mat.minRate;
    const baseHigh = roofArea * mat.maxRate;
    const midBase = (baseLow + baseHigh) / 2;
    const ageAllowance = Math.round(midBase * ageInfo.pctAdd);
    const swrCost = swrChecked ? Math.round(roofArea * SWR_RATE_PER_SQFT) : 0;
    const mitCost = mitInfo.fee;

    const totalLow = Math.round((baseLow + ageAllowance + swrCost + mitCost) / 50) * 50;
    const totalHigh = Math.round((baseHigh + ageAllowance + swrCost + mitCost) / 50) * 50;
    const duration = livingSqFt >= 3800 ? mat.durationLarge : mat.durationSmall;
    const underThreshold = totalLow < DEPOSIT_THRESHOLD;
    const depositStatus = underThreshold
      ? '$0 Deposit Required (Under $30K Policy)'
      : 'Milestone Schedule ($30,000+ Project)';

    latestEstimate = {
      livingSqFt: livingSqFt,
      roofArea: roofArea,
      materialLabel: mat.label,
      windRating: mat.windRating,
      ageShortLabel: ageInfo.shortLabel,
      swrIncluded: swrChecked,
      mitigationLabel: mitInfo.label,
      totalLow: totalLow,
      totalHigh: totalHigh,
      duration: duration,
      depositStatus: depositStatus
    };

    els.estPriceRange.textContent = formatUSD(totalLow) + ' - ' + formatUSD(totalHigh);
    els.depositBadgeText.textContent = depositStatus;
    els.estRoofArea.textContent = roofArea.toLocaleString('en-US') + ' sq ft';
    els.estDuration.textContent = duration;
    els.estWindRating.textContent = mat.windRating;

    els.lineBaseCost.textContent = formatUSD(baseLow) + ' - ' + formatUSD(baseHigh);
    els.ageLabelShort.textContent = ageInfo.shortLabel;
    els.lineAgeCost.textContent = ageAllowance > 0 ? '+' + formatUSD(ageAllowance) : '$0 (Standard)';
    els.lineSwrCost.textContent = swrCost > 0 ? '+' + formatUSD(swrCost) : '$0 (Excluded)';
    els.lineMitCost.textContent = mitCost > 0 ? '+' + formatUSD(mitCost) : '$0 (Permit Only)';

    els.advisoryTitle.textContent = ageInfo.advisoryTitle;
    els.advisoryBody.textContent = ageInfo.advisoryBody;

    updateMaterialCardStyles();
    updatePresetChipStyles(livingSqFt);
    els.directMailtoBtn.setAttribute('href', buildMailtoHref(false));
  }

  function setSqft(newVal, shouldSnapInput) {
    const clamped = clampSqft(newVal);
    els.sqftSlider.value = String(clamped);
    if (shouldSnapInput) {
      els.sqftInput.value = String(clamped);
    }
    recalculateEstimate();
  }

  if (els.navToggle && els.mobileDrawer) {
    els.navToggle.addEventListener('click', function () {
      const isHidden = els.mobileDrawer.hasAttribute('hidden');
      if (isHidden) {
        els.mobileDrawer.removeAttribute('hidden');
        els.navToggle.setAttribute('aria-expanded', 'true');
      } else {
        els.mobileDrawer.setAttribute('hidden', '');
        els.navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    els.mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        els.mobileDrawer.setAttribute('hidden', '');
        els.navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  els.sqftSlider.addEventListener('input', function () {
    setSqft(els.sqftSlider.value, true);
  });

  els.sqftInput.addEventListener('input', function () {
    const raw = parseInt(els.sqftInput.value, 10);
    if (!Number.isNaN(raw) && raw >= 1400 && raw <= 5500) {
      els.sqftSlider.value = String(Math.round(raw / 100) * 100);
      recalculateEstimate();
    }
  });

  els.sqftInput.addEventListener('blur', function () {
    setSqft(els.sqftInput.value, true);
  });

  els.presetChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const targetSqft = chip.getAttribute('data-sqft');
      setSqft(targetSqft, true);
    });
  });

  els.materialRadios.forEach(function (radio) {
    radio.addEventListener('change', recalculateEstimate);
  });

  els.systemSelectBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const mat = btn.getAttribute('data-material');
      const targetRadio = document.getElementById('mat-' + mat);
      if (targetRadio) {
        targetRadio.checked = true;
        recalculateEstimate();
      }
      const estimatorEl = document.getElementById('estimator');
      if (estimatorEl) {
        estimatorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  els.roofAge.addEventListener('change', recalculateEstimate);
  els.mitigationPackage.addEventListener('change', recalculateEstimate);
  els.swrUpgrade.addEventListener('change', recalculateEstimate);

  els.inspectionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    els.formError.setAttribute('hidden', '');

    const name = els.leadName.value.trim();
    const phone = els.leadPhone.value.trim();
    const email = els.leadEmail.value.trim();
    const address = els.leadAddress.value.trim();

    if (!name || !phone || !email || !address) {
      els.formError.textContent = 'Please enter your name, phone number, email address, and property street address to prepare your Westchase inspection request.';
      els.formError.removeAttribute('hidden');
      return;
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      els.formError.textContent = 'Please provide a valid email address so Trust Roofing Westchase can deliver your 24 - 48 hour certified quote.';
      els.formError.removeAttribute('hidden');
      return;
    }

    const mailtoHref = buildMailtoHref(true);
    els.confirmMailtoLink.setAttribute('href', mailtoHref);
    els.confirmSummaryText.textContent =
      'Prepared estimate for ' + name + ' at ' + address + ', FL ' + (els.leadZip.value.trim() || '33626') +
      ': ' + latestEstimate.materialLabel + ' (' + latestEstimate.livingSqFt.toLocaleString('en-US') + ' sq ft home, est. ' +
      formatUSD(latestEstimate.totalLow) + ' - ' + formatUSD(latestEstimate.totalHigh) + '). Preferred window: ' +
      els.leadWindow.value + '. Click below to dispatch directly to info@trustroofing.com or call (813) 640-4044.';
    els.bookingConfirmation.removeAttribute('hidden');
    els.bookingConfirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  recalculateEstimate();
})();
