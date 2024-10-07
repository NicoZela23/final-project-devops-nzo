import RecipeCardType from "../../types/RecipeCardType";
import RecipeCard from "./RecipeCard";
import FryingPan from "../molecules/FryingPan";

interface FavoritesProps {
  savedRecipes: RecipeCardType[];
}

const Favourites: React.FC<FavoritesProps> = ({ savedRecipes }) => {
  return (
    <div className="favourite-section mx-auto py-10 px-5 md:px-10">
      {savedRecipes.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-6 mt-10">
        <p className="text-center text-2xl lg:text-4xl font-semibold text-rose-400">
          Favourite list is empty, find amazing recipes now!
        </p>
        <FryingPan />
        </div>
      )}

      <div className="favourite-items-container container mx-auto py-10 flex flex-wrap gap-10 justify-center">
        {savedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
