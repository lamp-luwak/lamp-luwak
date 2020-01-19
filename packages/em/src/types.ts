
export const Listeners = Symbol("Event Emitter listeners");

export type EventListener = (data: any) => any;
