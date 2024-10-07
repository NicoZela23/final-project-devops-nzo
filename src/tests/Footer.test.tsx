import { render, screen } from "@testing-library/react";
import Footer from "../components/organisms/Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders the copyright text", () => {
    render(<Footer />);
    const copyrightElement = screen.getByRole("contentinfo");
    expect(copyrightElement).toHaveTextContent(
      /©\s*2024\s*Flavor\s*Flex\. All rights reserved\./
    );
  });
});
