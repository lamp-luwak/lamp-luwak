import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("It Works", () => {
  const { getByText } = render(<App />);
  const content = getByText(/World/i);
  expect(content).toBeInTheDocument();
});
