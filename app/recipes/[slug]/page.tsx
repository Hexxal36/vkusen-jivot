import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getRecipeBySlug } from "@/lib/recipes";

export const dynamic = "force-static";
export const dynamicParams = false;

// Нужно за static export при динамични маршрути: генерираме всички slug-ове на build time. :contentReference[oaicite:2]{index=2}
export const generateStaticParams = async () => {
  return getAllSlugs().map((slug) => ({ slug }));
};

type Props = { params: { slug: string } };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const recipe = getRecipeBySlug((await params).slug);
  if (!recipe) return { title: "Рецепта | Вкусен живот" };
  return {
    title: `${recipe.title} | Вкусен живот`,
    description: recipe.description,
  };
};

const RecipeDetailsPage = async ({ params }: Props) => {
  const recipe = getRecipeBySlug((await params).slug);
  if (!recipe) notFound();

  return (
    <>
      <h1>{recipe.title}</h1>
      <p style={{ opacity: 0.85, marginTop: 6 }}>{recipe.description}</p>

      <div className="metaRow">        
        <span className="badge">{recipe.category}</span>
        {recipe.featured ? <span className="badge">Featured</span> : null}
        {typeof recipe.servings === "number" ? (
          <span className="badge">Порции: {recipe.servings}</span>
        ) : null}
        {typeof recipe.prepMinutes === "number" ? (
          <span className="badge">Подготовка: {recipe.prepMinutes} мин</span>
        ) : null}
        {typeof recipe.cookMinutes === "number" ? (
          <span className="badge">Готвене: {recipe.cookMinutes} мин</span>
        ) : null}
        {recipe.tags?.map((t) => (
          <span key={t} className="badge">{t}</span>
        ))}
      </div>

      {recipe.image ? (
        <div style={{ marginTop: 16 }}>
          <img className="recipeImg" style={{ height: 320, borderRadius: 14 }} src={recipe.image} alt={recipe.title} />
        </div>
      ) : null}

      <section style={{ marginTop: 18 }}>
        <h2>Необходими продукти</h2>
        <ul>
          {recipe.ingredients.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2>Начин на приготвяне</h2>
        <ol>
          {recipe.steps.map((s) => (
            <li key={s} style={{ marginBottom: 8 }}>{s}</li>
          ))}
        </ol>
      </section>
    </>
  );
};

export default RecipeDetailsPage;
