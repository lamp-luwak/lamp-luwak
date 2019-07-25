import Routes from "next-routes";

const routes = new Routes()
  .add("singin", "/user/signin")
  .add("signup", "/user/signup");

export const Link = routes.Link;
export default routes;
