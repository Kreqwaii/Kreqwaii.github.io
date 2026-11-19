'use strict';

const PRACTICE_INFO = {
  name: 'The Kensington Dentist',
  address: '112 Kensington Church Street, London, W8 4BH',
  phoneDisplay: '020 7221 1680',
  phoneTel: '02072211680',
  email: 'info@thekensingtondentist.com'
};

const FEE_ITEMS = [
  // Consultations & Emergency
  {
    id: 'new-patient-exam',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'New patient examination (incl 2 x-rays and intra-oral photos)',
    duration: '45 mins',
    durationMins: 45,
    price: 185,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'recall-exam',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Recall examination',
    duration: '30 mins',
    durationMins: 30,
    price: 100,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'xray',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'X-ray',
    duration: 'Diagnostic',
    durationMins: 5,
    price: 20,
    fromPrice: false,
    unitLabel: 'film',
    recommendedClinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'whitening-consult',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Whitening consultation',
    duration: '30 mins',
    durationMins: 30,
    price: 120,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr Sandra Garcia Martin (Cosmetic & Perio, GDC 180638)'
  },
  {
    id: 'cosmetic-consult',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Cosmetic consultation',
    duration: '45 mins',
    durationMins: 45,
    price: 185,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'second-opinion',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Second Opinion',
    duration: '30 mins',
    durationMins: 30,
    price: 185,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'emergency-appointment',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Emergency Appointment',
    duration: '30 mins',
    durationMins: 30,
    price: 215,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'pulp-extirpation',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Pulp Extirpation',
    duration: 'Emergency relief',
    durationMins: 30,
    price: 280,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Stefan Ciapryna (Specialist Endodontist, GDC 212910)'
  },
  {
    id: 'antibiotics',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Antibiotics prescription',
    duration: 'Clinical issue',
    durationMins: 0,
    price: 25,
    fromPrice: false,
    unitLabel: 'item',
    recommendedClinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'recement-crown',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Re-cement Crown / Bridge',
    duration: '30 mins',
    durationMins: 30,
    price: 215,
    fromPrice: false,
    unitLabel: 'unit',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'endo-consult',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Endo Consult (Specialist Endodontics)',
    duration: '30 mins',
    durationMins: 30,
    price: 240,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr Stefan Ciapryna (Specialist Endodontist, GDC 212910)'
  },
  {
    id: 'ortho-consult',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Ortho Consult (including x-ray)',
    duration: '30 mins',
    durationMins: 30,
    price: 240,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'perio-consult',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Periodontal Consult',
    duration: '1 hour',
    durationMins: 60,
    price: 240,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Prof Nikos Mardas (Specialist Periodontist, GDC 85040)'
  },
  {
    id: 'implant-consult',
    category: 'consultations',
    categoryLabel: 'Exams & Emergency',
    title: 'Implant Consult',
    duration: '30 mins',
    durationMins: 30,
    price: 240,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Prof Nikos Mardas (Specialist Periodontist, GDC 85040)'
  },

  // Hygiene & Preventive
  {
    id: 'hygienist-45',
    category: 'hygiene',
    categoryLabel: 'Hygiene & Prevention',
    title: 'Hygienist (45 mins)',
    duration: '45 mins',
    durationMins: 45,
    price: 140,
    fromPrice: false,
    unitLabel: 'session',
    recommendedClinician: 'Suzannah Sinclair (Hygienist & Therapist, GDC 114423)'
  },
  {
    id: 'hygienist-60',
    category: 'hygiene',
    categoryLabel: 'Hygiene & Prevention',
    title: 'Hygienist (1 hour)',
    duration: '60 mins',
    durationMins: 60,
    price: 175,
    fromPrice: false,
    unitLabel: 'session',
    recommendedClinician: 'Yana Ariyanayagam (Dental Hygienist, GDC 190358)'
  },
  {
    id: 'preventative-resin-adult',
    category: 'hygiene',
    categoryLabel: 'Hygiene & Prevention',
    title: 'Preventative Resin (adults)',
    duration: '30 mins',
    durationMins: 30,
    price: 160,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Diana Caetano (General & Implants, GDC 103030)'
  },

  // Restorative & Cosmetic
  {
    id: 'composite-small',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Composite Filling Small',
    duration: '30 mins',
    durationMins: 30,
    price: 220,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Mehy S. Lo Presti (Aesthetic & Holistic, GDC 259050)'
  },
  {
    id: 'composite-med',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Composite Filling Med',
    duration: '45 mins',
    durationMins: 45,
    price: 300,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Mehy S. Lo Presti (Aesthetic & Holistic, GDC 259050)'
  },
  {
    id: 'composite-large',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Composite Filling Large',
    duration: '60 mins',
    durationMins: 60,
    price: 415,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Sherif Abbas Ali (Restorative & Sedation, GDC 212795)'
  },
  {
    id: 'home-whitening-enlighten',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Home Whitening Trays + Whitening Gels Enlighten',
    duration: 'Kit + fitting',
    durationMins: 30,
    price: 680,
    fromPrice: false,
    unitLabel: 'kit',
    recommendedClinician: 'Dr Sandra Garcia Martin (Cosmetic & Perio, GDC 180638)'
  },
  {
    id: 'in-house-whitening',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'In House Whitening',
    duration: '60 mins',
    durationMins: 60,
    price: 415,
    fromPrice: false,
    unitLabel: 'session',
    recommendedClinician: 'Vaida Buksnaityte (Dental Hygienist, GDC 6602)'
  },
  {
    id: 'single-whitening-gel',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Single Whitening Gels',
    duration: 'Top-up',
    durationMins: 0,
    price: 65,
    fromPrice: false,
    unitLabel: 'syringe',
    recommendedClinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'whitening-trays-remake',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Whitening Trays (remaking lost or damaged)',
    duration: 'Lab tray',
    durationMins: 15,
    price: 110,
    fromPrice: false,
    unitLabel: 'tray',
    recommendedClinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'veneers',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Veneers',
    duration: 'Custom lab stage',
    durationMins: 60,
    price: 1500,
    fromPrice: true,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'crown',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Crown',
    duration: 'Custom lab stage',
    durationMins: 60,
    price: 1050,
    fromPrice: true,
    unitLabel: 'crown',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'inlay-onlay',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Inlay / Onlay',
    duration: 'Custom lab stage',
    durationMins: 60,
    price: 1050,
    fromPrice: true,
    unitLabel: 'unit',
    recommendedClinician: 'Dr Sherif Abbas Ali (Restorative & Sedation, GDC 212795)'
  },
  {
    id: 'bridges',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Bridges (depending on how many units)',
    duration: 'Custom lab stage',
    durationMins: 60,
    price: 1050,
    fromPrice: true,
    unitLabel: 'unit',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'valplast-denture',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'ValPlast Flexible Denture',
    duration: 'Custom appliance',
    durationMins: 45,
    price: 680,
    fromPrice: true,
    unitLabel: 'arch',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'implant-anterior',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Implants (single anterior incl Crown)',
    duration: 'Surgical + crown',
    durationMins: 60,
    price: 4190,
    fromPrice: true,
    unitLabel: 'implant',
    recommendedClinician: 'Prof Nikos Mardas (Specialist Periodontist, GDC 85040)'
  },
  {
    id: 'implant-posterior',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Implants (single posterior incl Crown)',
    duration: 'Surgical + crown',
    durationMins: 60,
    price: 3990,
    fromPrice: true,
    unitLabel: 'implant',
    recommendedClinician: 'Prof Nikos Mardas (Specialist Periodontist, GDC 85040)'
  },
  {
    id: 'study-models',
    category: 'restorative',
    categoryLabel: 'Restorative & Cosmetic',
    title: 'Study Models',
    duration: 'Diagnostic scan',
    durationMins: 20,
    price: 185,
    fromPrice: false,
    unitLabel: 'set',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },

  // Endodontics & Oral Surgery
  {
    id: 'rct-incisor-premolar',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Root Canal Treatment Incisor and Premolar',
    duration: 'Microscopic endo',
    durationMins: 75,
    price: 1250,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Stefan Ciapryna (Specialist Endodontist, GDC 212910)'
  },
  {
    id: 'rerct-incisor-premolar',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Re-Root Canal Treatment Incisor and Premolar (Retreat)',
    duration: 'Microscopic endo',
    durationMins: 90,
    price: 1400,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Stefan Ciapryna (Specialist Endodontist, GDC 212910)'
  },
  {
    id: 'rct-molar',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Root Canal Treatment Molar',
    duration: 'Microscopic endo',
    durationMins: 90,
    price: 1400,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Stefan Ciapryna (Specialist Endodontist, GDC 212910)'
  },
  {
    id: 'rerct-molar',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Re-Root Canal Treatment Molar (Retreat)',
    duration: 'Microscopic endo',
    durationMins: 90,
    price: 1650,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Stefan Ciapryna (Specialist Endodontist, GDC 212910)'
  },
  {
    id: 'simple-extraction-specialist',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Simple Extraction with the specialist (not wisdom tooth)',
    duration: '45 mins',
    durationMins: 45,
    price: 450,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Mr Jonas Osher (Consultant Maxillofacial Surgeon, GMC 6160716)'
  },
  {
    id: 'complex-extraction-specialist',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Complex Extraction with the specialist (not wisdom tooth)',
    duration: '60 mins',
    durationMins: 60,
    price: 700,
    fromPrice: true,
    unitLabel: 'tooth',
    recommendedClinician: 'Mr Jonas Osher (Consultant Maxillofacial Surgeon, GMC 6160716)'
  },
  {
    id: 'simple-wisdom-specialist',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Simple Wisdom Extraction with the specialist',
    duration: '45 mins',
    durationMins: 45,
    price: 500,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Mr Jonas Osher (Consultant Maxillofacial Surgeon, GMC 6160716)'
  },
  {
    id: 'surgical-wisdom-specialist',
    category: 'endosurgery',
    categoryLabel: 'Endodontics & Surgery',
    title: 'Surgical Wisdom Extraction with the specialist',
    duration: '60 mins',
    durationMins: 60,
    price: 700,
    fromPrice: false,
    unitLabel: 'tooth',
    recommendedClinician: 'Mr Jonas Osher (Consultant Maxillofacial Surgeon, GMC 6160716)'
  },

  // Orthodontics & Appliances
  {
    id: 'invisalign-comprehensive',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Comprehensive Invisalign (with the orthodontist)',
    duration: 'Full programme',
    durationMins: 45,
    price: 6950,
    fromPrice: true,
    unitLabel: 'case',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'clear-aligners',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Clear aligners',
    duration: 'Per aligner stage',
    durationMins: 30,
    price: 240,
    fromPrice: false,
    unitLabel: 'aligner',
    recommendedClinician: 'Dr Diana Caetano (General & Implants, GDC 103030)'
  },
  {
    id: 'inman-aligner',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Inman aligner per arch (deposit £880)',
    duration: 'Per arch',
    durationMins: 30,
    price: 2160,
    fromPrice: false,
    unitLabel: 'arch',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'ceramic-braces',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Ceramic braces',
    duration: 'Full programme',
    durationMins: 45,
    price: 7950,
    fromPrice: true,
    unitLabel: 'case',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'lingual-braces-both',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Lingual braces upper and lower',
    duration: 'Full programme',
    durationMins: 45,
    price: 10850,
    fromPrice: false,
    unitLabel: 'case',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'lingual-braces-one',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Lingual braces one arch only',
    duration: 'Single arch',
    durationMins: 45,
    price: 5425,
    fromPrice: false,
    unitLabel: 'arch',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'fixed-wire-retainer',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Fixed Wire Retainer',
    duration: '30 mins',
    durationMins: 30,
    price: 270,
    fromPrice: false,
    unitLabel: 'arch',
    recommendedClinician: 'Saba Nayeri (Orthodontic Therapist, GDC 281174)'
  },
  {
    id: 'removable-retainer',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Removable Retainer',
    duration: 'Per arch',
    durationMins: 20,
    price: 240,
    fromPrice: false,
    unitLabel: 'arch',
    recommendedClinician: 'Saba Nayeri (Orthodontic Therapist, GDC 281174)'
  },
  {
    id: 'expansion-plate',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Expansion plate',
    duration: 'Orthodontic appliance',
    durationMins: 30,
    price: 3250,
    fromPrice: false,
    unitLabel: 'appliance',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'functional-appliance',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Functional appliance',
    duration: 'Orthodontic appliance',
    durationMins: 30,
    price: 2350,
    fromPrice: false,
    unitLabel: 'appliance',
    recommendedClinician: 'Dr David R Young (Specialist Orthodontist, GDC 60838)'
  },
  {
    id: 'occlusal-splint',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Occlusal Splint (including 3 reviews)',
    duration: 'TMJ care',
    durationMins: 30,
    price: 950,
    fromPrice: false,
    unitLabel: 'splint',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'b-splint',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'B Splint',
    duration: 'TMJ care',
    durationMins: 30,
    price: 680,
    fromPrice: false,
    unitLabel: 'splint',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'snoring-appliance',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Snoring Appliance',
    duration: 'Sleep appliance',
    durationMins: 30,
    price: 2250,
    fromPrice: false,
    unitLabel: 'appliance',
    recommendedClinician: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)'
  },
  {
    id: 'sports-guard-basic',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Sports Guard Basic',
    duration: 'Custom fit',
    durationMins: 20,
    price: 160,
    fromPrice: true,
    unitLabel: 'guard',
    recommendedClinician: 'First Available Appropriate Clinician'
  },
  {
    id: 'sports-guard-colour',
    category: 'ortho',
    categoryLabel: 'Orthodontics & Splints',
    title: 'Sport Guard with Colour / Design',
    duration: 'Custom fit',
    durationMins: 20,
    price: 240,
    fromPrice: false,
    unitLabel: 'guard',
    recommendedClinician: 'First Available Appropriate Clinician'
  },

  // Paediatric
  {
    id: 'new-child-exam',
    category: 'paediatric',
    categoryLabel: 'Paediatric Dentistry',
    title: 'New child examination (including 2 x-rays)',
    duration: '30 mins',
    durationMins: 30,
    price: 185,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr Christina-Maria Georgopoulou (Specialist Paediatric, GDC 100524)'
  },
  {
    id: 'child-recall-exam',
    category: 'paediatric',
    categoryLabel: 'Paediatric Dentistry',
    title: 'Child recall examination',
    duration: '30 mins',
    durationMins: 30,
    price: 100,
    fromPrice: false,
    unitLabel: 'visit',
    recommendedClinician: 'Dr Sadia Rahman Khan (Specialist Paediatric, GDC 257900)'
  },
  {
    id: 'hygienist-child',
    category: 'paediatric',
    categoryLabel: 'Paediatric Dentistry',
    title: 'Hygienist (for children)',
    duration: '30 mins',
    durationMins: 30,
    price: 95,
    fromPrice: false,
    unitLabel: 'session',
    recommendedClinician: 'Natasha Joshi (Hygienist & Therapist, GDC 265095)'
  },
  {
    id: 'fissure-sealants-child',
    category: 'paediatric',
    categoryLabel: 'Paediatric Dentistry',
    title: 'Fissure Sealants Child',
    duration: '20 mins',
    durationMins: 20,
    price: 85,
    fromPrice: true,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Christina-Maria Georgopoulou (Specialist Paediatric, GDC 100524)'
  },
  {
    id: 'composite-child-milk',
    category: 'paediatric',
    categoryLabel: 'Paediatric Dentistry',
    title: 'Composite Filling Child (milk teeth)',
    duration: '30 mins',
    durationMins: 30,
    price: 200,
    fromPrice: true,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Sadia Rahman Khan (Specialist Paediatric, GDC 257900)'
  },
  {
    id: 'composite-child-adult',
    category: 'paediatric',
    categoryLabel: 'Paediatric Dentistry',
    title: 'Composite Filling Child (adult tooth)',
    duration: '30 mins',
    durationMins: 30,
    price: 265,
    fromPrice: true,
    unitLabel: 'tooth',
    recommendedClinician: 'Dr Christina-Maria Georgopoulou (Specialist Paediatric, GDC 100524)'
  }
];

const CLINIC_WINDOWS_BY_DAY = {
  'Monday (09:00 - 18:00)': [
    'Morning (09:00 - 12:00)',
    'Midday (12:00 - 15:00)',
    'Afternoon (15:00 - 18:00)'
  ],
  'Tuesday (08:30 - 17:30)': [
    'Early Morning (08:30 - 11:30)',
    'Midday (11:30 - 14:30)',
    'Afternoon (14:30 - 17:30)'
  ],
  'Wednesday (10:00 - 19:00)': [
    'Late Morning (10:00 - 13:00)',
    'Afternoon (13:00 - 16:00)',
    'Evening Clinic (16:00 - 19:00)'
  ],
  'Thursday (09:00 - 18:00)': [
    'Morning (09:00 - 12:00)',
    'Midday (12:00 - 15:00)',
    'Afternoon (15:00 - 18:00)'
  ],
  'Friday (09:00 - 18:00)': [
    'Morning (09:00 - 12:00)',
    'Midday (12:00 - 15:00)',
    'Afternoon (15:00 - 18:00)'
  ],
  'Saturday (09:00 - 14:00)': [
    'Saturday Morning (09:00 - 11:30)',
    'Saturday Midday (11:30 - 14:00)'
  ]
};

const SERVICES = [
  {
    name: 'General Dentistry',
    category: 'consultations',
    summary: 'Comprehensive new patient examinations, digital radiography, intra-oral imaging, preventative resin care, and Airflow hygiene.'
  },
  {
    name: 'Cosmetic Dentistry',
    category: 'restorative',
    summary: 'Enlighten teeth whitening, minimally invasive composite bonding, and bespoke porcelain veneers crafted for natural facial harmony.'
  },
  {
    name: 'Periodontal Dentistry',
    category: 'consultations',
    summary: 'Evidence-based gum disease management, regenerative surgery, crown lengthening, and dental implants led by Prof Nikos Mardas.'
  },
  {
    name: 'Orthodontic Treatment',
    category: 'ortho',
    summary: 'Comprehensive Invisalign, Inman aligners, ceramic and lingual braces, and adult or paediatric appliances under Dr David R Young.'
  },
  {
    name: 'Advanced Dentistry',
    category: 'ortho',
    summary: 'Occlusion analysis, TMJ splints for migraine and clenching relief, snoring appliances, custom sports guards, and IV sedation.'
  },
  {
    name: 'Surgical Dentistry',
    category: 'endosurgery',
    summary: 'Simple and surgical wisdom tooth extractions, complex removals, jaw procedures, and oral biopsies with Mr Jonas Osher.'
  },
  {
    name: 'Paediatric Dentistry',
    category: 'paediatric',
    summary: 'Specialist children examinations, fissure sealants, gentle restorations, and calm long-term oral health guidance.'
  },
  {
    name: 'Endodontics',
    category: 'endosurgery',
    summary: 'Microscopic root canal treatments and retreatments using 3D CT diagnostics under Consultant Endodontist Dr Stefan Ciapryna.'
  },
  {
    name: 'Dentist for Nervous Patients',
    category: 'consultations',
    summary: 'A dedicated suite for anxious patients including a private cinema room, gentle pacing, and SAAD-approved IV sedation support.'
  }
];

const TEAM = [
  {
    name: 'Dr Eleni Kavouridi',
    role: 'Principal Dentist',
    group: 'dentists',
    gdc: 'DipDS, MSc ProsthDent · GDC 82783',
    selectValue: 'Dr Eleni Kavouridi (Principal Dentist, GDC 82783)',
    bio: 'Eastman Dental Institute MSc Prosthetic Dentistry and NYU Rosenthal Group Master Level in Aesthetic Dentistry. Focuses on prosthodontics, cosmetic restoration, and non-invasive occlusion and TMJ care.',
    languages: 'English, Greek'
  },
  {
    name: 'Dr Sandra Garcia Martin',
    role: 'Cosmetic & Aesthetic Dentist',
    group: 'dentists',
    gdc: 'Lic Odont Spain 2007 · GDC 180638',
    selectValue: 'Dr Sandra Garcia Martin (Cosmetic & Perio, GDC 180638)',
    bio: 'Trained in Periodontology, Implants, and Aesthetic Dentistry at New York University with Drs Larry Rosenthal and Mike Apa. Known for gentle care with dental-phobic patients.',
    languages: 'English, Spanish'
  },
  {
    name: 'Dr Mehy S. Lo Presti',
    role: 'General & Aesthetic Dentist',
    group: 'dentists',
    gdc: 'BDS MSc Aes Lond · GDC 259050',
    selectValue: 'Dr Mehy S. Lo Presti (Aesthetic & Holistic, GDC 259050)',
    bio: 'King\'s College London MSc in Aesthetic Dentistry and postgraduate Periodontics training in Madrid. Takes a holistic, minimally invasive approach tailored for nervous patients.',
    languages: 'English, Spanish, Italian, Arabic'
  },
  {
    name: 'Dr Diana Caetano',
    role: 'General, Implant & Invisalign Dentist',
    group: 'dentists',
    gdc: 'LMD Lisbon 2005 · GDC 103030',
    selectValue: 'Dr Diana Caetano (General & Implants, GDC 103030)',
    bio: 'MSc (Hons) Implant Dentistry from the University of Warwick, Postgraduate Certificate in Orthodontics, and Invisalign provider since 2011 focusing on family and preventative care.',
    languages: 'English, Portuguese, Spanish'
  },
  {
    name: 'Dr Filipa Caetano',
    role: 'General, Restorative & Paediatric Dentist',
    group: 'dentists',
    gdc: 'LMD Porto 2009 · GDC 182474',
    selectValue: 'Dr Filipa Caetano (General & Restorative, GDC 182474)',
    bio: 'Postgraduate training in Advanced Aesthetic and Restorative Dentistry and Orthodontics. Recognised for exceptional patience with children and anxious patients.',
    languages: 'English, Portuguese, Spanish'
  },
  {
    name: 'Dr Sherif Abbas Ali',
    role: 'Restorative, Surgical & Sedation Dentist',
    group: 'dentists',
    gdc: 'Zobarsta Riga 2011 · GDC 212795',
    selectValue: 'Dr Sherif Abbas Ali (Restorative & Sedation, GDC 212795)',
    bio: 'Dual MSc degrees in Restorative Dentistry (Eastman) and Oral Surgery, Clear Aligner Diploma, and SAAD-approved mentor in intravenous sedation for anxious patients.',
    languages: 'English, Arabic'
  },
  {
    name: 'Dr Stefan Ciapryna',
    role: 'Consultant & Specialist in Endodontics',
    group: 'specialists',
    gdc: 'BDS, MJDF RCS, MClinDent KCL, MEndo RCS · GDC 212910',
    selectValue: 'Dr Stefan Ciapryna (Specialist Endodontist, GDC 212910)',
    bio: 'Consultant in Endodontology at UCL Eastman Dental Institute and specialist lecturer at King\'s College London. Performs microscopic root canals and 3D CT-guided endodontics.',
    languages: 'English, Ukrainian, Polish'
  },
  {
    name: 'Dr David R Young',
    role: 'Specialist Orthodontist',
    group: 'specialists',
    gdc: 'BDS FDS RCS MSc MOrth RCS · GDC 60838',
    selectValue: 'Dr David R Young (Specialist Orthodontist, GDC 60838)',
    bio: 'RCS Gold Medal recipient for clinical excellence and postgraduate orthodontic lecturer at King\'s College Hospital. Provides Invisalign, ceramic, lingual, and complex jaw-aligned orthodontics.',
    languages: 'English'
  },
  {
    name: 'Mr Jonas Osher',
    role: 'Consultant Maxillofacial Surgeon',
    group: 'specialists',
    gdc: 'MBBS BDS MFDS MRCS FRCS · GMC 6160716',
    selectValue: 'Mr Jonas Osher (Consultant Maxillofacial Surgeon, GMC 6160716)',
    bio: 'Consultant Oral and Maxillofacial Surgeon at King\'s College Hospital and London Bridge Hospital, specialising in complex wisdom tooth surgery, facial surgery, and oral biopsies.',
    languages: 'English'
  },
  {
    name: 'Prof Nikos Mardas',
    role: 'Specialist in Periodontics & Implants',
    group: 'specialists',
    gdc: 'DipDS, MS Perio, PhD Perio · GDC 85040',
    selectValue: 'Prof Nikos Mardas (Specialist Periodontist, GDC 85040)',
    bio: 'Professor in Periodontology and Implant Dentistry at QMUL Barts and The London. Over 29 years of clinical expertise in regenerative gum surgery, bone augmentation, and dental implants.',
    languages: 'English, Greek'
  },
  {
    name: 'Dr Christina-Maria Georgopoulou',
    role: 'Specialist Paediatric Dentist',
    group: 'specialists',
    gdc: 'DDS, MClinDent Paed dent, MPaedDent RCSEng · GDC 100524',
    selectValue: 'Dr Christina-Maria Georgopoulou (Specialist Paediatric, GDC 100524)',
    bio: 'Eastman-trained Specialist Paediatric Dentist focused on creating calm, positive dental experiences for young children, dental trauma cases, and patients with additional needs.',
    languages: 'English, Greek'
  },
  {
    name: 'Dr Sadia Rahman Khan',
    role: 'Specialist Paediatric Dentist',
    group: 'specialists',
    gdc: 'BDS · GDC 257900',
    selectValue: 'Dr Sadia Rahman Khan (Specialist Paediatric, GDC 257900)',
    bio: 'Completed specialist training in Paediatric Dentistry at King\'s College Hospital, London. Experienced in supporting anxious children, dental trauma, and medically complex cases.',
    languages: 'English'
  },
  {
    name: 'Suzannah Sinclair',
    role: 'Dental Hygienist & Therapist',
    group: 'hygiene',
    gdc: 'Sheffield Distinction · GDC 114423',
    selectValue: 'Suzannah Sinclair (Hygienist & Therapist, GDC 114423)',
    bio: 'Offers direct-access gentle hygiene programmes, whitening care, and nutritional oral health guidance for adults, children, and nervous patients.',
    languages: 'English'
  },
  {
    name: 'Natasha Joshi',
    role: 'Dental Hygienist & Therapist',
    group: 'hygiene',
    gdc: 'Cardiff First-Class Hons · GDC 265095',
    selectValue: 'Natasha Joshi (Hygienist & Therapist, GDC 265095)',
    bio: 'BSc Psychology and prize-winning Dental Hygiene-Therapy graduate dedicated to empathetic preventive treatment for anxious adults and young patients.',
    languages: 'English'
  },
  {
    name: 'Yana Ariyanayagam',
    role: 'Dental Hygienist',
    group: 'hygiene',
    gdc: 'Eastman Dental Institute · GDC 190358',
    selectValue: 'Yana Ariyanayagam (Dental Hygienist, GDC 190358)',
    bio: 'Published researcher on tooth erosion management and prize-winning hygienist specialising in evidence-based periodontal maintenance.',
    languages: 'English'
  },
  {
    name: 'Vaida Buksnaityte',
    role: 'Dental Hygienist',
    group: 'hygiene',
    gdc: 'Nearly 20 yrs London practice · GDC 6602',
    selectValue: 'Vaida Buksnaityte (Dental Hygienist, GDC 6602)',
    bio: 'Experienced private practice hygienist with a focus on gentle deep scaling, periodontal maintenance, and in-clinic whitening treatments.',
    languages: 'English, Lithuanian'
  },
  {
    name: 'Saba Nayeri',
    role: 'Orthodontic Therapist',
    group: 'hygiene',
    gdc: 'Dip. Orthodontic Therapy UCLAN · GDC 281174',
    selectValue: 'Saba Nayeri (Orthodontic Therapist, GDC 281174)',
    bio: 'Qualified with distinction under the mentorship of Specialist Orthodontist Dr David R Young, guiding patients smoothly through aligner and brace stages.',
    languages: 'English'
  }
];

const state = {
  activeCategory: 'all',
  searchQuery: '',
  teamFilter: 'all',
  basket: [
    { id: 'new-patient-exam', qty: 1 },
    { id: 'hygienist-45', qty: 1 }
  ]
};

const els = {
  feeSearchInput: document.getElementById('feeSearchInput'),
  categoryTabs: document.getElementById('categoryTabs'),
  treatmentCatalog: document.getElementById('treatmentCatalog'),
  selectedItemsList: document.getElementById('selectedItemsList'),
  estimateTotal: document.getElementById('estimateTotal'),
  estimateDuration: document.getElementById('estimateDuration'),
  estimateNote: document.getElementById('estimateNote'),
  clearBasketBtn: document.getElementById('clearBasketBtn'),
  clinicianSelect: document.getElementById('clinicianSelect'),
  preferredDaySelect: document.getElementById('preferredDaySelect'),
  preferredWindowSelect: document.getElementById('preferredWindowSelect'),
  bookingRequestForm: document.getElementById('bookingRequestForm'),
  bookingFeedback: document.getElementById('bookingFeedback'),
  copySummaryBtn: document.getElementById('copySummaryBtn'),
  feeReferenceGrid: document.getElementById('feeReferenceGrid'),
  servicesGrid: document.getElementById('servicesGrid'),
  teamFilters: document.getElementById('teamFilters'),
  teamGrid: document.getElementById('teamGrid'),
  practiceStatusBadge: document.getElementById('practiceStatusBadge')
};

function formatGBP(amount) {
  return '£' + amount.toLocaleString('en-GB');
}

function getItemById(id) {
  return FEE_ITEMS.find((item) => item.id === id);
}

function getBasketQuantity(id) {
  const entry = state.basket.find((b) => b.id === id);
  return entry ? entry.qty : 0;
}

function addItemToBasket(id) {
  const existing = state.basket.find((b) => b.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.basket.push({ id, qty: 1 });
  }
  syncRecommendedClinician(id);
  renderCatalog();
  renderBasket();
}

function updateItemQuantity(id, delta) {
  const idx = state.basket.findIndex((b) => b.id === id);
  if (idx === -1 && delta > 0) {
    state.basket.push({ id, qty: delta });
  } else if (idx !== -1) {
    state.basket[idx].qty += delta;
    if (state.basket[idx].qty <= 0) {
      state.basket.splice(idx, 1);
    }
  }
  renderCatalog();
  renderBasket();
}

function removeItemFromBasket(id) {
  state.basket = state.basket.filter((b) => b.id !== id);
  renderCatalog();
  renderBasket();
}

function syncRecommendedClinician(addedItemId) {
  if (!els.clinicianSelect) return;
  if (els.clinicianSelect.value !== 'First Available Appropriate Clinician') return;
  const item = getItemById(addedItemId);
  if (item && item.recommendedClinician) {
    const match = Array.from(els.clinicianSelect.options).find(
      (opt) => opt.value === item.recommendedClinician
    );
    if (match) {
      els.clinicianSelect.value = item.recommendedClinician;
    }
  }
}

function renderCatalog() {
  const q = state.searchQuery.trim().toLowerCase();
  const filtered = FEE_ITEMS.filter((item) => {
    const catOk = state.activeCategory === 'all' || item.category === state.activeCategory;
    const textOk =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.duration.toLowerCase().includes(q);
    return catOk && textOk;
  });

  if (filtered.length === 0) {
    els.treatmentCatalog.innerHTML =
      '<div class="treatment-item"><div class="treatment-info"><div class="treatment-title">No treatments match your filter</div><div class="treatment-meta">Try clearing your search or selecting All Treatments.</div></div></div>';
    return;
  }

  els.treatmentCatalog.innerHTML = filtered
    .map((item) => {
      const qty = getBasketQuantity(item.id);
      const priceLabel = (item.fromPrice ? 'From ' : '') + formatGBP(item.price);
      return `
        <div class="treatment-item ${qty > 0 ? 'is-selected' : ''}" data-item-id="${item.id}">
          <div class="treatment-info">
            <span class="treatment-cat">${item.categoryLabel}</span>
            <div class="treatment-title">${item.title}</div>
            <div class="treatment-meta">${item.duration} · per ${item.unitLabel}</div>
          </div>
          <div class="treatment-actions">
            <span class="treatment-price">${priceLabel}</span>
            ${
              qty > 0
                ? `<div class="qty-control" aria-label="Quantity for ${item.title}">
                    <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                    <span class="qty-value">${qty}</span>
                    <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
                  </div>`
                : `<button type="button" class="add-btn" data-action="add" data-id="${item.id}">Add</button>`
            }
          </div>
        </div>
      `;
    })
    .join('');
}

function renderBasket() {
  if (state.basket.length === 0) {
    els.selectedItemsList.innerHTML =
      '<p class="selected-empty">No procedures selected yet. Add items from the fee list on the left.</p>';
    els.estimateTotal.textContent = '£0';
    els.estimateDuration.textContent = 'Estimated chair time: Select treatment';
    els.estimateNote.textContent = '2026 Fee Guide';
    return;
  }

  let total = 0;
  let totalMins = 0;
  let hasFromPrice = false;

  const rowsHtml = state.basket
    .map((entry) => {
      const item = getItemById(entry.id);
      if (!item) return '';
      const lineTotal = item.price * entry.qty;
      total += lineTotal;
      totalMins += item.durationMins * entry.qty;
      if (item.fromPrice) hasFromPrice = true;

      return `
        <div class="basket-row">
          <span class="basket-row-name">${entry.qty > 1 ? entry.qty + ' x ' : ''}${item.title}</span>
          <span class="basket-row-right">
            <span class="mono">${item.fromPrice ? 'From ' : ''}${formatGBP(lineTotal)}</span>
            <button type="button" class="basket-remove" data-remove-id="${item.id}" aria-label="Remove ${item.title}">Remove</button>
          </span>
        </div>
      `;
    })
    .join('');

  els.selectedItemsList.innerHTML = rowsHtml;
  els.estimateTotal.textContent = (hasFromPrice ? 'From ' : '') + formatGBP(total);
  els.estimateDuration.textContent =
    totalMins > 0
      ? 'Estimated appointment time: approx. ' + totalMins + ' mins'
      : 'Duration confirmed upon clinical review';
  els.estimateNote.textContent = hasFromPrice
    ? 'Includes guide from-pricing'
    : 'Exact 2026 guide tariff';
}

function populateTimeWindows() {
  const dayKey = els.preferredDaySelect.value;
  const windows = CLINIC_WINDOWS_BY_DAY[dayKey] || ['Morning', 'Afternoon'];
  els.preferredWindowSelect.innerHTML = windows
    .map((w) => `<option value="${w}">${w}</option>`)
    .join('');
}

function renderFeeReferenceTables() {
  const groups = [
    { key: 'consultations', label: 'Examinations, Consultations & Emergency' },
    { key: 'hygiene', label: 'Hygiene & Preventative Care' },
    { key: 'restorative', label: 'Restorative, Whitening & Implants' },
    { key: 'endosurgery', label: 'Endodontics & Specialist Extractions' },
    { key: 'ortho', label: 'Orthodontics, Splints & Guards' },
    { key: 'paediatric', label: 'Paediatric Dentistry' }
  ];

  els.feeReferenceGrid.innerHTML = groups
    .map((g) => {
      const items = FEE_ITEMS.filter((i) => i.category === g.key);
      const rows = items
        .map(
          (item) => `
          <tr>
            <td>${item.title}${item.durationMins > 0 ? ' <span style="color:#6E7885;font-size:12.5px">(' + item.duration + ')</span>' : ''}</td>
            <td class="fee-price-col">${item.fromPrice ? 'From ' : ''}${formatGBP(item.price)}</td>
            <td class="fee-action-col">
              <button type="button" class="table-add-btn" data-table-add="${item.id}">Add</button>
            </td>
          </tr>
        `
        )
        .join('');

      return `
        <article class="fee-group-card">
          <div class="fee-group-head">
            <h3>${g.label}</h3>
            <span class="fee-group-count">${items.length} items</span>
          </div>
          <table class="fee-table">
            <tbody>${rows}</tbody>
          </table>
        </article>
      `;
    })
    .join('');
}

function renderServices() {
  els.servicesGrid.innerHTML = SERVICES.map(
    (srv) => `
    <article class="service-card">
      <div>
        <h3>${srv.name}</h3>
        <p>${srv.summary}</p>
      </div>
      <button type="button" class="service-filter-link" data-jump-category="${srv.category}">
        View ${srv.name} Fees
      </button>
    </article>
  `
  ).join('');
}

function renderTeam() {
  const visible = TEAM.filter(
    (member) => state.teamFilter === 'all' || member.group === state.teamFilter
  );

  els.teamGrid.innerHTML = visible
    .map(
      (member) => `
      <article class="clinician-card">
        <div>
          <p class="clinician-role">${member.role}</p>
          <h3>${member.name}</h3>
          <p class="clinician-gdc">${member.gdc}</p>
          <p class="clinician-bio">${member.bio}</p>
        </div>
        <div class="clinician-footer">
          <span class="clinician-lang">${member.languages}</span>
          <button type="button" class="table-add-btn" data-select-clinician="${member.selectValue}">
            Request Booking
          </button>
        </div>
      </article>
    `
    )
    .join('');
}

function buildDossierPlainText() {
  const name = document.getElementById('patientNameInput').value.trim() || 'Not specified';
  const phone = document.getElementById('patientPhoneInput').value.trim() || 'Not specified';
  const email = document.getElementById('patientEmailInput').value.trim() || 'Not specified';
  const status = document.getElementById('patientStatusSelect').value;
  const clinician = els.clinicianSelect.value;
  const day = els.preferredDaySelect.value;
  const windowSlot = els.preferredWindowSelect.value;
  const nervous = document.getElementById('nervousSuiteCheck').checked;
  const notes = document.getElementById('clinicalNotesInput').value.trim();

  const lines = state.basket.map((b) => {
    const item = getItemById(b.id);
    if (!item) return '';
    return (
      '- ' +
      (b.qty > 1 ? b.qty + ' x ' : '') +
      item.title +
      ': ' +
      (item.fromPrice ? 'From ' : '') +
      formatGBP(item.price * b.qty)
    );
  });

  const totalText = els.estimateTotal.textContent;

  return [
    'Appointment & Treatment Fee Estimate Request',
    'Practice: The Kensington Dentist, 112 Kensington Church Street, London, W8 4BH',
    '',
    'Patient Details:',
    'Name: ' + name,
    'Status: ' + status,
    'Telephone: ' + phone,
    'Email: ' + email,
    '',
    'Requested Appointment Window:',
    'Clinician: ' + clinician,
    'Preferred Day: ' + day,
    'Preferred Window: ' + windowSlot,
    'Nervous Patient Suite / Cinema Room requested: ' + (nervous ? 'Yes' : 'No'),
    '',
    'Selected Treatments (2026 Fee Guide):',
    lines.length > 0 ? lines.join('\n') : '- General Consultation Inquiry',
    'Estimated Guide Total: ' + totalText,
    '',
    'Notes: ' + (notes || 'None provided')
  ].join('\n');
}

function updateLiveLondonStatus() {
  if (!els.practiceStatusBadge) return;
  try {
    const now = new Date();
    const londonDay = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'short'
    }).format(now);
    const londonTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(now);

    const [hh, mm] = londonTime.split(':').map(Number);
    const mins = hh * 60 + mm;

    const schedule = {
      Mon: [540, 1080],
      Tue: [510, 1050],
      Wed: [600, 1140],
      Thu: [540, 1080],
      Fri: [540, 1080],
      Sat: [540, 840]
    };

    const span = schedule[londonDay];
    if (span && mins >= span[0] && mins < span[1]) {
      els.practiceStatusBadge.textContent = 'Open in W8 · ' + londonTime;
    } else {
      els.practiceStatusBadge.textContent = 'Kensington W8 · ' + londonTime;
    }
  } catch (err) {
    els.practiceStatusBadge.textContent = 'Kensington W8';
  }
}

function bindEvents() {
  els.feeSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  });

  els.categoryTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-category]');
    if (!btn) return;
    state.activeCategory = btn.dataset.category;
    els.categoryTabs.querySelectorAll('.pill').forEach((p) => {
      const active = p === btn;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-selected', String(active));
    });
    renderCatalog();
  });

  document.querySelector('.preset-strip').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-preset]');
    if (!btn) return;
    const preset = btn.dataset.preset;
    if (preset === 'new-patient') {
      state.basket = [
        { id: 'new-patient-exam', qty: 1 },
        { id: 'hygienist-45', qty: 1 }
      ];
    } else if (preset === 'emergency') {
      state.basket = [
        { id: 'emergency-appointment', qty: 1 },
        { id: 'xray', qty: 1 }
      ];
      document.getElementById('patientStatusSelect').value = 'Dental Emergency';
    } else if (preset === 'whitening') {
      state.basket = [
        { id: 'whitening-consult', qty: 1 },
        { id: 'home-whitening-enlighten', qty: 1 }
      ];
    } else if (preset === 'child') {
      state.basket = [
        { id: 'new-child-exam', qty: 1 },
        { id: 'hygienist-child', qty: 1 }
      ];
    }
    renderCatalog();
    renderBasket();
  });

  els.treatmentCatalog.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (action === 'add') addItemToBasket(id);
    if (action === 'inc') updateItemQuantity(id, 1);
    if (action === 'dec') updateItemQuantity(id, -1);
  });

  els.selectedItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-remove-id]');
    if (!btn) return;
    removeItemFromBasket(btn.dataset.removeId);
  });

  els.clearBasketBtn.addEventListener('click', () => {
    state.basket = [];
    renderCatalog();
    renderBasket();
  });

  els.preferredDaySelect.addEventListener('change', populateTimeWindows);

  els.feeReferenceGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-table-add]');
    if (!btn) return;
    addItemToBasket(btn.dataset.tableAdd);
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
  });

  els.servicesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-jump-category]');
    if (!btn) return;
    state.activeCategory = btn.dataset.jumpCategory;
    els.categoryTabs.querySelectorAll('.pill').forEach((p) => {
      const active = p.dataset.category === state.activeCategory;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-selected', String(active));
    });
    renderCatalog();
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
  });

  els.teamFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-team-filter]');
    if (!btn) return;
    state.teamFilter = btn.dataset.teamFilter;
    els.teamFilters.querySelectorAll('.pill').forEach((p) => {
      const active = p === btn;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-selected', String(active));
    });
    renderTeam();
  });

  els.teamGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-select-clinician]');
    if (!btn) return;
    els.clinicianSelect.value = btn.dataset.selectClinician;
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
  });

  els.copySummaryBtn.addEventListener('click', async () => {
    const text = buildDossierPlainText();
    try {
      await navigator.clipboard.writeText(text);
      els.bookingFeedback.className = 'form-feedback is-success';
      els.bookingFeedback.textContent =
        'Treatment estimate and booking summary copied to your clipboard.';
    } catch (err) {
      els.bookingFeedback.className = 'form-feedback is-success';
      els.bookingFeedback.textContent =
        'Summary ready. Use Email Appointment Request or call 020 7221 1680.';
    }
  });

  els.bookingRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patientNameInput').value.trim();
    const phone = document.getElementById('patientPhoneInput').value.trim();
    const email = document.getElementById('patientEmailInput').value.trim();

    if (!name || !phone || !email) {
      els.bookingFeedback.className = 'form-feedback is-error';
      els.bookingFeedback.textContent =
        'Please complete your full name, telephone number, and email address before requesting an appointment.';
      return;
    }

    const body = buildDossierPlainText();
    const subject =
      'Appointment & Fee Estimate Request: ' +
      name +
      ' (' +
      els.preferredDaySelect.value.split(' ')[0] +
      ')';

    const mailtoUrl =
      'mailto:' +
      PRACTICE_INFO.email +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);

    els.bookingFeedback.className = 'form-feedback is-success';
    els.bookingFeedback.textContent =
      'Opening your email client addressed to ' +
      PRACTICE_INFO.email +
      ' with your itemised ' +
      els.estimateTotal.textContent +
      ' estimate. For immediate scheduling, call 020 7221 1680.';

    window.location.href = mailtoUrl;
  });
}

function init() {
  populateTimeWindows();
  renderCatalog();
  renderBasket();
  renderFeeReferenceTables();
  renderServices();
  renderTeam();
  updateLiveLondonStatus();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
