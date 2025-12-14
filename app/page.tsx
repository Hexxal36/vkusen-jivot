import RecipeCard from "@/components/RecipeCard";
import HomeHero from "@/components/HomeHero";
import { getAllRecipes } from "@/lib/recipes";

const HomePage = () => {
  const recipes = getAllRecipes();

  const featured = recipes
    .filter((r) => r.featured)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 3);

  const featuredSlugs = new Set(featured.map((r) => r.slug));

  const newest = recipes
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .filter((r) => !featuredSlugs.has(r.slug))
    .slice(0, 3);

  return (
    <>
      <HomeHero />

      <h2 style={{ marginTop: 22 }}>Featured</h2>
      <div className="grid" style={{ marginTop: 12 }}>
        {featured.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>

      <h2 style={{ marginTop: 22 }}>Нови рецепти</h2>
      <div className="grid" style={{ marginTop: 12 }}>
        {newest.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
