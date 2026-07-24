"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft, MessageCircle } from "lucide-react";
import type { CatalogItem, Category } from "@/types/catalog";
import { COMPANY } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

interface ProductDetailViewProps {
  item: CatalogItem;
  category: Pick<Category, "slug" | "label" | "title">;
}

export function ProductDetailView({ item, category }: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);

  const quoteUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Olá! Gostaria de solicitar orçamento para: ${item.title}`
  )}`;
  const backHref = `/produtos/${category.slug}`;

  return (
    <section className="relative bg-muted pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-unicer-blue/70 transition-colors hover:text-unicer-red"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para {category.label}
          </Link>
        </AnimateOnScroll>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <AnimateOnScroll delay={60}>
            {item.images.length > 0 ? (
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-unicer-blue/10 bg-white">
                  <Image
                    src={item.images[activeImage]}
                    alt={`${item.title} — foto ${activeImage + 1}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {item.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImage((i) =>
                            i === 0 ? item.images.length - 1 : i - 1
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md text-unicer-blue hover:bg-white"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImage((i) =>
                            i === item.images.length - 1 ? 0 : i + 1
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md text-unicer-blue hover:bg-white"
                        aria-label="Próxima foto"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {item.images.length > 1 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {item.images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                          index === activeImage
                            ? "border-unicer-red"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`Ver foto ${index + 1}`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-unicer-blue/10 bg-white text-unicer-blue/40">
                Sem imagens disponíveis
              </div>
            )}
          </AnimateOnScroll>

          <AnimateOnScroll delay={120} className="flex flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
              {category.title}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-unicer-blue sm:text-4xl">
              {item.title}
            </h1>

            {item.summary && item.summary !== item.description && (
              <p className="mt-4 text-lg font-medium text-unicer-blue/80">
                {item.summary}
              </p>
            )}

            <div className="mt-6 space-y-3 text-unicer-blue/70">
              {item.description.split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-unicer-red-dark px-7 py-3.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-unicer-red-dark/25 transition-all hover:bg-unicer-red-darker hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-unicer-red sm:text-base"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                Solicitar orçamento
              </a>
              <Link
                href={backHref}
                className="inline-flex items-center text-sm font-medium text-unicer-blue/60 transition-colors hover:text-unicer-blue"
              >
                Ver todos em {category.label}
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
