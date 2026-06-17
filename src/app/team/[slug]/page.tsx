import { team } from "@/data/team";
import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/team/ProfilePageClient";

export function generateStaticParams() {
  return team.filter((m) => m.hasPage).map((m) => ({ slug: m.slug }));
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug && m.hasPage);
  if (!member) notFound();
  return <ProfilePageClient />;
}
