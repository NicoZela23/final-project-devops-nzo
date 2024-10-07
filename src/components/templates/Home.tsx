import React from "react";
import FryingPan from "../molecules/FryingPan";
import RecipeCard from "../organisms/RecipeCard";
import RecipeCardType from "../../types/RecipeCardType";

interface HomeProps {
  recipes: RecipeCardType[];
  loading: boolean;
  error: string | null;
}

const Home: React.FC<HomeProps> = ({ recipes, loading, error }) => {
  return (
    <div className="home container mx-auto py-10 flex flex-wrap gap-10 justify-center">
      {!loading && !error && recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 mt-10">
          <p className="text-center text-2xl lg:text-4xl font-semibold text-rose-400">
            Nothing to show, please search something!
          </p>
          <FryingPan />
        </div>
      ) : null}

      {loading && (
        <p className="text-center text-xl text-gray-500 mt-10">
          {error ? error : "Loading..."}
        </p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
