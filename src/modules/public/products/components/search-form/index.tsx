"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { buildProductsHref } from "../../helpers";

interface IProps {
  searchQuery?: string;
  category?: string;
}

export const SearchForm = ({ searchQuery, category }: IProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchQuery ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Sincronizar si searchQuery cambia desde fuera (navegación back/forward)
  useEffect(() => {
    setValue(searchQuery ?? "");
  }, [searchQuery]);

  function navigateTo(query: string) {
    startTransition(() => {
      router.push(buildProductsHref(1, category, query || undefined));
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      navigateTo(newValue);
    }, 400);
  }

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md">
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Buscar producto..."
        className="w-full rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
    </form>
  );
};
