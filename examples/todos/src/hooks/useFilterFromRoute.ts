import { useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { useProvide } from "@impress/react";
import { TodoFilter } from "../services/TodoFilter";

export const useFilterFromRoute = () => {
  const todoFilter = useProvide(TodoFilter);

  const { params } = useRouteMatch("/:filter") || {};
  let filter = ((params || {}) as any).filter;
  if (filter !== "active" && filter !== "completed") {
    filter = "all";
  }

  useEffect(
    () => todoFilter.setFilter(filter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );
};
