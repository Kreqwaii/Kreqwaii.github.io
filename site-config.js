/**
 * KONFIGURATIONSDATEI / ФАЙЛ НАСТРОЙКИ САЙТА
 * Ändern Sie hier Telefonnummer, Preise, Stadt und Texte.
 * Меняйте здесь телефон, цены, город и тексты — сайт обновится автоматически.
 */
window.SITE_CONFIG = {
  brand: {
    name: "Meisterwerk Hausservice",
    owner: "Viktor Hoffmann",
    city: "München & Umland",
    cityRu: "Мюнхен и пригород",
    radiusKm: 30,
    foundedYear: 2019,
  },

  contacts: {
    phoneDisplay: "+49 176 4820 9130",
    phoneHref: "tel:+4917648209130",
    whatsappNumber: "4917648209130", // Ohne + und Leerzeichen / Без + и пробелов
    telegramUsername: "meisterwerk_muc",
    email: "info@meisterwerk-hausservice.de",
    hoursDe: "Mo–Sa, 08:00–20:00",
    hoursRu: "Пн–Сб, 08:00–20:00",
  },

  pricing: {
    hourlyRate: 49,
    calloutFee: 19,
    calloutNoteDe: "Entfällt bei Aufträgen ab 2 Stunden",
    calloutNoteRu: "Бесплатно при заказе от 2 часов",
    currency: "€",
  },

  services: [
    {
      id: "moebel",
      titleDe: "Möbelmontage & Aufbau",
      titleRu: "Сборка и разборка мебели",
      descDe: "IKEA, PAX-Schränke, Betten, Kommoden und Küchenmodule fachgerecht montiert.",
      descRu: "Шкафы PAX, кровати, комоды, кухни и любая корпусная мебель IKEA и других брендов.",
      priceDe: "ab 49 €",
      priceRu: "от 49 €",
      unitDe: "Std.",
      unitRu: "час",
    },
    {
      id: "kleinreparaturen",
      titleDe: "Kleinreparaturen im Haus",
      titleRu: "Мелкий бытовой ремонт",
      descDe: "Türen einstellen, Scharniere tauschen, Silikonfugen erneuern, Schlösser wechseln.",
      descRu: "Регулировка дверей, замена петель и замков, обновление силиконовых швов.",
      priceDe: "ab 45 €",
      priceRu: "от 45 €",
      unitDe: "Pauschal / Std.",
      unitRu: "фикс / час",
    },
    {
      id: "sanitaer",
      titleDe: "Sanitär & Armaturen",
      titleRu: "Сантехника и смесители",
      descDe: "Wasserhahn wechseln, Siphon reinigen, Duschstange und WC-Sitz montieren.",
      descRu: "Замена смесителей, прочистка сифонов, установка душевых стоек и сидений унитаза.",
      priceDe: "ab 55 €",
      priceRu: "от 55 €",
      unitDe: "Einsatz",
      unitRu: "выезд",
    },
    {
      id: "elektro",
      titleDe: "Lampen & Elektro-Kleinarbeiten",
      titleRu: "Люстры, розетки и электрика",
      descDe: "Deckenleuchten, Wandlampen, Steckdosen-Abdeckungen und Dimmer sicher anbringen.",
      descRu: "Монтаж люстр, бра, замена розеток, выключателей и подключение бытовых приборов.",
      priceDe: "ab 49 €",
      priceRu: "от 49 €",
      unitDe: "Std.",
      unitRu: "час",
    },
    {
      id: "wandmontage",
      titleDe: "Wandmontage, TV & Regale",
      titleRu: "Навес ТВ, полок и карнизов",
      descDe: "Schwerlastdübel für Beton und Rigips, TV-Halterungen, Spiegel, Bilder und Gardinen.",
      descRu: "Крепление на бетон и гипсокартон: телевизоры, зеркала, полки, картины и карнизы.",
      priceDe: "ab 45 €",
      priceRu: "от 45 €",
      unitDe: "Einsatz",
      unitRu: "выезд",
    },
  ],

  serviceAreas: [
    "München Zentrum",
    "Schwabing",
    "Bogenhausen",
    "Sendling",
    "Pasing",
    "Garching",
    "Unterschleißheim",
    "Dachau",
    "Haar",
    "Ottobrunn",
  ],

  i18n: {
    de: {
      navServices: "Leistungen & Preise",
      navGuarantees: "Vorteile",
      navContact: "Kontakt",
      heroHeadline: "Zuverlässiger Handwerker & Hausmeisterservice in",
      heroSubline:
        "Pünktlich, sauber und mit klaren Festpreisen. Möbelmontage, Kleinreparaturen, Sanitär und Wandmontage ohne wochenlange Wartezeit.",
      ctaBook: "Termin anfragen",
      ctaCall: "Anrufen",
      ctaWhatsapp: "WhatsApp",
      ctaTelegram: "Telegram",
      statHoursLabel: "Erreichbarkeit",
      statPriceLabel: "Stundensatz",
      statPriceValue: "49 € / Std.",
      statCalloutLabel: "Anfahrt im Stadtgebiet",
      statCalloutValue: "19 €",
      servicesTitle: "Leistungen und transparente Preise",
      servicesSubtitle:
        "Keine versteckten Kosten. Sie erhalten vor Beginn der Arbeit eine klare Einschätzung. Alle Preise inkl. gesetzlicher MwSt. oder nach § 19 UStG.",
      priceNotePrefix: "Anfahrtspauschale:",
      guaranteesTitle: "Warum Kunden uns weiterempfehlen",
      guaranteesSubtitle:
        "Deutscher Qualitätsanspruch kombiniert mit schneller, unkomplizierter Kommunikation auf Deutsch und Russisch.",
      guarantees: [
        {
          title: "Festpreis vor Arbeitsbeginn",
          text: "Klare Kalkulation ohne Überraschungen auf der Rechnung. Materialkosten werden vorab abgestimmt.",
        },
        {
          title: "Eigenes Profi-Werkzeug",
          text: "Bohrhammer, Laser-Wasserwaage, Dübel-Sortiment für Altbau und Trockenbau immer dabei.",
        },
        {
          title: "Saubere Arbeitsweise",
          text: "Schutzabdeckung für Böden und Möbel, Staubabsaugung beim Bohren und ordentliche Übergabe.",
        },
        {
          title: "Rechnung & Gewährleistung",
          text: "Ordentliche Rechnung für Ihre Unterlagen und 12 Monate Gewährleistung auf alle Montagen.",
        },
      ],
      formTitle: "Schnelle Anfrage senden",
      formSubtitle:
        "Beschreiben Sie kurz Ihr Anliegen. Wir melden uns in der Regel innerhalb von 30 Minuten.",
      labelName: "Ihr Name",
      placeholderName: "z. B. Lukas Weber",
      labelPhone: "Telefon oder WhatsApp",
      placeholderPhone: "+49 176 ...",
      labelService: "Gewünschte Leistung",
      labelMessage: "Kurze Beschreibung",
      placeholderMessage: "z. B. 2-türiger PAX Schrank aufbauen und 3 Lampen montieren",
      formPrivacy:
        "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß Datenschutzerklärung zu.",
      formSubmit: "Anfrage absenden",
      formSending: "Wird gesendet...",
      formSuccessTitle: "Anfrage vorbereitet",
      formSuccessText:
        "Vielen Dank. Ihre Anfrage wurde gespeichert. Für eine noch schnellere Rückmeldung können Sie die Details direkt per WhatsApp senden.",
      formSendWa: "Direkt per WhatsApp senden",
      formErrorRequired: "Bitte füllen Sie Name, Telefonnummer und Beschreibung aus.",
      contactTitle: "Einsatzgebiet und direkter Kontakt",
      contactSubtitle:
        "Schnelle Einsätze in München und bis zu 30 km Umland. Schreiben Sie uns per Messenger oder rufen Sie direkt an.",
      areaLabel: "Einsatzgebiete",
      directLabel: "Direktkontakt",
      footerRights: "Alle Rechte vorbehalten.",
      linkImpressum: "Impressum",
      linkPrivacy: "Datenschutzerklärung",
      modalClose: "Schließen",
    },

    ru: {
      navServices: "Услуги и цены",
      navGuarantees: "Гарантии",
      navContact: "Контакты",
      heroHeadline: "Надёжный мастер на час и бытовой сервис в г.",
      heroSubline:
        "Пунктуально, аккуратно и по честному прайсу. Сборка мебели, мелкий ремонт, сантехника и навес полок без многонедельного ожидания.",
      ctaBook: "Оставить заявку",
      ctaCall: "Позвонить",
      ctaWhatsapp: "WhatsApp",
      ctaTelegram: "Telegram",
      statHoursLabel: "График работы",
      statPriceLabel: "Ставка мастера",
      statPriceValue: "49 € / час",
      statCalloutLabel: "Выезд по городу",
      statCalloutValue: "19 €",
      servicesTitle: "Услуги и прозрачный прайс-лист",
      servicesSubtitle:
        "Никаких скрытых доплат. Вы знаете стоимость до начала работ. Официальный чек и прозрачный расчёт.",
      priceNotePrefix: "Выезд мастера:",
      guaranteesTitle: "Почему нас рекомендуют",
      guaranteesSubtitle:
        "Немецкий стандарт качества и понятное общение на русском или немецком языке.",
      guarantees: [
        {
          title: "Цена известна заранее",
          text: "Фиксированная стоимость или понятный почасовой тариф без неожиданных наценок в конце.",
        },
        {
          title: "Полный набор инструмента",
          text: "Перфоратор, лазерный уровень и профессиональный крепёж для бетона, кирпича и гипсокартона.",
        },
        {
          title: "Чистота после работы",
          text: "Используем пылесос при сверлении, защищаем пол и оставляем помещение в полном порядке.",
        },
        {
          title: "Счёт и гарантия 12 месяцев",
          text: "Официальный счёт (Rechnung) для отчётности и гарантия на все выполненные работы.",
        },
      ],
      formTitle: "Быстрая заявка мастеру",
      formSubtitle:
        "Опишите задачу в двух словах. Обычно мы отвечаем в течение 30 минут в рабочее время.",
      labelName: "Ваше имя",
      placeholderName: "Например, Алексей",
      labelPhone: "Телефон или WhatsApp",
      placeholderPhone: "+49 176 ...",
      labelService: "Выберите услугу",
      labelMessage: "Что нужно сделать",
      placeholderMessage: "Например, собрать шкаф PAX и повесить 3 светильника",
      formPrivacy:
        "Отправляя форму, вы соглашаетесь на обработку данных согласно политике конфиденциальности (DSGVO).",
      formSubmit: "Отправить заявку",
      formSending: "Отправка...",
      formSuccessTitle: "Заявка готова",
      formSuccessText:
        "Спасибо. Мы зафиксировали заявку. Для мгновенного ответа отправьте её сразу в WhatsApp.",
      formSendWa: "Отправить в WhatsApp",
      formErrorRequired: "Пожалуйста, укажите имя, телефон и описание задачи.",
      contactTitle: "Зона выезда и контакты",
      contactSubtitle:
        "Оперативный выезд по Мюнхену и в радиусе 30 км. Пишите в мессенджеры или звоните напрямую.",
      areaLabel: "Районы выезда",
      directLabel: "Быстрая связь",
      footerRights: "Все права защищены.",
      linkImpressum: "Impressum (§ 5 DDG)",
      linkPrivacy: "Datenschutzerklärung",
      modalClose: "Закрыть",
    },
  },

  legal: {
    impressumHtml: `
      <h3>Angaben gemäß § 5 DDG</h3>
      <p><strong>Meisterwerk Hausservice</strong><br>
      Inhaber: Viktor Hoffmann<br>
      Schleißheimer Straße 142<br>
      80797 München, Deutschland</p>

      <h3>Kontakt</h3>
      <p>Telefon: +49 176 4820 9130<br>
      E-Mail: info@meisterwerk-hausservice.de</p>

      <h3>Umsatzsteuer-ID / Steuerhinweis</h3>
      <p>Kleinunternehmer gemäß § 19 UStG (keine Ausweisung der Umsatzsteuer auf Rechnungen, sofern nicht anders vereinbart).</p>

      <h3>Tätigkeitsbereich</h3>
      <p>Zulassungsfreie handwerksähnliche Tätigkeiten gemäß Anlage B2 der Handwerksordnung (HwO): Möbelmontage, Holz- und Bautenschutz, Kleinreparaturen, Hausmeisterservice.</p>

      <h3>Streitschlichtung</h3>
      <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    `,
    privacyHtml: `
      <h3>1. Datenschutz auf einen Blick</h3>
      <p>Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.</p>

      <h3>2. Verantwortliche Stelle</h3>
      <p>Viktor Hoffmann, Meisterwerk Hausservice, Schleißheimer Straße 142, 80797 München, E-Mail: info@meisterwerk-hausservice.de</p>

      <h3>3. Datenerfassung auf dieser Website</h3>
      <p><strong>Anfrageformular & Kontaktaufnahme:</strong> Wenn Sie uns per Formular, Telefon, E-Mail, WhatsApp oder Telegram kontaktieren, werden Ihre angegebenen Daten (Name, Telefonnummer, Auftragsbeschreibung) zwecks Bearbeitung der Anfrage und für Anschlussfragen gespeichert (Art. 6 Abs. 1 lit. b DSGVO).</p>

      <h3>4. Messenger-Dienste (WhatsApp / Telegram)</h3>
      <p>Die Nutzung von WhatsApp oder Telegram erfolgt freiwillig auf Ihren Wunsch. Bitte beachten Sie, dass bei Kontaktaufnahme über externe Messenger die jeweiligen Datenschutzrichtlinien der Anbieter gelten.</p>

      <h3>5. Ihre Rechte</h3>
      <p>Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</p>
    `,
  },
};
