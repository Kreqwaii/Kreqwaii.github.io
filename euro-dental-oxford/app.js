'use strict';

const PRACTICE_INFO = {
  name: 'Euro Dental Oxford',
  address: '61 London Road, Headington, Oxford, OX3 7RD',
  phoneDisplay: '01865 308 865',
  phoneTel: '01865308865',
  email: 'info@eurodentaloxford.co.uk',
  soeUrl: 'https://booking.uk.hsone.app/soe/new/Eurodental?pid=UKEUR01'
};

const CARE_PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic Care Plan',
    annualFee: 160,
    monthlyEquiv: 13.33,
    privateDiscountRate: 0,
    whiteningCredit: 0,
    badge: 'Preventive Essentials',
    summary: 'Ideal for prioritising regular hygiene and annual check-up continuity at fixed cost.',
    features: [
      '2 Hygienist Appointments (30-min scale and polish)',
      '1 Routine Dental Examination per year',
      'Predictable annual or monthly preventive budgeting'
    ]
  },
  comprehensive: {
    id: 'comprehensive',
    name: 'Comprehensive Care Plan',
    annualFee: 220,
    monthlyEquiv: 18.33,
    privateDiscountRate: 0.10,
    whiteningCredit: 0,
    badge: 'Saves At Least £100 / Year',
    featured: true,
    summary: 'Complete year-round check-ups, hygiene, emergency cover, and 10% reduction on Private treatments.',
    features: [
      '2 Dental Examinations per year',
      '2 Hygienist Appointments (30-min scale and polish)',
      '1 Emergency Dental Appointment included',
      '10% Discount on All Private Treatments',
      'Free Dental Phone Advice from our team'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium Care Plan',
    annualFee: 280,
    monthlyEquiv: 23.33,
    privateDiscountRate: 0.10,
    whiteningCredit: 100,
    badge: 'Saves Over £200 / Year',
    summary: 'All Comprehensive benefits plus whitening top-ups and £100 off in-surgery teeth whitening.',
    features: [
      '2 Dental Examinations and 2 Hygienist Sessions',
      '1 Emergency Dental Appointment + Free Phone Advice',
      '10% Discount on All Private Treatments',
      '2 Free Whitening Gel Top-Ups annually',
      '£100 Off In-Surgery Teeth Whitening Treatment'
    ]
  }
};

const FEE_ITEMS = [
  {
    id: 'private-exam',
    category: 'preventive',
    categoryLabel: 'Exams & Hygiene',
    title: 'Private Dental Examination',
    description: 'Comprehensive clinical check-up, oral health screening, and personalised treatment planning.',
    price: 60,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'visit',
    tariffRef: 'Private July 2025',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'private-hygiene',
    category: 'preventive',
    categoryLabel: 'Exams & Hygiene',
    title: 'Dental Hygiene Session (Scale & Polish)',
    description: 'Thorough 30-minute plaque and calculus removal with tailored home oral-hygiene guidance.',
    price: 85,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'session',
    tariffRef: 'Private July 2025',
    clinician: 'Aadilah Mayet (GDC-Registered Dental Hygienist & Therapist)'
  },
  {
    id: 'airflow-polish',
    category: 'preventive',
    categoryLabel: 'Exams & Hygiene',
    title: 'Airflow Stain & Biofilm Hygiene',
    description: 'Gentle warm water and air jet polishing to lift tea, coffee, and surface staining cleanly.',
    price: 85,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'session',
    tariffRef: 'From Hygiene Tier',
    clinician: 'Aadilah Mayet (GDC-Registered Dental Hygienist & Therapist)'
  },
  {
    id: 'implant-consult',
    category: 'implants',
    categoryLabel: 'Implants & Restorative',
    title: 'Dental Implant Consultation & Assessment',
    description: 'Single or multiple missing-tooth implant evaluation with Dr Ghada Barazanjie (Eastman trained).',
    price: 60,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'visit',
    tariffRef: 'Exam Baseline',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'implant-crown-unit',
    category: 'implants',
    categoryLabel: 'Implants & Restorative',
    title: 'Crown / Bridge Prosthetic Unit (Restorative Stage)',
    description: 'Custom-matched ceramic crown or bridge restoration for damaged teeth or implant restoration.',
    price: 650,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'unit',
    tariffRef: 'Private July 2025',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'implant-surgical-fixture',
    category: 'implants',
    categoryLabel: 'Implants & Restorative',
    title: 'Titanium Dental Implant Fixture (Surgical Stage)',
    description: 'Bespoke surgical implant placement fee confirmed in your written clinical plan after assessment.',
    price: 0,
    fromPrice: false,
    isNhs: false,
    isQuoteOnly: true,
    unitLabel: 'implant',
    tariffRef: 'Written Quote',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'white-filling',
    category: 'implants',
    categoryLabel: 'Implants & Restorative',
    title: 'White Composite Filling',
    description: 'Tooth-coloured adhesive restoration to repair decay or replace older metallic amalgam.',
    price: 180,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'tooth',
    tariffRef: 'Private July 2025',
    clinician: 'Dr Marin Marinov (Senior Dentist - 9+ European Languages)'
  },
  {
    id: 'dentures',
    category: 'implants',
    categoryLabel: 'Implants & Restorative',
    title: 'Full or Partial Dentures',
    description: 'Custom-fitted natural-looking acrylic or cobalt-chrome dentures restoring bite comfort.',
    price: 900,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'arch',
    tariffRef: 'Private July 2025',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'in-surgery-whitening',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic & Aligners',
    title: 'In-Surgery Teeth Whitening Pathway',
    description: 'Clinician-supervised brightening treatment. Premium Plan members receive £100 off treatment.',
    price: 0,
    fromPrice: false,
    isNhs: false,
    isQuoteOnly: true,
    whiteningEligible: true,
    unitLabel: 'course',
    tariffRef: '£100 Off w/ Premium Plan',
    clinician: 'Dr Veronica Barrientos (Senior Dentist - NHS, Private & Bruxism Botox)'
  },
  {
    id: 'clear-aligners',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic & Aligners',
    title: 'Discreet Clear Aligners Consultation & Plan',
    description: 'Short-term invisible teeth straightening targeting visible smile alignment; quoted after scan.',
    price: 0,
    fromPrice: false,
    isNhs: false,
    isQuoteOnly: true,
    unitLabel: 'course',
    tariffRef: 'Written Quote',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'porcelain-veneers',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic & Aligners',
    title: 'Porcelain Veneers & Cosmetic Bonding',
    description: 'Ultra-thin ceramic veneers to refine chipped edges, staining, or minor gaps.',
    price: 0,
    fromPrice: false,
    isNhs: false,
    isQuoteOnly: true,
    unitLabel: 'tooth',
    tariffRef: 'Written Quote',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'bruxism-botox',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic & Aligners',
    title: 'Facial Aesthetics & Botox for Bruxism',
    description: 'Targeted masseter jaw-clenching relief and facial fine-line aesthetics with Dr Veronica Barrientos.',
    price: 0,
    fromPrice: false,
    isNhs: false,
    isQuoteOnly: true,
    unitLabel: 'visit',
    tariffRef: 'Written Quote',
    clinician: 'Dr Veronica Barrientos (Senior Dentist - NHS, Private & Bruxism Botox)'
  },
  {
    id: 'same-day-emergency',
    category: 'surgery',
    categoryLabel: 'Surgery & Urgent',
    title: 'Same-Day Emergency Triage Examination',
    description: 'Rapid assessment for acute toothache, swelling, trauma, or lost crowns (50+ monthly cases).',
    price: 60,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'visit',
    tariffRef: 'Exam Baseline',
    clinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'private-extraction',
    category: 'surgery',
    categoryLabel: 'Surgery & Urgent',
    title: 'Routine Tooth Extraction',
    description: 'Gentle removal of non-restorable teeth with calm pain control and post-operative follow-up.',
    price: 199,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'tooth',
    tariffRef: 'Private July 2025',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'surgical-extraction-self',
    category: 'surgery',
    categoryLabel: 'Surgery & Urgent',
    title: 'Surgical Extraction (Online Self-Referral)',
    description: 'Direct patient booking for complex or impacted tooth removal without needing a GP referral.',
    price: 199,
    fromPrice: true,
    isNhs: false,
    isQuoteOnly: false,
    unitLabel: 'tooth',
    tariffRef: 'From Extraction Tier',
    clinician: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)'
  },
  {
    id: 'root-canal',
    category: 'surgery',
    categoryLabel: 'Surgery & Urgent',
    title: 'Root Canal Endodontic Treatment',
    description: 'Removes infected pulp tissue to relieve pain and save your natural tooth structure.',
    price: 0,
    fromPrice: false,
    isNhs: false,
    isQuoteOnly: true,
    unitLabel: 'tooth',
    tariffRef: 'Written Quote',
    clinician: 'Dr Marin Marinov (Senior Dentist - 9+ European Languages)'
  },
  {
    id: 'nhs-band-1',
    category: 'nhs',
    categoryLabel: 'NHS Bands',
    title: 'NHS Band 1: Examination, X-Rays & Advice',
    description: 'Covers examination, diagnosis, necessary X-rays, simple scale and polish, and care planning.',
    price: 27.40,
    fromPrice: false,
    isNhs: true,
    isQuoteOnly: false,
    unitLabel: 'course',
    tariffRef: 'NHS April 2025',
    clinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'nhs-band-2',
    category: 'nhs',
    categoryLabel: 'NHS Bands',
    title: 'NHS Band 2: Fillings, Root Canal & Extractions',
    description: 'Includes all Band 1 care plus fillings, root canal therapy, and clinical tooth extractions.',
    price: 75.30,
    fromPrice: false,
    isNhs: true,
    isQuoteOnly: false,
    unitLabel: 'course',
    tariffRef: 'NHS April 2025',
    clinician: 'Dr Veronica Barrientos (Senior Dentist - NHS, Private & Bruxism Botox)'
  },
  {
    id: 'nhs-band-3',
    category: 'nhs',
    categoryLabel: 'NHS Bands',
    title: 'NHS Band 3: Crowns, Dentures & Bridges',
    description: 'Includes Band 1 and 2 care plus complex restorative prosthetics such as crowns and dentures.',
    price: 326.70,
    fromPrice: false,
    isNhs: true,
    isQuoteOnly: false,
    unitLabel: 'course',
    tariffRef: 'NHS April 2025',
    clinician: 'First Available Appropriate Clinician'
  }
];

const SERVICES_OVERVIEW = [
  {
    title: 'General & Preventive Care',
    icon: 'shield',
    body: 'Routine examinations, gentle paediatric visits, 30-minute hygienist cleanings, Airflow stain removal, white fillings, and root canal therapy to protect natural teeth.',
    tags: ['Exams From £60', 'Hygiene From £85', 'Airflow Polish', 'Paediatric Care']
  },
  {
    title: 'Implants & Tooth Replacement',
    icon: 'layers',
    body: 'Stable single and multiple dental implants, ceramic crowns, fixed bridges, and custom partial or full dentures restoring natural bite strength and facial support.',
    tags: ['Dental Implants', 'Crowns From £650', 'Bridges', 'Dentures From £900']
  },
  {
    title: 'Cosmetic & Facial Aesthetics',
    icon: 'spark',
    body: 'In-surgery and take-home whitening, porcelain veneers, short-term clear aligners, composite bonding, and clinician-led Botox for bruxism and jaw tension.',
    tags: ['Whitening', 'Clear Aligners', 'Veneers', 'Bruxism Botox']
  },
  {
    title: 'Oral Surgery & Same-Day Urgent',
    icon: 'clock',
    body: 'Over 50 emergency patients helped monthly across Oxford. Direct online self-referrals for surgical extractions without requiring a prior GP appointment.',
    tags: ['50+ Urgent / Mo', 'Extractions From £199', 'Surgical Self-Referral', 'NHS & Private']
  }
];

const TEAM_MEMBERS = [
  {
    name: 'Dr Ghada Barazanjie',
    role: 'Practice Principal',
    group: 'dentists',
    searchTags: ['dentists'],
    credentials: 'Eastman Institute London Trained | 25+ Years Experience',
    bio: 'Specialises in crowns, bridges, dentures, surgical extractions, dental implants, clear aligners, and teeth whitening. Widely trusted by anxious patients and those requiring domiciliary or special-needs dental care.',
    languages: ['English', 'Arabic'],
    selectValue: 'Dr Ghada Barazanjie (Practice Principal - Implants, Crowns & Nervous Patients)',
    defaultLang: 'English'
  },
  {
    name: 'Dr Marin Marinov',
    role: 'Senior Dentist',
    group: 'dentists',
    searchTags: ['dentists', 'slavic'],
    credentials: 'Graduated 1989 (Faculty of Dental Medicine, Sofia) | With Clinic Since 2009',
    bio: 'Over three decades in comprehensive general dentistry, caring for multi-generational Oxfordshire families. Consults fluently across nine European languages so patients explain symptoms in their native tongue.',
    languages: ['Bulgarian', 'Russian', 'Serbian', 'Croatian', 'Polish', 'Icelandic', 'Romanian', 'English'],
    selectValue: 'Dr Marin Marinov (Senior Dentist - 9+ European Languages)',
    defaultLang: 'Bulgarian'
  },
  {
    name: 'Dr Veronica Barrientos',
    role: 'Senior Dentist',
    group: 'dentists',
    searchTags: ['dentists', 'spanish'],
    credentials: 'University of Bristol Graduate (2022) | 6 Years Prior Study in El Salvador',
    bio: 'Provides both NHS and Private dentistry with a gentle, preventative focus on oral health education alongside facial aesthetics, including therapeutic Botox for bruxism jaw clenching.',
    languages: ['English', 'Spanish'],
    selectValue: 'Dr Veronica Barrientos (Senior Dentist - NHS, Private & Bruxism Botox)',
    defaultLang: 'Spanish'
  },
  {
    name: 'Aadilah Mayet',
    role: 'Dental Hygienist & Therapist',
    group: 'hygiene',
    searchTags: ['hygiene'],
    credentials: 'BDS, MSc Health & Safety (Leeds University) | GDC Registered | 5+ Years Experience',
    bio: 'Originally trained overseas as a dentist before specialising in UK preventive hygiene and periodontal therapy. Known for thorough, gentle scale-and-polish sessions and Airflow stain removal.',
    languages: ['English'],
    selectValue: 'Aadilah Mayet (GDC-Registered Dental Hygienist & Therapist)',
    defaultLang: 'English'
  }
];

const DAY_WINDOWS = {
  'Monday (08:30 - 17:30)': [
    'Morning (08:30 - 13:00)',
    'Afternoon (14:00 - 17:30)',
    'Late Evening (by advance arrangement)'
  ],
  'Tuesday (08:30 - 17:30)': [
    'Morning (08:30 - 13:00)',
    'Afternoon (14:00 - 17:30)',
    'Late Evening (by advance arrangement)'
  ],
  'Wednesday (08:30 - 17:30)': [
    'Morning (08:30 - 13:00)',
    'Afternoon (14:00 - 17:30)',
    'Late Evening (by advance arrangement)'
  ],
  'Thursday (08:30 - 17:30)': [
    'Morning (08:30 - 13:00)',
    'Afternoon (14:00 - 17:30)',
    'Late Evening (by advance arrangement)'
  ],
  'Friday (08:30 - 17:30)': [
    'Morning (08:30 - 13:00)',
    'Afternoon (14:00 - 17:30)',
    'Late Evening (by advance arrangement)'
  ],
  'Saturday (09:00 - 14:00)': [
    'Saturday Early (09:00 - 11:30)',
    'Saturday Midday (11:30 - 14:00)'
  ]
};

const state = {
  basket: new Map([
    ['private-exam', 1],
    ['private-hygiene', 1]
  ]),
  activeCategory: 'all',
  searchQuery: '',
  paymentMode: 'oneoff',
  activePlan: 'comprehensive',
  emergencyPriority: false,
  teamFilter: 'all'
};

function formatGBP(amount) {
  const rounded = Math.round(amount * 100) / 100;
  if (Number.isInteger(rounded)) {
    return '£' + rounded.toLocaleString('en-GB');
  }
  return '£' + rounded.toFixed(2);
}

function getItemById(id) {
  return FEE_ITEMS.find(function (item) {
    return item.id === id;
  });
}

function getServiceIcon(type) {
  if (type === 'shield') {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6l7-3z"/><path d="M9.5 12.2l1.8 1.8 3.5-3.6"/></svg>';
  }
  if (type === 'layers') {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"/><path d="M3 12l9 4.5 9-4.5"/><path d="M3 16.5l9 4.5 9-4.5"/></svg>';
  }
  if (type === 'spark') {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/></svg>';
  }
  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
}

function addItem(id) {
  const current = state.basket.get(id) || 0;
  state.basket.set(id, current + 1);
  renderCatalog();
  renderBasket();
}

function decrementItem(id) {
  const current = state.basket.get(id) || 0;
  if (current <= 1) {
    state.basket.delete(id);
  } else {
    state.basket.set(id, current - 1);
  }
  renderCatalog();
  renderBasket();
}

function removeItem(id) {
  state.basket.delete(id);
  renderCatalog();
  renderBasket();
}

function applyPreset(presetKey) {
  state.basket.clear();
  if (presetKey === 'checkup') {
    state.basket.set('private-exam', 1);
    state.basket.set('private-hygiene', 1);
    state.emergencyPriority = false;
  } else if (presetKey === 'implant') {
    state.basket.set('implant-consult', 1);
    state.basket.set('implant-crown-unit', 1);
    state.basket.set('implant-surgical-fixture', 1);
    state.emergencyPriority = false;
  } else if (presetKey === 'urgent') {
    state.basket.set('same-day-emergency', 1);
    state.basket.set('private-extraction', 1);
    state.emergencyPriority = true;
  } else if (presetKey === 'nhs2') {
    state.basket.set('nhs-band-2', 1);
    state.emergencyPriority = false;
  }

  const toggleEl = document.getElementById('emergencyPriorityToggle');
  if (toggleEl) {
    toggleEl.checked = state.emergencyPriority;
  }
  syncUrgencyUI();
  renderCatalog();
  renderBasket();
}

function calculateTotals() {
  let privateSubtotal = 0;
  let nhsSubtotal = 0;
  let hasFromPrices = false;
  let quoteCount = 0;
  let hasWhitening = false;

  state.basket.forEach(function (qty, id) {
    const item = getItemById(id);
    if (item) {
      if (item.isQuoteOnly) {
        quoteCount += qty;
        if (item.whiteningEligible) {
          hasWhitening = true;
        }
      } else if (item.isNhs) {
        nhsSubtotal += item.price * qty;
      } else {
        privateSubtotal += item.price * qty;
        if (item.fromPrice) {
          hasFromPrices = true;
        }
      }
    }
  });

  const plan = CARE_PLANS[state.activePlan];
  let planSavings = 0;
  if (state.paymentMode === 'plan' && plan) {
    planSavings = Math.round(privateSubtotal * plan.privateDiscountRate * 100) / 100;
  }

  const netTotal = Math.max(0, privateSubtotal - planSavings) + nhsSubtotal;
  const monthlySpread = netTotal > 0 ? netTotal / 12 : 0;

  return {
    privateSubtotal: privateSubtotal,
    nhsSubtotal: nhsSubtotal,
    planSavings: planSavings,
    netTotal: netTotal,
    monthlySpread: monthlySpread,
    hasFromPrices: hasFromPrices,
    quoteCount: quoteCount,
    hasWhitening: hasWhitening,
    plan: plan
  };
}

function renderCatalog() {
  const container = document.getElementById('treatmentCatalog');
  if (container === null) {
    return;
  }

  const query = state.searchQuery.trim().toLowerCase();
  const filtered = FEE_ITEMS.filter(function (item) {
    const catOk = state.activeCategory === 'all' || item.category === state.activeCategory;
    if (catOk === false) {
      return false;
    }
    if (query.length === 0) {
      return true;
    }
    const haystack = (item.title + ' ' + item.description + ' ' + item.categoryLabel + ' ' + item.tariffRef).toLowerCase();
    return haystack.indexOf(query) !== -1;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No procedures matched your filter. Clear search or choose All Treatments.</div>';
    return;
  }

  container.innerHTML = filtered.map(function (item) {
    const qty = state.basket.get(item.id) || 0;
    const selectedClass = qty > 0 ? ' is-selected' : '';
    const priceLabel = item.isQuoteOnly
      ? 'Written Quote'
      : (item.fromPrice ? 'From ' + formatGBP(item.price) : formatGBP(item.price));

    const actionHtml = qty > 0
      ? '<div class="qty-control">' +
          '<button type="button" class="qty-btn" data-action="dec" data-id="' + item.id + '" aria-label="Decrease quantity of ' + item.title + '">-</button>' +
          '<span class="qty-count">' + qty + '</span>' +
          '<button type="button" class="qty-btn" data-action="inc" data-id="' + item.id + '" aria-label="Increase quantity of ' + item.title + '">+</button>' +
        '</div>'
      : '<button type="button" class="add-btn" data-action="add" data-id="' + item.id + '">Add</button>';

    return '<article class="treatment-card' + selectedClass + '">' +
      '<div class="treatment-info">' +
        '<div class="treatment-meta">' +
          '<span class="treatment-cat">' + item.categoryLabel + '</span>' +
          '<span class="treatment-badge">' + item.tariffRef + '</span>' +
        '</div>' +
        '<h3 class="treatment-title">' + item.title + '</h3>' +
        '<p class="treatment-desc">' + item.description + '</p>' +
      '</div>' +
      '<div class="treatment-actions">' +
        '<div class="price-block">' +
          '<span class="price-main">' + priceLabel + '</span>' +
          '<span class="price-sub">per ' + item.unitLabel + '</span>' +
        '</div>' +
        actionHtml +
      '</div>' +
    '</article>';
  }).join('');
}

function renderBasket() {
  const listEl = document.getElementById('selectedItemsList');
  const breakdownEl = document.getElementById('estimateBreakdown');
  const totalLabelEl = document.getElementById('estimateTotalLabel');
  const totalEl = document.getElementById('estimateTotal');
  const modeMetaEl = document.getElementById('estimateModeMeta');
  const quoteNoteEl = document.getElementById('estimateQuoteNote');

  if (listEl === null || totalEl === null) {
    return;
  }

  if (state.basket.size === 0) {
    listEl.innerHTML = '<div class="selected-empty">Select treatments from the fee list on the left or choose a quick combination to build your GBP estimate.</div>';
  } else {
    const rows = [];
    state.basket.forEach(function (qty, id) {
      const item = getItemById(id);
      if (item) {
        const lineText = item.isQuoteOnly
          ? 'Quote on Exam'
          : (item.fromPrice ? 'From ' + formatGBP(item.price * qty) : formatGBP(item.price * qty));
        rows.push(
          '<div class="selected-row">' +
            '<div class="selected-row-main">' +
              '<span class="selected-row-title">' + item.title + '</span>' +
              '<span class="selected-row-sub">Qty ' + qty + ' | ' + item.tariffRef + '</span>' +
            '</div>' +
            '<div class="selected-row-actions">' +
              '<span class="selected-row-price">' + lineText + '</span>' +
              '<button type="button" class="remove-btn" data-remove-id="' + item.id + '" aria-label="Remove ' + item.title + '">&times;</button>' +
            '</div>' +
          '</div>'
        );
      }
    });
    listEl.innerHTML = rows.join('');
  }

  const calc = calculateTotals();
  const breakdownLines = [];

  if (calc.privateSubtotal > 0) {
    breakdownLines.push(
      '<div class="breakdown-line"><span>Private Published Guide Subtotal</span><span class="mono">' +
      (calc.hasFromPrices ? 'From ' : '') + formatGBP(calc.privateSubtotal) + '</span></div>'
    );
  }
  if (calc.nhsSubtotal > 0) {
    breakdownLines.push(
      '<div class="breakdown-line"><span>NHS Statutory Band Total</span><span class="mono">' +
      formatGBP(calc.nhsSubtotal) + '</span></div>'
    );
  }
  if (state.paymentMode === 'plan') {
    if (calc.planSavings > 0) {
      breakdownLines.push(
        '<div class="breakdown-line is-savings"><span>' + calc.plan.name + ' (10% Off Private)</span><span class="mono">-' +
        formatGBP(calc.planSavings) + '</span></div>'
      );
    }
    if (calc.hasWhitening && calc.plan.whiteningCredit > 0) {
      breakdownLines.push(
        '<div class="breakdown-line is-savings"><span>Premium Whitening Credit</span><span class="mono">-' +
        formatGBP(calc.plan.whiteningCredit) + ' off clinic fee</span></div>'
      );
    }
    breakdownLines.push(
      '<div class="breakdown-line"><span>Plan Membership Reference</span><span class="mono">' +
      formatGBP(calc.plan.annualFee) + '/yr (' + formatGBP(calc.plan.monthlyEquiv) + '/mo)</span></div>'
    );
  } else if (state.paymentMode === 'spread' && calc.netTotal > 0) {
    breakdownLines.push(
      '<div class="breakdown-line"><span>Full Treatment Total</span><span class="mono">' +
      (calc.hasFromPrices ? 'From ' : '') + formatGBP(calc.netTotal) + '</span></div>'
    );
  }

  if (calc.quoteCount > 0) {
    breakdownLines.push(
      '<div class="breakdown-line"><span>Written Assessment Quote Items</span><span class="mono">' +
      calc.quoteCount + ' item(s)</span></div>'
    );
  }

  breakdownEl.innerHTML = breakdownLines.join('');

  if (state.paymentMode === 'spread') {
    totalLabelEl.textContent = '12-Month Spread Preview';
    totalEl.textContent = calc.netTotal > 0 ? formatGBP(calc.monthlySpread) + '/mo' : 'Written Quote';
    modeMetaEl.textContent = 'Illustrative 12-part split';
  } else if (state.paymentMode === 'plan') {
    totalLabelEl.textContent = calc.hasFromPrices ? 'Member Guide Total (From)' : 'Member Guide Total';
    totalEl.textContent = calc.netTotal > 0 ? formatGBP(calc.netTotal) : (calc.quoteCount > 0 ? 'Written Quote' : '£0.00');
    modeMetaEl.textContent = calc.plan.name;
  } else {
    totalLabelEl.textContent = calc.hasFromPrices ? 'Estimated Guide Total (From)' : 'Estimated Guide Total';
    totalEl.textContent = calc.netTotal > 0 ? formatGBP(calc.netTotal) : (calc.quoteCount > 0 ? 'Written Quote' : '£0.00');
    modeMetaEl.textContent = state.emergencyPriority ? 'Urgent Triage Priority' : 'One-Off Private / NHS Guide';
  }

  quoteNoteEl.textContent = calc.quoteCount > 0 ? '+ ' + calc.quoteCount + ' quoted at assessment' : 'July 2025 / NHS 2025';
}

function syncUrgencyUI() {
  const banner = document.getElementById('emergencyBanner');
  if (banner) {
    banner.classList.toggle('is-hidden', state.emergencyPriority === false);
  }
}

function syncPlanBarUI() {
  const bar = document.getElementById('planTierBar');
  if (bar) {
    bar.classList.toggle('is-hidden', state.paymentMode !== 'plan');
  }
}

function renderReferenceTables() {
  const privateEl = document.getElementById('privateFeeTable');
  const nhsEl = document.getElementById('nhsFeeTable');

  const privateIds = ['private-exam', 'private-hygiene', 'white-filling', 'private-extraction', 'crowns-bridges', 'dentures'];
  if (privateEl) {
    privateEl.innerHTML = privateIds.map(function (id) {
      const item = getItemById(id);
      if (item === undefined) {
        return '';
      }
      return '<button type="button" class="fee-row-btn" data-quick-add="' + item.id + '">' +
        '<div>' +
          '<span class="fee-row-title">' + item.title + '</span>' +
          '<span class="fee-row-detail">' + item.description + '</span>' +
        '</div>' +
        '<span class="fee-row-price">From ' + formatGBP(item.price) + '</span>' +
      '</button>';
    }).join('');
  }

  const nhsIds = ['nhs-band-1', 'nhs-band-2', 'nhs-band-3'];
  if (nhsEl) {
    nhsEl.innerHTML = nhsIds.map(function (id) {
      const item = getItemById(id);
      if (item === undefined) {
        return '';
      }
      return '<button type="button" class="fee-row-btn" data-quick-add="' + item.id + '">' +
        '<div>' +
          '<span class="fee-row-title">' + item.title + '</span>' +
          '<span class="fee-row-detail">' + item.description + '</span>' +
        '</div>' +
        '<span class="fee-row-price">' + formatGBP(item.price) + '</span>' +
      '</button>';
    }).join('');
  }
}

function renderPlans() {
  const grid = document.getElementById('plansGrid');
  if (grid === null) {
    return;
  }

  const keys = ['basic', 'comprehensive', 'premium'];
  grid.innerHTML = keys.map(function (key) {
    const p = CARE_PLANS[key];
    const featuredClass = p.featured ? ' is-featured' : '';
    const checkIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>';
    const listItems = p.features.map(function (feat) {
      return '<li>' + checkIcon + '<span>' + feat + '</span></li>';
    }).join('');

    return '<article class="plan-card' + featuredClass + '">' +
      '<div>' +
        '<div class="plan-top">' +
          '<h3>' + p.name + '</h3>' +
          '<span class="badge-soft mono">' + p.badge + '</span>' +
        '</div>' +
        '<div class="plan-price-row">' +
          '<span class="plan-price-annual">' + formatGBP(p.annualFee) + '</span>' +
          '<span class="plan-price-monthly">per year (' + formatGBP(p.monthlyEquiv) + '/mo equiv)</span>' +
        '</div>' +
        '<p class="plan-desc">' + p.summary + '</p>' +
        '<ul class="plan-features">' + listItems + '</ul>' +
      '</div>' +
      '<button type="button" class="btn btn-outline btn-full" data-apply-plan="' + p.id + '">Apply ' + p.name + ' to Calculator</button>' +
    '</article>';
  }).join('');
}

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (grid === null) {
    return;
  }

  grid.innerHTML = SERVICES_OVERVIEW.map(function (svc) {
    const tags = svc.tags.map(function (t) {
      return '<li>' + t + '</li>';
    }).join('');
    return '<article class="service-card">' +
      '<div class="service-icon-box">' + getServiceIcon(svc.icon) + '</div>' +
      '<h3>' + svc.title + '</h3>' +
      '<p>' + svc.body + '</p>' +
      '<ul class="service-tags">' + tags + '</ul>' +
    '</article>';
  }).join('');
}

function renderTeam() {
  const grid = document.getElementById('teamGrid');
  if (grid === null) {
    return;
  }

  const members = TEAM_MEMBERS.filter(function (member) {
    if (state.teamFilter === 'all') {
      return true;
    }
    return member.searchTags.indexOf(state.teamFilter) !== -1;
  });

  grid.innerHTML = members.map(function (m) {
    const chips = m.languages.map(function (lang) {
      return '<span class="lang-chip">' + lang + '</span>';
    }).join('');

    return '<article class="team-card">' +
      '<div class="team-card-head">' +
        '<div>' +
          '<p class="team-role">' + m.role + '</p>' +
          '<h3>' + m.name + '</h3>' +
          '<p class="team-cred">' + m.credentials + '</p>' +
        '</div>' +
      '</div>' +
      '<p class="team-bio">' + m.bio + '</p>' +
      '<div class="team-langs">' + chips + '</div>' +
      '<div class="team-card-footer">' +
        '<span class="small-label">Headington OX3 Chairside Care</span>' +
        '<button type="button" class="inline-action" data-book-clinician="' + m.selectValue + '" data-book-lang="' + m.defaultLang + '">Book with ' + m.name.split(' ').slice(0, 2).join(' ') + '</button>' +
      '</div>' +
    '</article>';
  }).join('');
}

function populateTimeWindows() {
  const daySelect = document.getElementById('preferredDaySelect');
  const windowSelect = document.getElementById('preferredWindowSelect');
  if (daySelect === null || windowSelect === null) {
    return;
  }

  const options = DAY_WINDOWS[daySelect.value] || DAY_WINDOWS['Monday (08:30 - 17:30)'];
  windowSelect.innerHTML = options.map(function (slot) {
    return '<option value="' + slot + '">' + slot + '</option>';
  }).join('');
}

function buildBookingSummaryText() {
  const clinicianEl = document.getElementById('clinicianSelect');
  const languageEl = document.getElementById('languageSelect');
  const dayEl = document.getElementById('preferredDaySelect');
  const windowEl = document.getElementById('preferredWindowSelect');
  const nameEl = document.getElementById('patientNameInput');
  const phoneEl = document.getElementById('patientPhoneInput');
  const emailEl = document.getElementById('patientEmailInput');
  const typeEl = document.getElementById('patientTypeSelect');
  const anxiousEl = document.getElementById('anxiousConsultCheck');
  const notesEl = document.getElementById('clinicalNotesInput');

  const lines = [];
  lines.push('EURO DENTAL OXFORD - APPOINTMENT & FEE ESTIMATE REQUEST');
  lines.push('Clinic: 61 London Road, Headington, Oxford OX3 7RD | Tel: 01865 308 865');
  lines.push('');
  lines.push('Selected Procedures:');

  if (state.basket.size === 0) {
    lines.push('- General Examination / Consultation Request');
  } else {
    state.basket.forEach(function (qty, id) {
      const item = getItemById(id);
      if (item) {
        const priceStr = item.isQuoteOnly
          ? 'Written Quote at Assessment'
          : (item.fromPrice ? 'From ' + formatGBP(item.price * qty) : formatGBP(item.price * qty));
        lines.push('- ' + item.title + ' (x' + qty + '): ' + priceStr);
      }
    });
  }

  const calc = calculateTotals();
  lines.push('');
  lines.push('Pricing Mode: ' + (state.paymentMode === 'plan' ? calc.plan.name : (state.paymentMode === 'spread' ? '12-Month Spread Preview' : 'One-Off Pay')));
  if (calc.planSavings > 0) {
    lines.push('Plan Discount Applied (10% Off Private): -' + formatGBP(calc.planSavings));
  }
  lines.push('Estimated Guide Total: ' + (calc.netTotal > 0 ? (calc.hasFromPrices ? 'From ' : '') + formatGBP(calc.netTotal) : 'Written Quote'));
  if (state.paymentMode === 'spread' && calc.netTotal > 0) {
    lines.push('Illustrative 12-Month Split: ' + formatGBP(calc.monthlySpread) + ' / month');
  }
  if (state.emergencyPriority) {
    lines.push('URGENCY: Same-Day Emergency Priority Requested');
  }
  lines.push('');
  lines.push('Preferred Clinician: ' + (clinicianEl ? clinicianEl.value : 'First Available'));
  lines.push('Consultation Language: ' + (languageEl ? languageEl.value : 'English'));
  lines.push('Preferred Day & Time: ' + (dayEl ? dayEl.value : '') + ' | ' + (windowEl ? windowEl.value : ''));
  lines.push('Patient Pathway: ' + (typeEl ? typeEl.value : 'New Private Patient'));
  lines.push('Nervous Patient 1-to-1 Consult: ' + (anxiousEl && anxiousEl.checked ? 'Yes' : 'No'));
  lines.push('');
  lines.push('Patient Name: ' + (nameEl && nameEl.value.trim() ? nameEl.value.trim() : 'Not provided'));
  lines.push('Telephone: ' + (phoneEl && phoneEl.value.trim() ? phoneEl.value.trim() : 'Not provided'));
  lines.push('Email: ' + (emailEl && emailEl.value.trim() ? emailEl.value.trim() : 'Not provided'));
  if (notesEl && notesEl.value.trim()) {
    lines.push('Clinical Notes: ' + notesEl.value.trim());
  }

  return lines.join('\n');
}

function updateOxfordStatusBadge() {
  const badge = document.getElementById('practiceStatusBadge');
  if (badge === null) {
    return;
  }

  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const parts = formatter.formatToParts(new Date());
    const map = {};
    parts.forEach(function (part) {
      map[part.type] = part.value;
    });
    const day = map.weekday;
    const mins = parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10);

    if (day === 'Sun') {
      badge.textContent = 'Oxford Closed Sun · SOE Open';
    } else if (day === 'Sat') {
      if (mins >= 540 && mins < 840) {
        badge.textContent = 'Open Sat Until 14:00';
      } else {
        badge.textContent = 'Sat 09:00 - 14:00';
      }
    } else {
      if (mins >= 780 && mins < 840) {
        badge.textContent = 'Lunch Closure 13:00 - 14:00';
      } else if (mins >= 510 && mins < 1050) {
        badge.textContent = 'Open Today Until 17:30';
      } else {
        badge.textContent = 'Mon-Fri 08:30 - 17:30';
      }
    }
  } catch (err) {
    badge.textContent = 'Open 6 Days · OX3';
  }
}

function bindEvents() {
  const searchInput = document.getElementById('feeSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      state.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  const categoryTabs = document.getElementById('categoryTabs');
  if (categoryTabs) {
    categoryTabs.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-category]');
      if (btn === null) {
        return;
      }
      state.activeCategory = btn.getAttribute('data-category');
      categoryTabs.querySelectorAll('button').forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderCatalog();
    });
  }

  const paymentTabs = document.getElementById('paymentModeTabs');
  if (paymentTabs) {
    paymentTabs.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-mode]');
      if (btn === null) {
        return;
      }
      state.paymentMode = btn.getAttribute('data-mode');
      paymentTabs.querySelectorAll('button').forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      syncPlanBarUI();
      renderBasket();
    });
  }

  const planTierPills = document.getElementById('planTierPills');
  if (planTierPills) {
    planTierPills.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-plan]');
      if (btn === null) {
        return;
      }
      state.activePlan = btn.getAttribute('data-plan');
      planTierPills.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      renderBasket();
    });
  }

  const emergencyToggle = document.getElementById('emergencyPriorityToggle');
  if (emergencyToggle) {
    emergencyToggle.addEventListener('change', function (e) {
      state.emergencyPriority = e.target.checked;
      if (state.emergencyPriority && state.basket.size === 0) {
        state.basket.set('same-day-emergency', 1);
      }
      syncUrgencyUI();
      renderCatalog();
      renderBasket();
    });
  }

  document.querySelectorAll('button[data-preset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyPreset(btn.getAttribute('data-preset'));
    });
  });

  const catalogEl = document.getElementById('treatmentCatalog');
  if (catalogEl) {
    catalogEl.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-action]');
      if (btn === null) {
        return;
      }
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      if (action === 'add' || action === 'inc') {
        addItem(id);
      } else if (action === 'dec') {
        decrementItem(id);
      }
    });
  }

  const selectedList = document.getElementById('selectedItemsList');
  if (selectedList) {
    selectedList.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-remove-id]');
      if (btn) {
        removeItem(btn.getAttribute('data-remove-id'));
      }
    });
  }

  const clearBtn = document.getElementById('clearBasketBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      state.basket.clear();
      renderCatalog();
      renderBasket();
    });
  }

  document.addEventListener('click', function (e) {
    const feeRow = e.target.closest('button[data-quick-add]');
    if (feeRow) {
      const id = feeRow.getAttribute('data-quick-add');
      addItem(id);
      document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const planBtn = e.target.closest('button[data-apply-plan]');
    if (planBtn) {
      state.paymentMode = 'plan';
      state.activePlan = planBtn.getAttribute('data-apply-plan');
      if (paymentTabs) {
        paymentTabs.querySelectorAll('button').forEach(function (b) {
          const active = b.getAttribute('data-mode') === 'plan';
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
      }
      if (planTierPills) {
        planTierPills.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-plan') === state.activePlan);
        });
      }
      syncPlanBarUI();
      renderBasket();
      document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const clinicianBtn = e.target.closest('button[data-book-clinician]');
    if (clinicianBtn) {
      const clinicianSelect = document.getElementById('clinicianSelect');
      const languageSelect = document.getElementById('languageSelect');
      if (clinicianSelect) {
        clinicianSelect.value = clinicianBtn.getAttribute('data-book-clinician');
      }
      if (languageSelect) {
        languageSelect.value = clinicianBtn.getAttribute('data-book-lang') || 'English';
      }
      document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
    }
  });

  const teamFilters = document.getElementById('teamFilters');
  if (teamFilters) {
    teamFilters.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-team-filter]');
      if (btn === null) {
        return;
      }
      state.teamFilter = btn.getAttribute('data-team-filter');
      teamFilters.querySelectorAll('button').forEach(function (b) {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderTeam();
    });
  }

  const daySelect = document.getElementById('preferredDaySelect');
  if (daySelect) {
    daySelect.addEventListener('change', populateTimeWindows);
  }

  const copyBtn = document.getElementById('copySummaryBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const summary = buildBookingSummaryText();
      const feedback = document.getElementById('bookingFeedback');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summary).then(function () {
          if (feedback) {
            feedback.className = 'form-feedback is-success';
            feedback.textContent = 'Treatment estimate copied to clipboard. Ready to paste into an email or message.';
          }
        }).catch(function () {
          if (feedback) {
            feedback.className = 'form-feedback is-error';
            feedback.textContent = 'Clipboard permission unavailable. Use the email button or call 01865 308 865.';
          }
        });
      }
    });
  }

  const bookingForm = document.getElementById('bookingRequestForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameVal = document.getElementById('patientNameInput').value.trim();
      const phoneVal = document.getElementById('patientPhoneInput').value.trim();
      const emailVal = document.getElementById('patientEmailInput').value.trim();
      const feedback = document.getElementById('bookingFeedback');

      if (nameVal.length < 2 || phoneVal.length < 6 || emailVal.indexOf('@') === -1) {
        feedback.className = 'form-feedback is-error';
        feedback.textContent = 'Please enter your full name, telephone number, and valid email address before submitting.';
        return;
      }

      const body = buildBookingSummaryText();
      const subjectPrefix = state.emergencyPriority ? 'URGENT Dental Request' : 'Appointment & Fee Estimate';
      const subject = subjectPrefix + ' - ' + nameVal + ' (Euro Dental Oxford)';
      const mailtoHref = 'mailto:' + PRACTICE_INFO.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      feedback.className = 'form-feedback is-success';
      feedback.textContent = 'Prepared booking email for ' + nameVal + ' to ' + PRACTICE_INFO.email + '. Opening your mail client now, or call 01865 308 865 directly.';
      window.location.href = mailtoHref;
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  populateTimeWindows();
  updateOxfordStatusBadge();
  syncUrgencyUI();
  syncPlanBarUI();
  renderCatalog();
  renderBasket();
  renderReferenceTables();
  renderPlans();
  renderServices();
  renderTeam();
  bindEvents();
});
