import { readFile, writeFile } from "node:fs/promises";

const projectPath = "/Tajwebsitetest";
const sourceHtml = await readFile("/private/tmp/taj-page.html", "utf8");
const sourceCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const providerAssets = [
  ["Intact Insurance", "intact.jpg"], ["Aviva Canada", "aviva.png"], ["Definity Insurance", "definity.jpg"],
  ["Pembridge Insurance", "pembridge.png"], ["Pafco Insurance", "pafco.gif"], ["Economical Insurance", "economical.png"],
  ["Gore Mutual", "gore.jpg"], ["CAA Insurance", "caa.svg"], ["Coachman Insurance", "coachman.jpg"],
  ["Echelon Insurance", "echelon.png"], ["Jevco Insurance", "jevco.jpg"], ["Nordic Insurance", null],
  ["Wawanesa Insurance", "wawanesa.png"], ["Travelers Canada", "travelers.png"], ["SGI Canada", "sgi.jpg"],
  ["Unica", "unica.png"], ["MAX Insurance", "max.svg"], ["TuGo Insurance", "tugo.jpg"],
];
const providersGrid = providerAssets.map(([name, image]) =>
  `<div class="logo-card">${image
    ? `<img src="${projectPath}/public/insurers/${image}" alt="${name}"/>`
    : '<span class="wordmark wordmark--nordic">Nordic</span>'}</div>`,
).join("");
const providersDetails = `<details class="providers-all"><summary>View all insurance providers<span>＋</span></summary><div class="providers-all-grid">${providersGrid}</div></details>`;

const baseDocumentHtml = sourceHtml
  .split('<script id="_R_">')[0]
  .replace(/<link rel="preload"[^>]*\/>/g, "")
  .replace(/<link rel="stylesheet"[^>]*\/>/g, `<link rel="stylesheet" href="${projectPath}/styles.css?v=20260803-0305"/>`)
  .replace(/<script type="module">import \{ injectIntoGlobalHook \}[\s\S]*?<\/script>/g, "")
  .replace(/<script type="module" src="\/@vite\/client"><\/script>/g, "")
  .replace(/<script type="module" src="\/@id\/[^"]+"><\/script>/g, "")
  .replace(/<script>self\.__VINEXT[^<]*<\/script>/g, "")
  .replace(/<link rel="modulepreload"[^>]*>/g, "")
  .replaceAll('src="/design-assets/', `src="${projectPath}/public/design-assets/`)
  .replaceAll('src="/insurers/', `src="${projectPath}/public/insurers/`)
  .replaceAll('src="/social/', `src="${projectPath}/public/social/`)
  .replaceAll("service-auto.png", "service-auto-new.png")
  .replaceAll("service-home.png", "service-home-new.png")
  .replaceAll("service-business.png", "service-business-new.png")
  .replaceAll("service-travel.png", "service-travel-new.png")
  .replaceAll("Auto, Home, Business &amp; Travel Insurance", "Auto, Home, Commercial &amp; Travel Insurance")
  .replaceAll("Business Insurance", "Commercial Insurance")
  .replaceAll("<span>Business</span>", "<span>Commercial</span>")
  .replaceAll("Auto, home, business, and travel insurance options are available.", "Auto, home, commercial, and travel insurance options are available.")
  .replaceAll('<div class="service-art"><img', '<a class="service-art" href="#quote"><img')
  .replaceAll('alt=""/></div><h3>', 'alt=""/></a><h3>')
  .replace(/service-auto-new\.png(?:\?v=[^"]+)?"/g, 'service-auto-new.png?v=20260731-1245"')
  .replace(/service-home-new\.png(?:\?v=[^"]+)?"/g, 'service-home-new.png?v=20260731-1245"')
  .replace(/service-business-new\.png(?:\?v=[^"]+)?"/g, 'service-business-new.png?v=20260731-1245"')
  .replace(/service-travel-new\.png(?:\?v=[^"]+)?"/g, 'service-travel-new.png?v=20260731-1245"')
  .replaceAll("why-broker-emerald.png", "why-broker-combined-new.png")
  .replaceAll("why-broker-horizontal.png", "why-broker-combined-new.png")
  .replace(/why-broker-combined-new\.png(?:\?v=[^"]+)?"/g, 'why-broker-combined-new.png?v=20260731-1245"')
  .replaceAll("Insurance providers Abdul Rahim works with.", "Insurance providers")
  .replaceAll("Abdul Rahim can assist with auto, home, business, and travel insurance.", "Auto, home, commercial, and travel insurance options are available.")
  .replaceAll("Abdul Rahim serves eligible clients across the province of Ontario.", "Service is available to eligible clients across the province of Ontario.")
  .replace('</p></section><section class="section why"', `</p>${providersDetails}</section><section class="section why"`)
  .replaceAll('href="https://tajinsurance.com/favicon.svg"', `href="${projectPath}/public/favicon.svg"`)
  .replace('href="/privacy"', 'href="https://tajinsurance.com/privacy"')
  .replace('<button class="language-button">عربي</button>', `<a class="language-button" href="${projectPath}/ar.html">عربي</a>`)
  .replace(
    "</body></html>",
    `<script>
      document.querySelector('.menu-button')?.addEventListener('click', () => {
        document.querySelector('.nav')?.classList.toggle('nav--open');
      });
      document.querySelectorAll('.faq-item button').forEach((button) => {
        button.addEventListener('click', () => {
          const item = button.closest('.faq-item');
          const open = item.classList.toggle('faq-item--open');
          button.setAttribute('aria-expanded', String(open));
          const icon = button.querySelector('i');
          if (icon) icon.textContent = open ? '−' : '+';
          const answer = item.querySelector('.faq-answer');
          if (answer) answer.style.gridTemplateRows = open ? '1fr' : '0fr';
        });
      });
      document.querySelector('form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const subject = encodeURIComponent('Insurance quote request from ' + (data.get('name') || 'website visitor'));
        const body = encodeURIComponent(Array.from(data.entries()).map(([key, value]) => key + ': ' + value).join('\\n'));
        window.location.href = 'mailto:abdulrahimaljouja@gmail.com?subject=' + subject + '&body=' + body;
      });
      const copyright = document.querySelector('.footer-bottom span');
      if (copyright) copyright.textContent = copyright.textContent.replace(/20\\d{2}/, String(new Date().getFullYear()));
    </script></body></html>`,
  );

const documentHtml = baseDocumentHtml.includes("document.querySelectorAll('.faq-item button')")
  ? baseDocumentHtml
  : `${baseDocumentHtml}<script>
      document.querySelector('.menu-button')?.addEventListener('click', () => {
        document.querySelector('.nav')?.classList.toggle('nav--open');
      });
      document.querySelectorAll('.faq-item button').forEach((button) => {
        button.addEventListener('click', () => {
          const item = button.closest('.faq-item');
          const open = item.classList.toggle('faq-item--open');
          button.setAttribute('aria-expanded', String(open));
          const icon = button.querySelector('i');
          if (icon) icon.textContent = open ? '−' : '+';
          const answer = item.querySelector('.faq-answer');
          if (answer) answer.style.gridTemplateRows = open ? '1fr' : '0fr';
        });
      });
      document.querySelector('form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const subject = encodeURIComponent('Insurance quote request from ' + (data.get('name') || 'website visitor'));
        const body = encodeURIComponent(Array.from(data.entries()).map(([key, value]) => key + ': ' + value).join('\\n'));
        window.location.href = 'mailto:abdulrahimaljouja@gmail.com?subject=' + subject + '&body=' + body;
      });
      const copyright = document.querySelector('.footer-bottom span');
      if (copyright) copyright.textContent = copyright.textContent.replace(/20\\d{2}/, String(new Date().getFullYear()));
    </script>`;

const translations = [
  ["Home", "الرئيسية"],
  ["Services", "الخدمات"],
  ["Insurance Providers", "شركات التأمين"],
  ["FAQ", "الأسئلة"],
  ["Contact", "تواصل"],
  ["RIBO Licensed Insurance Broker", "وسيط تأمين مرخّص من RIBO"],
  ["Auto, Home, Commercial &amp; Travel Insurance", "تأمين سيارات ،منازل ،تجاري وسفر"],
  ["Get your free quote", "احصل على عرض مجاني"],
  ["Auto Insurance", "تأمين السيارات"],
  ["Home Insurance", "تأمين المنازل"],
  ["Commercial Insurance", "التأمين التجاري"],
  ["Travel Insurance", "تأمين السفر"],
  ["Insurance providers", "شركات التأمين"],
  ["Provider availability and eligibility vary by product and underwriting requirements.", "تختلف أهلية وتوفر الشركات حسب نوع التأمين وشروط القبول."],
  ["View all insurance providers", "عرض جميع شركات التأمين"],
  ["Why work with a broker?", "لماذا تتعامل مع وسيط؟"],
  ["Advice that puts you first.", "نصيحة تضع مصلحتك أولاً."],
  ["More options", "خيارات أكثر"],
  ["Compare suitable coverage from a broad network of insurance providers.", "مقارنة التغطيات المناسبة من شبكة واسعة من شركات التأمين."],
  ["Personal guidance", "إرشاد شخصي"],
  ["Understand your options clearly before making a decision.", "افهم خياراتك بوضوح قبل اتخاذ القرار."],
  ["Direct support", "تواصل مباشر"],
  ["Speak with Abdul Rahim—not an anonymous call centre.", "تحدث مع عبد الرحيم مباشرة، وليس مع مركز اتصال مجهول."],
  ["Efficient service", "خدمة فعالة"],
  ["A simple process designed to respect your time.", "إجراءات بسيطة مصممة لاحترام وقتك."],
  ["Helpful answers", "إجابات مفيدة"],
  ["Insurance can be simple.", "التأمين يمكن أن يكون بسيطاً."],
  ["Why should I work with an insurance broker?", "لماذا أتعامل مع وسيط تأمين؟"],
  ["A broker helps you compare suitable options, understand coverage details, and make an informed choice based on your needs.", "يساعدك الوسيط على مقارنة الخيارات المناسبة وفهم تفاصيل التغطية واتخاذ قرار مدروس حسب احتياجاتك."],
  ["What types of insurance are available?", "ما أنواع التأمين المتوفرة؟"],
  ["Auto, home, commercial, and travel insurance options are available.", "تتوفر خيارات تأمين السيارات والمنازل والتأمين التجاري والسفر."],
  ["Which area do you serve?", "ما منطقة الخدمة؟"],
  ["Service is available to eligible clients across the province of Ontario.", "الخدمة متاحة للعملاء المؤهلين في جميع أنحاء مقاطعة أونتاريو."],
  ["Can I receive service in Arabic?", "هل الخدمة متوفرة بالعربية؟"],
  ["Yes. Personal support and the quote form are available in English and Arabic.", "نعم، الدعم الشخصي ونموذج طلب العرض متوفران بالعربية والإنجليزية."],
  ["Is requesting a quote free?", "هل طلب العرض مجاني؟"],
  ["Yes. A quote request is free and comes with no obligation.", "نعم، طلب عرض السعر مجاني ومن دون أي التزام."],
  ["Free, no-obligation quote", "عرض مجاني ومن دون التزام"],
  ["Let’s find the coverage that fits.", "لنبحث عن التغطية التي تناسبك."],
  ["Share a few details and Abdul Rahim will contact you personally.", "أرسل معلومات بسيطة وسيتواصل معك عبد الرحيم شخصياً."],
  ["Insurance needed", "التأمين المطلوب"],
  ["Full name", "الاسم الكامل"],
  ["Email address", "البريد الإلكتروني"],
  ["Phone number", "رقم الهاتف"],
  ["City", "المدينة"],
  ["Preferred contact method", "طريقة التواصل المفضلة"],
  ["Best time to reach you", "أفضل وقت للتواصل"],
  ["Tell us briefly what you need", "اشرح لنا باختصار ما تحتاجه"],
  ["Phone call", "مكالمة"],
  ["Morning", "صباحاً"],
  ["Afternoon", "بعد الظهر"],
  ["Evening", "مساءً"],
  ["I consent to being contacted about this insurance request and agree to the privacy policy.", "أوافق على التواصل معي بخصوص طلب التأمين وعلى سياسة الخصوصية."],
  ["Private &amp; no obligation", "خصوصية ومن دون التزام"],
  ["Send my request", "إرسال الطلب"],
  ["<span>Auto</span>", "<span>سيارات</span>"],
  ["<span>Home</span>", "<span>منازل</span>"],
  ["<span>Commercial</span>", "<span>تجاري</span>"],
  ["<span>Travel</span>", "<span>سفر</span>"],
  ["<span>Multiple</span>", "<span>أكثر من نوع</span>"],
  ["Personal insurance guidance from a RIBO licensed broker serving Ontario.", "إرشاد تأميني شخصي من وسيط مرخّص من RIBO يخدم أونتاريو."],
  ["Privacy", "الخصوصية"],
];

let arabicHtml = documentHtml
  .replace('<html lang="en">', '<html lang="ar">')
  .replace('<main class="site" dir="ltr" lang="en">', '<main class="site" dir="rtl" lang="ar">')
  .replace(`<a class="language-button" href="${projectPath}/ar.html">عربي</a>`, `<a class="language-button" href="${projectPath}/">EN</a>`)
  .replace("<title>Abdul Rahim Al Jouja | RIBO Licensed Insurance Broker</title>", "<title>عبد الرحيم الجوجة | وسيط تأمين مرخّص من RIBO</title>");

for (const [english, arabic] of translations.sort((a, b) => b[0].length - a[0].length)) {
  arabicHtml = arabicHtml.replaceAll(english, arabic);
}

const pagesCss = sourceCss
  .replace('@import "tailwindcss";', "")
  .replace(
    'url("https://fonts.googleapis.com',
    'url("https://fonts.googleapis.com',
  );

await writeFile(new URL("../index.html", import.meta.url), documentHtml);
await writeFile(new URL("../ar.html", import.meta.url), arabicHtml);
await writeFile(new URL("../styles.css", import.meta.url), pagesCss);
await writeFile(new URL("../.nojekyll", import.meta.url), "");
