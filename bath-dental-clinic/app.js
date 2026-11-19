(function () {
  'use strict';

  const CLINIC = {
    name: 'Bath Dental Clinic',
    address: 'Catharine Cottage, 21 Catharine Place, Bath, BA1 2PS',
    phoneDisplay: '+44 (0)1225 333848',
    phoneHref: 'tel:+441225333848',
    email: 'reception@bathdentalclinic.co.uk',
    cqc: '1-3054092285'
  };

  const TREATMENTS = [
    {
      id: 'new-patient-exam',
      category: 'general',
      categoryLabel: 'Exams & Hygiene',
      title: 'New Patient Examination',
      description: 'Comprehensive oral health assessment, soft-tissue screening, and small film radiographs as indicated.',
      price: 100.0,
      fromPrice: false,
      isPOA: false,
      allowQty: false,
      unitLabel: 'visit',
      stage: 1,
      clinician: 'Paul HR Wilson / General Team'
    },
    {
      id: 'direct-access-hygiene',
      category: 'general',
      categoryLabel: 'Exams & Hygiene',
      title: 'Direct Access Hygiene Appointment (45 min)',
      description: 'Thorough preventive scaling, polishing, periodontal charting, and tailored home care advice without prior dentist referral.',
      price: 127.5,
      fromPrice: false,
      isPOA: false,
      allowQty: false,
      unitLabel: '45 min',
      stage: 1,
      clinician: 'Katy Colbourne (GDC 223898)'
    },
    {
      id: 'routine-hygiene',
      category: 'general',
      categoryLabel: 'Exams & Hygiene',
      title: 'Routine Preventive Hygiene Session (30 min)',
      description: 'Ongoing gum maintenance, plaque biofilm removal, and stain management for registered practice patients.',
      price: 85.0,
      fromPrice: true,
      isPOA: false,
      allowQty: false,
      unitLabel: '30 min',
      stage: 1,
      clinician: 'Katy Colbourne (GDC 223898)'
    },
    {
      id: 'child-exam',
      category: 'general',
      categoryLabel: 'Exams & Hygiene',
      title: 'Child Dental Examination (0 to 14 years)',
      description: 'Calm, preventive check-up for children aged 0 to 14 years including caries risk review and fluoride advice.',
      price: 55.0,
      fromPrice: true,
      isPOA: false,
      allowQty: false,
      unitLabel: 'visit',
      stage: 1,
      clinician: 'Sarah Tukmachi / General Team'
    },
    {
      id: 'composite-bonding',
      category: 'cosmetic',
      categoryLabel: 'Cosmetic & Aligners',
      title: 'Composite Bonding / Tooth-Coloured Restoration',
      description: 'Minimally invasive aesthetic edge bonding or white composite restoration matched seamlessly to natural enamel.',
      price: 130.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'tooth',
      stage: 2,
      clinician: 'Greer Holmes Taylor / Restorative Team'
    },
    {
      id: 'ceramic-veneer',
      category: 'cosmetic',
      categoryLabel: 'Cosmetic & Aligners',
      title: 'Bespoke Ceramic Veneer',
      description: 'Hand-layered laboratory porcelain veneer crafted for balanced shade, translucency, and conservative tooth preparation.',
      price: 1100.0,
      fromPrice: false,
      isPOA: false,
      allowQty: true,
      unitLabel: 'unit',
      stage: 3,
      clinician: 'Paul HR Wilson (FDS RestDent)'
    },
    {
      id: 'clearcorrect-aligners',
      category: 'cosmetic',
      categoryLabel: 'Cosmetic & Aligners',
      title: 'ClearCorrect Aligners Assessment & Plan',
      description: 'Discreet removable transparent aligner therapy planned via 3D digital intra-oral scan. Course fee quoted after assessment.',
      price: 0,
      fromPrice: false,
      isPOA: true,
      allowQty: false,
      unitLabel: 'course',
      stage: 2,
      clinician: 'Greer Holmes Taylor / Clinical Team'
    },
    {
      id: 'teeth-whitening',
      category: 'cosmetic',
      categoryLabel: 'Cosmetic & Aligners',
      title: 'Supervised Teeth Whitening Course',
      description: 'Clinical shade assessment and custom-fitted home or combined whitening trays tailored to tooth sensitivity.',
      price: 0,
      fromPrice: false,
      isPOA: true,
      allowQty: false,
      unitLabel: 'course',
      stage: 2,
      clinician: 'Stephanie Wilson / Greer Holmes Taylor'
    },
    {
      id: 'straumann-implant',
      category: 'implants',
      categoryLabel: 'Implants & Restorative',
      title: 'Straumann Single Dental Implant & Definitive Crown',
      description: 'Complete single-tooth implant placement and bespoke ceramic crown restoration using Swiss Straumann components.',
      price: 4500.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'implant',
      stage: 2,
      clinician: 'Paul HR Wilson (FDS RestDent)'
    },
    {
      id: 'bespoke-crown',
      category: 'implants',
      categoryLabel: 'Implants & Restorative',
      title: 'Bespoke Ceramic or Precious-Metal Crown',
      description: 'Full-coverage laboratory crown restoring heavily filled, fractured, or root-treated teeth with precision fit.',
      price: 1050.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'unit',
      stage: 3,
      clinician: 'Paul HR Wilson / Stephanie Wilson'
    },
    {
      id: 'adhesive-bridge',
      category: 'implants',
      categoryLabel: 'Implants & Restorative',
      title: 'Adhesive Resin-Bonded Bridge',
      description: 'Conservative fixed tooth replacement anchored without aggressive preparation of adjacent healthy teeth.',
      price: 1250.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'unit',
      stage: 3,
      clinician: 'Paul HR Wilson (FDS RestDent)'
    },
    {
      id: 'occlusal-splint',
      category: 'implants',
      categoryLabel: 'Implants & Restorative',
      title: 'Michigan or Tanner Occlusal Splint (TMD)',
      description: 'Full-coverage hard acrylic stabilisation appliance protecting teeth and easing jaw joint or clenching discomfort.',
      price: 975.0,
      fromPrice: false,
      isPOA: false,
      allowQty: false,
      unitLabel: 'appliance',
      stage: 3,
      clinician: 'Paul HR Wilson (FDS RestDent)'
    },
    {
      id: 'sinus-lift-graft',
      category: 'implants',
      categoryLabel: 'Implants & Restorative',
      title: 'Guided Bone Regeneration or Sinus Lift Augmentation',
      description: 'Hard and soft tissue site augmentation preparing deficient jawbone volumes for predictable implant support.',
      price: 950.0,
      fromPrice: true,
      isPOA: false,
      allowQty: false,
      unitLabel: 'site',
      stage: 2,
      clinician: 'Paul HR Wilson (FDS RestDent)'
    },
    {
      id: 'urgent-assessment',
      category: 'endo',
      categoryLabel: 'Endo & Urgent',
      title: 'Urgent Dental Assessment & Pain Triage',
      description: 'Priority evaluation for acute toothache, swelling, fractured restorations, or dental trauma with diagnostic films.',
      price: 100.0,
      fromPrice: true,
      isPOA: false,
      allowQty: false,
      unitLabel: 'visit',
      stage: 1,
      clinician: 'Next Available Clinician'
    },
    {
      id: 'endo-root-canal',
      category: 'endo',
      categoryLabel: 'Endo & Urgent',
      title: 'Specialist Endodontic Root Canal Treatment',
      description: 'Microscope-guided root canal disinfection and three-dimensional obturation for compromised or painful teeth.',
      price: 750.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'tooth',
      stage: 2,
      clinician: 'Rebecca Kirke MSc Endo (KCL)'
    },
    {
      id: 'endo-retreatment',
      category: 'endo',
      categoryLabel: 'Endo & Urgent',
      title: 'Complex Endodontic Retreatment',
      description: 'Revision of previously root-filled teeth, post removal, or management of fractured canals under high magnification.',
      price: 925.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'tooth',
      stage: 2,
      clinician: 'Rebecca Kirke MSc Endo (KCL)'
    },
    {
      id: 'internal-bleaching',
      category: 'endo',
      categoryLabel: 'Endo & Urgent',
      title: 'Internal Bleaching (Non-Vital Tooth)',
      description: 'Targeted internal lightening for discoloured root-treated anterior teeth without invasive crown preparation.',
      price: 280.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'tooth',
      stage: 2,
      clinician: 'Rebecca Kirke MSc Endo (KCL)'
    },
    {
      id: 'wisdom-extraction',
      category: 'endo',
      categoryLabel: 'Endo & Urgent',
      title: 'Surgical Wisdom Tooth or Complex Extraction',
      description: 'Atraumatic surgical removal of impacted wisdom teeth or fractured roots under local anaesthesia or sedation.',
      price: 380.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'tooth',
      stage: 2,
      clinician: 'Paul HR Wilson / Greer Holmes Taylor'
    },
    {
      id: 'paediatric-consult',
      category: 'sedation',
      categoryLabel: 'Sedation & Scans',
      title: 'Consultant Paediatric Dentistry Assessment (0 to 14 years)',
      description: 'Specialist diagnostic visit for anxious young patients, enamel defects, or childhood dental trauma.',
      price: 185.0,
      fromPrice: true,
      isPOA: false,
      allowQty: false,
      unitLabel: 'visit',
      stage: 1,
      clinician: 'Miss Sarah Tukmachi MPaedDent RCS'
    },
    {
      id: 'cbct-scan',
      category: 'sedation',
      categoryLabel: 'Sedation & Scans',
      title: 'Digital 3D CBCT Cone-Beam Scan',
      description: 'Low-dose three-dimensional imaging for implant bone volume, endodontic anatomy, and wisdom tooth mapping.',
      price: 185.0,
      fromPrice: true,
      isPOA: false,
      allowQty: false,
      unitLabel: 'scan',
      stage: 1,
      clinician: 'Practice Imaging Suite'
    },
    {
      id: 'inhalation-sedation',
      category: 'sedation',
      categoryLabel: 'Sedation & Scans',
      title: 'Inhalational Conscious Sedation (Relative Analgesia)',
      description: 'Gentle nitrous oxide and oxygen relaxation especially suited to anxious children and needle-phobic adults.',
      price: 185.0,
      fromPrice: true,
      isPOA: false,
      allowQty: true,
      unitLabel: 'session',
      stage: 2,
      clinician: 'Stephanie Wilson / Sarah Tukmachi'
    },
    {
      id: 'iv-sedation',
      category: 'sedation',
      categoryLabel: 'Sedation & Scans',
      title: 'Intravenous (IV) Conscious Sedation',
      description: 'Calming physician-monitored intravenous sedation allowing longer surgical or restorative care in deep comfort.',
      price: 320.0,
      fromPrice: false,
      isPOA: false,
      allowQty: true,
      unitLabel: 'session',
      stage: 2,
      clinician: 'Paul HR Wilson DipDSed / Stephanie Wilson'
    }
  ];

  const PRESETS = {
    welcome: {
      label: 'New Patient Welcome',
      filter: 'general',
      items: [
        { id: 'new-patient-exam', qty: 1 },
        { id: 'direct-access-hygiene', qty: 1 }
      ]
    },
    smile: {
      label: 'Cosmetic Smile Refresh',
      filter: 'cosmetic',
      items: [
        { id: 'new-patient-exam', qty: 1 },
        { id: 'composite-bonding', qty: 2 },
        { id: 'teeth-whitening', qty: 1 }
      ]
    },
    cosmetic: {
      label: 'Cosmetic & Veneer Pathway',
      filter: 'cosmetic',
      items: [
        { id: 'composite-bonding', qty: 2 },
        { id: 'ceramic-veneer', qty: 1 },
        { id: 'teeth-whitening', qty: 1 }
      ]
    },
    implant: {
      label: 'Single Implant Pathway',
      filter: 'implants',
      items: [
        { id: 'cbct-scan', qty: 1 },
        { id: 'straumann-implant', qty: 1 }
      ]
    },
    emergency: {
      label: 'Urgent Assessment & Endo',
      filter: 'endo',
      items: [
        { id: 'urgent-assessment', qty: 1 },
        { id: 'endo-root-canal', qty: 1 }
      ]
    }
  };

  const FEE_GUIDE_GROUPS = [
    {
      id: 'fg-exams',
      title: 'Examinations & Diagnostics',
      items: [
        {
          name: 'New Patient Consultation & Exam',
          note: 'Includes small film radiographs and clinical treatment discussion',
          fee: '£100.00',
          plannerId: 'new-patient-exam'
        },
        {
          name: 'Routine Adult Dental Examination',
          note: 'Comprehensive oral health review for continuing practice patients',
          fee: '£75.00',
          plannerId: null
        },
        {
          name: 'Child Examination (0 to 14 years)',
          note: 'Preventive growth, eruption, and enamel assessment',
          fee: 'From £55.00',
          plannerId: 'child-exam'
        },
        {
          name: 'Small Intra-Oral Radiograph',
          note: 'Digital low-dose periapical or bitewing film',
          fee: '£25.00',
          plannerId: null
        },
        {
          name: 'Digital 3D CBCT Diagnostic Scan',
          note: 'Single-arch or full-jaw cone-beam volumetric imaging',
          fee: 'From £185.00',
          plannerId: 'cbct-scan'
        },
        {
          name: 'Urgent Assessment & Pain Triage',
          note: 'Same-day or priority urgent diagnostic appointment',
          fee: 'From £100.00',
          plannerId: 'urgent-assessment'
        }
      ]
    },
    {
      id: 'fg-hygiene',
      title: 'Preventive Hygiene & Periodontal Care',
      items: [
        {
          name: 'Direct Access Hygienist Visit (45 min)',
          note: 'Katy Colbourne; open to self-referrals without prior dentist check-up',
          fee: '£127.50',
          plannerId: 'direct-access-hygiene'
        },
        {
          name: 'Preventive Hygiene Maintenance (30 min)',
          note: 'Routine scale, polish, and periodontal pocket monitoring',
          fee: 'From £85.00',
          plannerId: 'routine-hygiene'
        },
        {
          name: 'Non-Surgical Periodontal Stabilisation',
          note: 'Deep root-surface instrumentation for gum disease stabilisation',
          fee: 'From £260.00',
          plannerId: null
        },
        {
          name: 'Bespoke Sports Mouthguard / Gumshield',
          note: 'Custom pressure-laminated protection',
          fee: 'From £145.00',
          plannerId: null
        }
      ]
    },
    {
      id: 'fg-cosmetic',
      title: 'Restorative, Crowns & Cosmetic Care',
      items: [
        {
          name: 'Tooth-Coloured Composite Filling or Bonding',
          note: 'Aesthetic direct adhesive restoration',
          fee: 'From £130.00',
          plannerId: 'composite-bonding'
        },
        {
          name: 'Handcrafted Ceramic Veneer (per unit)',
          note: 'Master technician porcelain shade and contour matching',
          fee: '£1,100.00',
          plannerId: 'ceramic-veneer'
        },
        {
          name: 'Bespoke Ceramic or Precious-Metal Crown',
          note: 'Full-coverage structural crown',
          fee: 'From £1,050.00',
          plannerId: 'bespoke-crown'
        },
        {
          name: 'Adhesive Resin-Bonded Bridge',
          note: 'Minimal-preparation fixed replacement',
          fee: 'From £1,250.00',
          plannerId: 'adhesive-bridge'
        },
        {
          name: 'ClearCorrect Aligners Assessment & Course',
          note: 'Removable transparent aligner orthodontics quoted after 3D scan',
          fee: 'POA',
          plannerId: 'clearcorrect-aligners'
        },
        {
          name: 'Clinician-Supervised Teeth Whitening',
          note: 'Custom trays and prescription whitening gel programme',
          fee: 'POA',
          plannerId: 'teeth-whitening'
        }
      ]
    },
    {
      id: 'fg-implants',
      title: 'Straumann Implants & Oral Surgery',
      items: [
        {
          name: 'Straumann Single Implant & Crown Pathway',
          note: 'Consultant surgical placement plus definitive custom crown',
          fee: 'From £4,500.00',
          plannerId: 'straumann-implant'
        },
        {
          name: 'Implant Overdenture Stabilisation',
          note: 'Full-arch removable prosthesis anchored by dental implants',
          fee: 'POA (Written Plan)',
          plannerId: null
        },
        {
          name: 'Guided Bone Regeneration / Sinus Lift',
          note: 'Site augmentation for deficient bone depth or soft tissue volume',
          fee: 'From £950.00',
          plannerId: 'sinus-lift-graft'
        },
        {
          name: 'Simple Tooth Extraction',
          note: 'Routine non-surgical tooth removal under local anaesthetic',
          fee: 'From £220.00',
          plannerId: null
        },
        {
          name: 'Surgical Wisdom Tooth Removal',
          note: 'Complex or impacted wisdom tooth extraction',
          fee: 'From £380.00',
          plannerId: 'wisdom-extraction'
        }
      ]
    },
    {
      id: 'fg-endo',
      title: 'Specialist Endodontics (Rebecca Kirke)',
      items: [
        {
          name: 'Specialist Root Canal Treatment',
          note: 'Microscope-assisted endodontics (anterior, premolar, or molar)',
          fee: 'From £750.00',
          plannerId: 'endo-root-canal'
        },
        {
          name: 'Complex Endodontic Retreatment',
          note: 'Revision of existing root fillings, fractured posts, or cracks',
          fee: 'From £925.00',
          plannerId: 'endo-retreatment'
        },
        {
          name: 'Non-Vital Internal Tooth Bleaching',
          note: 'Targeted internal lightening following root canal therapy',
          fee: 'From £280.00',
          plannerId: 'internal-bleaching'
        },
        {
          name: 'Endodontic Diagnostic Consultation',
          note: 'Vitality testing, microscope crack assessment, and CBCT review',
          fee: '£135.00',
          plannerId: null
        }
      ]
    },
    {
      id: 'fg-sedation',
      title: 'Paediatric Care, TMD & Sedation',
      items: [
        {
          name: 'Consultant Paediatric Dental Consultation',
          note: 'Specialist assessment for children aged 0 to 14 years with Miss Sarah Tukmachi',
          fee: 'From £185.00',
          plannerId: 'paediatric-consult'
        },
        {
          name: 'Michigan or Tanner Occlusal Splint (TMD)',
          note: 'Full-arch hard stabilisation splint for bruxism and jaw pain',
          fee: '£975.00',
          plannerId: 'occlusal-splint'
        },
        {
          name: 'Inhalational Conscious Sedation',
          note: 'Relative analgesia per clinical visit',
          fee: 'From £185.00',
          plannerId: 'inhalation-sedation'
        },
        {
          name: 'Intravenous (IV) Conscious Sedation',
          note: 'Monitored IV sedation per surgical or restorative session',
          fee: '£320.00',
          plannerId: 'iv-sedation'
        }
      ]
    }
  ];

  const TREATMENT_MAP = new Map(TREATMENTS.map((item) => [item.id, item]));

  const state = {
    filter: 'all',
    activePreset: null,
    selected: new Map(),
    paymentMode: 'payg',
    depositRate: 0,
    feeQuery: ''
  };

  // DOM References
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const treatmentListEl = document.getElementById('treatment-list');
  const selectedItemsListEl = document.getElementById('selected-items-list');
  const selectedCountEl = document.getElementById('selected-count');
  const totalFeeEl = document.getElementById('total-fee');
  const secondaryMetricLabelEl = document.getElementById('secondary-metric-label');
  const secondaryMetricValueEl = document.getElementById('secondary-metric-value');
  const stageBreakdownEl = document.getElementById('stage-breakdown');
  const poaNoticeEl = document.getElementById('poa-notice');
  const depositRowEl = document.getElementById('deposit-row');
  const depositSelectEl = document.getElementById('deposit-select');
  const clearPlannerBtn = document.getElementById('clear-planner-btn');
  const feeSearchEl = document.getElementById('fee-search');
  const feeGuideContainerEl = document.getElementById('fee-guide-container');
  const bookingFormEl = document.getElementById('booking-form');
  const formErrorEl = document.getElementById('form-error');
  const bookingConfirmationEl = document.getElementById('booking-confirmation');
  const confPreviewEl = document.getElementById('conf-preview');
  const copySummaryBtn = document.getElementById('copy-summary-btn');

  const patientNameEl = document.getElementById('patient-name');
  const patientEmailEl = document.getElementById('patient-email');
  const patientPhoneEl = document.getElementById('patient-phone');
  const patientTypeEl = document.getElementById('patient-type');
  const preferredClinicianEl = document.getElementById('preferred-clinician');
  const preferredTimeEl = document.getElementById('preferred-time');
  const clinicalNotesEl = document.getElementById('clinical-notes');

  const presetButtons = Array.from(document.querySelectorAll('.preset-btn[data-preset-key]'));
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn[data-filter]'));
  const paymentRadios = Array.from(document.querySelectorAll('input[name="paymentMode"]'));
  const specActionButtons = Array.from(document.querySelectorAll('.spec-action'));

  function formatGBP(amount) {
    const safeAmount = Math.round(amount * 100) / 100;
    return '£' + safeAmount.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatPriceTag(item) {
    if (item.isPOA) {
      return 'POA';
    }
    return (item.fromPrice ? 'From ' : '') + formatGBP(item.price);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getSelectedEntries() {
    const entries = [];
    state.selected.forEach((qty, id) => {
      const item = TREATMENT_MAP.get(id);
      if (item && qty > 0) {
        entries.push({ item, qty });
      }
    });
    return entries;
  }

  function computeTotals() {
    const entries = getSelectedEntries();
    let knownTotal = 0;
    let stage1Total = 0;
    let stage2Total = 0;
    let stage3Total = 0;
    let hasPOA = false;
    let totalCount = 0;

    entries.forEach(({ item, qty }) => {
      totalCount += qty;
      if (item.isPOA) {
        hasPOA = true;
      } else {
        const line = Math.round(item.price * qty * 100) / 100;
        knownTotal += line;
        if (item.stage === 1) {
          stage1Total += line;
        } else if (item.stage === 2) {
          stage2Total += line;
        } else {
          stage3Total += line;
        }
      }
    });

    knownTotal = Math.round(knownTotal * 100) / 100;
    stage1Total = Math.round(stage1Total * 100) / 100;
    stage2Total = Math.round(stage2Total * 100) / 100;
    stage3Total = Math.round(stage3Total * 100) / 100;

    return {
      entries,
      knownTotal,
      stage1Total,
      stage2Total,
      stage3Total,
      hasPOA,
      totalCount
    };
  }

  function getPhasedMilestones(totals) {
    const total = totals.knownTotal;
    if (total <= 0) {
      return { stage1: 0, stage2: 0, stage3: 0 };
    }
    const populatedStages =
      (totals.stage1Total > 0 ? 1 : 0) +
      (totals.stage2Total > 0 ? 1 : 0) +
      (totals.stage3Total > 0 ? 1 : 0);

    if (populatedStages >= 2) {
      return {
        stage1: totals.stage1Total,
        stage2: totals.stage2Total,
        stage3: totals.stage3Total
      };
    }

    const s1 = Math.round(total * 0.3 * 100) / 100;
    const s2 = Math.round(total * 0.4 * 100) / 100;
    const s3 = Math.round((total - s1 - s2) * 100) / 100;
    return { stage1: s1, stage2: s2, stage3: s3 };
  }

  function scrollToPlanner() {
    const planner = document.getElementById('planner');
    if (planner) {
      planner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function setActiveFilter(filterKey) {
    state.filter = filterKey || 'all';
    tabButtons.forEach((btn) => {
      const isMatch = btn.dataset.filter === state.filter;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });
    renderTreatmentCatalog();
  }

  function updatePresetButtons() {
    presetButtons.forEach((btn) => {
      const isMatch = btn.dataset.presetKey === state.activePreset;
      btn.classList.toggle('is-active', isMatch);
    });
  }

  function applyPreset(presetKey, shouldScroll) {
    const preset = PRESETS[presetKey];
    if (!preset) {
      return;
    }
    state.selected.clear();
    preset.items.forEach(({ id, qty }) => {
      if (TREATMENT_MAP.has(id)) {
        state.selected.set(id, qty);
      }
    });
    state.activePreset = presetKey === 'cosmetic' ? 'smile' : presetKey;
    updatePresetButtons();
    setActiveFilter(preset.filter || 'all');
    renderSummary();
    if (shouldScroll) {
      scrollToPlanner();
    }
  }

  function resetPlanner() {
    state.selected.clear();
    state.activePreset = null;
    updatePresetButtons();
    renderTreatmentCatalog();
    renderSummary();
    if (bookingConfirmationEl) {
      bookingConfirmationEl.hidden = true;
    }
  }

  function adjustTreatmentQty(id, delta) {
    const item = TREATMENT_MAP.get(id);
    if (!item) {
      return;
    }
    const current = state.selected.get(id) || 0;
    let next = current + delta;
    if (!item.allowQty) {
      next = delta > 0 ? 1 : 0;
    } else {
      next = Math.max(0, Math.min(16, next));
    }
    if (next <= 0) {
      state.selected.delete(id);
    } else {
      state.selected.set(id, next);
    }
    state.activePreset = null;
    updatePresetButtons();
    renderTreatmentCatalog();
    renderSummary();
  }

  function renderTreatmentCatalog() {
    if (!treatmentListEl) {
      return;
    }
    const visibleItems = TREATMENTS.filter((item) => {
      return state.filter === 'all' || item.category === state.filter;
    });

    const stageLabels = {
      1: 'Stage 1: Diagnostics & Preventive Care',
      2: 'Stage 2: Active Clinical / Surgical Care',
      3: 'Stage 3: Definitive Restoration / Appliance'
    };

    treatmentListEl.innerHTML = visibleItems
      .map((item) => {
        const qty = state.selected.get(item.id) || 0;
        const isSelected = qty > 0;
        const priceDisplay = formatPriceTag(item);
        const unitText = item.isPOA ? 'Quoted after 3D scan' : 'per ' + item.unitLabel;

        let actionHtml = '';
        if (!isSelected) {
          actionHtml =
            '<button type="button" class="item-add-btn" data-action="add" data-id="' +
            escapeHtml(item.id) +
            '">Add to Plan</button>';
        } else if (item.allowQty) {
          actionHtml =
            '<div class="qty-stepper" role="group" aria-label="Quantity for ' +
            escapeHtml(item.title) +
            '">' +
            '<button type="button" class="qty-btn" data-action="dec" data-id="' +
            escapeHtml(item.id) +
            '" aria-label="Decrease quantity of ' +
            escapeHtml(item.title) +
            '">-</button>' +
            '<span class="qty-val">' +
            qty +
            '</span>' +
            '<button type="button" class="qty-btn" data-action="inc" data-id="' +
            escapeHtml(item.id) +
            '" aria-label="Increase quantity of ' +
            escapeHtml(item.title) +
            '">+</button>' +
            '</div>';
        } else {
          actionHtml =
            '<button type="button" class="item-add-btn" data-action="remove" data-id="' +
            escapeHtml(item.id) +
            '">Selected (Remove)</button>';
        }

        return (
          '<article class="treatment-item' +
          (isSelected ? ' is-selected' : '') +
          '" data-id="' +
          escapeHtml(item.id) +
          '">' +
          '<div class="treatment-head">' +
          '<div class="treatment-info">' +
          '<div class="treatment-meta-row">' +
          '<span class="treatment-cat-pill">' +
          escapeHtml(item.categoryLabel) +
          '</span>' +
          '<span class="treatment-clinician">' +
          escapeHtml(item.clinician) +
          '</span>' +
          '</div>' +
          '<h3 class="treatment-title">' +
          escapeHtml(item.title) +
          '</h3>' +
          '</div>' +
          '<div class="treatment-price-col">' +
          '<span class="treatment-price">' +
          escapeHtml(priceDisplay) +
          '</span>' +
          '<span class="treatment-unit">' +
          escapeHtml(unitText) +
          '</span>' +
          '</div>' +
          '</div>' +
          '<p class="treatment-desc">' +
          escapeHtml(item.description) +
          '</p>' +
          '<div class="treatment-actions">' +
          '<span class="treatment-stage-note">' +
          escapeHtml(stageLabels[item.stage] || '') +
          '</span>' +
          actionHtml +
          '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderSummary() {
    const totals = computeTotals();

    if (selectedCountEl) {
      const n = totals.totalCount;
      selectedCountEl.textContent = n === 1 ? '1 item selected' : n + ' items selected';
    }

    if (selectedItemsListEl) {
      if (totals.entries.length === 0) {
        selectedItemsListEl.innerHTML =
          '<p class="empty-selection">Select procedures on the left or choose a Quick Preset above to calculate your guide fee.</p>';
      } else {
        selectedItemsListEl.innerHTML = totals.entries
          .map(({ item, qty }) => {
            const lineLabel = item.isPOA
              ? 'POA'
              : formatGBP(item.price * qty);
            const metaText = item.isPOA
              ? 'Written quotation after clinical assessment'
              : qty + ' x ' + (item.fromPrice ? 'From ' : '') + formatGBP(item.price);

            return (
              '<div class="selected-item-row">' +
              '<div class="selected-item-info">' +
              '<span class="selected-item-name">' +
              escapeHtml(item.title) +
              '</span>' +
              '<span class="selected-item-meta">' +
              escapeHtml(metaText) +
              '</span>' +
              '</div>' +
              '<div class="selected-item-right">' +
              '<span class="selected-item-total">' +
              escapeHtml(lineLabel) +
              '</span>' +
              '<button type="button" class="selected-remove-btn" data-remove-id="' +
              escapeHtml(item.id) +
              '" aria-label="Remove ' +
              escapeHtml(item.title) +
              '">&times;</button>' +
              '</div>' +
              '</div>'
            );
          })
          .join('');
      }
    }

    if (totalFeeEl) {
      if (totals.knownTotal === 0 && totals.hasPOA) {
        totalFeeEl.textContent = 'POA';
      } else if (totals.knownTotal > 0 && totals.hasPOA) {
        totalFeeEl.textContent = formatGBP(totals.knownTotal) + ' + POA';
      } else {
        totalFeeEl.textContent = formatGBP(totals.knownTotal);
      }
    }

    if (poaNoticeEl) {
      poaNoticeEl.hidden = !totals.hasPOA;
    }

    if (depositRowEl) {
      depositRowEl.hidden = state.paymentMode !== 'finance12';
    }

    if (state.paymentMode === 'payg') {
      if (stageBreakdownEl) {
        stageBreakdownEl.hidden = true;
        stageBreakdownEl.innerHTML = '';
      }
      if (secondaryMetricLabelEl && secondaryMetricValueEl) {
        if (totals.entries.length === 0) {
          secondaryMetricLabelEl.textContent = 'Due at first consultation';
          secondaryMetricValueEl.textContent = formatGBP(0);
        } else if (totals.stage1Total > 0) {
          secondaryMetricLabelEl.textContent = 'Due at initial diagnostics & hygiene';
          secondaryMetricValueEl.textContent = formatGBP(totals.stage1Total);
        } else if (totals.knownTotal > 0) {
          const firstKnown = totals.entries.find((entry) => !entry.item.isPOA);
          secondaryMetricLabelEl.textContent = 'First clinical appointment guide';
          secondaryMetricValueEl.textContent = firstKnown ? formatGBP(firstKnown.item.price) : formatGBP(0);
        } else {
          secondaryMetricLabelEl.textContent = 'Assessment & quotation';
          secondaryMetricValueEl.textContent = 'POA';
        }
      }
    } else if (state.paymentMode === 'finance12') {
      const depositAmount = Math.round(totals.knownTotal * state.depositRate * 100) / 100;
      const financedBalance = Math.round((totals.knownTotal - depositAmount) * 100) / 100;
      const monthly = totals.knownTotal > 0 ? financedBalance / 12 : 0;

      if (secondaryMetricLabelEl && secondaryMetricValueEl) {
        secondaryMetricLabelEl.textContent = 'Illustrative 12 x monthly (0% APR)';
        secondaryMetricValueEl.textContent = formatGBP(monthly) + ' / mo';
      }
      if (stageBreakdownEl) {
        stageBreakdownEl.hidden = false;
        const depositPct = Math.round(state.depositRate * 100);
        stageBreakdownEl.innerHTML =
          '<div class="stage-line"><span>Initial Deposit (' +
          depositPct +
          '%)</span><span class="stage-line-val">' +
          escapeHtml(formatGBP(depositAmount)) +
          '</span></div>' +
          '<div class="stage-line"><span>Balance over 12 months</span><span class="stage-line-val">' +
          escapeHtml(formatGBP(financedBalance)) +
          '</span></div>' +
          '<div class="stage-line"><span>Monthly instalment (0% APR)</span><span class="stage-line-val">' +
          escapeHtml(formatGBP(monthly)) +
          ' / mo</span></div>' +
          '<p class="stage-note">Illustrative only. Formal 12-month finance is subject to written treatment quotation and status.</p>';
      }
    } else if (state.paymentMode === 'phased') {
      const stages = getPhasedMilestones(totals);
      if (secondaryMetricLabelEl && secondaryMetricValueEl) {
        secondaryMetricLabelEl.textContent = 'Stage 1 diagnostic & start milestone';
        secondaryMetricValueEl.textContent = formatGBP(stages.stage1);
      }
      if (stageBreakdownEl) {
        stageBreakdownEl.hidden = false;
        stageBreakdownEl.innerHTML =
          '<div class="stage-line"><span>Stage 1: Diagnostics & Preventive Care</span><span class="stage-line-val">' +
          escapeHtml(formatGBP(stages.stage1)) +
          '</span></div>' +
          '<div class="stage-line"><span>Stage 2: Active Clinical / Surgical Phase</span><span class="stage-line-val">' +
          escapeHtml(formatGBP(stages.stage2)) +
          '</span></div>' +
          '<div class="stage-line"><span>Stage 3: Definitive Fit & Completion</span><span class="stage-line-val">' +
          escapeHtml(formatGBP(stages.stage3)) +
          '</span></div>' +
          '<p class="stage-note">Phased milestones align payments with completed clinical appointments.</p>';
      }
    }
  }

  function renderFeeGuide() {
    if (!feeGuideContainerEl) {
      return;
    }
    const query = state.feeQuery.trim().toLowerCase();
    const chevronSvg =
      '<svg class="fee-acc-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

    const filteredGroups = FEE_GUIDE_GROUPS.map((group) => {
      const items = group.items.filter((item) => {
        if (!query) {
          return true;
        }
        return (
          item.name.toLowerCase().includes(query) ||
          item.note.toLowerCase().includes(query) ||
          group.title.toLowerCase().includes(query)
        );
      });
      return { ...group, items };
    }).filter((group) => group.items.length > 0);

    if (filteredGroups.length === 0) {
      feeGuideContainerEl.innerHTML =
        '<div class="fee-empty-state">' +
        '<p>No 2026 Fee Guide items matched "' +
        escapeHtml(state.feeQuery.trim()) +
        '".</p>' +
        '</div>';
      return;
    }

    feeGuideContainerEl.innerHTML = filteredGroups
      .map((group, idx) => {
        const isOpen = Boolean(query) || idx < 4;
        const rowsHtml = group.items
          .map((item) => {
            const planBtn = item.plannerId
              ? '<button type="button" class="fee-plan-btn" data-add-planner="' +
                escapeHtml(item.plannerId) +
                '">+ Plan</button>'
              : '';

            return (
              '<div class="fee-row">' +
              '<div class="fee-row-main">' +
              '<span class="fee-row-name">' +
              escapeHtml(item.name) +
              '</span>' +
              '<span class="fee-row-note">' +
              escapeHtml(item.note) +
              '</span>' +
              '</div>' +
              '<div class="fee-row-right">' +
              '<span class="fee-price">' +
              escapeHtml(item.fee) +
              '</span>' +
              planBtn +
              '</div>' +
              '</div>'
            );
          })
          .join('');

        return (
          '<article class="fee-accordion">' +
          '<button type="button" class="fee-acc-trigger" aria-expanded="' +
          String(isOpen) +
          '" aria-controls="' +
          escapeHtml(group.id) +
          '">' +
          '<span class="fee-acc-title-wrap">' +
          '<span class="fee-acc-title">' +
          escapeHtml(group.title) +
          '</span>' +
          '<span class="fee-acc-count">' +
          group.items.length +
          (group.items.length === 1 ? ' procedure' : ' procedures') +
          '</span>' +
          '</span>' +
          chevronSvg +
          '</button>' +
          '<div class="fee-acc-body" id="' +
          escapeHtml(group.id) +
          '"' +
          (isOpen ? '' : ' hidden') +
          '>' +
          rowsHtml +
          '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  function showFormError(message) {
    if (!formErrorEl) {
      return;
    }
    formErrorEl.textContent = message;
    formErrorEl.hidden = false;
  }

  function clearFormError() {
    if (formErrorEl) {
      formErrorEl.textContent = '';
      formErrorEl.hidden = true;
    }
    [patientNameEl, patientEmailEl, patientPhoneEl].forEach((input) => {
      if (input) {
        input.classList.remove('is-invalid');
      }
    });
  }

  function buildEnquirySummary() {
    const totals = computeTotals();
    const name = patientNameEl ? patientNameEl.value.trim() : '';
    const email = patientEmailEl ? patientEmailEl.value.trim() : '';
    const phone = patientPhoneEl ? patientPhoneEl.value.trim() : '';
    const patientType = patientTypeEl ? patientTypeEl.value : '';
    const clinician = preferredClinicianEl ? preferredClinicianEl.value : '';
    const windowPref = preferredTimeEl ? preferredTimeEl.value : '';
    const notes = clinicalNotesEl ? clinicalNotesEl.value.trim() : '';

    const paymentLabels = {
      payg: 'Pay-as-you-go (Settle per clinical visit)',
      finance12: '0% 12-Month Plan (' + Math.round(state.depositRate * 100) + '% Deposit)',
      phased: 'Phased Staging (3 clinical milestone stages)'
    };

    const lines = [
      'BATH DENTAL CLINIC - TREATMENT & APPOINTMENT REQUEST',
      'Practice: Catharine Cottage, 21 Catharine Place, Bath BA1 2PS',
      '------------------------------------------------------------',
      'Patient Name: ' + name,
      'Email: ' + email,
      'Telephone: ' + phone,
      'Referral Pathway: ' + patientType,
      'Preferred Clinician: ' + clinician,
      'Preferred Attendance: ' + windowPref,
      '------------------------------------------------------------',
      'SELECTED PROCEDURES (2026 FEE GUIDE):'
    ];

    if (totals.entries.length === 0) {
      lines.push('- General Assessment / Reception Guidance (no specific planner items chosen)');
    } else {
      totals.entries.forEach(({ item, qty }) => {
        const lineFee = item.isPOA
          ? 'POA (written quote after scan)'
          : formatGBP(item.price * qty) + (item.fromPrice ? ' (guide from)' : '');
        lines.push('- ' + item.title + ' (Qty: ' + qty + ') : ' + lineFee);
      });
    }

    lines.push('------------------------------------------------------------');
    lines.push('Payment Preference: ' + (paymentLabels[state.paymentMode] || 'Pay-as-you-go'));

    const totalText =
      totals.knownTotal === 0 && totals.hasPOA
        ? 'POA (Confirmed after consultation)'
        : formatGBP(totals.knownTotal) + (totals.hasPOA ? ' + POA items' : '');
    lines.push('Estimated Guide Total: ' + totalText);

    if (state.paymentMode === 'finance12' && totals.knownTotal > 0) {
      const depositAmount = Math.round(totals.knownTotal * state.depositRate * 100) / 100;
      const balance = Math.round((totals.knownTotal - depositAmount) * 100) / 100;
      const monthly = balance / 12;
      lines.push(
        'Illustrative Split: Deposit ' +
          formatGBP(depositAmount) +
          ' | 12 x ' +
          formatGBP(monthly) +
          '/mo (0% APR illustrative)'
      );
    } else if (state.paymentMode === 'phased' && totals.knownTotal > 0) {
      const stages = getPhasedMilestones(totals);
      lines.push(
        'Phased Milestones: Stage 1 ' +
          formatGBP(stages.stage1) +
          ' | Stage 2 ' +
          formatGBP(stages.stage2) +
          ' | Stage 3 ' +
          formatGBP(stages.stage3)
      );
    }

    if (notes) {
      lines.push('------------------------------------------------------------');
      lines.push('Clinical Notes / Sedation Preference:');
      lines.push(notes);
    }

    return lines.join('\n');
  }

  function openMailClient(subject, body) {
    const mailtoHref =
      'mailto:' +
      CLINIC.email +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);

    const confMailLink = bookingConfirmationEl
      ? bookingConfirmationEl.querySelector('a[href^="mailto:"]')
      : null;
    if (confMailLink) {
      confMailLink.setAttribute('href', mailtoHref);
    }

    const tempLink = document.createElement('a');
    tempLink.href = mailtoHref;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  function handleBookingSubmit(event) {
    event.preventDefault();
    clearFormError();

    const name = patientNameEl ? patientNameEl.value.trim() : '';
    const email = patientEmailEl ? patientEmailEl.value.trim() : '';
    const phone = patientPhoneEl ? patientPhoneEl.value.trim() : '';

    if (name.length < 2) {
      if (patientNameEl) {
        patientNameEl.classList.add('is-invalid');
        patientNameEl.focus();
      }
      showFormError('Please enter your full name so reception can address your enquiry.');
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!emailValid) {
      if (patientEmailEl) {
        patientEmailEl.classList.add('is-invalid');
        patientEmailEl.focus();
      }
      showFormError('Please provide a valid email address for your written treatment quotation.');
      return;
    }

    const digitsCount = phone.replace(/\D/g, '').length;
    if (digitsCount < 7) {
      if (patientPhoneEl) {
        patientPhoneEl.classList.add('is-invalid');
        patientPhoneEl.focus();
      }
      showFormError('Please enter a valid UK or international contact telephone number.');
      return;
    }

    const summaryText = buildEnquirySummary();
    if (confPreviewEl) {
      confPreviewEl.textContent = summaryText;
    }
    if (bookingConfirmationEl) {
      bookingConfirmationEl.hidden = false;
    }

    const subject = 'Bath Dental Clinic Enquiry - ' + name;
    openMailClient(subject, summaryText);
  }

  function copySummaryToClipboard() {
    if (!confPreviewEl || !copySummaryBtn) {
      return;
    }
    const text = confPreviewEl.textContent || '';
    const markCopied = () => {
      copySummaryBtn.textContent = 'Summary Copied';
      window.setTimeout(() => {
        copySummaryBtn.textContent = 'Copy Summary';
      }, 2200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(markCopied).catch(() => {
        fallbackCopy(text, markCopied);
      });
    } else {
      fallbackCopy(text, markCopied);
    }
  }

  function fallbackCopy(text, onDone) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
      onDone();
    } catch (_err) {
      // Clipboard blocked in restricted context; preview remains selectable on screen.
    }
    document.body.removeChild(area);
  }

  function bindEvents() {
    if (navToggle && primaryNav) {
      navToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
      });

      primaryNav.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          primaryNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
          primaryNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.focus();
        }
      });
    }

    specActionButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const presetKey = btn.dataset.preset;
        const categoryKey = btn.dataset.category;
        if (presetKey) {
          applyPreset(presetKey, true);
        } else if (categoryKey) {
          setActiveFilter(categoryKey);
          scrollToPlanner();
        }
      });
    });

    presetButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        applyPreset(btn.dataset.presetKey, false);
      });
    });

    if (clearPlannerBtn) {
      clearPlannerBtn.addEventListener('click', resetPlanner);
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        setActiveFilter(btn.dataset.filter || 'all');
      });
    });

    if (treatmentListEl) {
      treatmentListEl.addEventListener('click', (event) => {
        const target = event.target.closest('button[data-action]');
        if (!target) {
          return;
        }
        const id = target.dataset.id;
        const action = target.dataset.action;
        if (action === 'add' || action === 'inc') {
          adjustTreatmentQty(id, 1);
        } else if (action === 'dec' || action === 'remove') {
          adjustTreatmentQty(id, -1);
        }
      });
    }

    if (selectedItemsListEl) {
      selectedItemsListEl.addEventListener('click', (event) => {
        const removeBtn = event.target.closest('button[data-remove-id]');
        if (!removeBtn) {
          return;
        }
        const id = removeBtn.dataset.removeId;
        state.selected.delete(id);
        state.activePreset = null;
        updatePresetButtons();
        renderTreatmentCatalog();
        renderSummary();
      });
    }

    paymentRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        if (!radio.checked) {
          return;
        }
        state.paymentMode = radio.value;
        paymentRadios.forEach((r) => {
          const label = r.closest('.mode-option');
          if (label) {
            label.classList.toggle('is-selected', r.checked);
          }
        });
        renderSummary();
      });
    });

    if (depositSelectEl) {
      depositSelectEl.addEventListener('change', () => {
        const parsed = parseFloat(depositSelectEl.value);
        state.depositRate = Number.isFinite(parsed) ? parsed : 0;
        renderSummary();
      });
    }

    if (feeSearchEl) {
      feeSearchEl.addEventListener('input', () => {
        state.feeQuery = feeSearchEl.value || '';
        renderFeeGuide();
      });
    }

    if (feeGuideContainerEl) {
      feeGuideContainerEl.addEventListener('click', (event) => {
        const accTrigger = event.target.closest('.fee-acc-trigger');
        if (accTrigger) {
          const expanded = accTrigger.getAttribute('aria-expanded') === 'true';
          const controlsId = accTrigger.getAttribute('aria-controls');
          const bodyEl = controlsId ? document.getElementById(controlsId) : null;
          accTrigger.setAttribute('aria-expanded', String(!expanded));
          if (bodyEl) {
            bodyEl.hidden = expanded;
          }
          return;
        }

        const addBtn = event.target.closest('button[data-add-planner]');
        if (addBtn) {
          const plannerId = addBtn.dataset.addPlanner;
          if (plannerId && TREATMENT_MAP.has(plannerId)) {
            adjustTreatmentQty(plannerId, 1);
            const item = TREATMENT_MAP.get(plannerId);
            if (item) {
              setActiveFilter(item.category);
            }
            scrollToPlanner();
          }
        }
      });
    }

    if (bookingFormEl) {
      bookingFormEl.addEventListener('submit', handleBookingSubmit);
    }

    if (copySummaryBtn) {
      copySummaryBtn.addEventListener('click', copySummaryToClipboard);
    }
  }

  function init() {
    renderTreatmentCatalog();
    renderSummary();
    renderFeeGuide();
    bindEvents();
  }

  init();
})();
