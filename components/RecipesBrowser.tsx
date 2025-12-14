"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Recipe, RecipeCategory } from "@/lib/recipes";

type SortKey = "newest" | "title_asc" | "title_desc" | "prep_asc";

const PAGE_SIZE_OPTIONS = [6, 9, 12];

const RecipesBrowser = ({ recipes }: { recipes: Recipe[] }) => {
  const categories = useMemo(() => {
    const set = new Set<RecipeCategory>();
    recipes.forEach((r) => set.add(r.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "bg"));
  }, [recipes]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    recipes.forEach((r) => (r.tags ?? []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "bg"));
  }, [recipes]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RecipeCategory | "all">("all");
  const [tag, setTag] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [pageSize, setPageSize] = useState<number>(9);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = recipes.slice();

    if (category !== "all") list = list.filter((r) => r.category === category);
    if (tag !== "all") list = list.filter((r) => (r.tags ?? []).includes(tag));

    if (q) {
      list = list.filter((r) => {
        const hay = `${r.title} ${r.description} ${(r.tags ?? []).join(" ")} ${r.category}`.toLowerCase();
        return hay.includes(q);
      });
    }

    switch (sort) {
      case "newest":
        list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        break;
      case "title_asc":
        list.sort((a, b) => a.title.localeCompare(b.title, "bg"));
        break;
      case "title_desc":
        list.sort((a, b) => b.title.localeCompare(a.title, "bg"));
        break;
      case "prep_asc":
        list.sort((a, b) => (a.prepMinutes ?? 9999) - (b.prepMinutes ?? 9999));
        break;
    }

    return list;
  }, [recipes, query, category, tag, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const resetPage = () => setPage(1);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setTag("all");
    setSort("newest");
    setPageSize(9);
    setPage(1);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 14,
          background: "#fff",
          marginTop: 12,
        }}
      >
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(12, 1fr)" }}>
          <div style={{ gridColumn: "span 12" }}>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
              }}
              placeholder="Търси по име, описание, таг…"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #eee",
              }}
            />
          </div>

          <div style={{ gridColumn: "span 12" }} />

          <div style={{ gridColumn: "span 12" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <label className="badge" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                Категория
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value as any);
                    resetPage();
                  }}
                  style={{ border: "1px solid #eee", borderRadius: 10, padding: "6px 8px" }}
                >
                  <option value="all">Всички</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="badge" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                Таг
                <select
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                    resetPage();
                  }}
                  style={{ border: "1px solid #eee", borderRadius: 10, padding: "6px 8px" }}
                >
                  <option value="all">Всички</option>
                  {allTags.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="badge" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                Сортиране
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortKey);
                    resetPage();
                  }}
                  style={{ border: "1px solid #eee", borderRadius: 10, padding: "6px 8px" }}
                >
                  <option value="newest">Най-нови</option>
                  <option value="title_asc">Име (А→Я)</option>
                  <option value="title_desc">Име (Я→А)</option>
                  <option value="prep_asc">Подготовка (най-бързи)</option>
                </select>
              </label>

              <label className="badge" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                На страница
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    resetPage();
                  }}
                  style={{ border: "1px solid #eee", borderRadius: 10, padding: "6px 8px" }}
                >
                  {PAGE_SIZE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>

              <button
                onClick={clearFilters}
                className="badge"
                style={{
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Изчисти
              </button>

              <span className="badge">Намерени: {filtered.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 14 }}>
        {pageItems.map((r) => (
          <article key={r.id} className="card">
            {r.image ? (
              <img className="recipeImg" src={r.image} alt={r.title} loading="lazy" />
            ) : null}
            <div className="cardBody">
              <div className="metaRow" style={{ margin: "0 0 8px" }}>
                <span className="badge">{r.category}</span>
                {r.featured ? <span className="badge">Featured</span> : null}
              </div>

              <h3 className="cardTitle">{r.title}</h3>
              <p className="cardDesc">{r.description}</p>

              <div className="metaRow" style={{ marginTop: 12 }}>
                <Link className="badge" href={`/recipes/${r.slug}`}>
                  Виж рецептата →
                </Link>
                {typeof r.prepMinutes === "number" ? (
                  <span className="badge">Подготовка: {r.prepMinutes} мин</span>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <button
          className="badge"
          style={{ background: "#fff", cursor: safePage > 1 ? "pointer" : "not-allowed", opacity: safePage > 1 ? 1 : 0.5 }}
          disabled={safePage <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ← Предишна
        </button>

        <span className="badge">
          Страница {safePage} / {totalPages}
        </span>

        <button
          className="badge"
          style={{
            background: "#fff",
            cursor: safePage < totalPages ? "pointer" : "not-allowed",
            opacity: safePage < totalPages ? 1 : 0.5
          }}
          disabled={safePage >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Следваща →
        </button>
      </div>
    </>
  );
};

export default RecipesBrowser;
