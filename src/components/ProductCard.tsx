"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/models/Catalog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl border-slate-200">
      <Link href={`/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={`/assets/source/${product.images[0] || "home/1.jpg"}`}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        </div>
      </Link>
      <CardContent className="p-6">
        <Badge variant="secondary" className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
          {product.category}
        </Badge>
        <h3 className="mb-2 text-xl font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
          <Link href={`/${product.slug}`}>{product.title}</Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
          {product.summary}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link
          href={`/${product.slug}`}
          className="inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors"
        >
          View details
          <svg
            className="ml-2 h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};
