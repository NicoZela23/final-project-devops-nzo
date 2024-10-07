import { FormEvent, RefObject } from "react";
import { NavLink } from "react-router-dom";
import FlavorFLexLogo from '../../assets/FLAVORFLEX.svg'

interface NavbarProps {
  searchHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputField: RefObject<HTMLInputElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  savedRecipes: any[];
}

const Navbar = ({
    searchHandler,
    inputField,
    searchQuery,
    setSearchQuery,
    savedRecipes,
  }: NavbarProps) => {
    const navActive = ({ isActive }: { isActive: boolean }) => {
      return {
        color: isActive ? "#f43f5e" : undefined,
      };
    };
  
    return (
      <div className="navbar flex flex-col sm:flex-row justify-between items-center p-4 md:px-8 lg:px-16 gap-3 sm:gap-6">
        <div className="logo">
          <img 
            src={FlavorFLexLogo} 
            alt="FlavorFlex logo" 
            className="h-10 sm:h-12 md:h-14 w-auto mb-3 "
          />
        </div>
        
        <form className="search-bar w-full sm:w-2/4" onSubmit={searchHandler}>
          <input
            ref={inputField}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search recipe...."
            required
            className="bg-white/75 p-2 sm:p-3 px-4 sm:px-8 w-full rounded-full outline-none shadow-lg shadow-red-100 focus:shadow-red-200 duration-300"
          />
        </form>
        
        <ul className="menu flex gap-4 sm:gap-5 text-sm sm:text-base">
          <li>
            <NavLink
              style={navActive}
              end
              to="/"
              className="text-gray-400 hover:text-gray-600 duration-300 font-semibold text-lg md:text-xl"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={navActive}
              to="/Favourites"
              className="text-gray-400 hover:text-gray-600 duration-300 font-semibold text-lg md:text-xl"
            >
              Favourites
              <span className="favourites-count font-bold text-sky-400 ml-1">
                ({savedRecipes.length})
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Navbar;