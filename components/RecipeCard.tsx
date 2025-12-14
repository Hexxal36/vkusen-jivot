import { Recipe } from "@/lib/recipes";
import Link from "next/link";

type Props = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
  return (
    <article className="card">
      {recipe.image ? (
        // За static export: използваме <img> вместо next/image (без доп. loader конфигурация).
        <img className="recipeImg" src={recipe.image} alt={recipe.title} loading="lazy" />
      ) : null}

      <div className="cardBody">
        <h3 className="cardTitle">{recipe.title}</h3>
        <p className="cardDesc">{recipe.description}</p>

        <div className="metaRow" style={{ marginTop: 12 }}>
          <Link className="badge" href={`/recipes/${recipe.slug}`}>
            Виж рецептата →
          </Link>
          {recipe.tags?.slice(0, 2).map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
