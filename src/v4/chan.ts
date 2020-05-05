import { prop } from "./prop";

const ChanReceivers = Symbol("ChanReceivers");
const Multi = Symbol();

let sendingDeepCounter = 0;

function getChanReceivers(node: any) {
  return prop(node, ChanReceivers, []);
}

export function blank() {
  return {};
}

export function multi(...nodes: any) {
  const m = nodes;
  m[Multi] = true;
  return m;
}

export function chan(from: any, to: any, callback?: (signal: any) => void) {
  receive(from, (signal: any) => {
    if (callback) {
      signal = callback(signal);
    }
    send(to, signal);
  });
}

export function receive(node: any, receiver: any) {
  if (node[Multi]) {
    node.forEach((node: any) => receive(node, receiver));
    return;
  }
  getChanReceivers(node).push(receiver);
}

export function send(node: any, signal: any) {
  sendingDeepCounter ++;
  try {
    if (node[Multi]) {
      node.forEach((node: any) => send(node, signal));
      return;
    }
    const receivers = getChanReceivers(node);
    for (const receiver of receivers) {
      receiver(signal);
    }
  }
  finally {
    sendingDeepCounter --;
  }
}
