import { env } from "cloudflare:workers";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";

export const dynamic = "force-dynamic";

type Lead = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  province: string;
  insurance: string;
  contact_method: string | null;
  notes: string | null;
  status: string;
};

async function LeadsTable() {
  const user = await requireChatGPTUser("/admin");
  const allowedEmail = "abdulrahimaljouja@gmail.com";

  if (user.email.toLowerCase() !== allowedEmail) {
    return (
      <div className="admin-empty">
        <h1>Access not authorized</h1>
        <p>This dashboard is reserved for the Taj Insurance administrator.</p>
        <a href={chatGPTSignOutPath("/")}>Sign out</a>
      </div>
    );
  }

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

  const result = await env.DB.prepare(
    "SELECT id, created_at, name, email, phone, province, insurance, contact_method, notes, status FROM leads ORDER BY id DESC LIMIT 250"
  ).all<Lead>();
  const leads = result.results ?? [];

  return (
    <>
      <header className="admin-header">
        <div><span className="kicker">Taj Insurance</span><h1>Client requests</h1><p>{leads.length} recent lead{leads.length === 1 ? "" : "s"}</p></div>
        <div><span>{user.displayName}</span><a href={chatGPTSignOutPath("/")}>Sign out</a></div>
      </header>
      {leads.length === 0 ? (
        <div className="admin-empty"><h2>No requests yet</h2><p>New quote requests will appear here automatically.</p></div>
      ) : (
        <div className="lead-list">
          {leads.map((lead) => (
            <article className="lead-card" key={lead.id}>
              <div className="lead-card-top"><span className="lead-status">{lead.status}</span><time>{new Date(lead.created_at).toLocaleString("en-CA")}</time></div>
              <h2>{lead.name}</h2>
              <strong>{lead.insurance} · {lead.province}</strong>
              <div className="lead-links"><a href={`tel:${lead.phone}`}>{lead.phone}</a><a href={`mailto:${lead.email}`}>{lead.email}</a></div>
              {lead.contact_method && <p>Preferred contact: {lead.contact_method}</p>}
              {lead.notes && <blockquote>{lead.notes}</blockquote>}
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default function AdminPage() {
  return <main className="admin-page"><LeadsTable /></main>;
}
