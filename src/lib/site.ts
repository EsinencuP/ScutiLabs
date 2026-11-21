/**
 * Public contact channels. Set them in the environment (see .env.example);
 * when a value is empty, the site simply doesn't show that channel.
 */
export const contacts = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null,
  telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM?.trim().replace(/^@/, "") || null,
};

export const hasContacts = Boolean(contacts.email || contacts.telegram);
