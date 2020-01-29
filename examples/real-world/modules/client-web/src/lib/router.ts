import Routes from "next-routes";
import config from "~/configs/routes.json";

function builder(config: any) {
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
