import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  province: text("province").notNull(),
  city: text("city"),
  insurance: text("insurance").notNull(),
  preferredLanguage: text("preferred_language"),
  contactMethod: text("contact_method"),
  contactTime: text("contact_time"),
  currentlyInsured: text("currently_insured"),
  effectiveDate: text("effective_date"),
  notes: text("notes"),
  locale: text("locale"),
  status: text("status").notNull().default("new"),
});
