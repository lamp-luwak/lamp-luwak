import Routes from "next-routes";
import { ObjectMap } from "~/lib/core/types";
import config from "~/configs/routes.json";

function builder(config: ObjectMap) {
  const routes = new Routes();

  for (const key of Object.keys(config)) {
    routes.add(key, ...[].concat(config[key]));
  }

  return {
    Link: routes.Link,
    findByName(name: string) {
      return (routes as any).findByName(name);
    },
  };
}

export const { Link, findByName } = builder(config);
