import fetch from "isomorphic-unfetch";

export const fetchJson = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  throw new TypeError("Oops, we haven't got JSON!");
};
