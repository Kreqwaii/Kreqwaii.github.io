(function () {
  "use strict";

  const GARAGE_EMAIL = "birminghammots@gmail.com";

  const VEHICLE_CLASSES = {
    car: {
      label: "Car (Class 4)",
      prices: {
        mot: 35.0,
        interim: 95.0,
        full: 145.0,
        brakes: 45.0
      }
    },
    van: {
      label: "Van up to 3.5t (Class 7)",
      prices: {
        mot: 50.0,
        interim: 115.0,
        full: 175.0,
        brakes: 55.0
      }
    },
    minibus: {
      label: "Minibus / Caravan",
      prices: {
        mot: 55.0,
        interim: 125.0,
        full: 185.0,
        brakes: 60.0
      }
    },
    motorbike: {
      label: "Motorbike",
      prices: {
        mot: 29.65,
        interim: 75.0,
        full: 115.0,
        brakes: 40.0
      }
    }
  };

  const SERVICE_META = {
    mot: {
      title: "MOT Test",
      isFixed: true,
      included: [
        "DVSA approved safety and emissions inspection",
        "Same-day test slots open 7 days a week",
        "Clear advisory breakdown before any repair work"
      ]
    },
    interim: {
      title: "Interim Service",
      isFixed: false,
      included: [
        "Complete engine oil drain and fresh oil change",
        "New oil filter fitted",
        "54-point mechanical health check"
      ]
    },
    full: {
      title: "Full Service",
      isFixed: false,
      included: [
        "Oil change plus oil, air, fuel, and cabin filters",
        "Comprehensive 54-point inspection report",
        "Free coolant, washer, and brake fluid top-up"
      ]
    },
    brakes: {
      title: "Brakes & Diagnostics",
      isFixed: false,
      included: [
        "Electronic fault code read and sensor check",
        "Brake pad, disc, caliper, and fluid inspection",
        "Written repair estimate before work starts"
      ]
    }
  };

  const state = {
    vrm: "",
    vehicleClass: "car",
    service: "mot",
    comboDiscount: false,
    alignment: false,
    acRegas: false
  };

  const vrmInput = document.getElementById("vrm-input");
  const vrmStatus = document.getElementById("vrm-status");
  const summaryPlate = document.getElementById("summary-plate");
  const summaryClass = document.getElementById("summary-class");
  const quoteLines = document.getElementById("quote-lines");
  const quoteTotal = document.getElementById("quote-total");
  const totalNote = document.getElementById("total-note");
  const includedList = document.getElementById("included-list");

  const classButtons = Array.from(document.querySelectorAll("[data-class]"));
  const serviceButtons = Array.from(document.querySelectorAll("[data-service]"));
  const jumpButtons = Array.from(document.querySelectorAll("[data-jump-service]"));

  const addonCombo = document.getElementById("addon-mot-combo");
  const addonAlignment = document.getElementById("addon-alignment");
  const addonAc = document.getElementById("addon-ac");

  const bookingForm = document.getElementById("booking-form");
  const custName = document.getElementById("cust-name");
  const custPhone = document.getElementById("cust-phone");
  const custEmail = document.getElementById("cust-email");
  const custDate = document.getElementById("cust-date");
  const custNotes = document.getElementById("cust-notes");
  const directMailtoLink = document.getElementById("direct-mailto-link");
  const bookingFeedback = document.getElementById("booking-feedback");

  function formatGBP(amount) {
    return "\u00A3" + amount.toFixed(2);
  }

  function normalizeVrm(raw) {
    const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
    if (cleaned.length > 4) {
      return cleaned.slice(0, 4) + " " + cleaned.slice(4);
    }
    return cleaned;
  }

  function isValidUkPlate(plate) {
    const compact = plate.replace(/\s+/g, "");
    const ukPatterns = [
      /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/,
      /^[A-Z][0-9]{1,3}[A-Z]{3}$/,
      /^[A-Z]{3}[0-9]{1,3}[A-Z]$/,
      /^[0-9]{1,4}[A-Z]{1,3}$/,
      /^[A-Z]{1,3}[0-9]{1,4}$/
    ];
    return ukPatterns.some((rx) => rx.test(compact));
  }

  function computeQuote() {
    const cls = VEHICLE_CLASSES[state.vehicleClass];
    const svc = SERVICE_META[state.service];
    const basePrice = cls.prices[state.service];
    const lines = [
      {
        label: svc.title + " (" + cls.label + ")",
        amount: basePrice
      }
    ];

    let total = basePrice;

    if (state.comboDiscount) {
      if (state.service === "mot") {
        const interimAdd = cls.prices.interim;
        lines.push({ label: "Interim Service Add-On", amount: interimAdd });
        lines.push({ label: "Combined MOT & Servicing Discount", amount: -10.0 });
        total += interimAdd - 10.0;
      } else {
        const motAdd = cls.prices.mot;
        lines.push({ label: "MOT Test Add-On", amount: motAdd });
        lines.push({ label: "Combined MOT & Servicing Discount", amount: -10.0 });
        total += motAdd - 10.0;
      }
    }

    if (state.alignment) {
      lines.push({ label: "Wheel Alignment Check", amount: 35.0 });
      total += 35.0;
    }

    if (state.acRegas) {
      lines.push({ label: "Air Conditioning Regas & Service", amount: 55.0 });
      total += 55.0;
    }

    return { cls, svc, lines, total };
  }

  function buildMailtoHref(quote) {
    const regDisplay = state.vrm || "Not provided";
    const subject = "Booking Enquiry: " + quote.svc.title + " [" + regDisplay + "]";

    const lineSummary = quote.lines
      .map((item) => {
        const sign = item.amount < 0 ? "-" : "";
        return "- " + item.label + ": " + sign + formatGBP(Math.abs(item.amount));
      })
      .join("\n");

    const bodyLines = [
      "Hello Motor Repairs LTD,",
      "",
      "I would like to request a booking at 308 Washwood Heath Road, Birmingham B8 2UL.",
      "",
      "Vehicle Registration: " + regDisplay,
      "Vehicle Class: " + quote.cls.label,
      "Selected Work:",
      lineSummary,
      "Estimated Guide Total: " + formatGBP(quote.total),
      "",
      "Customer Name: " + (custName.value.trim() || "Not provided"),
      "Phone Number: " + (custPhone.value.trim() || "Not provided"),
      "Reply Email: " + (custEmail.value.trim() || "Not provided"),
      "Preferred Date: " + (custDate.value || "Next available slot"),
      "Notes: " + (custNotes.value.trim() || "None")
    ];

    return (
      "mailto:" +
      GARAGE_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(bodyLines.join("\n"))
    );
  }

  function render() {
    const cls = VEHICLE_CLASSES[state.vehicleClass];

    serviceButtons.forEach((btn) => {
      const key = btn.getAttribute("data-service");
      const priceEl = btn.querySelector("[data-pkg-price]");
      const amount = cls.prices[key];
      const prefix = key === "mot" ? "" : "From ";
      if (priceEl) {
        priceEl.textContent = prefix + formatGBP(amount);
      }
      const selected = key === state.service;
      btn.classList.toggle("is-selected", selected);
      btn.setAttribute("aria-pressed", String(selected));
    });

    classButtons.forEach((btn) => {
      const active = btn.getAttribute("data-class") === state.vehicleClass;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    const quote = computeQuote();

    summaryPlate.textContent = state.vrm ? "REG: " + state.vrm : "REG: NOT ENTERED";
    summaryClass.textContent = quote.cls.label;

    quoteLines.innerHTML = "";
    quote.lines.forEach((item) => {
      const li = document.createElement("li");
      const labelSpan = document.createElement("span");
      labelSpan.textContent = item.label;

      const priceSpan = document.createElement("span");
      priceSpan.className = "mono";
      priceSpan.textContent =
        (item.amount < 0 ? "-" : "") + formatGBP(Math.abs(item.amount));

      li.appendChild(labelSpan);
      li.appendChild(priceSpan);
      quoteLines.appendChild(li);
    });

    quoteTotal.textContent = formatGBP(quote.total);
    totalNote.textContent =
      state.service === "mot" && !state.comboDiscount && !state.alignment && !state.acRegas
        ? "Fixed DVSA MOT fee for selected vehicle class."
        : "Guide estimate; exact parts price confirmed on VRM check.";

    includedList.innerHTML = "";
    quote.svc.included.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      includedList.appendChild(li);
    });

    directMailtoLink.href = buildMailtoHref(quote);
  }

  if (vrmInput) {
    vrmInput.addEventListener("input", function (e) {
      const formatted = normalizeVrm(e.target.value);
      e.target.value = formatted;
      state.vrm = formatted;

      if (!formatted) {
        vrmStatus.textContent = "Format: e.g. AB12 CDE";
        vrmStatus.classList.remove("is-valid");
      } else if (isValidUkPlate(formatted)) {
        vrmStatus.textContent = "Valid UK registration format";
        vrmStatus.classList.add("is-valid");
      } else {
        vrmStatus.textContent = "Enter standard UK plate (e.g. BG19 MOT)";
        vrmStatus.classList.remove("is-valid");
      }

      render();
    });
  }

  classButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      state.vehicleClass = btn.getAttribute("data-class");
      render();
    });
  });

  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      state.service = btn.getAttribute("data-service");
      render();
    });
  });

  jumpButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetSvc = btn.getAttribute("data-jump-service");
      if (targetSvc && SERVICE_META[targetSvc]) {
        state.service = targetSvc;
        render();
      }
    });
  });

  addonCombo.addEventListener("change", function () {
    state.comboDiscount = addonCombo.checked;
    render();
  });

  addonAlignment.addEventListener("change", function () {
    state.alignment = addonAlignment.checked;
    render();
  });

  addonAc.addEventListener("change", function () {
    state.acRegas = addonAc.checked;
    render();
  });

  [custName, custPhone, custEmail, custDate, custNotes].forEach((field) => {
    field.addEventListener("input", render);
  });

  if (custDate) {
    const today = new Date().toISOString().split("T")[0];
    custDate.min = today;
  }

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const quote = computeQuote();
    const mailtoUrl = buildMailtoHref(quote);
    directMailtoLink.href = mailtoUrl;

    const regLabel = state.vrm || "your vehicle";
    bookingFeedback.hidden = false;
    bookingFeedback.textContent =
      "Booking summary prepared for " +
      regLabel +
      " (" +
      quote.svc.title +
      ", guide total " +
      formatGBP(quote.total) +
      "). Your email draft to " +
      GARAGE_EMAIL +
      " is ready, or call 0121 328 9222 for immediate bay confirmation.";

    window.location.href = mailtoUrl;
  });

  render();
})();
