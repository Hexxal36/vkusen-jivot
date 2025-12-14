import recipes from "@/data/recipes.json";

export type RecipeCategory =
  | "Салати"
  | "Супи"
  | "Основни"
  | "Десерти"
  | "Тестени"
  | "Зимнина";

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;

  category: RecipeCategory;
  createdAt: string; // ISO дата, напр. "2025-12-01"
  featured?: boolean;

  servings?: number;
  prepMinutes?: number;
  cookMinutes?: number;
  tags?: string[];

  ingredients: string[];
  steps: string[];
};

const getAllRecipes = (): Recipe[] => (recipes as Recipe[]).slice();

const getAllSlugs = (): string[] => getAllRecipes().map((r) => r.slug);

const getRecipeBySlug = (slug: string): Recipe | undefined =>
  getAllRecipes().find((r) => r.slug === slug);

export { getAllRecipes, getAllSlugs, getRecipeBySlug };
