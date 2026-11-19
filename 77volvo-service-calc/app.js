'use strict';

(function () {
  const MODELS = {
    XC90: { platform: 'SPA / P2', factor: 1.15, oilVolume: 5.9, brakeNote: '17.5" / 18"' },
    XC60: { platform: 'SPA / P3', factor: 1.04, oilVolume: 5.4, brakeNote: '17"' },
    XC40: { platform: 'CMA', factor: 0.96, oilVolume: 5.2, brakeNote: '16.5"' },
    S60: { platform: 'SPA / P3', factor: 0.98, oilVolume: 5.2, brakeNote: '16.5"' },
    S80: { platform: 'P3', factor: 1.0, oilVolume: 5.6, brakeNote: '16.5"' },
    V60: { platform: 'SPA / P3', factor: 1.0, oilVolume: 5.2, brakeNote: '16.5"' }
  };

  const ENGINES = {
    D4: { type: 'diesel', label: '2.0L Дизель · 190 л.с.', oilFactor: 1.0, hasPlugs: false },
    D5: { type: 'diesel', label: '2.0L / 2.4L Дизель · 235 л.с.', oilFactor: 1.06, hasPlugs: false },
    T5: { type: 'petrol', label: '2.0L Бензин · 249 л.с.', oilFactor: 1.02, hasPlugs: true },
    T6: { type: 'petrol', label: '2.0L / 3.0L Бензин · 320 л.с.', oilFactor: 1.12, hasPlugs: true },
    B5: { type: 'hybrid', label: '2.0L Mild Hybrid · 48V', oilFactor: 1.08, hasPlugs: true }
  };

  const PARTS_CATALOG = {
    oil: {
      name: 'Масло моторное Volvo SAE 5W-30 / 0W-20 (6 л)',
      oemSku: '31316300',
      oemPrice: 11800,
      analogBrand: 'Castrol Edge / Valvoline',
      analogPrice: 7600
    },
    oilFilter: {
      name: 'Фильтр масляный двигателя + кольцо сливной пробки',
      oemSku: '31325173 / 30788490',
      oemPrice: 2350,
      analogBrand: 'Mann-Filter / Mahle',
      analogPrice: 1290
    },
    cabinFilter: {
      name: 'Фильтр салона угольный',
      oemSku: '31390880',
      oemPrice: 5270,
      analogBrand: 'GParts / Mahle',
      analogPrice: 2340
    },
    airFilter: {
      name: 'Фильтр воздушный двигателя',
      oemSku: '31370161',
      oemPrice: 2880,
      analogBrand: 'Bosch / Filtron',
      analogPrice: 1580
    },
    fuelFilter: {
      name: 'Фильтр топливный',
      oemSku: '31430629',
      oemPrice: 3570,
      analogBrand: 'Mahle / Bosch',
      analogPrice: 2150
    },
    sparkPlugs: {
      name: 'Комплект свечей зажигания (4 шт.)',
      oemSku: '8692071',
      oemPrice: 8220,
      analogBrand: 'NGK / Bosch Iridium',
      analogPrice: 4950
    },
    brakeFluid: {
      name: 'Тормозная жидкость DOT4+ (1 л)',
      oemSku: '31400204',
      oemPrice: 2150,
      analogBrand: 'ATE SL.6',
      analogPrice: 1350
    },
    driveBelt: {
      name: 'Ремень приводной генератора и ролики',
      oemSku: '31330870',
      oemPrice: 5320,
      analogBrand: 'Gates / SKF',
      analogPrice: 3180
    },
    timingKit: {
      name: 'Ремкомплект ГРМ (ремень + 2 ролика)',
      oemSku: '30731727',
      oemPrice: 13280,
      analogBrand: 'INA / Gates',
      analogPrice: 8450
    }
  };

  const ADDONS = {
    front_pads: {
      name: 'Передние тормозные колодки (комплект)',
      sku: '31262705',
      analogBrand: 'Brembo / Textar',
      partsOem: 11390,
      partsAnalog: 6490,
      labor: 3000,
      hours: 0.9
    },
    rear_pads: {
      name: 'Задние тормозные колодки (комплект + EPB)',
      sku: '31445796',
      analogBrand: 'Brembo / ATE',
      partsOem: 6580,
      partsAnalog: 4150,
      labor: 2800,
      hours: 0.9
    },
    haldex: {
      name: 'Обслуживание муфты AWD Haldex (масло 1 л + промывка)',
      sku: '31367940',
      analogBrand: 'BorgWarner / Febi',
      partsOem: 4330,
      partsAnalog: 3100,
      labor: 3500,
      hours: 1.0
    },
    vida: {
      name: 'Компьютерная диагностика Volvo VIDA',
      sku: 'VIDA-SCAN',
      analogBrand: 'Сервис 77Volvo',
      partsOem: 0,
      partsAnalog: 0,
      labor: 1800,
      hours: 0.5
    }
  };

  const CENTERS = [
    {
      name: 'Техцентр Очаково',
      zone: 'west',
      metro: 'м. Озёрная',
      address: 'Большая Очаковская ул., 47Ас1',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Ленинградка',
      zone: 'north',
      metro: 'м. Беломорская',
      address: 'ул. Беломорская, д. 9',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Электрозаводская',
      zone: 'east',
      metro: 'м. Электрозаводская',
      address: 'ул. Гастелло, соор. 1',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Домодедовская',
      zone: 'south',
      metro: 'м. Домодедовская',
      address: 'Каширское шоссе, д. 61, к. 3А, АТЦ «Москва»',
      hours: '10:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Тропарево',
      zone: 'west',
      metro: 'м. Озёрная',
      address: 'Востряковское шоссе, 7, стр. 1',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Волгоградка',
      zone: 'east',
      metro: 'м. Юго-Восточная',
      address: 'ул. Ташкентская, 28, стр. 1',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Алтуфьево',
      zone: 'north',
      metro: 'м. Алтуфьево',
      address: 'МКАД, 84-й км, вл. 1, Автомолл Север',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Ленинский',
      zone: 'west',
      metro: 'м. Вавиловская / Университет',
      address: 'Ленинский проспект, д. 83Б',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Автохолл ЗИЛ',
      zone: 'south',
      metro: 'м. Автозаводская',
      address: 'ул. Автозаводская, д. 23к7',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    },
    {
      name: 'Техцентр Зеленоград',
      zone: 'north',
      metro: 'г. Зеленоград',
      address: 'ЖК Андреевский Квартал, 1с2',
      hours: '09:00 - 21:00',
      phone: '+7 (495) 778-65-86'
    }
  ];

  const VIN_YEAR_MAP = {
    D: '2013', E: '2014', F: '2015', G: '2016', H: '2017',
    J: '2018', K: '2019', L: '2020', M: '2021', N: '2022',
    P: '2023', R: '2024', S: '2025', T: '2026'
  };

  const VIN_PLANT_MAP = {
    '1': 'Торсланда (Швеция)',
    '2': 'Гент (Бельгия)',
    '3': 'Уддевалла (Швеция)',
    'J': 'Луцяо / Чэнду (Китай)',
    'C': 'Чарлстон (США)'
  };

  const state = {
    model: 'XC90',
    engine: 'D5',
    mileage: 60000,
    tier: 'oem',
    addons: new Set(['vida']),
    zone: 'all',
    lastEstimate: null
  };

  function formatRub(val) {
    return Math.round(val).toLocaleString('ru-RU') + ' \u20BD';
  }

  function roundToTen(val) {
    return Math.round(val / 10) * 10;
  }

  function computeEstimate() {
    const modelInfo = MODELS[state.model];
    const engineInfo = ENGINES[state.engine];
    const mileage = Number(state.mileage);
    const isOem = state.tier === 'oem';

    const partKeys = ['oil', 'oilFilter', 'cabinFilter'];
    if (mileage >= 30000) partKeys.push('airFilter');
    if (mileage >= 60000) {
      partKeys.push('fuelFilter', 'brakeFluid');
      if (engineInfo.hasPlugs) partKeys.push('sparkPlugs');
    }
    if (mileage >= 90000) partKeys.push('driveBelt');
    if (mileage >= 120000) partKeys.push('timingKit');

    const partLines = partKeys.map((key) => {
      const item = PARTS_CATALOG[key];
      const base = isOem ? item.oemPrice : item.analogPrice;
      const multiplier = key === 'oil' ? engineInfo.oilFactor * (modelInfo.oilVolume / 5.4) : modelInfo.factor;
      const price = roundToTen(base * multiplier);
      return {
        title: item.name,
        sku: isOem ? 'OEM ' + item.oemSku : item.analogBrand + ' (база ' + item.oemSku + ')',
        price
      };
    });

    const laborLines = [
      {
        title: 'Замена масла ДВС, масляного и салонного фильтров + осмотр ходовой',
        meta: '1.2 нормо-часа',
        price: roundToTen(3900 * modelInfo.factor),
        hours: 1.2
      }
    ];

    if (mileage >= 30000) {
      laborLines.push({
        title: 'Замена воздушного фильтра двигателя',
        meta: '0.2 нормо-часа',
        price: 750,
        hours: 0.2
      });
    }
    if (mileage >= 60000) {
      laborLines.push({
        title: 'Замена топливного фильтра и прокачка тормозной жидкости DOT4+',
        meta: '1.1 нормо-часа',
        price: roundToTen(3600 * modelInfo.factor),
        hours: 1.1
      });
      if (engineInfo.hasPlugs) {
        laborLines.push({
          title: 'Замена комплекта свечей зажигания',
          meta: '0.6 нормо-часа',
          price: 2100,
          hours: 0.6
        });
      }
    }
    if (mileage >= 90000) {
      laborLines.push({
        title: 'Замена приводного ремня навесного оборудования',
        meta: '0.7 нормо-часа',
        price: 2450,
        hours: 0.7
      });
    }
    if (mileage >= 120000) {
      laborLines.push({
        title: 'Замена комплекта ГРМ с выставлением меток',
        meta: '3.2 нормо-часа',
        price: roundToTen(11500 * modelInfo.factor),
        hours: 3.2
      });
    }

    state.addons.forEach((addonKey) => {
      const addon = ADDONS[addonKey];
      if (!addon) return;
      const addonPartPrice = isOem ? addon.partsOem : addon.partsAnalog;
      if (addonPartPrice > 0) {
        partLines.push({
          title: addon.name,
          sku: isOem ? 'OEM ' + addon.sku : addon.analogBrand + ' (база ' + addon.sku + ')',
          price: addonPartPrice
        });
      }
      laborLines.push({
        title: addon.name + ' (установка / диагностика)',
        meta: addon.hours.toFixed(1) + ' нормо-часа',
        price: addon.labor,
        hours: addon.hours
      });
    });

    const partsSubtotal = partLines.reduce((acc, x) => acc + x.price, 0);
    const laborSubtotal = laborLines.reduce((acc, x) => acc + x.price, 0);
    const discount = isOem ? roundToTen(partsSubtotal * 0.07) : 0;
    const total = partsSubtotal + laborSubtotal - discount;
    const totalHours = laborLines.reduce((acc, x) => acc + x.hours, 0);

    return {
      partLines,
      laborLines,
      partsSubtotal,
      laborSubtotal,
      discount,
      total,
      totalHours
    };
  }

  function renderCalculator() {
    const est = computeEstimate();
    state.lastEstimate = est;

    const modelInfo = MODELS[state.model];
    const engineInfo = ENGINES[state.engine];
    const mileageFmt = Number(state.mileage).toLocaleString('ru-RU') + ' км';
    const toStage = {
      15000: 'ТО-1',
      30000: 'ТО-2',
      60000: 'ТО-4',
      90000: 'ТО-6',
      120000: 'ТО-8'
    }[state.mileage] || 'ТО';

    document.getElementById('selected-platform-badge').textContent = 'Платформа ' + modelInfo.platform;
    document.getElementById('engine-oil-spec').textContent = engineInfo.label + ' · ' + modelInfo.oilVolume + ' л масла';
    document.getElementById('mileage-badge').textContent = toStage + ' · ' + mileageFmt;
    document.getElementById('tier-hint').textContent = state.tier === 'oem'
      ? 'Скидка 7% при установке в техцентре 77Volvo'
      : 'Подбор проверенных европейских поставщиков';

    document.getElementById('summary-headline').textContent =
      'Volvo ' + state.model + ' ' + state.engine + ' · ' + mileageFmt;
    document.getElementById('summary-tier-badge').textContent =
      state.tier === 'oem' ? 'Оригинал Volvo' : 'Аналог (Европа)';
    document.getElementById('summary-hours').textContent = est.totalHours.toFixed(1) + ' ч';
    document.getElementById('summary-delivery-note').textContent = est.partsSubtotal >= 2000
      ? 'Бесплатная доставка по МКАД (от 2 000 \u20BD)'
      : 'Доставка по МКАД бесплатно при заказе от 2 000 \u20BD';

    const partsList = document.getElementById('parts-list');
    partsList.innerHTML = est.partLines.map((item) => (
      '<li class="line-item">' +
        '<span class="line-item-main">' +
          '<span class="line-item-title">' + item.title + '</span>' +
          '<span class="line-item-sku mono">' + item.sku + '</span>' +
        '</span>' +
        '<span class="line-item-price mono">' + formatRub(item.price) + '</span>' +
      '</li>'
    )).join('');

    const laborList = document.getElementById('labor-list');
    laborList.innerHTML = est.laborLines.map((item) => (
      '<li class="line-item">' +
        '<span class="line-item-main">' +
          '<span class="line-item-title">' + item.title + '</span>' +
          '<span class="line-item-sku mono">' + item.meta + '</span>' +
        '</span>' +
        '<span class="line-item-price mono">' + formatRub(item.price) + '</span>' +
      '</li>'
    )).join('');

    document.getElementById('parts-subtotal').textContent = formatRub(est.partsSubtotal);
    document.getElementById('labor-subtotal').textContent = formatRub(est.laborSubtotal);
    document.getElementById('summary-discount').textContent = est.discount > 0
      ? '-' + formatRub(est.discount)
      : '0 \u20BD';
    document.getElementById('summary-total').textContent = formatRub(est.total);

    Object.keys(ADDONS).forEach((key) => {
      const priceEl = document.querySelector('[data-addon-price="' + key + '"]');
      if (!priceEl) return;
      const a = ADDONS[key];
      const partCost = state.tier === 'oem' ? a.partsOem : a.partsAnalog;
      priceEl.textContent = '+' + formatRub(partCost + a.labor);
    });

    document.getElementById('attached-calc-pill').textContent =
      'К заявке прикреплена смета: Volvo ' + state.model + ' ' + state.engine +
      ' · ' + mileageFmt + ' (' + (state.tier === 'oem' ? 'Оригинал' : 'Аналог') + ', ' + formatRub(est.total) + ')';
  }

  function bindPillGroup(containerId, attr, stateKey, onChange) {
    const root = document.getElementById(containerId);
    if (!root) return;
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('button[' + attr + ']');
      if (!btn) return;
      root.querySelectorAll('button[' + attr + ']').forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-checked', 'true');
      state[stateKey] = btn.getAttribute(attr);
      if (onChange) onChange(state[stateKey]);
      renderCalculator();
    });
  }

  function validateVin(raw) {
    const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const forbidden = /[IOQ]/;
    const isIsoValid = clean.length === 17 && !forbidden.test(clean) && /^[A-HJ-NPR-Z0-9]{17}$/.test(clean);

    let wmiText = 'Не определён';
    if (clean.length >= 3) {
      const wmi = clean.slice(0, 3);
      if (wmi === 'YV1') wmiText = 'YV1 · Volvo Cars (легковые / универсалы)';
      else if (wmi === 'YV4') wmiText = 'YV4 · Volvo Cars (SUV / XC-серия)';
      else if (wmi === 'LVY') wmiText = 'LVY · Volvo Cars (завод Дацин / Чэнду)';
      else if (wmi === '7JR') wmiText = '7JR · Volvo Cars (завод Чарлстон)';
      else wmiText = wmi + ' · Проверить по каталогу 77Volvo';
    }

    const yearChar = clean.length >= 10 ? clean[9] : '';
    const plantChar = clean.length >= 11 ? clean[10] : '';

    return {
      clean,
      length: clean.length,
      hasForbidden: forbidden.test(raw.toUpperCase()),
      isIsoValid,
      wmiText,
      yearText: yearChar ? (VIN_YEAR_MAP[yearChar] || ('Код ' + yearChar)) : 'Не определён',
      plantText: plantChar ? (VIN_PLANT_MAP[plantChar] || ('Завод код ' + plantChar)) : 'Не определён'
    };
  }

  function updateVinUi(raw) {
    const info = validateVin(raw);
    const input = document.getElementById('vin-input');
    const counter = document.getElementById('vin-counter');
    const status = document.getElementById('vin-status');

    counter.textContent = info.length + ' / 17';
    input.classList.remove('is-valid', 'is-invalid');
    status.classList.remove('is-valid', 'is-invalid');

    if (info.hasForbidden) {
      input.classList.add('is-invalid');
      status.classList.add('is-invalid');
      status.textContent = 'Символы I, O, Q не применяются в стандарте VIN ISO 3779.';
    } else if (info.length === 0) {
      status.textContent = 'Допустимы латинские буквы и цифры, кроме I, O, Q.';
    } else if (info.isIsoValid) {
      input.classList.add('is-valid');
      status.classList.add('is-valid');
      status.textContent = 'Формат 17-значного VIN корректен и готов к подбору в каталоге.';
    } else {
      status.textContent = 'Введите ещё ' + (17 - info.length) + ' симв. до полного 17-значного VIN.';
    }

    document.getElementById('dec-valid').textContent = info.isIsoValid
      ? 'Проверен (ISO 3779, 17 знаков)'
      : 'Введено ' + info.length + ' из 17 знаков';
    document.getElementById('dec-wmi').textContent = info.wmiText;
    document.getElementById('dec-year').textContent = info.yearText;
    document.getElementById('dec-plant').textContent = info.plantText;

    return info;
  }

  function renderCenters() {
    const grid = document.getElementById('centers-grid');
    const filtered = state.zone === 'all'
      ? CENTERS
      : CENTERS.filter((c) => c.zone === state.zone);

    grid.innerHTML = filtered.map((center) => (
      '<article class="center-card">' +
        '<div class="center-head">' +
          '<h3 class="center-name">' + center.name + '</h3>' +
          '<span class="center-metro">' + center.metro + '</span>' +
        '</div>' +
        '<p class="center-address">' + center.address + '</p>' +
        '<div class="center-meta">' +
          '<span class="center-hours mono">Ежедневно: ' + center.hours + '</span>' +
          '<a href="tel:+74957786586" class="center-phone mono">' + center.phone + '</a>' +
        '</div>' +
      '</article>'
    )).join('');
  }

  function init() {
    bindPillGroup('model-selector', 'data-model', 'model');
    bindPillGroup('engine-selector', 'data-engine', 'engine');
    bindPillGroup('tier-selector', 'data-tier', 'tier');

    const mileageSelect = document.getElementById('mileage-select');
    const mileagePresetRoot = document.getElementById('mileage-selector');

    mileagePresetRoot.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-mileage]');
      if (!btn) return;
      const val = Number(btn.getAttribute('data-mileage'));
      state.mileage = val;
      mileageSelect.value = String(val);
      mileagePresetRoot.querySelectorAll('button[data-mileage]').forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-checked', 'true');
      renderCalculator();
    });

    mileageSelect.addEventListener('change', (e) => {
      const val = Number(e.target.value);
      state.mileage = val;
      mileagePresetRoot.querySelectorAll('button[data-mileage]').forEach((item) => {
        const match = Number(item.getAttribute('data-mileage')) === val;
        item.classList.toggle('is-active', match);
        item.setAttribute('aria-checked', match ? 'true' : 'false');
      });
      renderCalculator();
    });

    document.getElementById('addons-selector').addEventListener('change', (e) => {
      const checkbox = e.target;
      if (checkbox.type !== 'checkbox') return;
      if (checkbox.checked) state.addons.add(checkbox.value);
      else state.addons.delete(checkbox.value);
      renderCalculator();
    });

    document.getElementById('apply-calc-to-vin').addEventListener('click', () => {
      const target = document.getElementById('vin-request');
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('vin-input').focus();
      }, 320);
    });

    document.getElementById('copy-estimate-btn').addEventListener('click', (e) => {
      const est = state.lastEstimate || computeEstimate();
      const lines = [
        'Смета 77Volvo Москва: Volvo ' + state.model + ' ' + state.engine + ' (' + state.mileage + ' км)',
        'Комплект: ' + (state.tier === 'oem' ? 'Оригинал Volvo' : 'Аналог (Европа)'),
        'Запчасти: ' + formatRub(est.partsSubtotal),
        'Работы: ' + formatRub(est.laborSubtotal),
        'Итого: ' + formatRub(est.total)
      ];
      const text = lines.join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          const btn = e.currentTarget;
          btn.textContent = 'Детализация скопирована';
          setTimeout(() => {
            btn.textContent = 'Скопировать детализацию расчёта';
          }, 1800);
        });
      }
    });

    const vinInput = document.getElementById('vin-input');
    vinInput.addEventListener('input', () => {
      const upper = vinInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (vinInput.value !== upper) vinInput.value = upper;
      updateVinUi(upper);
    });

    document.querySelectorAll('[data-sample-vin]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sample = btn.getAttribute('data-sample-vin');
        vinInput.value = sample;
        updateVinUi(sample);
      });
    });

    document.getElementById('vin-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const vinInfo = updateVinUi(vinInput.value);
      const nameVal = document.getElementById('client-name').value.trim();
      const phoneVal = document.getElementById('client-phone').value.trim();
      const emailVal = document.getElementById('client-email').value.trim();
      const formatVal = document.getElementById('service-format').value;
      const commentVal = document.getElementById('client-comment').value.trim();

      if (!vinInfo.isIsoValid) {
        vinInput.classList.add('is-invalid');
        document.getElementById('vin-status').classList.add('is-invalid');
        document.getElementById('vin-status').textContent = 'Для отправки заявки нужен корректный 17-значный VIN без символов I, O, Q.';
        vinInput.focus();
        return;
      }

      if (!nameVal || phoneVal.replace(/\D/g, '').length < 10) {
        const target = !nameVal
          ? document.getElementById('client-name')
          : document.getElementById('client-phone');
        target.focus();
        return;
      }

      const est = state.lastEstimate || computeEstimate();
      const payloadLines = [
        'Получатель: client@77volvo.ru',
        'VIN: ' + vinInfo.clean + ' (' + vinInfo.wmiText + ', год ' + vinInfo.yearText + ')',
        'Модель по калькулятору: Volvo ' + state.model + ' ' + state.engine + ', пробег ' + Number(state.mileage).toLocaleString('ru-RU') + ' км',
        'Комплектация деталей: ' + (state.tier === 'oem' ? 'Оригинал Volvo' : 'Аналог (Европа)'),
        'Предварительная смета: ' + formatRub(est.total) + ' (детали ' + formatRub(est.partsSubtotal) + ', работы ' + formatRub(est.laborSubtotal) + ')',
        'Формат: ' + formatVal,
        'Клиент: ' + nameVal + ', тел. ' + phoneVal + (emailVal ? ', email: ' + emailVal : ''),
        commentVal ? 'Комментарий: ' + commentVal : 'Комментарий: Без примечаний'
      ];

      const summaryText = payloadLines.join('\n');
      document.getElementById('confirm-payload').textContent = summaryText;
      document.getElementById('form-confirmation').classList.remove('is-hidden');

      const subject = encodeURIComponent('Подбор ТО и запчастей по VIN ' + vinInfo.clean + ' (Volvo ' + state.model + ')');
      const body = encodeURIComponent(summaryText);
      document.getElementById('confirm-mailto').setAttribute('href', 'mailto:client@77volvo.ru?subject=' + subject + '&body=' + body);
    });

    document.getElementById('center-filter').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-zone]');
      if (!btn) return;
      state.zone = btn.getAttribute('data-zone');
      document.querySelectorAll('#center-filter button[data-zone]').forEach((item) => {
        const active = item === btn;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderCenters();
    });

    renderCalculator();
    renderCenters();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
