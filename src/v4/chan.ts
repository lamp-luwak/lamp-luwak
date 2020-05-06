import { prop } from "./prop";

const ChanReceivers = Symbol("ChanReceivers");
const Multi = Symbol("Multi");

const IterationLimit = 10000;
let depth = 0;
const onAfterLastDelegates = new Map();
const onAfterLastDelegatesQueue = [] as any;

const propChanReceivers = prop(ChanReceivers, () => []);

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

function onAfterLast(callback: any) {
  if (onAfterLastDelegates.has(callback)) {
    return;
  }
  onAfterLastDelegates.set(callback, callback);
  onAfterLastDelegatesQueue.push(callback);
}

export function receive(node: any, receiver: any) {
  if (node[Multi]) {
    let lastSignal = null as any;
    let hasLastSignal = false;
    const finish = () => {
      const _hasLastSignal = hasLastSignal;
      const _lastSignal = lastSignal;
      lastSignal = null;
      hasLastSignal = false;
      if (_hasLastSignal) {
        receiver(_lastSignal);
      }
    };
    const multiReceiver = (signal: any) => {
      onAfterLast(finish);

      if (!hasLastSignal) {
        hasLastSignal = true;
        lastSignal = signal;
      }
      else if (lastSignal !== signal) {
        const _lastSignal = lastSignal;
        lastSignal = signal;
        receiver(_lastSignal);
      }
    };
    node.forEach((node: any) => receive(node, multiReceiver));
    return;
  }
  propChanReceivers(node).push(receiver);
}

export function group(code: () => void) {
  depth ++;
  try {
    code();
    if (depth === 1) {
      let iteration = 0;
      while(onAfterLastDelegatesQueue.length > 0) {
        const onAfterLast = onAfterLastDelegatesQueue.shift();
        onAfterLastDelegates.delete(onAfterLast);
        onAfterLast();
        iteration ++;
        if (iteration > IterationLimit) {
          throw new Error("Iteration limit exceeded");
        }
      }
    }
  }
  finally {
    if (depth === 1) {
      onAfterLastDelegates.clear();
      onAfterLastDelegatesQueue.length = 0;
    }
    depth --;
  }
}

export function send(node: any, signal?: any) {
  group(() => {
    if (node[Multi]) {
      node.forEach((node: any) => send(node, signal));
      return;
    }
    const receivers = propChanReceivers(node);
    for (const receiver of receivers) {
      receiver(signal);
    }
  });
}
