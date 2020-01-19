import { Event, EventListenerTarget, EventListener } from "./types";

export default {
  listeners: new Map<Event, WeakMap<EventListenerTarget, EventListener>>(),
};
