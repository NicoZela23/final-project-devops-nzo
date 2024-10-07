import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RecipeCard from "../components/organisms/RecipeCard";
import RecipeCardType from "../types/RecipeCardType";
import "@testing-library/jest-dom"; // Ensure this is imported

// Sample RecipeCardType for testing
const mockRecipe: RecipeCardType = {
  id: "1",
  title: "Delicious Recipe",
  publisher: "Chef John",
  image_url: "https://example.com/recipe.jpg",
};

describe("RecipeCard Component", () => {
  test("renders recipe title, publisher, and image", () => {
    render(
      <Router>
        <RecipeCard recipe={mockRecipe} />
      </Router>
    );

    // Check if title is rendered
    const titleElement = screen.getByText(mockRecipe.title);
    expect(titleElement).toBeInTheDocument();

    // Check if publisher is rendered
    const publisherElement = screen.getByText(mockRecipe.publisher);
    expect(publisherElement).toBeInTheDocument();

    // Check if image is rendered
    const imageElement = screen.getByAltText(mockRecipe.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockRecipe.image_url);
  });

  test("renders a link to the recipe detail page", () => {
    render(
      <Router>
        <RecipeCard recipe={mockRecipe} />
      </Router>
    );

    // Check if the link to the recipe detail page is rendered
    const linkElement = screen.getByRole("link", { name: /view recipe/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `/recipe-item/${mockRecipe.id}`
    );
  });
});
