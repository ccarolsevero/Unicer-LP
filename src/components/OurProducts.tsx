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

interface OurProductsProps {
  categories: CategoryWithItems[];
}

export function OurProducts({ categories }: OurProductsProps) {
  if (categories.length === 0) return null;

  return (
    <section className="relative bg-muted pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
            Catálogo
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-unicer-blue sm:text-4xl lg:text-5xl">
            Nossos Produtos
          </h1>
          <p className="mt-4 text-lg text-unicer-blue/70">
            Peças de reposição e máquinas para a indústria cerâmica. Escolha uma
            categoria para ver o catálogo completo.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={80} className="mt-12 flex justify-center">
          <div className="inline-flex w-full max-w-lg flex-col gap-2 rounded-2xl border border-unicer-blue/10 bg-white p-1.5 shadow-sm sm:max-w-none sm:flex-row sm:rounded-full">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produtos/${category.slug}`}
                className="flex-1 rounded-xl px-5 py-3 text-center text-sm font-semibold text-unicer-blue/70 transition-all hover:bg-unicer-blue/5 hover:text-unicer-blue sm:rounded-full sm:px-8"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </AnimateOnScroll>

        <div className="mt-16 space-y-20">
          {categories.map((category) => (
            <div key={category.id}>
              <AnimateOnScroll className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold text-unicer-blue sm:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-2 text-unicer-blue/65">{category.description}</p>
                <Link
                  href={`/produtos/${category.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-unicer-red hover:underline"
                >
                  Ver todos em {category.label}
                </Link>
              </AnimateOnScroll>

              {category.items.length === 0 ? (
                <p className="mt-10 text-center text-unicer-blue/50">
                  Nenhum produto disponível nesta categoria no momento.
                </p>
              ) : (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.slice(0, 6).map((item, index) => {
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
                          <h3 className="text-lg font-semibold text-unicer-blue">
                            {item.title}
                          </h3>
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
            </div>
          ))}
        </div>

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
