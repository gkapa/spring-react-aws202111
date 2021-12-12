import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  // const linkElement = screen.getByText(/Hello world/i);
  const linkElement = screen.getByText(/©2021 Han/i);
  // const linkElement = screen.queryByText(/Hello world/i);
  expect(linkElement).toBeInTheDocument();
});
