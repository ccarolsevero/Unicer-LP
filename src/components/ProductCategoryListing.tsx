import Image from "next/image";
import Link from "next/link";
import {
  Cog,
  CircleDot,
  Minus,
  Disc3,
  Wrench,
  Layers,
  Factory,
  Images,
  type LucideIcon,
} from "lucide-react";
import type { CategoryWithItems, ItemIcon } from "@/types/catalog";
import { WHATSAPP_QUOTE_URL } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const ICONS: Record<ItemIcon, LucideIcon> = {
  cylinder: Minus,
  gear: Cog,
  axis: CircleDot,
  wheel: Disc3,
  custom: Wrench,
  brands: Layers,
};

interface ProductCategoryListingProps {
  category: CategoryWithItems;
  eyebrow?: string;
}

export function ProductCategoryListing({
  category,
  eyebrow = "Catálogo",
}: ProductCategoryListingProps) {
  return (
    <section className="relative bg-muted pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
            {eyebrow}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-unicer-blue sm:text-4xl lg:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 text-lg text-unicer-blue/70">{category.description}</p>
          <p className="mt-2 text-sm text-unicer-blue/50">
            Clique em um produto para ver fotos e descrição completa.
          </p>
        </AnimateOnScroll>

        {category.items.length === 0 ? (
          <p className="mt-16 text-center text-unicer-blue/50">
            Nenhum produto disponível nesta categoria no momento.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item, index) => {
              const Icon = item.icon ? ICONS[item.icon] : Factory;
              const previewImage = item.images[0];
              const href = `/produtos/${category.slug}/${encodeURIComponent(item.id)}`;

              return (
                <AnimateOnScroll
                  key={item.id}
                  variant="fade-up"
                  delay={(index % 6) * 60}
                >
                  <Link
                    href={href}
                    className="group block h-full rounded-2xl border border-unicer-blue/10 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-unicer-red/30 hover:shadow-lg hover:shadow-unicer-blue/5"
                  >
                    {previewImage ? (
                      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={previewImage}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {item.images.length > 1 && (
                          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-xs font-medium text-white">
                            <Images className="h-3.5 w-3.5" />
                            {item.images.length}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-unicer-red/10 text-unicer-red transition-colors group-hover:bg-unicer-red/15">
                        <Icon className="h-6 w-6" />
                      </div>
                    )}
                    <h2 className="text-lg font-semibold text-unicer-blue">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-unicer-blue/65 line-clamp-3">
                      {item.summary}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-unicer-red group-hover:underline">
                      Ver detalhes
                    </span>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        )}

        <AnimateOnScroll
          delay={100}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-unicer-red-dark px-8 py-4 text-base font-semibold text-white shadow-lg shadow-unicer-red-dark/25 transition-all hover:bg-unicer-red-darker hover:scale-[1.02]"
          >
            Solicitar orçamento
          </a>
          <p className="text-sm text-unicer-blue/50">
            Não encontrou o que precisa? Fale conosco pelo WhatsApp.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
