import Ingredient from "./Ingredient";

interface RecipePageType {
  publisher: string;
  ingredients: Ingredient[];
  source_url: string; 
  image_url: string;
  title: string;
  servings: number;
  cooking_time: number;
  id: string;
}

export default RecipePageType;