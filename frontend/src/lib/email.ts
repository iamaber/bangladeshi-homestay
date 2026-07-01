import { contact } from "@/lib/contact";

export const contactEmail = contact.email;

type EmailField = {
  label: string;
  value: FormDataEntryValue | null;
};

export function createMailtoUrl(subject: string, fields: EmailField[]) {
  const body = fields
    .filter(({ value }) => value !== null && String(value).trim() !== "")
    .map(({ label, value }) => `${label}: ${String(value).trim()}`)
    .join("\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
