import { Link } from "react-router-dom";
import RecipeCardType from "../../types/RecipeCardType";

interface RecipeCardProps {
  recipe: RecipeCardType
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe w-80 overflow-hidden bg-white/75 rounded-2xl p-5 shadow-xl shadow-red-100 border-2 border-white flex flex-col">
      <div className="img h-40 overflow-hidden flex justify-center items-center rounded-lg mb-4">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="block w-full h-full object-cover"
        />
      </div>
      <div className="texts flex flex-col h-[calc(100%-10rem)]">
        <span className="publisher text-xs uppercase text-sky-400 font-semibold tracking-widest mb-2">
          {recipe.publisher}
        </span>
        <h2 className="title text-lg sm:text-xl font-semibold mb-3 line-clamp-2 overflow-y-auto flex-grow">
          {recipe.title}
        </h2>
        <Link
          to={`/recipe-item/${recipe.id}`}
          className="bg-gradient-to-br from-rose-400 to-red-600 text-rose-50 p-3 px-5 rounded-lg text-sm uppercase font-semibold tracking-wider shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 duration-300 text-center"
        >
          view recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;