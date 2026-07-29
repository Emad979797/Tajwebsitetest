import { readFile, writeFile } from "node:fs/promises";

const projectPath = "/Tajwebsitetest";
const sourceHtml = await readFile("/private/tmp/taj-page.html", "utf8");
const sourceCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

const documentHtml = sourceHtml
  .split('<script id="_R_">')[0]
  .replace(/<link rel="preload"[^>]*\/>/g, "")
  .replace(/<link rel="stylesheet"[^>]*\/>/g, `<link rel="stylesheet" href="${projectPath}/styles.css"/>`)
  .replace(/<script>self\.__VINEXT[^<]*<\/script>/g, "")
  .replace(/<link rel="modulepreload"[^>]*>/g, "")
  .replaceAll('src="/design-assets/', `src="${projectPath}/public/design-assets/`)
  .replaceAll('src="/insurers/', `src="${projectPath}/public/insurers/`)
  .replaceAll('src="/social/', `src="${projectPath}/public/social/`)
  .replaceAll('href="https://tajinsurance.com/favicon.svg"', `href="${projectPath}/public/favicon.svg"`)
  .replace('href="/privacy"', 'href="https://tajinsurance.com/privacy"')
  .replace(
    "</body></html>",
    `<script>
      document.querySelectorAll('.faq-item button').forEach((button) => {
        button.addEventListener('click', () => {
          const item = button.closest('.faq-item');
          const open = item.classList.toggle('faq-item--open');
          button.setAttribute('aria-expanded', String(open));
          const icon = button.querySelector('i');
          if (icon) icon.textContent = open ? '−' : '+';
        });
      });
      document.querySelector('form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const subject = encodeURIComponent('Insurance quote request from ' + (data.get('name') || 'website visitor'));
        const body = encodeURIComponent(Array.from(data.entries()).map(([key, value]) => key + ': ' + value).join('\\n'));
        window.location.href = 'mailto:abdulrahimaljouja@gmail.com?subject=' + subject + '&body=' + body;
      });
    </script></body></html>`,
  );

const pagesCss = sourceCss
  .replace('@import "tailwindcss";', "")
  .replace(
    'url("https://fonts.googleapis.com',
    'url("https://fonts.googleapis.com',
  );

await writeFile(new URL("../index.html", import.meta.url), documentHtml);
await writeFile(new URL("../styles.css", import.meta.url), pagesCss);
await writeFile(new URL("../.nojekyll", import.meta.url), "");
