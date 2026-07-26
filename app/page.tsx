"use client";

import { FormEvent, useState } from "react";

type Language = "en" | "ar";
type Theme = "light" | "dark";

const copy = {
  en: {
    nav: ["Coverage", "Why Taj", "About", "FAQ"],
    quote: "Get a free quote",
    eyebrow: "RIBO Licensed Insurance Broker",
    titleA: "Coverage that fits.",
    titleB: "Service that cares.",
    intro:
      "Personal guidance from Abdul Rahim Aljouja, comparing trusted Canadian insurers to help protect what matters to you.",
    start: "Start your quote",
    whatsapp: "Chat on WhatsApp",
    canada: "Serving clients across Canada",
    compare: "Multiple quote comparison",
    compareText: "One conversation. Multiple options. A clearer choice.",
    coverageKicker: "Coverage for real life",
    coverageTitle: "Everything important, protected.",
    coverageIntro:
      "Straightforward advice for individuals, families, tenants, homeowners and businesses.",
    services: [
      ["Auto Insurance", "Coverage tailored to your vehicle, driving needs and budget.", "01"],
      ["Home Insurance", "Thoughtful protection for your home and everything in it.", "02"],
      ["Tenant Insurance", "Simple, affordable coverage for your belongings and liability.", "03"],
      ["Business Insurance", "Flexible protection shaped around your commercial needs.", "04"],
    ],
    differenceKicker: "The Taj difference",
    differenceTitle: "A broker on your side.",
    benefits: [
      ["More choice", "We compare options from leading Canadian insurance companies."],
      ["Personal guidance", "Clear answers and attentive support at every step."],
      ["Quick & easy", "A simple process designed to respect your time."],
      ["Better value", "The right coverage matters just as much as the right rate."],
    ],
    stepsKicker: "How it works",
    stepsTitle: "From questions to coverage.",
    steps: [
      ["Tell us what you need", "Complete a short, secure form in English or Arabic."],
      ["We compare options", "Abdul Rahim reviews your needs and available coverage."],
      ["Choose with confidence", "Get personal guidance before making your decision."],
    ],
    aboutKicker: "Meet your broker",
    aboutTitle: "Insurance, made personal.",
    aboutText:
      "Abdul Rahim Aljouja is a RIBO licensed insurance broker committed to responsive service, clear advice and long-term client relationships. Whether you are insuring a car, home, rental or business, you will always know who you are speaking with.",
    licensed: "RIBO Licensed",
    personal: "Bilingual service",
    nationwide: "Across Canada",
    faqKicker: "Good questions, clear answers",
    faqTitle: "Insurance shouldn’t feel complicated.",
    faqs: [
      ["Why work with an insurance broker?", "A broker helps you compare coverage options, understand the details and choose based on your needs—not just price."],
      ["Which types of insurance do you offer?", "Taj Insurance helps with auto, home, tenant and business insurance, including bundled quote comparisons."],
      ["Do you serve clients outside Ontario?", "Yes. Taj Insurance serves eligible clients across Canada, subject to insurer availability and underwriting requirements."],
      ["Can I get service in Arabic?", "Absolutely. The website, quote form and personal support are available in English and Arabic."],
      ["Is requesting a quote free?", "Yes. Your initial consultation and quote request are free and come with no obligation."],
    ],
    formKicker: "Free, no-obligation quote",
    formTitle: "Let’s find the right coverage.",
    formIntro: "Start with the essentials. We’ll ask only what is relevant to your insurance type.",
    next: "Continue",
    back: "Back",
    submit: "Send my request",
    sentTitle: "Your request is on its way.",
    sentText: "Thank you. Abdul Rahim will contact you using your preferred method.",
    required: "Required",
    fields: {
      name: "Full name",
      email: "Email address",
      phone: "Phone number",
      province: "Province or territory",
      city: "City",
      postal: "Postal code",
      language: "Preferred language",
      contact: "Preferred contact method",
      time: "Best time to reach you",
      insurance: "Insurance needed",
      current: "Do you currently have insurance?",
      effective: "Renewal or desired start date",
      notes: "Tell us briefly what you need",
      consent: "I consent to being contacted about my insurance request and agree to the privacy policy.",
    },
    options: {
      select: "Select",
      english: "English",
      arabic: "Arabic",
      call: "Phone call",
      wa: "WhatsApp",
      mail: "Email",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      auto: "Auto insurance",
      home: "Home insurance",
      tenant: "Tenant insurance",
      business: "Business insurance",
      multiple: "More than one / bundle",
      yes: "Yes",
      no: "No",
    },
    botHello: "Hi! I’m Taj Assistant. What type of insurance can we help you with?",
    botPrompt: "Choose a service to start your quote.",
    footerText: "Personal insurance guidance from a broker you can reach.",
    legal: "RIBO Licensed Insurance Broker",
    privacy: "Privacy",
    admin: "Client dashboard",
  },
  ar: {
    nav: ["التغطيات", "لماذا تاج", "عن عبد الرحيم", "الأسئلة"],
    quote: "احصل على عرض مجاني",
    eyebrow: "وسيط تأمين مرخّص من RIBO",
    titleA: "تغطية تناسبك.",
    titleB: "وخدمة تهتم بك.",
    intro:
      "استشارة شخصية من عبد الرحيم الجوجة ومقارنة خيارات شركات التأمين الكندية لحماية كل ما يهمك.",
    start: "ابدأ طلب العرض",
    whatsapp: "تواصل عبر واتساب",
    canada: "نخدم العملاء في جميع أنحاء كندا",
    compare: "مقارنة عروض متعددة",
    compareText: "محادثة واحدة، خيارات متعددة، وقرار أوضح.",
    coverageKicker: "تغطية للحياة الحقيقية",
    coverageTitle: "كل ما يهمك، محمي.",
    coverageIntro: "نصيحة واضحة للأفراد والعائلات والمستأجرين وأصحاب المنازل والأعمال.",
    services: [
      ["تأمين السيارات", "تغطية تناسب سيارتك واحتياجات قيادتك وميزانيتك.", "٠١"],
      ["تأمين المنازل", "حماية مدروسة لمنزلك وكل ما بداخله.", "٠٢"],
      ["تأمين المستأجرين", "تغطية بسيطة ومناسبة لممتلكاتك ومسؤوليتك.", "٠٣"],
      ["تأمين الأعمال", "حماية مرنة مصممة حسب احتياجات نشاطك التجاري.", "٠٤"],
    ],
    differenceKicker: "الفرق مع تاج",
    differenceTitle: "وسيط تأمين يقف إلى جانبك.",
    benefits: [
      ["خيارات أكثر", "نقارن الخيارات المتاحة من شركات التأمين الكندية الموثوقة."],
      ["خدمة شخصية", "إجابات واضحة واهتمام حقيقي في كل خطوة."],
      ["سريع وسهل", "إجراءات بسيطة تحترم وقتك."],
      ["قيمة أفضل", "التغطية المناسبة مهمة بقدر السعر المناسب."],
    ],
    stepsKicker: "كيف نعمل",
    stepsTitle: "من السؤال إلى التغطية.",
    steps: [
      ["أخبرنا بما تحتاج", "املأ نموذجاً قصيراً وآمناً بالعربية أو الإنجليزية."],
      ["نقارن الخيارات", "يراجع عبد الرحيم احتياجاتك والتغطيات المتاحة."],
      ["اختر بثقة", "احصل على نصيحة شخصية قبل اتخاذ قرارك."],
    ],
    aboutKicker: "تعرّف على وسيطك",
    aboutTitle: "تأمين بطابع شخصي.",
    aboutText:
      "عبد الرحيم الجوجة وسيط تأمين مرخّص من RIBO، ملتزم بسرعة الاستجابة والنصيحة الواضحة وبناء علاقات طويلة مع عملائه. سواء كنت تؤمّن سيارة أو منزلاً أو عقاراً مستأجراً أو عملاً، ستعرف دائماً مع من تتحدث.",
    licensed: "مرخّص من RIBO",
    personal: "خدمة بلغتين",
    nationwide: "في جميع أنحاء كندا",
    faqKicker: "أسئلة جيدة، وإجابات واضحة",
    faqTitle: "التأمين لا يجب أن يكون معقداً.",
    faqs: [
      ["لماذا أتعامل مع وسيط تأمين؟", "يساعدك الوسيط على مقارنة التغطيات وفهم التفاصيل والاختيار حسب احتياجاتك، وليس السعر فقط."],
      ["ما أنواع التأمين المتوفرة؟", "يساعدك تاج في تأمين السيارات والمنازل والمستأجرين والأعمال، بالإضافة إلى مقارنة عروض الباقات."],
      ["هل تخدمون عملاء خارج أونتاريو؟", "نعم، نخدم العملاء المؤهلين في أنحاء كندا حسب توفر شركة التأمين وشروط القبول."],
      ["هل الخدمة متوفرة بالعربية؟", "بالتأكيد. الموقع ونموذج العرض والدعم الشخصي متوفرون بالعربية والإنجليزية."],
      ["هل طلب العرض مجاني؟", "نعم، الاستشارة الأولية وطلب العرض مجانيان ومن دون التزام."],
    ],
    formKicker: "عرض مجاني ومن دون التزام",
    formTitle: "لنبحث عن التغطية المناسبة.",
    formIntro: "ابدأ بالمعلومات الأساسية، وسنسأل فقط عما يرتبط بنوع التأمين الذي اخترته.",
    next: "متابعة",
    back: "رجوع",
    submit: "إرسال الطلب",
    sentTitle: "تم استلام طلبك.",
    sentText: "شكراً لك. سيتواصل معك عبد الرحيم بالطريقة التي اخترتها.",
    required: "مطلوب",
    fields: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      province: "المقاطعة أو الإقليم",
      city: "المدينة",
      postal: "الرمز البريدي",
      language: "اللغة المفضلة",
      contact: "طريقة التواصل المفضلة",
      time: "أفضل وقت للتواصل",
      insurance: "التأمين المطلوب",
      current: "هل لديك تأمين حالي؟",
      effective: "تاريخ التجديد أو بدء التغطية",
      notes: "اشرح لنا باختصار ما تحتاجه",
      consent: "أوافق على التواصل معي بخصوص طلب التأمين وعلى سياسة الخصوصية.",
    },
    options: {
      select: "اختر",
      english: "الإنجليزية",
      arabic: "العربية",
      call: "مكالمة هاتفية",
      wa: "واتساب",
      mail: "البريد الإلكتروني",
      morning: "صباحاً",
      afternoon: "بعد الظهر",
      evening: "مساءً",
      auto: "تأمين سيارات",
      home: "تأمين منازل",
      tenant: "تأمين مستأجرين",
      business: "تأمين أعمال",
      multiple: "أكثر من نوع / باقة",
      yes: "نعم",
      no: "لا",
    },
    botHello: "مرحباً! أنا مساعد تاج. ما نوع التأمين الذي يمكننا مساعدتك به؟",
    botPrompt: "اختر خدمة للبدء بطلب العرض.",
    footerText: "نصيحة تأمينية شخصية من وسيط يمكنك التواصل معه مباشرة.",
    legal: "وسيط تأمين مرخّص من RIBO",
    privacy: "الخصوصية",
    admin: "لوحة العملاء",
  },
};

const provinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec",
  "Saskatchewan", "Yukon",
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""}`} aria-label="Taj Insurance">
      <span className="brand-crown">◆</span>
      <span className="brand-name">TAJ</span>
      <span className="brand-dot">.</span>
      <span className="brand-insurance">INSURANCE</span>
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bot, setBot] = useState(false);
  const t = copy[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const year = new Date().getFullYear();

  function changeLanguage() {
    setLang((value) => (value === "en" ? "ar" : "en"));
    setMenu(false);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale: lang }),
      });
      if (!response.ok) throw new Error("Unable to submit");
      setSent(true);
    } catch {
      const subject = encodeURIComponent(`Taj Insurance quote request — ${String(data.insurance || "")}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nInsurance: ${data.insurance}\nProvince: ${data.province}\nNotes: ${data.notes || ""}`,
      );
      window.location.href = `mailto:abdulrahimaljouja@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={`site theme-${theme}`} dir={dir} lang={lang}>
      <header className="header">
        <a href="#top" className="logo-link"><Brand compact /></a>
        <nav className={`nav ${menu ? "nav--open" : ""}`} aria-label="Primary navigation">
          {t.nav.map((item, index) => (
            <a key={item} href={["#coverage", "#difference", "#about", "#faq"][index]} onClick={() => setMenu(false)}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Toggle dark mode">
            {theme === "light" ? "◐" : "☀"}
          </button>
          <button className="language-button" onClick={changeLanguage}>{lang === "en" ? "عربي" : "EN"}</button>
          <a className="button button--small header-quote" href="#quote">{t.quote}</a>
          <button className="menu-button" aria-label="Open menu" onClick={() => setMenu(!menu)}><span /><span /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit hero-orbit--one" />
        <div className="hero-orbit hero-orbit--two" />
        <div className="hero-copy reveal">
          <div className="eyebrow trust-statement">
            <span className="eyebrow-mark">✓</span>
            <span><strong>{t.eyebrow}</strong><small>{lang === "en" ? "Licensed. Regulated. Trusted." : "مرخّص. منظّم. موثوق."}</small></span>
          </div>
          <h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <a className="button" href="#quote">{t.start}<span>↗</span></a>
          </div>
          <div className="hero-proof">
            <span className="maple">✦</span>
            <div><strong>{t.canada}</strong><small>{t.compare}</small></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-frame">
            <img src="/abdul-rahim-hero-v2.png" alt="Abdul Rahim Aljouja, RIBO licensed insurance broker" />
            <div className="portrait-shade" />
          </div>
          <div className="portrait-name"><small>YOUR BROKER</small><strong>ABDUL RAHIM<br />ALJOUJA</strong></div>
          <div className="rate-card">
            <span className="rate-card-orb"><i /><b>4</b></span>
            <div><strong>{t.compare}</strong><small>{t.compareText}</small></div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Key benefits">
        {[
          ["RIBO", "Licensed broker", "R"],
          ["EN + AR", "Bilingual service", "文"],
          ["1:1", "Personal guidance", "◆"],
          ["CA", "Canada-wide", "✦"],
        ].map(([title, subtitle, icon]) => (
          <div className="trust-badge" key={title}>
            <span className="trust-icon">{icon}</span>
            <span><strong>{title}</strong><small>{subtitle}</small></span>
          </div>
        ))}
      </section>

      <section className="section coverage" id="coverage">
        <div className="section-heading">
          <div><span className="kicker">{t.coverageKicker}</span><h2>{t.coverageTitle}</h2></div>
          <p>{t.coverageIntro}</p>
        </div>
        <div className="service-grid">
          {t.services.map(([title, description, number], index) => (
            <article className={`service-card service-card--${index + 1}`} key={title}>
              <div className="service-top"><span className="service-number">{number}</span><span className="service-arrow">↗</span></div>
              <div className={`service-symbol service-symbol--${index + 1}`} aria-hidden="true" />
              <h3>{title}</h3><p>{description}</p>
              <a href="#quote" onClick={() => setStep(2)}>{t.quote}<span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section difference" id="difference">
        <div className="difference-image">
          <img src="/coverage-world-3d.png" alt="3D insurance world showing auto, home, tenant and business coverage" />
          <div className="difference-image-overlay" />
        </div>
        <div className="difference-copy">
          <span className="kicker">{t.differenceKicker}</span>
          <h2>{t.differenceTitle}</h2>
          <div className="benefit-list">
            {t.benefits.map(([title, description], index) => (
              <div className="benefit" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></div>
            ))}
          </div>
          <a className="button button--outline" href="#quote">{t.start}<span>↗</span></a>
        </div>
      </section>

      <section className="section process">
        <div className="center-heading"><span className="kicker">{t.stepsKicker}</span><h2>{t.stepsTitle}</h2></div>
        <div className="steps">
          {t.steps.map(([title, description], index) => (
            <article key={title}>
              <div className="step-line"><span>{index + 1}</span><i /></div>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-portrait">
          <img src="/comparison-engine-3d.png" alt="3D comparison engine connecting four insurance services to one guided choice" />
        </div>
        <div className="about-copy">
          <span className="kicker">{t.aboutKicker}</span><h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="credential-row">
            {[t.licensed, t.personal, t.nationwide].map((item, index) => <div key={item}><strong>{["RIBO", "EN / AR", "CA"][index]}</strong><span>{item}</span></div>)}
          </div>
          <div className="signature">Abdul Rahim Aljouja</div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="faq-heading"><span className="kicker">{t.faqKicker}</span><h2>{t.faqTitle}</h2></div>
        <div className="faq-list">
          {t.faqs.map(([question, answer], index) => (
            <article className={faq === index ? "faq-item faq-item--open" : "faq-item"} key={question}>
              <button onClick={() => setFaq(faq === index ? null : index)} aria-expanded={faq === index}>
                <span>{question}</span><i>{faq === index ? "−" : "+"}</i>
              </button>
              <div className="faq-answer"><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="quote-intro">
          <Brand />
          <div><span className="kicker">{t.formKicker}</span><h2>{t.formTitle}</h2><p>{t.formIntro}</p></div>
          <div className="quote-contact"><a href="tel:+16477071972">+1 647 707 1972</a><a href="mailto:abdulrahimaljouja@gmail.com">abdulrahimaljouja@gmail.com</a></div>
        </div>
        <div className="form-card">
          {sent ? (
            <div className="success-state"><span>✓</span><h3>{t.sentTitle}</h3><p>{t.sentText}</p></div>
          ) : (
            <form onSubmit={submitLead} className="quote-form-modern">
              <div className="form-card-heading">
                <span className="form-card-number">01</span>
                <div><strong>{t.formKicker}</strong><small>{t.required}: name, email, phone & coverage</small></div>
              </div>
              <div className="form-service-title">{t.fields.insurance} *</div>
              <div className="service-choices">
                {(["auto", "home", "tenant", "business", "multiple"] as const).map((key, index) => (
                  <label className="service-choice" key={key}>
                    <input type="radio" name="insurance" value={key} required />
                    <span className={`mini-service-icon mini-service-icon--${Math.min(index + 1, 4)}`} />
                    <strong>{t.options[key]}</strong>
                  </label>
                ))}
              </div>
              <div className="form-grid">
                <label className="field field--wide"><span>{t.fields.name} *</span><input name="name" required autoComplete="name" placeholder={lang === "en" ? "First and last name" : "الاسم الأول والأخير"} /></label>
                <label className="field"><span>{t.fields.email} *</span><input name="email" type="email" required autoComplete="email" placeholder="name@email.com" /></label>
                <label className="field"><span>{t.fields.phone} *</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+1 000 000 0000" /></label>
                <label className="field"><span>{t.fields.province} *</span><select name="province" required defaultValue=""><option value="" disabled>{t.options.select}</option>{provinces.map((province) => <option key={province}>{province}</option>)}</select></label>
                <label className="field"><span>{t.fields.city}</span><input name="city" autoComplete="address-level2" /></label>
                <label className="field"><span>{t.fields.contact}</span><select name="contactMethod" defaultValue="whatsapp"><option value="whatsapp">{t.options.wa}</option><option value="phone">{t.options.call}</option><option value="email">{t.options.mail}</option></select></label>
                <label className="field"><span>{t.fields.time}</span><select name="contactTime" defaultValue="afternoon"><option value="morning">{t.options.morning}</option><option value="afternoon">{t.options.afternoon}</option><option value="evening">{t.options.evening}</option></select></label>
                <label className="field"><span>{t.fields.current}</span><select name="currentlyInsured" defaultValue=""><option value="">{t.options.select}</option><option value="yes">{t.options.yes}</option><option value="no">{t.options.no}</option></select></label>
                <label className="field"><span>{t.fields.effective}</span><input name="effectiveDate" type="date" /></label>
                <label className="field field--wide"><span>{t.fields.notes}</span><textarea name="notes" rows={4} placeholder={lang === "en" ? "Anything helpful for your quote…" : "أي معلومات مفيدة لطلب العرض…"} /></label>
              </div>
              <input type="hidden" name="preferredLanguage" value={lang} />
              <label className="checkbox"><input name="consent" type="checkbox" value="yes" required /><span>{t.fields.consent} *</span></label>
              <div className="form-submit-row"><span><b>✓</b>{lang === "en" ? "Secure & no obligation" : "آمن ومن دون التزام"}</span><button type="submit" className="button button--submit" disabled={submitting}>{submitting ? "…" : t.submit}<span>↗</span></button></div>
            </form>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-main"><div><Brand /><p>{t.footerText}</p></div><div className="footer-socials">
          {[
            ["Instagram", "instagram", "https://www.instagram.com/abdul_rahim_aljouja"],
            ["Facebook", "facebook", "https://www.facebook.com/share/18b4fV69QH/"],
            ["TikTok", "tiktok", "https://www.tiktok.com/@abboudi_j"],
            ["X", "x", "https://x.com/aljoujaabdul"],
            ["LinkedIn", "linkedin", "https://www.linkedin.com/in/abdul-rahim-aljouja-90780728"],
          ].map(([name, icon, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>
              <span className="social-orb"><img src={icon === "linkedin" ? "/linkedin.svg" : `https://cdn.simpleicons.org/${icon}/ffffff`} alt="" /></span>
              <small>{name}</small>
            </a>
          ))}
        </div></div>
        <div className="footer-bottom"><span>© {year} Taj Insurance. {t.legal}.</span><div><a href="/privacy">{t.privacy}</a><a href="/admin">{t.admin}</a></div></div>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/16477071972?text=Hello%20Abdul%20Rahim%2C%20I%27d%20like%20an%20insurance%20quote." target="_blank" rel="noreferrer" aria-label={t.whatsapp}><span><img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" /></span><small>WhatsApp</small></a>
      <button className="bot-button" onClick={() => setBot(!bot)} aria-label="Open Taj assistant"><span>{bot ? "×" : "✦"}</span></button>
      {bot && <div className="bot-panel"><div className="bot-head"><Brand compact /><button onClick={() => setBot(false)}>×</button></div><div className="bot-message">{t.botHello}</div><p>{t.botPrompt}</p><div className="bot-options">{[t.options.auto, t.options.home, t.options.tenant, t.options.business].map((option) => <a key={option} href="#quote" onClick={() => { setBot(false); setStep(2); }}>{option}<span>→</span></a>)}</div><a className="bot-whatsapp" href="https://wa.me/16477071972" target="_blank" rel="noreferrer">{t.whatsapp}</a></div>}
    </main>
  );
}
