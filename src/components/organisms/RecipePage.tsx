import { Link, useParams } from "react-router-dom";
import { useRecipe } from "../../hooks/useRecipe";
import RecipePageType from "../../types/RecipePageType";
import Ingredient from "../../types/Ingredient";
import { useEffect, useState } from "react";
import RecipeCardType from "../../types/RecipeCardType";

interface RecipePageProps {
  favouriteHandler: (id: string) => void;
  savedRecipes: RecipeCardType[];
}

const RecipePage: React.FC<RecipePageProps> = ({ favouriteHandler, savedRecipes }) => {
  const [recipeSavedStatus, setRecipeSavedStatus] = useState<boolean | null>(null);
  const { id } = useParams() as { id: string };

  const { data: recipe } = useRecipe(id) as { data: RecipePageType };

  const durationCalc = (duration: number) => {
    if (!duration) return;

    if (String(duration).includes(".")) {
      const splittedDuration = String(duration).split(".");
      const hour = splittedDuration[0] + "h";
      const splitterMinutes = "." + splittedDuration[1];
      const minutes = +splitterMinutes * 60 + "min";

      return hour + minutes;
    } else {
      return duration + "h";
    }
  };

  useEffect(() => {
    if (!recipe) return;

    setRecipeSavedStatus(savedRecipes.some((item) => item.id === recipe.id));
  }, [recipe]);

  return (
    <div className="recipe-item-section container mx-auto py-10 px-5 md:py-20 md:px-10 max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12">
      <div className="left row-start-2 lg:row-start-auto flex flex-col items-center lg:items-start">
        <div className="img overflow-hidden rounded-xl border shadow-md group w-full">
          <img
            src={recipe?.image_url}
            alt={recipe?.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      
      <div className="right flex flex-col gap-2 md:gap-4 items-center lg:items-start text-center lg:text-left">
        <span className="publisher uppercase tracking-widest font-semibold text-sky-400 text-sm md:text-base">
          {recipe?.publisher}
        </span>
        <h2 className="title text-3xl md:text-5xl font-semibold">{recipe?.title}</h2>
        <div className="servings-cooking-time flex flex-col md:flex-row gap-2 md:gap-4 uppercase tracking-widest font-semibold text-rose-500 text-sm md:text-base">
          <div className="servings">Servings: {recipe?.servings} people</div>
          <div className="cooking-time">
            Cooking time:{" "}
            {recipe?.cooking_time < 60
              ? String(recipe?.cooking_time) + "min"
              : durationCalc(recipe?.cooking_time / 60)}
          </div>
        </div>
        <div className="btns flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4 mt-5">
          <button
            onClick={() => favouriteHandler(recipe?.id)}
            className={`bg-gradient-to-br p-3 px-6 rounded-lg text-xs md:text-sm uppercase font-medium tracking-wider inline-block shadow-md hover:shadow-lg transition-shadow duration-300 ${
              recipeSavedStatus
                ? "from-orange-400 to-orange-600 text-orange-50 shadow-orange-200 hover:shadow-orange-300"
                : "from-sky-400 to-sky-600 text-sky-50 shadow-sky-200 hover:shadow-sky-300"
            }`}
          >
            {recipeSavedStatus
              ? "- Remove from favourites"
              : "+ Save as favourite"}
          </button>
          <a
            href={recipe?.source_url}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-purple-50 hover:shadow-purple-300 p-3 px-6 rounded-lg text-xs md:text-sm uppercase font-medium tracking-wider inline-block shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Get directions
          </a>
          <Link
            to="/"
            className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 hover:shadow-rose-300 p-3 px-6 rounded-lg text-xs md:text-sm uppercase font-medium tracking-wider inline-block shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Back to home
          </Link>
        </div>
      </div>

      <div className="ings w-full p-6 md:p-8 bg-rose-100 rounded-lg shadow-md lg:col-span-2">
          <span className="ing-title text-2xl md:text-4xl font-semibold mb-4 block">
            Ingredients
          </span>
          <ul className="lg:columns-2 gap-8 text-base md:text-lg list-disc pl-6">
            {recipe?.ingredients?.map((ing: Ingredient, i) => (
              <li key={i} className="leading-relaxed">
                <span className="font-medium">{ing.quantity} {ing.unit}</span> {ing.description}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default RecipePage;
