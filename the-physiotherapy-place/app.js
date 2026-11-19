(function () {
  "use strict";

  const BRANCHES = {
    portobello: {
      name: "Portobello Clinic",
      shortTag: "Portobello Clinic (EH15 1AR)",
      address: "117 Portobello High Street, Edinburgh, EH15 1AR",
      phone: "0131 669 3369",
      note: "Free street parking next to clinic. Mon - Sat hours."
    },
    musselburgh: {
      name: "Musselburgh Clinic",
      shortTag: "Musselburgh Clinic (EH21 7AG)",
      address: "18 High Street, Musselburgh, EH21 7AG",
      phone: "0131 665 0619",
      note: "East Lothian clinic with MLS laser, Footscan, and traction."
    }
  };

  const PATHWAYS = {
    "gunn-ims": {
      headline: "Gunn IMS (Intramuscular Stimulation)",
      description: "Targeted neuropathic dry needling led by Niall McGregor for deep, chronic muscle shortening and nerve irritation.",
      initialLabel: "Initial Physio & Gunn IMS Assessment",
      initialFee: 85,
      followupFee: 70,
      defaultSessions: 4,
      minSessions: 1,
      maxSessions: 8,
      durationNote: "Typical outcome window: 3 to 5 sessions across 4 weeks",
      isPackage: false,
      orthoticNote: false,
      milestones: [
        "Full neuromuscular and spinal nerve-root assessment on visit one",
        "Fine-needle IMS release of chronic shortened paraspinal or peripheral bands",
        "Progressive mobility and loading exercises to sustain nerve reset"
      ]
    },
    shockwave: {
      headline: "Shockwave & Class IV MLS Laser Therapy",
      description: "Evidence-based acoustic shockwaves or Multiwave Locked System laser integrated within hands-on physiotherapy.",
      initialLabel: "Physio + Shockwave / MLS Laser Session 1",
      initialFee: 85,
      followupFee: 85,
      defaultSessions: 4,
      minSessions: 1,
      maxSessions: 8,
      durationNote: "Typical tendon course: 3 to 6 weekly sessions",
      isPackage: false,
      orthoticNote: false,
      milestones: [
        "Diagnostic tendon loading screen and baseline pain provocation test",
        "10 to 15 minute targeted acoustic wave or cellular laser dose per visit",
        "Graduated eccentric and heavy-slow resistance loading protocol"
      ]
    },
    "knee-hip": {
      headline: "Total Knee & Hip Replacement Rehab Package",
      description: "Structured 4-phase post-operative pathway covering Weeks 0-2, Weeks 2-6, Weeks 6-12, and Months 3-6.",
      initialLabel: "Phase 1 Post-Op Baseline Assessment",
      initialFee: 85,
      followupFee: 70,
      defaultSessions: 10,
      minSessions: 10,
      maxSessions: 15,
      durationNote: "Structured milestone pathway over 12 to 24 weeks",
      isPackage: true,
      orthoticNote: false,
      milestones: [
        "Weeks 0 - 2: Swelling control, full extension, and early activation",
        "Weeks 2 - 6: Knee bend towards 120 deg or hip abductor stability",
        "Weeks 6 - 12: Strength restoration towards 70-80% of opposite limb"
      ]
    },
    footscan: {
      headline: "Footscan Gait Analysis & Custom 3D Orthotics",
      description: "High-frequency pressure mapping of walking and running mechanics, guiding custom 3D-printed orthotics.",
      initialLabel: "Assessment Including Dynamic Footscan",
      initialFee: 120,
      followupFee: 70,
      defaultSessions: 2,
      minSessions: 1,
      maxSessions: 6,
      durationNote: "Includes dynamic pressure scan and gait report on day one",
      isPackage: false,
      orthoticNote: true,
      milestones: [
        "Dynamic pressure-plate capture of heel strike, pronation, and push-off",
        "Optional digital prescription for custom 3D-printed orthotic insoles",
        "Lower-limb strengthening and footwear guidance for bunions or running"
      ]
    },
    vertigo: {
      headline: "Vertigo, BPPV & Vestibular Rehabilitation",
      description: "Specialist vestibular balance testing including Dix-Hallpike and Roll assessments for dizziness and unsteadiness.",
      initialLabel: "Specialist Vestibular & Balance Assessment",
      initialFee: 95,
      followupFee: 70,
      defaultSessions: 3,
      minSessions: 1,
      maxSessions: 6,
      durationNote: "Many BPPV cases improve significantly within 1 to 3 visits",
      isPackage: false,
      orthoticNote: false,
      milestones: [
        "Eye-movement, positional Dix-Hallpike, and cervical spine screening",
        "Canalith repositioning manoeuvres for BPPV when indicated",
        "Tailored gaze stabilisation and balance confidence retraining"
      ]
    }
  };

  const state = {
    branch: "portobello",
    pathway: "gunn-ims",
    sessions: 4,
    packageTier: 10,
    addonCall: true,
    addonMassage: false,
    addonInsurance: false
  };

  const els = {
    navToggle: document.getElementById("navToggle"),
    mobileNav: document.getElementById("mobileNav"),
    branchCards: document.querySelectorAll("[data-branch]"),
    pathwayPills: document.querySelectorAll("[data-pathway]"),
    tierButtons: document.querySelectorAll("[data-tier]"),
    jumpLinks: document.querySelectorAll("[data-jump-pathway]"),
    sessionRange: document.getElementById("sessionRange"),
    standardSessionWrap: document.getElementById("standardSessionWrap"),
    packageTierWrap: document.getElementById("packageTierWrap"),
    courseStepLabel: document.getElementById("courseStepLabel"),
    pathwayHeadline: document.getElementById("pathwayHeadline"),
    pathwayDescription: document.getElementById("pathwayDescription"),
    sessionCountBadge: document.getElementById("sessionCountBadge"),
    addonCall: document.getElementById("addonCall"),
    addonMassage: document.getElementById("addonMassage"),
    addonInsurance: document.getElementById("addonInsurance"),
    summaryBranchTag: document.getElementById("summaryBranchTag"),
    summaryDurationNote: document.getElementById("summaryDurationNote"),
    initialFeeLabel: document.getElementById("initialFeeLabel"),
    initialFeeVal: document.getElementById("initialFeeVal"),
    followupFeeLabel: document.getElementById("followupFeeLabel"),
    followupFeeVal: document.getElementById("followupFeeVal"),
    addonMassageRow: document.getElementById("addonMassageRow"),
    orthoticNoteRow: document.getElementById("orthoticNoteRow"),
    insuranceTag: document.getElementById("insuranceTag"),
    totalAmountVal: document.getElementById("totalAmountVal"),
    milestoneList: document.getElementById("milestoneList"),
    bookingForm: document.getElementById("bookingForm"),
    formFeedback: document.getElementById("formFeedback"),
    patientName: document.getElementById("patientName"),
    patientEmail: document.getElementById("patientEmail"),
    patientTel: document.getElementById("patientTel"),
    patientTime: document.getElementById("patientTime"),
    patientNotes: document.getElementById("patientNotes")
  };

  function formatGBP(value) {
    return "£" + value.toFixed(2);
  }

  function getActiveSessionCount(pathwayObj) {
    return pathwayObj.isPackage ? state.packageTier : state.sessions;
  }

  function render() {
    const branchObj = BRANCHES[state.branch];
    const pathwayObj = PATHWAYS[state.pathway];
    const totalSessions = getActiveSessionCount(pathwayObj);
    const followupCount = Math.max(0, totalSessions - 1);

    els.branchCards.forEach((btn) => {
      const active = btn.dataset.branch === state.branch;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    els.pathwayPills.forEach((btn) => {
      const active = btn.dataset.pathway === state.pathway;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    els.tierButtons.forEach((btn) => {
      const active = Number(btn.dataset.tier) === state.packageTier;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    els.standardSessionWrap.hidden = pathwayObj.isPackage;
    els.packageTierWrap.hidden = !pathwayObj.isPackage;
    els.courseStepLabel.textContent = pathwayObj.isPackage
      ? "Select Joint Replacement Tier"
      : "Configure Course Length";

    if (!pathwayObj.isPackage) {
      els.sessionRange.min = String(pathwayObj.minSessions);
      els.sessionRange.max = String(pathwayObj.maxSessions);
      els.sessionRange.value = String(state.sessions);
    }

    els.pathwayHeadline.textContent = pathwayObj.headline;
    els.pathwayDescription.textContent = pathwayObj.description;
    els.sessionCountBadge.textContent =
      totalSessions === 1 ? "1 Session" : totalSessions + " Sessions";

    const initialCost = pathwayObj.initialFee;
    const followupCost = followupCount * pathwayObj.followupFee;
    const massageCost = state.addonMassage ? 60 : 0;
    const totalCost = initialCost + followupCost + massageCost;

    els.summaryBranchTag.textContent = branchObj.shortTag;
    els.summaryDurationNote.textContent = pathwayObj.durationNote;
    els.initialFeeLabel.textContent = pathwayObj.initialLabel;
    els.initialFeeVal.textContent = formatGBP(initialCost);

    if (followupCount === 0) {
      els.followupFeeLabel.textContent = "Follow-up Sessions (None selected)";
      els.followupFeeVal.textContent = formatGBP(0);
    } else {
      els.followupFeeLabel.textContent =
        followupCount +
        " Follow-up Session" +
        (followupCount > 1 ? "s" : "") +
        " (£" +
        pathwayObj.followupFee +
        " each)";
      els.followupFeeVal.textContent = formatGBP(followupCost);
    }

    els.addonMassageRow.hidden = !state.addonMassage;
    els.orthoticNoteRow.hidden = !pathwayObj.orthoticNote;
    els.insuranceTag.textContent = state.addonInsurance
      ? "Direct insurer billing requested (pre-auth required)"
      : "Self-pay clinic estimate";
    els.totalAmountVal.textContent = formatGBP(totalCost);

    els.milestoneList.innerHTML = "";
    pathwayObj.milestones.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      els.milestoneList.appendChild(li);
    });
  }

  function selectPathway(pathwayKey) {
    if (!PATHWAYS[pathwayKey]) return;
    state.pathway = pathwayKey;
    const p = PATHWAYS[pathwayKey];
    if (!p.isPackage) {
      state.sessions = p.defaultSessions;
    }
    render();
  }

  if (els.navToggle && els.mobileNav) {
    els.navToggle.addEventListener("click", () => {
      const isHidden = els.mobileNav.hidden;
      els.mobileNav.hidden = !isHidden;
      els.navToggle.setAttribute("aria-expanded", String(isHidden));
    });

    els.mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        els.mobileNav.hidden = true;
        els.navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  els.branchCards.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.branch = btn.dataset.branch;
      render();
    });
  });

  els.pathwayPills.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectPathway(btn.dataset.pathway);
    });
  });

  els.jumpLinks.forEach((link) => {
    link.addEventListener("click", () => {
      selectPathway(link.dataset.jumpPathway);
    });
  });

  els.tierButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.packageTier = Number(btn.dataset.tier);
      render();
    });
  });

  els.sessionRange.addEventListener("input", () => {
    state.sessions = Number(els.sessionRange.value);
    render();
  });

  els.addonCall.addEventListener("change", () => {
    state.addonCall = els.addonCall.checked;
    render();
  });

  els.addonMassage.addEventListener("change", () => {
    state.addonMassage = els.addonMassage.checked;
    render();
  });

  els.addonInsurance.addEventListener("change", () => {
    state.addonInsurance = els.addonInsurance.checked;
    render();
  });

  els.bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = els.patientName.value.trim();
    const email = els.patientEmail.value.trim();
    const tel = els.patientTel.value.trim();
    const preferredWindow = els.patientTime.value;
    const notes = els.patientNotes.value.trim();

    if (!name || !email || !email.includes("@") || !tel) {
      els.formFeedback.hidden = false;
      els.formFeedback.className = "form-feedback is-error";
      els.formFeedback.textContent =
        "Please enter your full name, a valid email address, and a contact phone number.";
      return;
    }

    const branchObj = BRANCHES[state.branch];
    const pathwayObj = PATHWAYS[state.pathway];
    const totalSessions = getActiveSessionCount(pathwayObj);
    const totalText = els.totalAmountVal.textContent;

    const summaryLines = [
      "Appointment Request: The Physiotherapy Place",
      "Clinic: " + branchObj.name + " (" + branchObj.address + ")",
      "Clinic Phone: " + branchObj.phone,
      "Pathway: " + pathwayObj.headline,
      "Planned Sessions: " + totalSessions,
      "Estimated Course Total: " + totalText,
      "Free 15-Min Phone Consult: " + (state.addonCall ? "Yes" : "No"),
      "45-Min Sports Massage Add-on: " + (state.addonMassage ? "Yes (£60)" : "No"),
      "Insurance Direct Billing: " + (state.addonInsurance ? "Requested" : "Self-Pay"),
      "",
      "Patient Name: " + name,
      "Patient Email: " + email,
      "Patient Phone: " + tel,
      "Preferred Window: " + preferredWindow,
      "Notes: " + (notes || "None provided")
    ];

    const bodyText = summaryLines.join("\n");
    const mailtoSubject = encodeURIComponent(
      "Appointment Request: " + pathwayObj.headline + " (" + branchObj.name + ")"
    );
    const mailtoBody = encodeURIComponent(bodyText);
    const mailtoHref =
      "mailto:info@thephysiotherapyplace.com?subject=" +
      mailtoSubject +
      "&body=" +
      mailtoBody;

    els.formFeedback.hidden = false;
    els.formFeedback.className = "form-feedback";
    els.formFeedback.innerHTML = "";

    const msg = document.createElement("p");
    msg.style.margin = "0";
    msg.textContent =
      "Summary prepared for " +
      branchObj.name +
      " (" +
      totalSessions +
      " session plan, " +
      totalText +
      "). Send directly to info@thephysiotherapyplace.com or call " +
      branchObj.phone +
      ".";

    const actionWrap = document.createElement("div");
    actionWrap.className = "feedback-actions";

    const mailLink = document.createElement("a");
    mailLink.className = "feedback-link";
    mailLink.href = mailtoHref;
    mailLink.textContent = "Open Email to info@thephysiotherapyplace.com";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn btn-secondary";
    copyBtn.textContent = "Copy Plan Summary";
    copyBtn.addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(bodyText).then(() => {
          copyBtn.textContent = "Copied to Clipboard";
        });
      }
    });

    actionWrap.appendChild(mailLink);
    actionWrap.appendChild(copyBtn);
    els.formFeedback.appendChild(msg);
    els.formFeedback.appendChild(actionWrap);
  });

  render();
})();
