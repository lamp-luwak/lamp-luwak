import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("It Works", () => {
  const { getByText, getByRole } = render(<App />);
  expect(getByText(/World/i)).toBeInTheDocument();
  fireEvent.change(getByRole("textbox"), {target: {value: "Abc"}})
  expect(getByText(/Abc/i)).toBeInTheDocument();
});
