import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("homepage uses the approved broker-first Ontario content", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);

  assert.match(page, /ABDUL RAHIM AL JOUJA/);
  assert.match(page, /عبد الرحيم الجوجة/);
  assert.match(page, /Serving clients across Ontario/);
  assert.match(page, /Auto, Home, Commercial & Travel Insurance/);
  assert.match(page, /const insurers = \[/);
  assert.match(page, /\[\.\.\.insurers, \.\.\.insurers\]/);
  assert.doesNotMatch(page, /Taj Insurance|Canada-wide|Serving clients across Canada/);
  assert.doesNotMatch(layout, /Taj Insurance|serving clients across Canada/i);
});

test("all requested insurer brands and downloaded logo assets are present", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const names = [
    "Intact Insurance", "Aviva Canada", "Definity Insurance", "Pembridge Insurance",
    "Pafco Insurance", "Economical Insurance", "Gore Mutual", "CAA Insurance",
    "Coachman Insurance", "Echelon Insurance", "Jevco Insurance", "Nordic Insurance",
    "Wawanesa Insurance", "Travelers Canada", "SGI Canada", "Unica",
    "MAX Insurance", "TuGo Insurance",
  ];
  for (const name of names) assert.match(page, new RegExp(name));

  const assets = [
    "intact.jpg", "aviva.png", "economical.png", "travelers.png", "wawanesa.png",
    "pembridge.png", "sgi.jpg", "gore.jpg", "unica.png", "pafco.gif",
    "jevco.jpg", "coachman.jpg", "echelon.png", "tugo.jpg", "caa.svg", "max.svg",
    "definity.jpg",
  ];
  await Promise.all(assets.map((file) => access(new URL(`public/insurers/${file}`, root))));
});
