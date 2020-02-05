import fetch from "isomorphic-unfetch";
import { baseUrl } from "~/config.json";

export const fetchJson = async (url: string) => {
  const response = await fetch(baseUrl + url);
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  throw new TypeError("Oops, we haven't got JSON!");
};
