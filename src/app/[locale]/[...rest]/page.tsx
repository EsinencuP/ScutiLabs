import { notFound } from "next/navigation";

export const metadata = { robots: { index: false, follow: true } };

/** Any unknown path under a language prefix renders the localized 404 page. */
export default function CatchAll() {
  notFound();
}
