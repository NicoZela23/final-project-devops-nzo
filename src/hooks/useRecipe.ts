import { useEffect, useState } from "react";
import RecipePageType from "../types/RecipePageType";

interface UseRecipeOutput {
  data: RecipePageType | null;
  loading: boolean;
  error: string;
}

export const useRecipe = (id: string): UseRecipeOutput => {
  const [data, setData] = useState<RecipePageType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getRecipeItemData = async () => {
      try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

        if (!res.ok) {
          throw new Error("Something went wrong, please try again later!");
        }

        const data = await res.json();
        setData(data?.data?.recipe);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getRecipeItemData();
  }, []);

  return { data, loading, error };
};