import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductDetailView } from "@/components/ProductDetailView";
import {
  getActiveItemByCategorySlug,
  getActiveItemIdsByCategorySlug,
} from "@/lib/catalog";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const ids = await getActiveItemIdsByCategorySlug("pecas");
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getActiveItemByCategorySlug("pecas", id);
  if (!result) {
    return { title: "Produto não encontrado | Unicer" };
  }

  const { item } = result;
  const description =
    item.summary ||
    item.description ||
    `${item.title} — peças de reposição Unicer.`;

  return {
    title: `${item.title} | Peças Unicer`,
    description,
    openGraph: {
      title: `${item.title} | Unicer`,
      description,
      locale: "pt_BR",
      type: "website",
      ...(item.images[0] ? { images: [{ url: item.images[0] }] } : {}),
    },
  };
}

export default async function PecaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getActiveItemByCategorySlug("pecas", id);
  if (!result) notFound();

  const { category, item } = result;

  return (
    <>
      <Header />
      <main>
        <ProductDetailView item={item} category={category} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
