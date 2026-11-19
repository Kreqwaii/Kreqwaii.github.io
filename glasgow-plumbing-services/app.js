(function () {
  'use strict';

  var SERVICE_RATES = {
    'burst-pipes': {
      label: 'Burst Pipes & Acute Isolation',
      baseMin: 85,
      baseMax: 135,
      note: 'Includes stopcock isolation & initial copper/PEX repair'
    },
    'central-heating': {
      label: 'Central Heating Repairs',
      baseMin: 90,
      baseMax: 145,
      note: 'Gas Safe diagnostic & pressure/valve check'
    },
    'water-leaks': {
      label: 'Water & Plumbing Leaks',
      baseMin: 75,
      baseMax: 120,
      note: 'Includes pipe trace, joint reseal & pressure test'
    },
    'blocked-sinks': {
      label: 'Blocked Sinks & Waste Pipes',
      baseMin: 70,
      baseMax: 110,
      note: 'Mechanical trap clearance & waste flow check'
    },
    'radiator-repairs': {
      label: 'Radiator Repairs & Valves',
      baseMin: 70,
      baseMax: 115,
      note: 'TRV/lockshield check, bleed & balancing'
    },
    'dripping-taps': {
      label: 'Dripping Taps & Mixers',
      baseMin: 65,
      baseMax: 100,
      note: 'Washer/cartridge inspection & tap overhaul'
    },
    'kitchen-plumbing': {
      label: 'Kitchen Plumbing & Pipework',
      baseMin: 80,
      baseMax: 125,
      note: 'Appliance isolation valve & waste pipe assessment'
    },
    'commercial-boiler': {
      label: 'Commercial Boiler / Washroom Project',
      baseMin: 120,
      baseMax: 195,
      note: 'Commercial Gas Safe survey & written project quote'
    }
  };

  var URGENCY_CONFIG = {
    emergency: {
      label: '24/7 Emergency',
      multiplier: 1.2,
      surcharge: 20,
      etaOffsetMin: 0,
      etaWindowMode: 'minutes'
    },
    'same-day': {
      label: 'Same-Day Squeeze',
      multiplier: 1.05,
      surcharge: 0,
      etaWindowMode: 'same-day'
    },
    scheduled: {
      label: 'Scheduled Slot',
      multiplier: 1.0,
      surcharge: 0,
      etaWindowMode: 'scheduled'
    }
  };

  function resolvePostcodeZone(rawPostcode) {
    var cleaned = String(rawPostcode || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    var match = cleaned.match(/^G(\d{1,2})/);

    if (!match) {
      return {
        valid: false,
        sectorNum: 3,
        zoneName: 'Central Scotland Coverage',
        zoneCode: 'Zone B',
        distanceNote: 'Enter a Glasgow G1-G84 postcode for exact dispatch band',
        feeAdd: 10,
        etaMin: 55,
        etaMax: 85
      };
    }

    var num = parseInt(match[1], 10);

    if (num < 1 || num > 84) {
      return {
        valid: false,
        sectorNum: num,
        zoneName: 'Extended Central Scotland',
        zoneCode: 'Zone C',
        distanceNote: 'Outside standard G1-G84 sector index, dispatched from G3 7JT',
        feeAdd: 25,
        etaMin: 70,
        etaMax: 110
      };
    }

    if (num === 3) {
      return {
        valid: true,
        sectorNum: num,
        zoneName: 'Zone A: West End / Finnieston (HQ G3 7JT)',
        zoneCode: 'Zone A',
        distanceNote: 'Direct 0.5 - 2.0 mi dispatch from 11 Somerset Place, G3',
        feeAdd: 0,
        etaMin: 35,
        etaMax: 55
      };
    }

    if (num >= 1 && num <= 15) {
      return {
        valid: true,
        sectorNum: num,
        zoneName: 'Zone A: City Centre, West End & Inner South',
        zoneCode: 'Zone A',
        distanceNote: 'Inner Glasgow radius (1.5 - 4.0 mi from G3 7JT)',
        feeAdd: 0,
        etaMin: 40,
        etaMax: 65
      };
    }

    if (num >= 20 && num <= 53) {
      return {
        valid: true,
        sectorNum: num,
        zoneName: 'Zone B: North, East End, Southside & Govan',
        zoneCode: 'Zone B',
        distanceNote: 'Greater Glasgow metro ring (3.5 - 7.5 mi from G3 7JT)',
        feeAdd: 10,
        etaMin: 45,
        etaMax: 75
      };
    }

    return {
      valid: true,
      sectorNum: num,
      zoneName: 'Zone C: Outer Clydebank, Bearsden, Lanarkshire & Renfrewshire',
      zoneCode: 'Zone C',
      distanceNote: 'Regional Central Scotland dispatch from G3 7JT',
      feeAdd: 20,
      etaMin: 60,
      etaMax: 95
    };
  }

  function roundToFive(value) {
    return Math.round(value / 5) * 5;
  }

  function initEstimator() {
    var form = document.getElementById('callout-estimator-form');
    if (!form) return;

    var serviceEl = document.getElementById('est-service');
    var propertyEl = document.getElementById('est-property');
    var postcodeEl = document.getElementById('est-postcode');
    var quickSectorEl = document.getElementById('est-quick-sector');
    var zoneLabelEl = document.getElementById('postcode-zone-label');
    var priceRangeEl = document.getElementById('out-price-range');
    var priceNoteEl = document.getElementById('out-price-note');
    var etaWindowEl = document.getElementById('out-eta-window');
    var etaNoteEl = document.getElementById('out-eta-note');

    var confBox = document.getElementById('request-confirmation');
    var confRef = document.getElementById('conf-ref');
    var confSummary = document.getElementById('conf-summary-text');
    var confMailto = document.getElementById('conf-mailto-link');

    var serviceCards = document.querySelectorAll('.service-card[data-service]');
    var postcodeButtons = document.querySelectorAll('[data-apply-postcode]');

    function getSelectedUrgency() {
      var checked = form.querySelector('input[name="urgency"]:checked');
      return checked ? checked.value : 'emergency';
    }

    function syncServiceCardHighlight(serviceKey) {
      serviceCards.forEach(function (card) {
        if (card.getAttribute('data-service') === serviceKey) {
          card.classList.add('is-selected');
        } else {
          card.classList.remove('is-selected');
        }
      });
    }

    function calculateAndRender() {
      var serviceKey = serviceEl.value;
      var propertyType = propertyEl.value;
      var urgencyKey = getSelectedUrgency();
      var rawPostcode = postcodeEl.value.trim() || 'G3 7JT';

      var service = SERVICE_RATES[serviceKey] || SERVICE_RATES['burst-pipes'];
      var urgency = URGENCY_CONFIG[urgencyKey] || URGENCY_CONFIG.emergency;
      var zone = resolvePostcodeZone(rawPostcode);

      var propMultiplier = propertyType === 'commercial' ? 1.25 : 1.0;

      var estMin = roundToFive((service.baseMin * urgency.multiplier * propMultiplier) + urgency.surcharge + zone.feeAdd);
      var estMax = roundToFive((service.baseMax * urgency.multiplier * propMultiplier) + urgency.surcharge + zone.feeAdd);

      zoneLabelEl.textContent = zone.zoneName;
      priceRangeEl.textContent = 'GBP ' + estMin + ' - ' + estMax;
      priceNoteEl.textContent = service.note + ' (Pay on completion)';

      if (urgency.etaWindowMode === 'minutes') {
        etaWindowEl.textContent = zone.etaMin + ' - ' + zone.etaMax + ' mins';
        etaNoteEl.textContent = zone.distanceNote;
      } else if (urgency.etaWindowMode === 'same-day') {
        etaWindowEl.textContent = 'Same-Day Window';
        etaNoteEl.textContent = 'Subject to live route check on 0141 295 0280';
      } else {
        etaWindowEl.textContent = '1 - 3 Days Ahead';
        etaNoteEl.textContent = 'Confirmed morning or afternoon slot from G3';
      }

      syncServiceCardHighlight(serviceKey);

      return {
        serviceLabel: service.label,
        propertyLabel: propertyType === 'commercial' ? 'Commercial Premises' : 'Domestic Residence',
        urgencyLabel: urgency.label,
        postcode: rawPostcode.toUpperCase(),
        zoneCode: zone.zoneCode,
        priceText: priceRangeEl.textContent,
        etaText: etaWindowEl.textContent
      };
    }

    serviceEl.addEventListener('change', calculateAndRender);
    propertyEl.addEventListener('change', calculateAndRender);
    postcodeEl.addEventListener('input', calculateAndRender);

    form.querySelectorAll('input[name="urgency"]').forEach(function (radio) {
      radio.addEventListener('change', calculateAndRender);
    });

    quickSectorEl.addEventListener('change', function () {
      postcodeEl.value = quickSectorEl.value;
      calculateAndRender();
    });

    serviceCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var key = card.getAttribute('data-service');
        if (key && SERVICE_RATES[key]) {
          serviceEl.value = key;
          calculateAndRender();
          document.getElementById('estimator').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    postcodeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var code = btn.getAttribute('data-apply-postcode');
        if (code) {
          postcodeEl.value = code;
          calculateAndRender();
          document.getElementById('estimator').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var summary = calculateAndRender();

      var nameInput = document.getElementById('req-name');
      var phoneInput = document.getElementById('req-phone');
      var emailInput = document.getElementById('req-email');
      var streetInput = document.getElementById('req-street');
      var notesInput = document.getElementById('req-notes');

      var clientName = nameInput.value.trim() || 'Glasgow Customer';
      var clientPhone = phoneInput.value.trim() || 'Not provided';
      var clientEmail = emailInput.value.trim() || 'Not provided';
      var clientStreet = streetInput.value.trim() || 'Postcode area only';
      var clientNotes = notesInput.value.trim() || 'No additional notes';

      var refCode = 'G3-' + String(Date.now()).slice(-5);

      var bodyLines = [
        'Dispatch Request Reference: ' + refCode,
        'Service: ' + summary.serviceLabel,
        'Property Scope: ' + summary.propertyLabel,
        'Urgency: ' + summary.urgencyLabel,
        'Postcode: ' + summary.postcode + ' (' + summary.zoneCode + ')',
        'Estimated Call-Out Range: ' + summary.priceText,
        'Estimated Window: ' + summary.etaText,
        '---',
        'Customer Name: ' + clientName,
        'Phone: ' + clientPhone,
        'Email: ' + clientEmail,
        'Street Address: ' + clientStreet,
        'Fault Summary: ' + clientNotes
      ].join('\n');

      var subject = 'Plumbing Call-Out Request [' + summary.postcode + '] - ' + summary.serviceLabel;
      var mailtoHref = 'mailto:info@glasgowplumbingservices.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(bodyLines);

      confRef.textContent = refCode;
      confSummary.textContent = summary.serviceLabel + ' for ' + summary.postcode +
        ' (' + summary.urgencyLabel + '). Estimated range: ' + summary.priceText +
        ', target window: ' + summary.etaText + '.';
      confMailto.setAttribute('href', mailtoHref);
      confBox.hidden = false;
    });

    calculateAndRender();
  }

  document.addEventListener('DOMContentLoaded', initEstimator);
})();
