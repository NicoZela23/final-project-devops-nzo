import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer';
import Home from './components/templates/Home';
import RecipeCardType from './types/RecipeCardType';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RecipePage from './components/organisms/RecipePage';
import Favourites from './components/organisms/Favorites';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const inputField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const [savedRecipes, setSavedRecipes] = useState<RecipeCardType[]>(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });  
  
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    getData(searchQuery);

    setSearchQuery("");
    setRecipes([]);
    setError("");
    navigate("/");
  };

  const getData = async (searchQuery: string) => {
    try {
      setLoading(true);
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`);
      
      if (!res.ok) {
        throw new Error("Something went wrong, please try again later.");
      }

      const data = await res.json();
      
      if (data.results === 0) {
        throw new Error("No recipe found!");
      }
      
      setRecipes(data?.data?.recipes);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const favouriteHandler = (id: string) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const recipe: RecipeCardType = data.data.recipe;
        checkLocalData(recipe);
      });

    navigate("/favourites");
  };

  const checkLocalData = (data: RecipeCardType) => {
    const localData = JSON.parse(localStorage.getItem("recipes") || '[]') as RecipeCardType[];
    const existedData = localData.some((item) => item.id === data.id);
  
    if (!existedData) {
      setSavedRecipes([...savedRecipes, data]);
    } else {
      const filteredData = localData.filter((item) => item.id !== data.id);
      setSavedRecipes(filteredData);
    }
  };  

  return (
    <>
    <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
      <Navbar
        searchHandler={searchHandler}
        inputField={inputField}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedRecipes={savedRecipes}
      />
        <Routes>
          <Route
            path="/"
            element={<Home recipes={recipes} loading={loading} error={error} />}
          />
          <Route
            path="/favourites"
            element={<Favourites savedRecipes={savedRecipes} />}
          />
          <Route
            path="/recipe-item/:id"
            element={
              <RecipePage
                favouriteHandler={favouriteHandler}
                savedRecipes={savedRecipes}
              />
            }
          />
        </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;