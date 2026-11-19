(function () {
  "use strict";

  var CATEGORY_CONFIG = {
    hatchback: {
      label: "Hatchback / Saloon",
      priceMult: 1.0,
      timeMult: 1.0
    },
    suv: {
      label: "SUV / 4x4",
      priceMult: 1.15,
      timeMult: 1.1
    },
    van: {
      label: "Light Commercial Van",
      priceMult: 1.22,
      timeMult: 1.18
    },
    prestige: {
      label: "German / Prestige",
      priceMult: 1.25,
      timeMult: 1.15
    }
  };

  var POWERTRAIN_CONFIG = {
    petrol: {
      label: "Petrol",
      serviceMult: 1.0,
      diagMult: 1.0
    },
    diesel: {
      label: "Diesel",
      serviceMult: 1.08,
      diagMult: 1.05
    },
    hybrid: {
      label: "Hybrid / EV",
      serviceMult: 1.1,
      diagMult: 1.12
    }
  };

  var JOBS_CATALOG = {
    mot: {
      id: "mot",
      name: "MOT Inspection & Pre-Check",
      minPrice: 48,
      maxPrice: 55,
      minHrs: 0.8,
      maxHrs: 1.0,
      scaleByCategory: false,
      vanPriceAdd: 5,
      powertrainScope: "none"
    },
    interim: {
      id: "interim",
      name: "Interim Service",
      minPrice: 125,
      maxPrice: 155,
      minHrs: 1.5,
      maxHrs: 2.0,
      scaleByCategory: true,
      vanPriceAdd: 0,
      powertrainScope: "service"
    },
    full: {
      id: "full",
      name: "Full Service",
      minPrice: 210,
      maxPrice: 265,
      minHrs: 2.5,
      maxHrs: 3.2,
      scaleByCategory: true,
      vanPriceAdd: 0,
      powertrainScope: "service"
    },
    brakes: {
      id: "brakes",
      name: "Brakes (Pads & Discs)",
      minPrice: 180,
      maxPrice: 310,
      minHrs: 1.5,
      maxHrs: 2.5,
      scaleByCategory: true,
      vanPriceAdd: 0,
      powertrainScope: "none"
    },
    timing: {
      id: "timing",
      name: "Timing Belt / Wetbelt / Chain",
      minPrice: 460,
      maxPrice: 890,
      minHrs: 4.5,
      maxHrs: 7.5,
      scaleByCategory: true,
      vanPriceAdd: 0,
      powertrainScope: "service"
    },
    diagnostics: {
      id: "diagnostics",
      name: "Dealer-Grade Diagnostics",
      minPrice: 75,
      maxPrice: 110,
      minHrs: 1.0,
      maxHrs: 1.5,
      scaleByCategory: false,
      vanPriceAdd: 0,
      powertrainScope: "diag"
    },
    clutch: {
      id: "clutch",
      name: "Clutch / Suspension Repair",
      minPrice: 340,
      maxPrice: 760,
      minHrs: 3.5,
      maxHrs: 6.0,
      scaleByCategory: true,
      vanPriceAdd: 0,
      powertrainScope: "none"
    },
    dpf: {
      id: "dpf",
      name: "DPF Assessment & 3-Stage Clean",
      minPrice: 240,
      maxPrice: 360,
      minHrs: 2.0,
      maxHrs: 3.5,
      scaleByCategory: false,
      vanPriceAdd: 25,
      powertrainScope: "none"
    },
    adas: {
      id: "adas",
      name: "ADAS Camera / Radar Calibration",
      minPrice: 140,
      maxPrice: 240,
      minHrs: 1.2,
      maxHrs: 2.0,
      scaleByCategory: false,
      vanPriceAdd: 0,
      powertrainScope: "diag"
    },
    evcheck: {
      id: "evcheck",
      name: "EV / Hybrid HV Battery Check",
      minPrice: 85,
      maxPrice: 135,
      minHrs: 1.0,
      maxHrs: 1.5,
      scaleByCategory: false,
      vanPriceAdd: 0,
      powertrainScope: "none"
    }
  };

  var vrmInput = document.getElementById("vrm-input");
  var vrmMetaText = document.getElementById("vrm-meta-text");
  var modelInput = document.getElementById("vehicle-model-input");
  var summaryPlateText = document.getElementById("summary-plate-text");
  var summaryVehicleClass = document.getElementById("summary-vehicle-class");
  var summaryPowertrain = document.getElementById("summary-powertrain");
  var summaryPriceRange = document.getElementById("summary-price-range");
  var summaryTimeRange = document.getElementById("summary-time-range");
  var summaryTurnaround = document.getElementById("summary-turnaround");
  var summaryCount = document.getElementById("summary-count");
  var breakdownList = document.getElementById("breakdown-list");
  var bundleSavingRow = document.getElementById("bundle-saving-row");
  var specialistNote = document.getElementById("specialist-note");
  var clearJobsBtn = document.getElementById("clear-jobs-btn");
  var copySummaryBtn = document.getElementById("copy-summary-btn");
  var bookingForm = document.getElementById("booking-form");
  var formFeedback = document.getElementById("form-feedback");

  var categoryRadios = document.querySelectorAll('input[name="vehicleCategory"]');
  var powertrainRadios = document.querySelectorAll('input[name="powertrain"]');
  var workCheckboxes = document.querySelectorAll('input[name="workItem"]');
  var presetButtons = document.querySelectorAll(".preset-btn");

  var latestEstimate = null;

  function roundTo5(val) {
    return Math.round(val / 5) * 5;
  }

  function roundTenths(val) {
    return Math.round(val * 10) / 10;
  }

  function formatUkVrm(raw) {
    var clean = String(raw || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 7);

    if (!clean) {
      return "";
    }

    if (/^[A-Z]{2}[0-9]{2}[A-Z]{1,3}$/.test(clean)) {
      return clean.slice(0, 4) + " " + clean.slice(4);
    }

    if (/^[A-Z][0-9]{1,3}[A-Z]{3}$/.test(clean)) {
      return clean.slice(0, clean.length - 3) + " " + clean.slice(-3);
    }

    if (/^[A-Z]{3}[0-9]{1,3}[A-Z]$/.test(clean)) {
      return clean.slice(0, 3) + " " + clean.slice(3);
    }

    if (clean.length > 4) {
      return clean.slice(0, 4) + " " + clean.slice(4);
    }

    return clean;
  }

  function describeUkPlate(formattedVrm) {
    var compact = formattedVrm.replace(/\s+/g, "");
    if (!compact) {
      return "Enter a UK registration number for VRM quote tagging";
    }

    var currentMatch = compact.match(/^[A-Z]{2}([0-9]{2})[A-Z]{3}$/);
    if (currentMatch) {
      var ageCode = parseInt(currentMatch[1], 10);
      if (ageCode >= 51 && ageCode <= 79) {
        var sepYear = 2000 + (ageCode - 50);
        return "Valid UK " + sepYear + "/" + String(sepYear + 1).slice(-2) + " late-year registration";
      }
      if (ageCode >= 2 && ageCode <= 29) {
        var marYear = 2000 + ageCode;
        return "Valid UK " + marYear + " registration format detected";
      }
      return "Valid UK current-style registration format";
    }

    if (/^[A-Z][0-9]{1,3}[A-Z]{3}$/.test(compact) || /^[A-Z]{3}[0-9]{1,3}[A-Z]$/.test(compact)) {
      return "Valid UK prefix or suffix registration detected";
    }

    if (compact.length >= 2 && compact.length <= 7) {
      return "Custom, cherished or partial UK registration";
    }

    return "Check UK registration characters";
  }

  function getSelectedCategory() {
    var val = "hatchback";
    categoryRadios.forEach(function (radio) {
      if (radio.checked) {
        val = radio.value;
      }
    });
    return val;
  }

  function getSelectedPowertrain() {
    var val = "petrol";
    powertrainRadios.forEach(function (radio) {
      if (radio.checked) {
        val = radio.value;
      }
    });
    return val;
  }

  function getSelectedJobIds() {
    var ids = [];
    workCheckboxes.forEach(function (cb) {
      if (cb.checked) {
        ids.push(cb.value);
      }
    });
    return ids;
  }

  function computeJobEstimate(job, catKey, fuelKey) {
    var cat = CATEGORY_CONFIG[catKey] || CATEGORY_CONFIG.hatchback;
    var fuel = POWERTRAIN_CONFIG[fuelKey] || POWERTRAIN_CONFIG.petrol;

    var priceMult = job.scaleByCategory ? cat.priceMult : 1.0;
    var timeMult = job.scaleByCategory ? cat.timeMult : 1.0;

    if (job.powertrainScope === "service") {
      priceMult *= fuel.serviceMult;
    } else if (job.powertrainScope === "diag") {
      priceMult *= fuel.diagMult;
    }

    var minP = roundTo5(job.minPrice * priceMult + (catKey === "van" ? job.vanPriceAdd : 0));
    var maxP = roundTo5(job.maxPrice * priceMult + (catKey === "van" ? job.vanPriceAdd : 0));
    var minH = roundTenths(job.minHrs * timeMult);
    var maxH = roundTenths(job.maxHrs * timeMult);

    return {
      id: job.id,
      name: job.name,
      minPrice: minP,
      maxPrice: maxP,
      minHrs: minH,
      maxHrs: maxH
    };
  }

  function buildSpecialistNote(selectedIds, fuelKey, modelName) {
    var modelLower = String(modelName || "").toLowerCase();

    if (selectedIds.indexOf("dpf") !== -1) {
      return "CM Automotive is an accredited member of The DPF Doctor network. Every DPF clean starts with a full fault-code and sensor assessment before our in-situ 3-stage clean.";
    }
    if (selectedIds.indexOf("adas") !== -1) {
      return "ADAS camera and radar calibration is carried out in-house to manufacturer alignment tolerances after windscreen, suspension or coding work.";
    }
    if (fuelKey === "hybrid" || selectedIds.indexOf("evcheck") !== -1) {
      return "HEVRA certified technicians follow strict high-voltage isolation procedures using dedicated EV and hybrid diagnostic systems.";
    }
    if (selectedIds.indexOf("timing") !== -1 || modelLower.indexOf("honda") !== -1 || modelLower.indexOf("civic") !== -1 || modelLower.indexOf("cr-v") !== -1) {
      return "Over 18 years of Honda Master Technician experience, including Honda Civic 1.0L wetbelt replacements, Type R servicing and main-dealer diagnostics.";
    }
    if (selectedIds.indexOf("diagnostics") !== -1) {
      return "Plain-language fault reports using main-dealer level diagnostic interfaces across petrol, diesel, hybrid and electric vehicles.";
    }
    return "Manufacturer-approved parts and transparent up-front fixed quotes confirmed against your exact VRM before any workshop work begins.";
  }

  function updateEstimator() {
    var formattedVrm = formatUkVrm(vrmInput.value);
    if (vrmInput.value !== formattedVrm) {
      vrmInput.value = formattedVrm;
    }

    vrmMetaText.textContent = describeUkPlate(formattedVrm);
    summaryPlateText.textContent = formattedVrm || "YOUR VRM";

    var catKey = getSelectedCategory();
    var fuelKey = getSelectedPowertrain();
    var catObj = CATEGORY_CONFIG[catKey];
    var fuelObj = POWERTRAIN_CONFIG[fuelKey];

    summaryVehicleClass.textContent = catObj.label;
    summaryPowertrain.textContent = fuelObj.label;

    Object.keys(JOBS_CATALOG).forEach(function (jobId) {
      var metaEl = document.querySelector('[data-job-meta="' + jobId + '"]');
      if (metaEl) {
        var est = computeJobEstimate(JOBS_CATALOG[jobId], catKey, fuelKey);
        metaEl.textContent =
          "£" + est.minPrice + " - £" + est.maxPrice + " | " + est.minHrs.toFixed(1) + " - " + est.maxHrs.toFixed(1) + " hrs";
      }
    });

    var selectedIds = getSelectedJobIds();
    var lineItems = selectedIds.map(function (id) {
      return computeJobEstimate(JOBS_CATALOG[id], catKey, fuelKey);
    });

    var totalMinP = 0;
    var totalMaxP = 0;
    var totalMinH = 0;
    var totalMaxH = 0;

    lineItems.forEach(function (item) {
      totalMinP += item.minPrice;
      totalMaxP += item.maxPrice;
      totalMinH += item.minHrs;
      totalMaxH += item.maxHrs;
    });

    var hasMot = selectedIds.indexOf("mot") !== -1;
    var hasService = selectedIds.indexOf("interim") !== -1 || selectedIds.indexOf("full") !== -1;
    var mechanicalCount = selectedIds.filter(function (id) {
      return id === "brakes" || id === "timing" || id === "clutch" || id === "diagnostics";
    }).length;

    var bundleDiscount = 0;
    var bundleHoursSaved = 0;
    var bundleNotes = [];

    if (hasMot && hasService) {
      bundleDiscount += 15;
      bundleHoursSaved += 0.3;
      bundleNotes.push("MOT + Service combined inspection allowance (-£15, -0.3 hrs)");
    }

    if (mechanicalCount >= 2) {
      bundleDiscount += 25;
      bundleHoursSaved += 0.4;
      bundleNotes.push("Multi-job ramp setup efficiency (-£25, -0.4 hrs)");
    }

    totalMinP = Math.max(0, totalMinP - bundleDiscount);
    totalMaxP = Math.max(0, totalMaxP - bundleDiscount);
    totalMinH = Math.max(0, roundTenths(totalMinH - bundleHoursSaved));
    totalMaxH = Math.max(0, roundTenths(totalMaxH - bundleHoursSaved));

    summaryCount.textContent = lineItems.length + (lineItems.length === 1 ? " item" : " items");

    if (lineItems.length === 0) {
      summaryPriceRange.textContent = "£0";
      summaryTimeRange.textContent = "0.0 hrs";
      summaryTurnaround.textContent = "Select one or more jobs to estimate";
      breakdownList.innerHTML = '<li class="breakdown-empty">No workshop items selected. Choose MOT, servicing or repair work on the left.</li>';
      bundleSavingRow.textContent = "";
    } else {
      summaryPriceRange.textContent = "£" + totalMinP + " - £" + totalMaxP;
      summaryTimeRange.textContent = totalMinH.toFixed(1) + " - " + totalMaxH.toFixed(1) + " hrs";

      if (totalMaxH <= 3.5) {
        summaryTurnaround.textContent = "Same-day morning or afternoon bay slot";
      } else if (totalMaxH <= 6.5) {
        summaryTurnaround.textContent = "Full-day workshop booking (drop off 09:00)";
      } else {
        summaryTurnaround.textContent = "Extended bay allocation (1 - 2 working days)";
      }

      breakdownList.innerHTML = "";
      lineItems.forEach(function (item) {
        var li = document.createElement("li");
        li.className = "breakdown-item";

        var nameSpan = document.createElement("span");
        nameSpan.className = "breakdown-item-name";
        nameSpan.textContent = item.name;

        var valSpan = document.createElement("span");
        valSpan.className = "breakdown-item-val mono";
        valSpan.textContent = "£" + item.minPrice + " - £" + item.maxPrice + " (" + item.minHrs.toFixed(1) + "h)";

        li.appendChild(nameSpan);
        li.appendChild(valSpan);
        breakdownList.appendChild(li);
      });

      bundleSavingRow.textContent = bundleNotes.length > 0 ? bundleNotes.join(" + ") : "";
    }

    specialistNote.textContent = buildSpecialistNote(selectedIds, fuelKey, modelInput.value);

    latestEstimate = {
      vrm: formattedVrm || "NOT PROVIDED",
      model: modelInput.value.trim() || "Not specified",
      category: catObj.label,
      powertrain: fuelObj.label,
      items: lineItems,
      bundleDiscount: bundleDiscount,
      minPrice: totalMinP,
      maxPrice: totalMaxP,
      minHrs: totalMinH,
      maxHrs: totalMaxH
    };
  }

  function buildPlainTextSummary(customerDetails) {
    var est = latestEstimate;
    if (!est) {
      return "";
    }

    var lines = [
      "CM Automotive Bristol - Estimate Request",
      "Location: Unit 4 Springwater Park, Crews Hole Rd, Bristol, BS5 8AN",
      "----------------------------------------",
      "UK Registration (VRM): " + est.vrm,
      "Make / Model: " + est.model,
      "Vehicle Category: " + est.category,
      "Powertrain: " + est.powertrain,
      "",
      "Selected Workshop Items:"
    ];

    if (est.items.length === 0) {
      lines.push("- General quote enquiry");
    } else {
      est.items.forEach(function (item) {
        lines.push("- " + item.name + ": £" + item.minPrice + " - £" + item.maxPrice + " (" + item.minHrs.toFixed(1) + " - " + item.maxHrs.toFixed(1) + " hrs)");
      });
    }

    if (est.bundleDiscount > 0) {
      lines.push("Combined Inspection Allowance: -£" + est.bundleDiscount);
    }

    lines.push("");
    lines.push("Estimated Guide Range: £" + est.minPrice + " - £" + est.maxPrice + " (GBP)");
    lines.push("Estimated Workshop Time: " + est.minHrs.toFixed(1) + " - " + est.maxHrs.toFixed(1) + " hrs");

    if (customerDetails) {
      lines.push("");
      lines.push("Customer Contact Details:");
      lines.push("Name: " + customerDetails.name);
      lines.push("Phone: " + customerDetails.phone);
      lines.push("Email: " + customerDetails.email);
      lines.push("Preferred Day: " + customerDetails.preferredDay);
      if (customerDetails.notes) {
        lines.push("Notes: " + customerDetails.notes);
      }
    }

    return lines.join("\n");
  }

  function showFeedback(message, isError, mailtoUrl) {
    formFeedback.hidden = false;
    formFeedback.className = "form-feedback " + (isError ? "is-error" : "is-success");
    formFeedback.textContent = "";

    var msgSpan = document.createElement("span");
    msgSpan.textContent = message;
    formFeedback.appendChild(msgSpan);

    if (mailtoUrl) {
      var spacer = document.createTextNode(" ");
      var link = document.createElement("a");
      link.href = mailtoUrl;
      link.textContent = "Open email client directly";
      link.style.fontWeight = "700";
      link.style.textDecoration = "underline";
      formFeedback.appendChild(spacer);
      formFeedback.appendChild(link);
    }
  }

  vrmInput.addEventListener("input", updateEstimator);
  modelInput.addEventListener("input", updateEstimator);

  categoryRadios.forEach(function (radio) {
    radio.addEventListener("change", updateEstimator);
  });

  powertrainRadios.forEach(function (radio) {
    radio.addEventListener("change", updateEstimator);
  });

  workCheckboxes.forEach(function (cb) {
    cb.addEventListener("change", function () {
      if (cb.checked && cb.value === "interim") {
        var fullCb = document.querySelector('input[name="workItem"][value="full"]');
        if (fullCb) {
          fullCb.checked = false;
        }
      } else if (cb.checked && cb.value === "full") {
        var interimCb = document.querySelector('input[name="workItem"][value="interim"]');
        if (interimCb) {
          interimCb.checked = false;
        }
      }
      updateEstimator();
    });
  });

  presetButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      vrmInput.value = btn.getAttribute("data-vrm") || "";
      modelInput.value = btn.getAttribute("data-model") || "";
      var targetCat = btn.getAttribute("data-cat");
      var targetFuel = btn.getAttribute("data-fuel");

      categoryRadios.forEach(function (r) {
        r.checked = r.value === targetCat;
      });
      powertrainRadios.forEach(function (r) {
        r.checked = r.value === targetFuel;
      });

      if (targetFuel === "diesel") {
        var dpfCb = document.querySelector('input[name="workItem"][value="dpf"]');
        if (dpfCb && targetCat === "prestige") {
          var adasCb = document.querySelector('input[name="workItem"][value="adas"]');
          if (adasCb) {
            adasCb.checked = true;
          }
        }
      }

      updateEstimator();
    });
  });

  clearJobsBtn.addEventListener("click", function () {
    workCheckboxes.forEach(function (cb) {
      cb.checked = false;
    });
    updateEstimator();
  });

  copySummaryBtn.addEventListener("click", function () {
    var summaryText = buildPlainTextSummary(null);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(summaryText).then(
        function () {
          showFeedback("Estimate summary copied to clipboard. Ready to paste into an email or message.", false);
        },
        function () {
          showFeedback("Summary prepared. Use Email Estimate to Workshop to open your mail app.", false);
        }
      );
    } else {
      showFeedback("Summary prepared. Use Email Estimate to Workshop to open your mail app.", false);
    }
  });

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var nameVal = document.getElementById("customer-name").value.trim();
    var phoneVal = document.getElementById("customer-phone").value.trim();
    var emailVal = document.getElementById("customer-email").value.trim();
    var dayVal = document.getElementById("preferred-day").value;
    var notesVal = document.getElementById("customer-notes").value.trim();

    if (!nameVal || !phoneVal || !emailVal) {
      showFeedback("Please enter your full name, phone number and email address before preparing the workshop enquiry.", true);
      return;
    }

    if (latestEstimate && latestEstimate.items.length === 0) {
      showFeedback("Please select at least one service, MOT or repair item in Step 02 to calculate an estimate.", true);
      return;
    }

    var bodyText = buildPlainTextSummary({
      name: nameVal,
      phone: phoneVal,
      email: emailVal,
      preferredDay: dayVal,
      notes: notesVal
    });

    var subject = "Service Estimate Enquiry: " + latestEstimate.vrm + " (" + latestEstimate.category + ")";
    var mailtoUrl =
      "mailto:enquiry@cmautomotivebristol.co.uk?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(bodyText);

    showFeedback(
      "Enquiry prepared for " + latestEstimate.vrm + " (£" + latestEstimate.minPrice + " - £" + latestEstimate.maxPrice + ").",
      false,
      mailtoUrl
    );

    window.location.href = mailtoUrl;
  });

  updateEstimator();
})();
