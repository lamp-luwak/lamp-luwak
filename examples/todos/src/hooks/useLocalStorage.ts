import { useEffect, useMemo } from "react";
import { provide, serialize, useUnserialize, register, subscribe } from "@impress/react";
import { Todo } from "../services/Todo";
import { TodoFilter } from "../services/TodoFilter";
import { Item as TodoItem, ItemChanged } from "../services/Todo/Item";

const LocalStorageKey = "__STORE__";

register(Todo, "Todo");
register(TodoItem, "Todo/Item");
register(TodoFilter, "TodoFilter");

export const useLocalStorage = () => {
  const data = useMemo(() => {
    const raw = localStorage.getItem(LocalStorageKey);
    return raw && JSON.parse(raw);
  }, []);
  useUnserialize(data);

  useEffect(() => {
    const todo = provide(Todo);
    const todoFilter = provide(TodoFilter);

    const unsubscribers = [
      subscribe(ItemChanged, sync),
      subscribe(todo, sync),
      subscribe(todoFilter, sync)
    ];

    function sync() {
      const data = serialize([todo, todoFilter]);
      localStorage.setItem(LocalStorageKey, JSON.stringify(data));
    }
    return () => {
      for (const unsubscriber of unsubscribers.slice()) {
        unsubscriber();
      }
    }
  }, []);
};
