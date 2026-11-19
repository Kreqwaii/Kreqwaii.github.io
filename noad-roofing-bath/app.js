(function () {
  "use strict";

  var WORK_SPECS = {
    "re-roof": {
      label: "Full Re-Roof (Slate / Tile)",
      standard: "Workmanship & BS 5534",
      note: "Includes full strip of existing covering, breathable felt membrane, treated timber battens, slate or clay tile laying, dry or lime-mortar ridge bedding, and 100% licensed recycling.",
      calc: function (area, propMult, acc) {
        var matMin = Math.round(area * 112 * propMult);
        var matMax = Math.round(area * 145 * propMult);
        var scafMin = Math.round((1650 + area * 9) * (1 + acc.uplift) + acc.flatMin);
        var scafMax = Math.round((2150 + area * 12) * (1 + acc.uplift) + acc.flatMax);
        var duration = area <= 65 ? "5 - 8 working days" : (area <= 115 ? "7 - 12 working days" : "2 - 3 weeks");
        if (acc.key === "conservation" && area > 90) {
          duration = "2 - 4 weeks";
        }
        return { matMin: matMin, matMax: matMax, scafMin: scafMin, scafMax: scafMax, duration: duration };
      }
    },
    "flat-roof": {
      label: "Flat Roof (Res-tec GRP)",
      standard: "Res-tec 20-Yr / BRooF(t4)",
      note: "Cold-applied Res-tec liquid GRP membrane installed by trained Noad technicians with zero hot works, fire tested to BS 476-3 F.AA-B and EN 13501-5 BRooF(t4), plus 20-year materials guarantee.",
      calc: function (area, propMult, acc) {
        var baseMin = Math.max(1250, area * 105);
        var baseMax = Math.max(1650, area * 138);
        var matMin = Math.round(baseMin * (0.88 + propMult * 0.12));
        var matMax = Math.round(baseMax * (0.88 + propMult * 0.12));
        var scafMin = Math.round((620 + area * 3.5) * (1 + acc.uplift) + acc.flatMin * 0.6);
        var scafMax = Math.round((920 + area * 5.0) * (1 + acc.uplift) + acc.flatMax * 0.6);
        var duration = area <= 40 ? "2 - 3 working days" : (area <= 90 ? "3 - 5 working days" : "5 - 8 working days");
        return { matMin: matMin, matMax: matMax, scafMin: scafMin, scafMax: scafMax, duration: duration };
      }
    },
    "repair": {
      label: "Slate / Tile Repair",
      standard: "Like-for-Like Slate Match",
      note: "Targeted slate or tile replacement blending new and reclaimed Bath slate, storm damage remediation, flashing check, and complimentary drone inspection when works proceed.",
      calc: function (area, propMult, acc) {
        var matMin = Math.round((420 + area * 3.5) * propMult);
        var matMax = Math.round((720 + area * 5.2) * propMult);
        var scafMin = Math.round(280 + acc.flatMin * 0.85);
        var scafMax = Math.round(520 + acc.flatMax * 0.85);
        var duration = area <= 95 ? "1 - 2 working days" : "2 - 4 working days";
        return { matMin: matMin, matMax: matMax, scafMin: scafMin, scafMax: scafMax, duration: duration };
      }
    },
    "lead-chimney": {
      label: "Leadwork & Chimney",
      standard: "LSTA Leadwork Guidelines",
      note: "Bespoke chimney rebuilding, repointing, cowls, parapet/valley gutter linings, and custom aprons or step flashings installed to Lead Sheet Training Academy (LSTA) best practice.",
      calc: function (area, propMult, acc) {
        var matMin = Math.round((1050 + area * 12) * propMult);
        var matMax = Math.round((1550 + area * 18) * propMult);
        var scafMin = Math.round((950 + area * 3.5) * (1 + acc.uplift) + acc.flatMin * 0.75);
        var scafMax = Math.round((1350 + area * 5.0) * (1 + acc.uplift) + acc.flatMax * 0.75);
        var duration = area <= 95 ? "3 - 5 working days" : "5 - 8 working days";
        return { matMin: matMin, matMax: matMax, scafMin: scafMin, scafMax: scafMax, duration: duration };
      }
    },
    "heritage": {
      label: "Heritage / Listed Property",
      standard: "Listed Consent & LSTA Spec",
      note: "Bath conservation and Listed Building specification featuring reclaimed natural slate or clay tiles, LSTA heavy-code leadwork, lime mortar flaunching, and council consent documentation support.",
      calc: function (area, propMult, acc) {
        var matMin = Math.round(area * 152 * Math.max(propMult, 1.08));
        var matMax = Math.round(area * 198 * Math.max(propMult, 1.08));
        var scafMin = Math.round((2150 + area * 11) * (1 + acc.uplift) + acc.flatMin);
        var scafMax = Math.round((2850 + area * 15) * (1 + acc.uplift) + acc.flatMax);
        var duration = area <= 100 ? "2 - 3 weeks" : "3 - 5 weeks";
        return { matMin: matMin, matMax: matMax, scafMin: scafMin, scafMax: scafMax, duration: duration };
      }
    }
  };

  var PROPERTY_META = {
    terraced: { label: "Terraced House", mult: 0.95 },
    semi: { label: "Semi-Detached", mult: 1.0 },
    detached: { label: "Detached House", mult: 1.08 },
    period: { label: "Period Georgian / Victorian", mult: 1.18 }
  };

  var ACCESS_META = {
    standard: { key: "standard", label: "Standard Access", uplift: 0, flatMin: 0, flatMax: 0 },
    difficult: { key: "difficult", label: "Difficult Access", uplift: 0.14, flatMin: 450, flatMax: 680 },
    conservation: { key: "conservation", label: "Conservation Area / Listed", uplift: 0.18, flatMin: 650, flatMax: 950 }
  };

  function roundToFifty(n) {
    return Math.round(n / 50) * 50;
  }

  function formatGBP(amount) {
    return "£" + Number(amount).toLocaleString("en-GB");
  }

  function getCheckedValue(name, fallback) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : fallback;
  }

  var areaInput = document.getElementById("roofAreaInput");
  var areaSlider = document.getElementById("roofAreaSlider");
  var presetChips = document.querySelectorAll(".preset-chip");
  var optDrone = document.getElementById("optDrone");
  var optGutter = document.getElementById("optGutter");
  var optVelux = document.getElementById("optVelux");

  var summaryBadge = document.getElementById("summaryBadge");
  var estimateRangeEl = document.getElementById("estimateRange");
  var estimateDurationEl = document.getElementById("estimateDuration");
  var estimateStandardEl = document.getElementById("estimateStandard");
  var bdMaterialsEl = document.getElementById("bdMaterials");
  var bdAccessEl = document.getElementById("bdAccess");
  var bdAddonsEl = document.getElementById("bdAddons");
  var specNoteEl = document.getElementById("specNote");

  var surveyForm = document.getElementById("surveyForm");
  var formStatus = document.getElementById("formStatus");
  var formStatusTitle = document.getElementById("formStatusTitle");
  var formStatusBrief = document.getElementById("formStatusBrief");
  var directMailtoLink = document.getElementById("directMailtoLink");
  var copyBriefBtn = document.getElementById("copyBriefBtn");

  var latestEstimate = {};

  function clampArea(val) {
    var num = parseInt(val, 10);
    if (isNaN(num)) return 85;
    if (num < 15) return 15;
    if (num > 280) return 280;
    return num;
  }

  function syncAreaUI(val) {
    var area = clampArea(val);
    areaInput.value = String(area);
    areaSlider.value = String(area);
    presetChips.forEach(function (chip) {
      var chipVal = parseInt(chip.getAttribute("data-area"), 10);
      if (chipVal === area) {
        chip.classList.add("is-active");
      } else {
        chip.classList.remove("is-active");
      }
    });
    return area;
  }

  function updateEstimate() {
    var workKey = getCheckedValue("workType", "re-roof");
    var propKey = getCheckedValue("propertyType", "semi");
    var accKey = getCheckedValue("accessTier", "standard");
    var area = clampArea(areaSlider.value);

    var workSpec = WORK_SPECS[workKey] || WORK_SPECS["re-roof"];
    var propMeta = PROPERTY_META[propKey] || PROPERTY_META.semi;
    var accMeta = ACCESS_META[accKey] || ACCESS_META.standard;

    var base = workSpec.calc(area, propMeta.mult, accMeta);

    var addMin = 0;
    var addMax = 0;
    var addonLabels = [];

    if (optDrone && optDrone.checked) {
      addonLabels.push("Drone survey £0");
    }
    if (optGutter && optGutter.checked) {
      var gMin = Math.round(1050 + area * 2.2);
      var gMax = Math.round(1450 + area * 3.0);
      addMin += gMin;
      addMax += gMax;
      addonLabels.push("Roofline & guttering");
    }
    if (optVelux && optVelux.checked) {
      addMin += 1250;
      addMax += 1750;
      addonLabels.push("Certified VELUX");
    }

    var matMin = roundToFifty(base.matMin);
    var matMax = roundToFifty(base.matMax);
    var scafMin = roundToFifty(base.scafMin);
    var scafMax = roundToFifty(base.scafMax);
    var addRoundedMin = roundToFifty(addMin);
    var addRoundedMax = roundToFifty(addMax);

    var totalMin = matMin + scafMin + addRoundedMin;
    var totalMax = matMax + scafMax + addRoundedMax;

    summaryBadge.textContent = workSpec.label + " · " + area + " m²";
    estimateRangeEl.textContent = formatGBP(totalMin) + " - " + formatGBP(totalMax);
    estimateDurationEl.textContent = base.duration;
    estimateStandardEl.textContent = workSpec.standard;

    bdMaterialsEl.textContent = formatGBP(matMin) + " - " + formatGBP(matMax);
    bdAccessEl.textContent = formatGBP(scafMin) + " - " + formatGBP(scafMax);

    if (addRoundedMax > 0) {
      bdAddonsEl.textContent = formatGBP(addRoundedMin) + " - " + formatGBP(addRoundedMax);
    } else if (optDrone && optDrone.checked) {
      bdAddonsEl.textContent = "£0 (Drone survey included)";
    } else {
      bdAddonsEl.textContent = "£0 (None selected)";
    }

    specNoteEl.textContent = workSpec.note;

    latestEstimate = {
      workLabel: workSpec.label,
      propertyLabel: propMeta.label,
      accessLabel: accMeta.label,
      area: area,
      rangeText: formatGBP(totalMin) + " - " + formatGBP(totalMax),
      duration: base.duration,
      standard: workSpec.standard,
      addons: addonLabels.length ? addonLabels.join(", ") : "Standard scope only"
    };
  }

  document.querySelectorAll('input[name="workType"], input[name="propertyType"], input[name="accessTier"]').forEach(function (radio) {
    radio.addEventListener("change", updateEstimate);
  });

  [optDrone, optGutter, optVelux].forEach(function (chk) {
    if (chk) {
      chk.addEventListener("change", updateEstimate);
    }
  });

  areaSlider.addEventListener("input", function () {
    syncAreaUI(areaSlider.value);
    updateEstimate();
  });

  areaInput.addEventListener("input", function () {
    var raw = parseInt(areaInput.value, 10);
    if (!isNaN(raw) && raw >= 15 && raw <= 280) {
      areaSlider.value = String(raw);
      presetChips.forEach(function (chip) {
        var chipVal = parseInt(chip.getAttribute("data-area"), 10);
        chip.classList.toggle("is-active", chipVal === raw);
      });
      updateEstimate();
    }
  });

  areaInput.addEventListener("change", function () {
    syncAreaUI(areaInput.value);
    updateEstimate();
  });

  presetChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var val = chip.getAttribute("data-area");
      syncAreaUI(val);
      updateEstimate();
    });
  });

  if (surveyForm) {
    surveyForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var nameEl = document.getElementById("clientName");
      var phoneEl = document.getElementById("clientPhone");
      var emailEl = document.getElementById("clientEmail");
      var postcodeEl = document.getElementById("clientPostcode");
      var timingEl = document.getElementById("surveyTiming");
      var notesEl = document.getElementById("clientNotes");

      var requiredFields = [nameEl, phoneEl, emailEl, postcodeEl];
      var hasError = false;

      requiredFields.forEach(function (field) {
        var val = field.value.trim();
        var invalid = val.length === 0;
        if (field === emailEl && val.length > 0 && val.indexOf("@") === -1) {
          invalid = true;
        }
        field.classList.toggle("is-invalid", invalid);
        if (invalid) hasError = true;
      });

      if (hasError) {
        formStatus.hidden = false;
        formStatusTitle.textContent = "CHECK REQUIRED CONTACT FIELDS";
        formStatusBrief.textContent = "Please complete your name, telephone number, email address, and Bath or Somerset postcode so Noad Roofing can schedule an inspection.";
        directMailtoLink.style.display = "none";
        copyBriefBtn.style.display = "none";
        return;
      }

      var clientName = nameEl.value.trim();
      var clientPhone = phoneEl.value.trim();
      var clientEmail = emailEl.value.trim();
      var clientPostcode = postcodeEl.value.trim().toUpperCase();
      var surveyTiming = timingEl.value;
      var clientNotes = notesEl.value.trim() || "None specified";

      var briefLines = [
        "NOAD ROOFING LTD - FREE SURVEY & QUOTATION REQUEST",
        "Office: Bolwell Buildings, 1 Claverton Street, Widcombe, Bath BA2 4LE",
        "----------------------------------------",
        "Client Name: " + clientName,
        "Telephone: " + clientPhone,
        "Email: " + clientEmail,
        "Postcode: " + clientPostcode,
        "Survey Priority: " + surveyTiming,
        "----------------------------------------",
        "Scope: " + latestEstimate.workLabel,
        "Property: " + latestEstimate.propertyLabel,
        "Approx. Roof Area: " + latestEstimate.area + " m2",
        "Access Tier: " + latestEstimate.accessLabel,
        "Additions: " + latestEstimate.addons,
        "Guide Range: " + latestEstimate.rangeText,
        "Estimated Duration: " + latestEstimate.duration,
        "Technical Standard: " + latestEstimate.standard,
        "----------------------------------------",
        "Notes: " + clientNotes
      ];

      var briefText = briefLines.join("\n");
      var subject = encodeURIComponent("Roof Inspection Request (" + clientPostcode + ") - " + latestEstimate.workLabel);
      var body = encodeURIComponent(briefText);
      var mailtoHref = "mailto:roofing@noadroofing.co.uk?subject=" + subject + "&body=" + body;

      formStatus.hidden = false;
      formStatusTitle.textContent = "SURVEY BRIEF READY FOR NOAD ROOFING LTD";
      formStatusBrief.textContent = briefText;
      directMailtoLink.href = mailtoHref;
      directMailtoLink.style.display = "inline-flex";
      copyBriefBtn.style.display = "inline-flex";

      window.location.href = mailtoHref;
    });
  }

  if (copyBriefBtn) {
    copyBriefBtn.addEventListener("click", function () {
      var text = formStatusBrief.textContent || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyBriefBtn.textContent = "Copied to Clipboard";
          window.setTimeout(function () {
            copyBriefBtn.textContent = "Copy Survey Summary";
          }, 2200);
        });
      }
    });
  }

  syncAreaUI(85);
  updateEstimate();
})();
