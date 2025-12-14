import RecipesBrowser from "@/components/RecipesBrowser";
import { getAllRecipes } from "@/lib/recipes";

export const dynamic = "force-static";

const RecipesPage = () => {
  const recipes = getAllRecipes();

  return (
    <>
      <h1>Рецепти</h1>
      <p style={{ opacity: 0.85, marginTop: 6 }}>
        Филтрирай по категория/таг, сортирай и разглеждай страници.
      </p>

      <RecipesBrowser recipes={recipes} />
    </>
  );
};

export default RecipesPage;
