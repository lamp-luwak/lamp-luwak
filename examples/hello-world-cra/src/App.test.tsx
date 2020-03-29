import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("It Works", () => {
  const { container, getByText } = render(<App />);
  expect(getByText(/World/i)).toBeInTheDocument();
  fireEvent.change((container as any).querySelector("input"), {target: {value: "Abc"}})
  expect(getByText(/Abc/i)).toBeInTheDocument();
});
