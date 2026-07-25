import { NextResponse } from "next/server";
import { env } from "cloudflare:workers";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  province?: string;
  city?: string;
  insurance?: string;
  preferredLanguage?: string;
  contactMethod?: string;
  contactTime?: string;
  currentlyInsured?: string;
  effectiveDate?: string;
  notes?: string;
  locale?: string;
  consent?: string;
  website?: string;
};

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json() as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const phone = clean(body.phone, 60);
  const province = clean(body.province, 80);
  const insurance = clean(body.insurance, 80);

  if (!name || !email || !phone || !province || !insurance || body.consent !== "yes") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        province TEXT NOT NULL,
        city TEXT,
        insurance TEXT NOT NULL,
        preferred_language TEXT,
        contact_method TEXT,
        contact_time TEXT,
        currently_insured TEXT,
        effective_date TEXT,
        notes TEXT,
        locale TEXT,
        status TEXT NOT NULL DEFAULT 'new'
      )
    `).run();

    await env.DB.prepare(`
      INSERT INTO leads (
        created_at, name, email, phone, province, city, insurance,
        preferred_language, contact_method, contact_time, currently_insured,
        effective_date, notes, locale, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).bind(
      new Date().toISOString(),
      name,
      email,
      phone,
      province,
      clean(body.city, 100),
      insurance,
      clean(body.preferredLanguage, 20),
      clean(body.contactMethod, 30),
      clean(body.contactTime, 30),
      clean(body.currentlyInsured, 10),
      clean(body.effectiveDate, 30),
      clean(body.notes, 2000),
      clean(body.locale, 10),
    ).run();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead storage failed", error);
    return NextResponse.json({ error: "Unable to save request" }, { status: 500 });
  }
}
