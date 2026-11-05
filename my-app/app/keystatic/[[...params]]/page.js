import { notFound } from "next/navigation";
import { keystaticReady } from "@/lib/keystatic-ready";
import KeystaticApp from "../keystatic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ params: [] }];
}

export default function Page() {
  if (!keystaticReady) notFound();
  return <KeystaticApp />;
}
