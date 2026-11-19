(function () {
  'use strict';

  var CLINICS = {
    kemptown: {
      id: 'kemptown',
      name: 'Kemptown Flagship',
      shortName: 'Kemptown BN2',
      address: '104 St Georges Road, Brighton BN2 1EA',
      note: 'Full specialist team available at Kemptown Flagship, including Mon-Tue evening slots until 20:00 and Saturday mornings (08:30 - 12:15).'
    },
    hove: {
      id: 'hove',
      name: 'Hove Clinic at The Space',
      shortName: 'Hove BN3',
      address: '92-98 Northease Drive, Hove BN3 8LH',
      note: 'Led by Senior Manual Therapist Anja Wachter (Mon-Fri 08:00 - 18:00) with free on-street parking and full ground-floor access.'
    },
    hythe: {
      id: 'hythe',
      name: 'Hythe Road Therapy Studio',
      shortName: 'Fiveways BN1',
      address: '136 Hythe Road, Brighton BN1 6JS',
      note: 'Appointments at Hythe Road Studio are with Clinic Owner Tina Mason. Note there is a garden gate bench rather than an indoor waiting area.'
    },
    video: {
      id: 'video',
      name: 'Online Video Consultation',
      shortName: 'Remote Video',
      address: 'Secure Online Video Link (Remote 45 min)',
      note: 'Remote 45-minute video appointments are charged at the £55 remote consultation rate and suit triage, exercise progression, and ergonomic reviews.'
    }
  };

  var PATHWAYS = [
    {
      id: 'back-neck',
      title: 'Back, Neck & Spinal Pain',
      shortTitle: 'Back & Neck',
      description: 'Sciatica, disc irritation, stiff neck, postural strain, and core rehabilitation.',
      clinicians: 'Tina Mason, Jenny Chapman or Morgan Kannapel',
      initialFee: 70,
      followUpFee: 65,
      initialMins: 45,
      followUpMins: 45,
      supportedClinics: ['kemptown', 'hove', 'hythe', 'video'],
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M12 3v18M8.5 6.5h7M7.5 11.5h9M8.5 16.5h7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>'
    },
    {
      id: 'sports-injury',
      title: 'Sports Injury & Joint Rehab',
      shortTitle: 'Sports Injury',
      description: 'Running injuries, ankle sprains, shoulder impingement, ACL and ski trauma recovery.',
      clinicians: 'Ann-Marie (Annie) Ray, Teresa Spurin (TJ) or Anja Wachter',
      initialFee: 70,
      followUpFee: 65,
      initialMins: 45,
      followUpMins: 45,
      supportedClinics: ['kemptown', 'hove', 'hythe', 'video'],
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M4 13h3.5l2.2-5 3.6 8 2.4-4H20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
      id: 'vestibular-tmj',
      title: 'Vestibular (BPPV) & TMJ / Jaw Pain',
      shortTitle: 'Vestibular / TMJ',
      description: 'Vertigo repositioning manoeuvres, balance rehab, jaw clicking, facial pain, and headaches.',
      clinicians: 'Ann-Marie (Annie) Ray (Vestibular), Teresa Spurin (TMJ) or Morgan Kannapel',
      initialFee: 75,
      followUpFee: 65,
      initialMins: 45,
      followUpMins: 45,
      supportedClinics: ['kemptown', 'video'],
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5v4.5l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
      id: 'womens-health',
      title: "Women's & Pelvic Health",
      shortTitle: "Women's Health",
      description: 'Antenatal, post-natal checks, pelvic floor rehab, prolapse, and pelvic pain care.',
      clinicians: 'Tina Mason or Morgan Kannapel',
      initialFee: 85,
      followUpFee: 70,
      initialMins: 60,
      followUpMins: 45,
      supportedClinics: ['kemptown', 'hythe', 'video'],
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M12 20s-6.5-4.3-8-8.7C2.9 8.1 5 5 8.1 5c1.8 0 3.1.9 3.9 2.2C12.8 5.9 14.1 5 15.9 5 19 5 21.1 8.1 20 11.3 18.5 15.7 12 20 12 20z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'
    },
    {
      id: 'post-op',
      title: 'Post-Operative & Orthopaedic Rehab',
      shortTitle: 'Post-Op Rehab',
      description: 'ACL reconstruction, knee or hip replacement, rotator cuff repair, and spinal recovery.',
      clinicians: 'Anja Wachter, Morgan Kannapel or Jenny Chapman',
      initialFee: 70,
      followUpFee: 65,
      initialMins: 45,
      followUpMins: 45,
      supportedClinics: ['kemptown', 'hove', 'video'],
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>'
    },
    {
      id: 'acupuncture-pain',
      title: 'Manual Therapy & Medical Acupuncture',
      shortTitle: 'Acupuncture & Pain',
      description: 'Persistent myofascial pain, dry needling, joint mobilisations, and electrotherapy.',
      clinicians: 'Teresa Spurin (TJ), Tina Mason or Anja Wachter',
      initialFee: 70,
      followUpFee: 65,
      initialMins: 45,
      followUpMins: 45,
      supportedClinics: ['kemptown', 'hove', 'hythe'],
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="7.5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
    }
  ];

  var DURATIONS = [
    {
      sessions: 1,
      countLabel: '1 Session',
      title: 'Single Assessment',
      note: 'Diagnostic review and initial plan'
    },
    {
      sessions: 4,
      countLabel: '4 Sessions',
      title: 'Short Recovery Block',
      note: '1 initial + 3 follow-up visits'
    },
    {
      sessions: 7,
      countLabel: '7 Sessions',
      title: 'Structured Rehab',
      note: '1 initial + 6 follow-up visits'
    },
    {
      sessions: 11,
      countLabel: '11 Sessions',
      title: 'Full Return to Sport',
      note: '1 initial + 10 follow-up visits'
    }
  ];

  var PAYMENTS = [
    {
      id: 'self-pay',
      title: 'Self-Pay Standard',
      note: 'Direct access with no GP referral; settle visit by visit'
    },
    {
      id: 'student',
      title: 'Student (10% Off)',
      note: '10% reduction on physiotherapy fees with valid student ID'
    },
    {
      id: 'insurance',
      title: 'Private Insurance',
      note: 'Bupa, AXA, Aviva, Vitality, WPA, Cigna & Healix'
    }
  ];

  var INSURERS = {
    Bupa: 'Bupa recognised clinic. Please bring your Bupa membership number and pre-authorisation code (with authorised session count). Policy excesses or shortfalls remain payable by the patient.',
    'AXA Health': 'Registered with AXA Health. Obtain a claim pre-authorisation code before attending; many AXA pathways complete brief telephone triage prior to releasing clinic sessions.',
    Aviva: 'Aviva approved physiotherapy provider. Please confirm your claim reference and authorised session allowance ahead of your first visit; policy excesses apply as per your schedule.',
    Vitality: 'Vitality Health recognised practice. Check whether your policy requires GP or Priority Physio referral and bring your authorisation reference to reception.',
    WPA: 'WPA recognised clinic. Depending on your policy tier, reception can either invoice with pre-authorisation details or provide HCPC-coded receipts for prompt reimbursement.',
    Cigna: 'Cigna approved clinic. Supply your Cigna pre-authorisation code, membership number, and authorised visit allowance so our admin team can align billing.',
    Healix: 'Healix and third-party intermediary referrals accepted. Share your case manager contact details and claim reference number so invoicing terms can be confirmed.'
  };

  var ADDONS = [
    {
      id: 'sports-massage',
      name: 'Sports Massage (45m)',
      price: 55,
      description: 'Dedicated deep tissue and myofascial recovery session.',
      remoteCompatible: false,
      clinics: ['kemptown', 'hove']
    },
    {
      id: 'acupuncture',
      name: 'Acupuncture Adjunct',
      price: 15,
      description: 'Single-use needle kit and dry-needling supplement across your course.',
      remoteCompatible: false,
      clinics: ['kemptown', 'hove', 'hythe']
    },
    {
      id: 'donjoy-fitting',
      name: 'Donjoy / Ossur Fit',
      price: 35,
      description: 'Specialist ACL or ligament brace sizing at our Sussex fitting centre.',
      remoteCompatible: false,
      clinics: ['kemptown', 'hove']
    },
    {
      id: 'injection-therapy',
      name: 'Steroid Joint Injection',
      price: 195,
      description: 'Shared assessment and corticosteroid + local anaesthetic with Annie Ray.',
      remoteCompatible: false,
      clinics: ['kemptown']
    },
    {
      id: 'pilates-screen',
      name: '1:1 Pilates Screen',
      price: 55,
      description: 'Clinical Pilates strength and core control baseline with Jenny Chapman.',
      remoteCompatible: true,
      clinics: ['kemptown', 'video']
    },
    {
      id: 'ergonomic-dse',
      name: 'Ergonomic Desk Audit',
      price: 45,
      description: 'Workstation DSE posture setup review and tailored desk report.',
      remoteCompatible: true,
      clinics: ['kemptown', 'hove', 'hythe', 'video']
    }
  ];

  var FEE_SCHEDULE = [
    {
      id: 'fee-msk-init',
      category: 'msk',
      title: 'MSK Initial Assessment',
      price: '£70',
      meta: '45 min · New condition',
      description: 'Comprehensive movement, joint, and neurological assessment plus hands-on treatment and tailored rehab plan.',
      noteTag: 'Self-Pay & Insured',
      preset: { pathway: 'back-neck', sessions: 1, clinic: 'kemptown', addons: [] }
    },
    {
      id: 'fee-msk-fu',
      category: 'msk',
      title: 'MSK Follow-Up Session',
      price: '£65',
      meta: '45 min · Ongoing treatment',
      description: 'Manual therapy, joint mobilisation, electrotherapy, and progressive exercise coaching with your physiotherapist.',
      noteTag: '10% Student Discount',
      preset: { pathway: 'back-neck', sessions: 4, clinic: 'kemptown', addons: [] }
    },
    {
      id: 'fee-post-op',
      category: 'msk',
      title: 'Post-Operative Orthopaedic Rehab',
      price: '£70 / £65',
      meta: '45 min · Initial / Follow-up',
      description: 'Structured milestone rehabilitation following ACL, rotator cuff, spinal, or joint replacement surgery.',
      noteTag: 'Kemptown & Hove',
      preset: { pathway: 'post-op', sessions: 7, clinic: 'hove', addons: [] }
    },
    {
      id: 'fee-womens',
      category: 'specialist',
      title: "Women's & Pelvic Health",
      price: '£85 / £70',
      meta: '60 min init · 45 min f/u',
      description: 'Specialist pelvic floor, antenatal, post-natal Mummy MOT style recovery, and continence physiotherapy.',
      noteTag: 'Tina Mason & Morgan Kannapel',
      preset: { pathway: 'womens-health', sessions: 4, clinic: 'kemptown', addons: [] }
    },
    {
      id: 'fee-vestibular',
      category: 'specialist',
      title: 'Vestibular (BPPV) & TMJ Rehab',
      price: '£75 / £65',
      meta: '45 min · Specialist clinic',
      description: 'Targeted positional testing for vertigo/dizziness or specialist jaw, facial pain, and headache physiotherapy.',
      noteTag: 'Kemptown Specialist',
      preset: { pathway: 'vestibular-tmj', sessions: 4, clinic: 'kemptown', addons: [] }
    },
    {
      id: 'fee-injection',
      category: 'specialist',
      title: 'Corticosteroid Joint Injection',
      price: '£195',
      meta: '45 min · Assessment + Injection',
      description: 'Corticosteroid and local anaesthetic peripheral joint injection by Annie Ray following shared clinical screening.',
      noteTag: 'Kemptown Only',
      preset: { pathway: 'sports-injury', sessions: 1, clinic: 'kemptown', addons: ['injection-therapy'] }
    },
    {
      id: 'fee-massage',
      category: 'massage',
      title: 'Sports & Deep Tissue Massage',
      price: '£55',
      meta: '45 min · Soft tissue therapy',
      description: 'Focused myofascial release and trigger point therapy for runners, cyclists, lifters, and stiff necks.',
      noteTag: 'Kemptown & Hove',
      preset: { pathway: 'sports-injury', sessions: 1, clinic: 'kemptown', addons: ['sports-massage'] }
    },
    {
      id: 'fee-video',
      category: 'massage',
      title: 'Online Video Physiotherapy',
      price: '£55',
      meta: '45 min · Remote consultation',
      description: 'Live clinical triage, exercise form coaching, and recovery pacing from home across Brighton, Hove, and beyond.',
      noteTag: 'Remote Video Link',
      preset: { pathway: 'back-neck', sessions: 1, clinic: 'video', addons: [] }
    },
    {
      id: 'fee-acupuncture',
      category: 'massage',
      title: 'Medical Acupuncture Adjunct',
      price: '£65 + £15 kit',
      meta: '45 min · Follow-up + needling',
      description: 'Evidence-based medical acupuncture combined with manual physiotherapy to settle stubborn myofascial pain.',
      noteTag: 'AACP Registered',
      preset: { pathway: 'acupuncture-pain', sessions: 4, clinic: 'kemptown', addons: ['acupuncture'] }
    },
    {
      id: 'fee-donjoy',
      category: 'equipment',
      title: 'Donjoy & Ossur Brace Fitting',
      price: '£35',
      meta: '30 min · Sizing & clinic discount',
      description: 'Official Sussex fitting service for Donjoy Armor Fourcepoint, OA knee, and ligament braces with price matching.',
      noteTag: 'Annie Ray & Anja Wachter',
      preset: { pathway: 'sports-injury', sessions: 1, clinic: 'hove', addons: ['donjoy-fitting'] }
    },
    {
      id: 'fee-pilates',
      category: 'equipment',
      title: '1:1 Clinical Pilates Screen',
      price: '£55',
      meta: '45 min · Strength baseline',
      description: 'Physio-led core stability and movement quality screen with Jenny Chapman to bridge rehab into regular classes.',
      noteTag: 'Kemptown & Video',
      preset: { pathway: 'back-neck', sessions: 4, clinic: 'kemptown', addons: ['pilates-screen'] }
    },
    {
      id: 'fee-ergo',
      category: 'equipment',
      title: 'Ergonomic Workstation Review',
      price: '£45',
      meta: '30 min · DSE desk assessment',
      description: 'Practical chair, monitor, and keyboard adjustment assessment with written posture guidance for hybrid workers.',
      noteTag: 'Clinic or Video',
      preset: { pathway: 'back-neck', sessions: 1, clinic: 'video', addons: ['ergonomic-dse'] }
    }
  ];

  var state = {
    pathway: 'back-neck',
    sessions: 4,
    payment: 'self-pay',
    insurer: 'Bupa',
    insurerAuth: '',
    clinic: 'kemptown',
    addons: [],
    feeFilter: 'all',
    lastBrief: ''
  };

  var els = {};

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatGBP(amount) {
    var rounded = Math.round(amount * 100) / 100;
    if (Math.abs(rounded - Math.round(rounded)) < 0.001) {
      return '£' + Math.round(rounded);
    }
    return '£' + rounded.toFixed(2);
  }

  function getPathway(id) {
    for (var i = 0; i < PATHWAYS.length; i += 1) {
      if (PATHWAYS[i].id === id) {
        return PATHWAYS[i];
      }
    }
    return PATHWAYS[0];
  }

  function getAddon(id) {
    for (var i = 0; i < ADDONS.length; i += 1) {
      if (ADDONS[i].id === id) {
        return ADDONS[i];
      }
    }
    return null;
  }

  function getSelectedAddons() {
    var list = [];
    for (var i = 0; i < state.addons.length; i += 1) {
      var item = getAddon(state.addons[i]);
      if (item) {
        list.push(item);
      }
    }
    return list;
  }

  function calculateEstimate() {
    var pathway = getPathway(state.pathway);
    var clinic = CLINICS[state.clinic] || CLINICS.kemptown;
    var isVideo = state.clinic === 'video';
    var initialFee = isVideo ? 55 : pathway.initialFee;
    var followUpFee = isVideo ? 55 : pathway.followUpFee;
    var initialMins = isVideo ? 45 : pathway.initialMins;
    var followUpMins = 45;
    var followUpCount = Math.max(0, state.sessions - 1);

    var physioSubtotal = initialFee + followUpCount * followUpFee;
    var discountAmount = state.payment === 'student' ? Math.round(physioSubtotal * 0.10 * 100) / 100 : 0;
    var physioNet = Math.round((physioSubtotal - discountAmount) * 100) / 100;

    var selectedAddons = getSelectedAddons();
    var addonsTotal = 0;
    for (var i = 0; i < selectedAddons.length; i += 1) {
      addonsTotal += selectedAddons[i].price;
    }

    var total = Math.round((physioNet + addonsTotal) * 100) / 100;
    var totalMins = initialMins + followUpCount * followUpMins;
    var avgPerVisit = Math.round((total / state.sessions) * 100) / 100;

    return {
      pathway: pathway,
      clinic: clinic,
      isVideo: isVideo,
      initialFee: initialFee,
      followUpFee: followUpFee,
      initialMins: initialMins,
      followUpMins: followUpMins,
      followUpCount: followUpCount,
      physioSubtotal: physioSubtotal,
      discountAmount: discountAmount,
      physioNet: physioNet,
      selectedAddons: selectedAddons,
      addonsTotal: addonsTotal,
      total: total,
      totalMins: totalMins,
      avgPerVisit: avgPerVisit
    };
  }

  function renderPathways() {
    var html = '';
    for (var i = 0; i < PATHWAYS.length; i += 1) {
      var item = PATHWAYS[i];
      var selected = item.id === state.pathway;
      var priceText = state.clinic === 'video'
        ? '£55 remote'
        : '£' + item.initialFee + ' init · £' + item.followUpFee + ' f/u';
      html += '<button type="button" class="option-card' + (selected ? ' is-selected' : '') + '" data-pathway="' + escapeHtml(item.id) + '" aria-pressed="' + (selected ? 'true' : 'false') + '">' +
        '<div class="option-card-top">' +
          '<span class="option-icon">' + item.icon + '</span>' +
          '<span class="option-price-pill">' + escapeHtml(priceText) + '</span>' +
        '</div>' +
        '<span class="option-title">' + escapeHtml(item.title) + '</span>' +
        '<span class="option-desc">' + escapeHtml(item.description) + '</span>' +
      '</button>';
    }
    els.pathwayGrid.innerHTML = html;
  }

  function renderDurations() {
    var html = '';
    for (var i = 0; i < DURATIONS.length; i += 1) {
      var d = DURATIONS[i];
      var selected = d.sessions === state.sessions;
      html += '<button type="button" class="duration-card' + (selected ? ' is-selected' : '') + '" data-sessions="' + d.sessions + '" aria-pressed="' + (selected ? 'true' : 'false') + '">' +
        '<span class="duration-count">' + escapeHtml(d.countLabel) + '</span>' +
        '<span class="duration-title">' + escapeHtml(d.title) + '</span>' +
        '<span class="duration-note">' + escapeHtml(d.note) + '</span>' +
      '</button>';
    }
    els.durationGrid.innerHTML = html;
  }

  function renderPayments() {
    var html = '';
    for (var i = 0; i < PAYMENTS.length; i += 1) {
      var p = PAYMENTS[i];
      var selected = p.id === state.payment;
      html += '<button type="button" class="payment-card' + (selected ? ' is-selected' : '') + '" data-payment="' + escapeHtml(p.id) + '" aria-pressed="' + (selected ? 'true' : 'false') + '">' +
        '<strong>' + escapeHtml(p.title) + '</strong>' +
        '<span>' + escapeHtml(p.note) + '</span>' +
      '</button>';
    }
    els.paymentGrid.innerHTML = html;

    var isInsured = state.payment === 'insurance';
    els.insurerPanel.hidden = !isInsured;
    if (isInsured) {
      var guidance = INSURERS[state.insurer] || INSURERS.Bupa;
      if (state.insurerAuth.trim().length > 0) {
        guidance = 'Auth reference "' + state.insurerAuth.trim() + '" noted for ' + state.insurer + '. ' + guidance;
      }
      els.insurerGuidance.textContent = guidance;
    }
  }

  function renderAddons() {
    var html = '';
    for (var i = 0; i < ADDONS.length; i += 1) {
      var addon = ADDONS[i];
      var selected = state.addons.indexOf(addon.id) !== -1;
      html += '<button type="button" class="addon-btn' + (selected ? ' is-selected' : '') + '" data-addon="' + escapeHtml(addon.id) + '" aria-pressed="' + (selected ? 'true' : 'false') + '">' +
        '<div class="addon-head">' +
          '<span class="addon-name">' + escapeHtml(addon.name) + '</span>' +
          '<span class="addon-price">+£' + addon.price + '</span>' +
        '</div>' +
        '<span class="addon-desc">' + escapeHtml(addon.description) + '</span>' +
      '</button>';
    }
    els.addonsGrid.innerHTML = html;
  }

  function buildCompatibilityMessages(calc) {
    var warnings = [];
    var pathway = calc.pathway;
    var clinic = calc.clinic;

    if (pathway.supportedClinics.indexOf(clinic.id) === -1) {
      if (clinic.id === 'hove') {
        warnings.push(pathway.shortTitle + ' clinics are normally scheduled at Kemptown Flagship; reception can check Anja Wachter availability in Hove.');
      } else if (clinic.id === 'hythe') {
        warnings.push('Hythe Road Studio covers Tina Mason MSK and Women\'s Health slots. ' + pathway.shortTitle + ' appointments are held at Kemptown Flagship.');
      } else if (clinic.id === 'video') {
        warnings.push(pathway.title + ' requires hands-on in-clinic care at Kemptown, Hove, or Hythe Road.');
      }
    }

    for (var i = 0; i < calc.selectedAddons.length; i += 1) {
      var addon = calc.selectedAddons[i];
      if (clinic.id === 'video' && !addon.remoteCompatible) {
        warnings.push(addon.name + ' requires an in-person clinic visit rather than Online Video.');
      } else if (addon.clinics.indexOf(clinic.id) === -1) {
        if (addon.id === 'injection-therapy') {
          warnings.push('Steroid Joint Injections are administered by Annie Ray at Kemptown Flagship only.');
        } else {
          warnings.push(addon.name + ' is delivered at Kemptown or Hove rather than ' + clinic.shortName + '.');
        }
      }
    }

    return warnings;
  }

  function renderCompatibilityNote(calc) {
    var warnings = buildCompatibilityMessages(calc);
    if (warnings.length > 0) {
      els.clinicCompatibilityNote.textContent = warnings.join(' ');
    } else {
      els.clinicCompatibilityNote.textContent = calc.clinic.note;
    }
  }

  function renderSummary(calc) {
    els.summaryPathwayTitle.textContent = calc.pathway.title;
    els.summaryClinicianLine.textContent = 'Matched Lead: ' + calc.pathway.clinicians;

    var paymentLabel = 'Self-Pay Standard';
    if (state.payment === 'student') {
      paymentLabel = 'Student 10% Off';
    } else if (state.payment === 'insurance') {
      paymentLabel = 'Insured · ' + state.insurer;
    }

    var badges = [
      { label: calc.clinic.shortName, highlight: true },
      { label: paymentLabel, highlight: true },
      { label: calc.initialMins + ' min initial', highlight: false },
      {
        label: state.payment === 'insurance' ? 'Pre-auth recommended' : 'No GP referral needed',
        highlight: false
      }
    ];

    var badgesHtml = '';
    for (var i = 0; i < badges.length; i += 1) {
      badgesHtml += '<span class="summary-badge' + (badges[i].highlight ? ' is-highlight' : '') + '">' + escapeHtml(badges[i].label) + '</span>';
    }
    els.summaryBadges.innerHTML = badgesHtml;

    var ledgerHtml = '';
    ledgerHtml += '<div class="ledger-row">' +
      '<dt>Initial Assessment (1 × ' + calc.initialMins + ' min' + (calc.isVideo ? ' video' : '') + ')</dt>' +
      '<dd>' + formatGBP(calc.initialFee) + '</dd>' +
    '</div>';

    if (calc.followUpCount > 0) {
      ledgerHtml += '<div class="ledger-row">' +
        '<dt>Follow-Up Sessions (' + calc.followUpCount + ' × ' + formatGBP(calc.followUpFee) + ')</dt>' +
        '<dd>' + formatGBP(calc.followUpCount * calc.followUpFee) + '</dd>' +
      '</div>';
    }

    if (calc.discountAmount > 0) {
      ledgerHtml += '<div class="ledger-row is-discount">' +
        '<dt>Student Discount (10% on physio fees)</dt>' +
        '<dd>-' + formatGBP(calc.discountAmount) + '</dd>' +
      '</div>';
    }

    for (var j = 0; j < calc.selectedAddons.length; j += 1) {
      var addon = calc.selectedAddons[j];
      ledgerHtml += '<div class="ledger-row">' +
        '<dt>' + escapeHtml(addon.name) + '</dt>' +
        '<dd>+' + formatGBP(addon.price) + '</dd>' +
      '</div>';
    }

    if (state.payment === 'insurance') {
      ledgerHtml += '<div class="ledger-row">' +
        '<dt>Claim Settlement (' + escapeHtml(state.insurer) + ')</dt>' +
        '<dd>' + (state.insurerAuth.trim() ? 'Auth ' + escapeHtml(state.insurerAuth.trim()) : 'Auth required') + '</dd>' +
      '</div>';
    }

    els.ledgerList.innerHTML = ledgerHtml;

    if (state.payment === 'insurance') {
      els.totalLabelText.textContent = 'Insurer Tariff Value';
    } else if (state.payment === 'student') {
      els.totalLabelText.textContent = 'Student Course Total';
    } else {
      els.totalLabelText.textContent = 'Estimated Course Total';
    }

    els.totalFigure.textContent = formatGBP(calc.total);
    els.totalSessionsMeta.textContent = state.sessions + (state.sessions === 1 ? ' session' : ' sessions') + ' · ' + calc.totalMins + ' clinical mins';
    els.totalAvgMeta.textContent = formatGBP(calc.avgPerVisit) + ' avg / visit';

    var warnings = buildCompatibilityMessages(calc);
    els.totalFootnote.className = 'total-footnote';

    if (state.payment === 'insurance') {
      els.totalFootnote.className = 'total-footnote is-warning';
      els.totalFootnote.textContent = state.insurerAuth.trim()
        ? 'Pre-authorisation "' + state.insurerAuth.trim() + '" will be attached for ' + state.insurer + '. Patient remains responsible for policy excess or non-covered extras.'
        : 'Confirm your ' + state.insurer + ' pre-authorisation code before attending. Patients remain responsible for any policy excess or sessions beyond authorised limits.';
    } else if (warnings.length > 0) {
      els.totalFootnote.className = 'total-footnote is-warning';
      els.totalFootnote.textContent = warnings[0];
    } else if (state.payment === 'student') {
      els.totalFootnote.textContent = '10% student discount applies to physiotherapy consultation tariffs on presentation of a valid NUS or university card at reception.';
    } else {
      els.totalFootnote.textContent = 'Pay appointment by appointment at reception (no upfront lump sum required). 24 hours notice applies for changes or cancellations.';
    }
  }

  function renderFeeSchedule() {
    var html = '';
    for (var i = 0; i < FEE_SCHEDULE.length; i += 1) {
      var item = FEE_SCHEDULE[i];
      if (state.feeFilter !== 'all' && item.category !== state.feeFilter) {
        continue;
      }
      html += '<article class="fee-card">' +
        '<div>' +
          '<div class="fee-card-head">' +
            '<h3>' + escapeHtml(item.title) + '</h3>' +
            '<span class="fee-price">' + escapeHtml(item.price) + '</span>' +
          '</div>' +
          '<div class="fee-meta mono">' + escapeHtml(item.meta) + '</div>' +
        '</div>' +
        '<p class="fee-desc">' + escapeHtml(item.description) + '</p>' +
        '<div class="fee-card-foot">' +
          '<span class="fee-note-tag">' + escapeHtml(item.noteTag) + '</span>' +
          '<button type="button" class="btn btn-secondary btn-sm" data-load-fee="' + escapeHtml(item.id) + '">Load in Estimator</button>' +
        '</div>' +
      '</article>';
    }
    els.feeGrid.innerHTML = html;
  }

  function buildBookingBrief(calc) {
    var name = els.patientName.value.trim();
    var email = els.patientEmail.value.trim();
    var phone = els.patientPhone.value.trim();
    var windowChoice = els.patientWindow.value;
    var notes = els.patientNotes.value.trim();

    var paymentText = 'Self-Pay Standard';
    if (state.payment === 'student') {
      paymentText = 'Student Rate (10% Discount)';
    } else if (state.payment === 'insurance') {
      paymentText = 'Private Medical Insurance (' + state.insurer + (state.insurerAuth.trim() ? ', Auth: ' + state.insurerAuth.trim() : ', Auth pending') + ')';
    }

    var addonNames = [];
    for (var i = 0; i < calc.selectedAddons.length; i += 1) {
      addonNames.push(calc.selectedAddons[i].name + ' (+' + formatGBP(calc.selectedAddons[i].price) + ')');
    }

    var lines = [
      'BRIGHTON PHYSIOTHERAPY CLINIC - APPOINTMENT & COURSE ENQUIRY',
      '------------------------------------------------------------',
      'Patient Name: ' + name,
      'Email: ' + email,
      'Telephone: ' + phone,
      'Preferred Window: ' + windowChoice,
      '',
      'SELECTED COURSE ESTIMATE',
      'Pathway: ' + calc.pathway.title,
      'Matched Lead Clinicians: ' + calc.pathway.clinicians,
      'Clinic / Setting: ' + calc.clinic.name + ' (' + calc.clinic.address + ')',
      'Course Length: ' + state.sessions + (state.sessions === 1 ? ' session' : ' sessions') + ' (' + calc.totalMins + ' clinical mins)',
      'Payment Format: ' + paymentText,
      'Optional Add-Ons: ' + (addonNames.length > 0 ? addonNames.join(', ') : 'None'),
      'Estimated Total: ' + formatGBP(calc.total) + ' (' + formatGBP(calc.avgPerVisit) + ' avg / visit)'
    ];

    if (calc.discountAmount > 0) {
      lines.push('Student Saving Applied: -' + formatGBP(calc.discountAmount));
    }

    if (notes.length > 0) {
      lines.push('');
      lines.push('Symptoms / History / Notes:');
      lines.push(notes);
    }

    var warnings = buildCompatibilityMessages(calc);
    if (warnings.length > 0) {
      lines.push('');
      lines.push('Reception Scheduling Note:');
      lines.push(warnings.join(' '));
    }

    return lines.join('\n');
  }

  function buildMailtoHref(brief, calc) {
    var patientName = els.patientName.value.trim() || 'Patient';
    var subject = 'Physiotherapy Enquiry: ' + calc.pathway.shortTitle + ' (' + state.sessions + ' sessions) - ' + patientName;
    return 'mailto:info@brightonphysio.co.uk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(brief);
  }

  function updateAll() {
    var calc = calculateEstimate();
    renderPathways();
    renderDurations();
    renderPayments();
    renderAddons();
    renderCompatibilityNote(calc);
    renderSummary(calc);

    if (els.clinicSelect.value !== state.clinic) {
      els.clinicSelect.value = state.clinic;
    }
    if (els.insurerSelect.value !== state.insurer) {
      els.insurerSelect.value = state.insurer;
    }

    if (!els.bookingConfirmation.hidden) {
      var brief = buildBookingBrief(calc);
      state.lastBrief = brief;
      els.confirmationText.textContent = brief;
      els.directMailtoLink.href = buildMailtoHref(brief, calc);
    }
  }

  function applyPreset(preset) {
    if (preset.pathway) {
      state.pathway = preset.pathway;
    }
    if (typeof preset.sessions === 'number') {
      state.sessions = preset.sessions;
    }
    if (preset.clinic && CLINICS[preset.clinic]) {
      state.clinic = preset.clinic;
    }
    if (preset.payment) {
      state.payment = preset.payment;
    }
    if (Array.isArray(preset.addons)) {
      state.addons = preset.addons.slice();
    }
    updateAll();

    var estimatorSection = byId('estimator');
    if (estimatorSection) {
      estimatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function validateBookingForm() {
    var name = els.patientName.value.trim();
    var email = els.patientEmail.value.trim();
    var phone = els.patientPhone.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var digitsOnly = phone.replace(/\D/g, '');

    if (name.length < 2) {
      return { valid: false, message: 'Please enter your full name so reception can address your enquiry.', field: els.patientName };
    }
    if (!emailPattern.test(email)) {
      return { valid: false, message: 'Please enter a valid email address for your appointment confirmation.', field: els.patientEmail };
    }
    if (digitsOnly.length < 7) {
      return { valid: false, message: 'Please enter a valid UK or mobile contact number.', field: els.patientPhone };
    }
    return { valid: true };
  }

  function copySummaryText() {
    var text = state.lastBrief || els.confirmationText.textContent;
    if (!text) {
      return;
    }

    function markCopied() {
      var original = 'Copy Summary';
      els.copySummaryBtn.textContent = 'Copied to Clipboard';
      window.setTimeout(function () {
        els.copySummaryBtn.textContent = original;
      }, 2400);
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(text).then(markCopied, function () {
        fallbackCopy(text);
        markCopied();
      });
    } else {
      fallbackCopy(text);
      markCopied();
    }
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      // Ignore copy failure on restricted contexts
    }
    document.body.removeChild(area);
  }

  function bindEvents() {
    els.pathwayGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-pathway]');
      if (!btn) {
        return;
      }
      state.pathway = btn.getAttribute('data-pathway');
      updateAll();
    });

    els.durationGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-sessions]');
      if (!btn) {
        return;
      }
      var count = parseInt(btn.getAttribute('data-sessions'), 10);
      if (!isNaN(count)) {
        state.sessions = count;
        updateAll();
      }
    });

    els.paymentGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-payment]');
      if (!btn) {
        return;
      }
      state.payment = btn.getAttribute('data-payment');
      updateAll();
    });

    els.addonsGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-addon]');
      if (!btn) {
        return;
      }
      var addonId = btn.getAttribute('data-addon');
      var idx = state.addons.indexOf(addonId);
      if (idx === -1) {
        state.addons.push(addonId);
      } else {
        state.addons.splice(idx, 1);
      }
      updateAll();
    });

    els.insurerSelect.addEventListener('change', function () {
      state.insurer = els.insurerSelect.value;
      updateAll();
    });

    els.insurerAuth.addEventListener('input', function () {
      state.insurerAuth = els.insurerAuth.value;
      updateAll();
    });

    els.clinicSelect.addEventListener('change', function () {
      state.clinic = els.clinicSelect.value;
      updateAll();
    });

    var quickChips = document.querySelectorAll('[data-quick-pathway]');
    for (var i = 0; i < quickChips.length; i += 1) {
      quickChips[i].addEventListener('click', function () {
        var pathwayId = this.getAttribute('data-quick-pathway');
        var pathway = getPathway(pathwayId);
        var nextClinic = pathway.supportedClinics.indexOf(state.clinic) !== -1 ? state.clinic : 'kemptown';
        applyPreset({
          pathway: pathwayId,
          clinic: nextClinic
        });
      });
    }

    els.feeFilters.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-fee-filter]');
      if (!tab) {
        return;
      }
      var filter = tab.getAttribute('data-fee-filter');
      state.feeFilter = filter;
      var tabs = els.feeFilters.querySelectorAll('[data-fee-filter]');
      for (var j = 0; j < tabs.length; j += 1) {
        var active = tabs[j] === tab;
        tabs[j].classList.toggle('is-active', active);
        tabs[j].setAttribute('aria-selected', active ? 'true' : 'false');
      }
      renderFeeSchedule();
    });

    els.feeGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-load-fee]');
      if (!btn) {
        return;
      }
      var feeId = btn.getAttribute('data-load-fee');
      for (var j = 0; j < FEE_SCHEDULE.length; j += 1) {
        if (FEE_SCHEDULE[j].id === feeId) {
          applyPreset(FEE_SCHEDULE[j].preset);
          break;
        }
      }
    });

    els.bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var validation = validateBookingForm();
      if (!validation.valid) {
        els.formError.textContent = validation.message;
        els.formError.hidden = false;
        if (validation.field && typeof validation.field.focus === 'function') {
          validation.field.focus();
        }
        return;
      }

      els.formError.hidden = true;
      els.formError.textContent = '';

      var calc = calculateEstimate();
      var brief = buildBookingBrief(calc);
      var mailtoHref = buildMailtoHref(brief, calc);

      state.lastBrief = brief;
      els.confirmationText.textContent = brief;
      els.directMailtoLink.href = mailtoHref;
      els.bookingConfirmation.hidden = false;
      els.bookingConfirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      try {
        window.location.href = mailtoHref;
      } catch (err) {
        // Fallback link remains clickable inside confirmation panel
      }
    });

    els.copySummaryBtn.addEventListener('click', copySummaryText);
  }

  function cacheElements() {
    els.pathwayGrid = byId('pathway-grid');
    els.durationGrid = byId('duration-grid');
    els.paymentGrid = byId('payment-grid');
    els.insurerPanel = byId('insurer-panel');
    els.insurerSelect = byId('insurer-select');
    els.insurerAuth = byId('insurer-auth');
    els.insurerGuidance = byId('insurer-guidance');
    els.clinicSelect = byId('clinic-select');
    els.clinicCompatibilityNote = byId('clinic-compatibility-note');
    els.addonsGrid = byId('addons-grid');
    els.summaryPathwayTitle = byId('summary-pathway-title');
    els.summaryClinicianLine = byId('summary-clinician-line');
    els.summaryBadges = byId('summary-badges');
    els.ledgerList = byId('ledger-list');
    els.totalLabelText = byId('total-label-text');
    els.totalFigure = byId('total-figure');
    els.totalSessionsMeta = byId('total-sessions-meta');
    els.totalAvgMeta = byId('total-avg-meta');
    els.totalFootnote = byId('total-footnote');
    els.bookingForm = byId('booking-form');
    els.patientName = byId('patient-name');
    els.patientEmail = byId('patient-email');
    els.patientPhone = byId('patient-phone');
    els.patientWindow = byId('patient-window');
    els.patientNotes = byId('patient-notes');
    els.formError = byId('form-error');
    els.bookingConfirmation = byId('booking-confirmation');
    els.confirmationText = byId('confirmation-text');
    els.copySummaryBtn = byId('copy-summary-btn');
    els.directMailtoLink = byId('direct-mailto-link');
    els.feeFilters = byId('fee-filters');
    els.feeGrid = byId('fee-grid');
  }

  function init() {
    cacheElements();
    if (!els.pathwayGrid || !els.bookingForm || !els.feeGrid) {
      return;
    }
    bindEvents();
    updateAll();
    renderFeeSchedule();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
