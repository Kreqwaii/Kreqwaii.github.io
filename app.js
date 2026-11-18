(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  const SERVICE_ICONS = {
    moebel: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    kleinreparaturen: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15L22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>`,
    sanitaer: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    elektro: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
    wandmontage: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M8 21h8"/><path d="M12 19v2"/></svg>`,
  };

  let currentLang = localStorage.getItem("site_lang") === "ru" ? "ru" : "de";
  let lastTriggerEl = null;

  function waUrl(text) {
    const base = `https://wa.me/${cfg.contacts.whatsappNumber}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
  }

  function tgUrl() {
    return `https://t.me/${cfg.contacts.telegramUsername}`;
  }

  function applyStaticConfig() {
    document.getElementById("brand-name").textContent = cfg.brand.name;
    document.getElementById("footer-brand").textContent = cfg.brand.name;
    document.getElementById("footer-year").textContent = String(new Date().getFullYear());

    document.getElementById("hero-call-link").href = cfg.contacts.phoneHref;
    document.getElementById("hero-wa-link").href = waUrl();
    document.getElementById("hero-tg-link").href = tgUrl();

    document.getElementById("contact-phone-link").href = cfg.contacts.phoneHref;
    document.getElementById("contact-phone-text").textContent = cfg.contacts.phoneDisplay;
    document.getElementById("contact-wa-link").href = waUrl();
    document.getElementById("contact-tg-link").href = tgUrl();

    const areaList = document.getElementById("area-tags");
    areaList.innerHTML = cfg.serviceAreas.map((area) => `<li>${escapeHtml(area)}</li>`).join("");
  }

  function renderLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("site_lang", lang);
    document.documentElement.lang = lang;

    const t = cfg.i18n[lang];

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    document.getElementById("hero-city").textContent =
      lang === "ru" ? cfg.brand.cityRu : cfg.brand.city;

    document.getElementById("stat-price-value").textContent =
      `${cfg.pricing.hourlyRate} ${cfg.pricing.currency} / ${lang === "ru" ? "час" : "Std."}`;
    document.getElementById("stat-callout-value").textContent =
      `${cfg.pricing.calloutFee} ${cfg.pricing.currency}`;
    document.getElementById("stat-hours-value").textContent =
      lang === "ru" ? cfg.contacts.hoursRu : cfg.contacts.hoursDe;
    document.getElementById("callout-note").textContent =
      lang === "ru" ? cfg.pricing.calloutNoteRu : cfg.pricing.calloutNoteDe;

    document.getElementById("price-footnote").textContent =
      `${t.priceNotePrefix} ${cfg.pricing.calloutFee} ${cfg.pricing.currency} (${
        lang === "ru" ? cfg.pricing.calloutNoteRu : cfg.pricing.calloutNoteDe
      }).`;

    // Placeholders
    document.getElementById("input-name").placeholder = t.placeholderName;
    document.getElementById("input-phone").placeholder = t.placeholderPhone;
    document.getElementById("input-message").placeholder = t.placeholderMessage;

    renderServices(lang);
    renderGuarantees(lang);
    renderServiceSelect(lang);
  }

  function renderServices(lang) {
    const container = document.getElementById("services-list");
    container.innerHTML = cfg.services
      .map((srv) => {
        const title = lang === "ru" ? srv.titleRu : srv.titleDe;
        const desc = lang === "ru" ? srv.descRu : srv.descDe;
        const price = lang === "ru" ? srv.priceRu : srv.priceDe;
        const unit = lang === "ru" ? srv.unitRu : srv.unitDe;
        const icon = SERVICE_ICONS[srv.id] || SERVICE_ICONS.moebel;

        return `
          <div class="price-row">
            <span class="service-icon">${icon}</span>
            <div class="service-info">
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(desc)}</p>
            </div>
            <div class="service-price tabular">
              <span class="service-price-main">${escapeHtml(price)}</span>
              <span class="service-price-unit">${escapeHtml(unit)}</span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderGuarantees(lang) {
    const container = document.getElementById("guarantees-list");
    const items = cfg.i18n[lang].guarantees;
    container.innerHTML = items
      .map(
        (item) => `
        <div class="guarantee-item">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </div>
      `
      )
      .join("");
  }

  function renderServiceSelect(lang) {
    const select = document.getElementById("input-service");
    const prevValue = select.value;
    select.innerHTML = cfg.services
      .map((srv) => {
        const label = lang === "ru" ? srv.titleRu : srv.titleDe;
        return `<option value="${escapeHtml(srv.id)}">${escapeHtml(label)}</option>`;
      })
      .join("");
    if (prevValue) {
      select.value = prevValue;
    }
  }

  function setupForm() {
    const form = document.getElementById("booking-form");
    const errorEl = document.getElementById("form-error");
    const successEl = document.getElementById("form-success");
    const submitBtn = document.getElementById("form-submit-btn");
    const successWaBtn = document.getElementById("success-wa-btn");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = cfg.i18n[currentLang];
      const name = document.getElementById("input-name").value.trim();
      const phone = document.getElementById("input-phone").value.trim();
      const serviceId = document.getElementById("input-service").value;
      const message = document.getElementById("input-message").value.trim();

      if (!name || !phone || !message) {
        errorEl.textContent = t.formErrorRequired;
        errorEl.hidden = false;
        return;
      }

      errorEl.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = t.formSending;

      const selectedService = cfg.services.find((s) => s.id === serviceId);
      const serviceName = selectedService
        ? currentLang === "ru"
          ? selectedService.titleRu
          : selectedService.titleDe
        : serviceId;

      const waMessage =
        currentLang === "ru"
          ? `Здравствуйте, меня зовут ${name} (${phone}). Услуга: ${serviceName}. Задача: ${message}`
          : `Hallo, mein Name ist ${name} (${phone}). Leistung: ${serviceName}. Aufgabe: ${message}`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = t.formSubmit;
        form.hidden = true;
        successEl.hidden = false;
        successWaBtn.href = waUrl(waMessage);
      }, 320);
    });
  }

  function setupModal() {
    const modal = document.getElementById("legal-modal");
    const titleEl = document.getElementById("modal-title");
    const bodyEl = document.getElementById("modal-body");
    const closeBtn = document.getElementById("modal-close-btn");
    const footerCloseBtn = document.getElementById("modal-footer-close");

    function openModal(type, trigger) {
      lastTriggerEl = trigger || document.activeElement;
      const t = cfg.i18n[currentLang];
      if (type === "impressum") {
        titleEl.textContent = t.linkImpressum;
        bodyEl.innerHTML = cfg.legal.impressumHtml;
      } else {
        titleEl.textContent = t.linkPrivacy;
        bodyEl.innerHTML = cfg.legal.privacyHtml;
      }
      modal.hidden = false;
      closeBtn.focus();
    }

    function closeModal() {
      modal.hidden = true;
      if (lastTriggerEl && typeof lastTriggerEl.focus === "function") {
        lastTriggerEl.focus();
      }
    }

    document.getElementById("open-impressum").addEventListener("click", function () {
      openModal("impressum", this);
    });
    document.getElementById("open-privacy").addEventListener("click", function () {
      openModal("privacy", this);
    });
    closeBtn.addEventListener("click", closeModal);
    footerCloseBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) {
        closeModal();
      }
    });
  }

  function setupLangSwitch() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderLanguage(btn.dataset.lang);
      });
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  applyStaticConfig();
  setupLangSwitch();
  setupForm();
  setupModal();
  renderLanguage(currentLang);
})();
