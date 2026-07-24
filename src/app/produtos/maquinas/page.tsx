import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductCategoryListing } from "@/components/ProductCategoryListing";
import { getActiveCategoryBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Máquinas e equipamentos | Unicer",
  description:
    "Máquinas e equipamentos para a indústria cerâmica: marombas, laminadores, bombas de vácuo e mais. Unicer — Leme, SP.",
  openGraph: {
    title: "Máquinas e equipamentos | Unicer",
    description:
      "Catálogo de máquinas e equipamentos novos e reformados para cerâmica.",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function MaquinasPage() {
  const category = await getActiveCategoryBySlug("maquinas");
  if (!category) notFound();

  return (
    <>
      <Header />
      <main>
        <ProductCategoryListing category={category} eyebrow="Máquinas" />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
