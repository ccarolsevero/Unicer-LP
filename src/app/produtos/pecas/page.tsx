import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductCategoryListing } from "@/components/ProductCategoryListing";
import { getActiveCategoryBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Peças de reposição | Unicer",
  description:
    "Peças de reposição para a indústria cerâmica: cilindros, eixos, engrenagens, revestimentos e muito mais. Unicer — Leme, SP.",
  openGraph: {
    title: "Peças de reposição | Unicer",
    description:
      "Catálogo de peças de reposição para equipamentos Bonfanti, Morando, Verdés e outras marcas.",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function PecasPage() {
  const category = await getActiveCategoryBySlug("pecas");
  if (!category) notFound();

  return (
    <>
      <Header />
      <main>
        <ProductCategoryListing category={category} eyebrow="Peças" />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
