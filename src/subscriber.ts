
type Subscriber = (...args: any[]) => void;
type SubscriberList = [Subscriber, any][];

export const Subscribers = Symbol("subscribers");

export const dispatch = (self: any, ...args: any[]) => {
  if (!self[Subscribers]) return;
  for (const [subscriber, thisContext] of self[Subscribers].slice() as SubscriberList) {
    subscriber.apply(thisContext, args);
  }
}

export const subscribe = (self: any, subscriber: Subscriber, thisContext?: any) => {
  if (!self[Subscribers]) {
    self[Subscribers] = [];
  }
  const subscribers = self[Subscribers] as SubscriberList;
  if (subscribers.some(([s]) => s === subscriber)) {
    throw new Error("Subscriber already attached");
  }
  subscribers.push([subscriber, thisContext]);
  return () => {
    self[Subscribers] = (self[Subscribers] as SubscriberList).filter(([s]) => s !== subscriber);
  }
}
