import { z } from "zod";

export const enquiryTypes = [
  "New sourcing project",
  "Manufacturing and tooling",
  "Prototyping",
  "Quality control",
  "Supply chain management",
  "Existing order or support",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  enquiry_type: z.enum(enquiryTypes).optional(),
  message: z.string().trim().min(1, "Please tell us about your project.").max(5000),
  consent: z.literal(true, { message: "Please confirm we can store your details." }),
  /**
   * Honeypot: real people leave this empty. It is accepted rather than
   * rejected here so the route can answer a bot with a plausible success
   * instead of telling it which field gave it away.
   */
  website: z.string().max(2000).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;
