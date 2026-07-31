"use client";

import { FormEvent, useState } from "react";

type Language = "en" | "ar";

const insurers = [
  ["Intact Insurance", "/insurers/intact.jpg"],
  ["Aviva Canada", "/insurers/aviva.png"],
  ["Definity Insurance", "/insurers/definity.jpg"],
  ["Pembridge Insurance", "/insurers/pembridge.png"],
  ["Pafco Insurance", "/insurers/pafco.gif"],
  ["Economical Insurance", "/insurers/economical.png"],
  ["Gore Mutual", "/insurers/gore.jpg"],
  ["CAA Insurance", "/insurers/caa.svg"],
  ["Coachman Insurance", "/insurers/coachman.jpg"],
  ["Echelon Insurance", "/insurers/echelon.png"],
  ["Jevco Insurance", "/insurers/jevco.jpg"],
  ["Nordic Insurance", null],
  ["Wawanesa Insurance", "/insurers/wawanesa.png"],
  ["Travelers Canada", "/insurers/travelers.png"],
  ["SGI Canada", "/insurers/sgi.jpg"],
  ["Unica", "/insurers/unica.png"],
  ["MAX Insurance", "/insurers/max.svg"],
  ["TuGo Insurance", "/insurers/tugo.jpg"],
] as const;

const copy = {
  en: {
    nav: ["Home", "Services", "Insurance Providers", "FAQ", "Contact"],
    quote: "Get your free quote",
    arabicName: "عبد الرحيم الجوجة",
    name: "ABDUL RAHIM AL JOUJA",
    title: "RIBO Licensed Insurance Broker",
    serviceLine: "Auto, Home, Commercial & Travel Insurance",
    heroIntro: "Clear advice, personal service, and access to trusted insurance providers—right here in Ontario.",
    ontario: "Serving clients across Ontario",
    servicesKicker: "Insurance for what matters",
    servicesTitle: "Protection designed around your life.",
    servicesIntro: "Straightforward guidance and coverage options for individuals, families, homeowners, travellers, and businesses.",
    services: [
      ["Auto Insurance", "Coverage matched to your vehicle, driving needs, and budget.", "🚗"],
      ["Home Insurance", "Thoughtful protection for your home and the things you value.", "⌂"],
      ["Commercial Insurance", "Flexible coverage built around your commercial needs.", "▣"],
      ["Travel Insurance", "Travel with confidence knowing support is there when it matters.", "✈"],
    ],
    providersKicker: "More choice, one trusted advisor",
    providersTitle: "Insurance providers",
    providersNote: "Provider availability and eligibility vary by product and underwriting requirements.",
    providersAll: "View all insurance providers",
    whyKicker: "Why work with a broker?",
    whyTitle: "Advice that puts you first.",
    benefits: [
      ["More options", "Compare suitable coverage from a broad network of insurance providers."],
      ["Personal guidance", "Understand your options clearly before making a decision."],
      ["Direct support", "Speak with Abdul Rahim—not an anonymous call centre."],
      ["Efficient service", "A simple process designed to respect your time."],
    ],
    aboutKicker: "Your insurance broker",
    aboutTitle: "A personal relationship, not just a policy.",
    aboutText: "Abdul Rahim Al Jouja is a RIBO licensed insurance broker serving clients across Ontario in English and Arabic. He is committed to clear advice, responsive service, and helping every client choose coverage with confidence.",
    licensed: "RIBO Licensed",
    bilingual: "English & Arabic",
    location: "Ontario",
    faqKicker: "Helpful answers",
    faqTitle: "Insurance can be simple.",
    faqs: [
      ["Why should I work with an insurance broker?", "A broker helps you compare suitable options, understand coverage details, and make an informed choice based on your needs."],
      ["What types of insurance are available?", "Auto, home, commercial, and travel insurance options are available."],
      ["Which area do you serve?", "Service is available to eligible clients across the province of Ontario."],
      ["Can I receive service in Arabic?", "Yes. Personal support and the quote form are available in English and Arabic."],
      ["Is requesting a quote free?", "Yes. A quote request is free and comes with no obligation."],
    ],
    formKicker: "Free, no-obligation quote",
    formTitle: "Let’s find the coverage that fits.",
    formIntro: "Share a few details and Abdul Rahim will contact you personally.",
    fields: {
      insurance: "Insurance needed",
      name: "Full name",
      email: "Email address",
      phone: "Phone number",
      city: "City",
      contact: "Preferred contact method",
      time: "Best time to reach you",
      notes: "Tell us briefly what you need",
      consent: "I consent to being contacted about this insurance request and agree to the privacy policy.",
    },
    options: {
      auto: "Auto", home: "Home", business: "Commercial", travel: "Travel", multiple: "Multiple",
      whatsapp: "WhatsApp", phone: "Phone call", email: "Email",
      morning: "Morning", afternoon: "Afternoon", evening: "Evening",
    },
    submit: "Send my request",
    submitting: "Sending…",
    sentTitle: "Your request is on its way.",
    sentText: "Thank you. Abdul Rahim will contact you using your preferred method.",
    secure: "Private & no obligation",
    footer: "Personal insurance guidance from a RIBO licensed broker serving Ontario.",
    privacy: "Privacy",
    whatsapp: "Chat with Abdul Rahim on WhatsApp",
  },
  ar: {
    nav: ["الرئيسية", "الخدمات", "شركات التأمين", "الأسئلة", "تواصل"],
    quote: "احصل على عرض مجاني",
    arabicName: "عبد الرحيم الجوجة",
    name: "ABDUL RAHIM AL JOUJA",
    title: "وسيط تأمين مرخّص من RIBO",
    serviceLine: "تأمين سيارات ،منازل ،تجاري وسفر",
    heroIntro: "نصيحة واضحة، خدمة شخصية، وخيارات من شركات تأمين موثوقة في مقاطعة أونتاريو.",
    ontario: "نخدم العملاء في جميع أنحاء أونتاريو",
    servicesKicker: "تأمين لما يهمك",
    servicesTitle: "حماية مصممة لتناسب حياتك.",
    servicesIntro: "إرشاد واضح وخيارات تأمين للأفراد والعائلات وأصحاب المنازل والمسافرين والأعمال.",
    services: [
      ["تأمين السيارات", "تغطية تناسب سيارتك واحتياجات قيادتك وميزانيتك.", "🚗"],
      ["تأمين المنازل", "حماية مدروسة لمنزلك وكل ما يهمك داخله.", "⌂"],
      ["التأمين التجاري", "تغطية مرنة مصممة حسب احتياجات نشاطك التجاري.", "▣"],
      ["تأمين السفر", "سافر بثقة مع حماية ودعم عندما تحتاج إليهما.", "✈"],
    ],
    providersKicker: "خيارات أكثر مع مستشار موثوق",
    providersTitle: "شركات التأمين",
    providersNote: "تختلف أهلية وتوفر الشركات حسب نوع التأمين وشروط القبول.",
    providersAll: "عرض جميع شركات التأمين",
    whyKicker: "لماذا تتعامل مع وسيط؟",
    whyTitle: "نصيحة تضع مصلحتك أولاً.",
    benefits: [
      ["خيارات أكثر", "مقارنة التغطيات المناسبة من شبكة واسعة من شركات التأمين."],
      ["إرشاد شخصي", "افهم خياراتك بوضوح قبل اتخاذ القرار."],
      ["تواصل مباشر", "تحدث مع عبد الرحيم مباشرة، وليس مع مركز اتصال مجهول."],
      ["خدمة فعالة", "إجراءات بسيطة مصممة لاحترام وقتك."],
    ],
    aboutKicker: "وسيط التأمين الخاص بك",
    aboutTitle: "علاقة شخصية، وليست مجرد وثيقة.",
    aboutText: "عبد الرحيم الجوجة وسيط تأمين مرخّص من RIBO، يخدم العملاء في جميع أنحاء أونتاريو بالعربية والإنجليزية، ويلتزم بالنصيحة الواضحة وسرعة الاستجابة ومساعدة كل عميل على اختيار التغطية بثقة.",
    licensed: "مرخّص من RIBO",
    bilingual: "العربية والإنجليزية",
    location: "أونتاريو",
    faqKicker: "إجابات مفيدة",
    faqTitle: "التأمين يمكن أن يكون بسيطاً.",
    faqs: [
      ["لماذا أتعامل مع وسيط تأمين؟", "يساعدك الوسيط على مقارنة الخيارات المناسبة وفهم تفاصيل التغطية واتخاذ قرار مدروس حسب احتياجاتك."],
      ["ما أنواع التأمين المتوفرة؟", "تتوفر خيارات تأمين السيارات والمنازل والتأمين التجاري والسفر."],
      ["ما منطقة الخدمة؟", "الخدمة متاحة للعملاء المؤهلين في جميع أنحاء مقاطعة أونتاريو."],
      ["هل الخدمة متوفرة بالعربية؟", "نعم، الدعم الشخصي ونموذج طلب العرض متوفران بالعربية والإنجليزية."],
      ["هل طلب العرض مجاني؟", "نعم، طلب عرض السعر مجاني ومن دون أي التزام."],
    ],
    formKicker: "عرض مجاني ومن دون التزام",
    formTitle: "لنبحث عن التغطية التي تناسبك.",
    formIntro: "أرسل معلومات بسيطة وسيتواصل معك عبد الرحيم شخصياً.",
    fields: {
      insurance: "التأمين المطلوب",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      city: "المدينة",
      contact: "طريقة التواصل المفضلة",
      time: "أفضل وقت للتواصل",
      notes: "اشرح لنا باختصار ما تحتاجه",
      consent: "أوافق على التواصل معي بخصوص طلب التأمين وعلى سياسة الخصوصية.",
    },
    options: {
      auto: "سيارات", home: "منازل", business: "تجاري", travel: "سفر", multiple: "أكثر من نوع",
      whatsapp: "واتساب", phone: "مكالمة", email: "بريد إلكتروني",
      morning: "صباحاً", afternoon: "بعد الظهر", evening: "مساءً",
    },
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    sentTitle: "تم استلام طلبك.",
    sentText: "شكراً لك. سيتواصل معك عبد الرحيم بالطريقة التي اخترتها.",
    secure: "خصوصية ومن دون التزام",
    footer: "إرشاد تأميني شخصي من وسيط مرخّص من RIBO يخدم أونتاريو.",
    privacy: "الخصوصية",
    whatsapp: "تواصل مع عبد الرحيم عبر واتساب",
  },
};

function BrokerMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`broker-mark ${compact ? "broker-mark--compact" : ""}`}>
      <span className="broker-shield" aria-hidden="true">✓</span>
      <span><strong>ABDUL RAHIM AL JOUJA</strong><small>RIBO Licensed Insurance Broker</small></span>
    </span>
  );
}

function MobilePhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 5.5h5M11 18.5h2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = copy[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const year = new Date().getFullYear();
  const carousel = [...insurers, ...insurers];

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, province: "Ontario", locale: lang }),
      });
      if (!response.ok) throw new Error("Unable to submit");
      setSent(true);
    } catch {
      const subject = encodeURIComponent(`Insurance quote request — ${String(data.insurance || "")}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nInsurance: ${data.insurance}\nCity: ${data.city || ""}\nProvince: Ontario\nNotes: ${data.notes || ""}`,
      );
      window.location.href = `mailto:abdulrahimaljouja@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="site" dir={dir} lang={lang}>
      <header className="header">
        <a className="logo-link" href="#top"><BrokerMark compact /></a>
        <nav className={`nav ${menu ? "nav--open" : ""}`} aria-label="Primary navigation">
          {t.nav.map((item, index) => (
            <a key={item} href={["#top", "#services", "#providers", "#faq", "#quote"][index]} onClick={() => setMenu(false)}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="language-button" onClick={() => { setLang(lang === "en" ? "ar" : "en"); setMenu(false); }}>{lang === "en" ? "عربي" : "EN"}</button>
          <a className="header-phone" href="tel:+16477071972"><span><MobilePhoneIcon /></span>+1 (647) 707-1972</a>
          <button className="menu-button" aria-label="Open menu" onClick={() => setMenu(!menu)}><span /><span /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="hero-arabic" lang="ar">{t.arabicName}</p>
          <h1>{t.name}</h1>
          <h2>{t.title}</h2>
          <a className="hero-phone" href="tel:+16477071972"><span><MobilePhoneIcon /></span>+1 (647) 707-1972</a>
          <p className="service-line">{t.serviceLine}</p>
          <p className="hero-intro">{t.heroIntro}</p>
          <div className="hero-actions">
            <a className="button" href="#quote">{t.quote}<span>↗</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Abdul Rahim Al Jouja">
          <img className="approved-hero-image" src="/design-assets/hero-approved.png" alt="Abdul Rahim Al Jouja, RIBO licensed insurance broker" />
        </div>
      </section>

      <section className="section services" id="services">
        <div className="service-grid">
          {t.services.map(([title, description], index) => (
            <article className="service-card" key={title}>
              <a className="service-art" href="#quote" aria-label={`${title} — ${t.quote}`}><img src={`/design-assets/service-${["auto", "home", "business", "travel"][index]}-new.png`} alt="" /></a>
              <h3>{title}</h3>
              <a href="#quote">{t.quote}<span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="providers" id="providers">
        <div className="providers-heading">
          <span className="kicker">{t.providersKicker}</span>
          <h2>{t.providersTitle}</h2>
        </div>
        <div className="logo-marquee" aria-label="Insurance providers">
          <div className="logo-track">
            {carousel.map(([name, image], index) => (
              <div className="logo-card" key={`${name}-${index}`} aria-hidden={index >= insurers.length}>
                {image ? <img src={image} alt={index < insurers.length ? name : ""} /> : <span className={`wordmark wordmark--${name.split(" ")[0].toLowerCase()}`}>{name.replace(" Insurance", "")}</span>}
              </div>
            ))}
          </div>
        </div>
        <p className="providers-note">{t.providersNote}</p>
        <details className="providers-all">
          <summary>{t.providersAll}<span>＋</span></summary>
          <div className="providers-all-grid">
            {insurers.map(([name, image]) => (
              <div className="logo-card" key={`all-${name}`}>
                {image ? <img src={image} alt={name} /> : <span className="wordmark wordmark--nordic">Nordic</span>}
              </div>
            ))}
          </div>
        </details>
      </section>

      <section className="section why" id="why">
        <div className="why-visual">
          <img src="/design-assets/why-broker-combined-new.png" alt={lang === "en" ? "Auto, home, commercial and travel insurance options guided toward the right protection" : "خيارات تأمين السيارات والمنازل والتأمين التجاري والسفر موجهة نحو الحماية المناسبة"} />
        </div>
        <div className="why-copy">
          <span className="kicker">{t.whyKicker}</span>
          <h2>{t.whyTitle}</h2>
          <div className="benefit-list">
            {t.benefits.map(([title, description]) => (
              <article key={title}><span>✓</span><div><h3>{title}</h3><p>{description}</p></div></article>
            ))}
          </div>
          <a className="button" href="#quote">{t.quote}<span>↗</span></a>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="faq-heading"><span className="kicker">{t.faqKicker}</span><h2>{t.faqTitle}</h2></div>
        <div className="faq-list">
          {t.faqs.map(([question, answer], index) => (
            <article className={`faq-item ${faq === index ? "faq-item--open" : ""}`} key={question}>
              <button onClick={() => setFaq(faq === index ? null : index)} aria-expanded={faq === index}><span>{question}</span><i>{faq === index ? "−" : "+"}</i></button>
              <div className="faq-answer"><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="quote-intro">
          <span className="kicker">{t.formKicker}</span>
          <h2>{t.formTitle}</h2>
          <p>{t.formIntro}</p>
          <div className="quote-contact"><a href="tel:+16477071972">+1 (647) 707-1972</a><a href="mailto:abdulrahimaljouja@gmail.com">abdulrahimaljouja@gmail.com</a></div>
        </div>
        <div className="form-card">
          {sent ? (
            <div className="success-state"><span>✓</span><h3>{t.sentTitle}</h3><p>{t.sentText}</p></div>
          ) : (
            <form onSubmit={submitLead}>
              <fieldset>
                <legend>{t.fields.insurance} *</legend>
                <div className="service-choices">
                  {(["auto", "home", "business", "travel", "multiple"] as const).map((key) => (
                    <label key={key}><input type="radio" name="insurance" value={key} required /><span>{t.options[key]}</span></label>
                  ))}
                </div>
              </fieldset>
              <div className="form-grid">
                <label className="field field--wide"><span>{t.fields.name} *</span><input name="name" required autoComplete="name" /></label>
                <label className="field"><span>{t.fields.email} *</span><input name="email" type="email" required autoComplete="email" /></label>
                <label className="field"><span>{t.fields.phone} *</span><input name="phone" type="tel" required autoComplete="tel" /></label>
                <label className="field"><span>{t.fields.city}</span><input name="city" autoComplete="address-level2" /></label>
                <label className="field"><span>{t.fields.contact}</span><select name="contactMethod" defaultValue="whatsapp"><option value="whatsapp">{t.options.whatsapp}</option><option value="phone">{t.options.phone}</option><option value="email">{t.options.email}</option></select></label>
                <label className="field"><span>{t.fields.time}</span><select name="contactTime" defaultValue="afternoon"><option value="morning">{t.options.morning}</option><option value="afternoon">{t.options.afternoon}</option><option value="evening">{t.options.evening}</option></select></label>
                <label className="field field--wide"><span>{t.fields.notes}</span><textarea name="notes" rows={4} /></label>
              </div>
              <input type="hidden" name="province" value="Ontario" />
              <input type="hidden" name="preferredLanguage" value={lang} />
              <label className="checkbox"><input name="consent" type="checkbox" value="yes" required /><span>{t.fields.consent} *</span></label>
              <div className="form-submit"><span>✓ {t.secure}</span><button className="button" disabled={submitting}>{submitting ? t.submitting : t.submit}<b>↗</b></button></div>
            </form>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-main">
          <div><BrokerMark /><p>{t.footer}</p></div>
          <div className="footer-socials" aria-label="Social media">
            {[
              ["Instagram", "instagram", "https://www.instagram.com/abdul_rahim_aljouja"],
              ["Facebook", "facebook", "https://www.facebook.com/share/18b4fV69QH/"],
              ["TikTok", "tiktok", "https://www.tiktok.com/@abboudi_j"],
              ["X", "x", "https://x.com/aljoujaabdul"],
              ["LinkedIn", "linkedin", "https://www.linkedin.com/in/abdul-rahim-aljouja-90780728"],
            ].map(([name, icon, href]) => <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}><span className={`social-3d social-3d--${icon}`}><img src={`/social/${icon}.svg`} alt="" /></span><small>{name}</small></a>)}
          </div>
        </div>
        <div className="footer-bottom"><span>© {year} Abdul Rahim Al Jouja. {t.title}.</span><a href="/privacy">{t.privacy}</a></div>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/16477071972?text=Hello%20Abdul%20Rahim%2C%20I%27d%20like%20an%20insurance%20quote." target="_blank" rel="noreferrer" aria-label={t.whatsapp}><span><img src="/social/whatsapp.svg" alt="" /></span><small>WhatsApp</small></a>
    </main>
  );
}
