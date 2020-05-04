




const hello = useProvide(Hello);
const m = useProvide(M);

const c = useSelector(() => hello.address );




const hello = createStore();
const hello = create((set) => ({
  state: 0,
  run: () => set({ a: 1 });
}));
const hello = store({ a: 10 });


const helloFactory = () => {
  return store({
    address: null
  });
}

set(helloFactory(), state => state);

const setList = (user: User, list: []) => set(user, (state) => ({ ...state, list }));

class Hello {
  state = {
    address: null
  };
  perform() {
    modify(this).address = {};
  }
}


const debounce = (source: Store) => { // Debounce solve here
  const store2 = create(source); // Make new store with default values from another
  subscribe(source, (value) => {
    set(store2, value);
  });
  // chan2.state === {}
  return store2;
};

// Make overloading create(initialState); create(Class); Think about function who return store () => create(User)???
// Make one more overloading create(sourceStore);

subscribe(store1, store2, (newState1, newState2, prevState1, prevState2) => { // Diamond problem solve here
  // ...
});

create(Hello, store1, store2);//, () => ({ ...store1.state, ...store2.state }));

const combined = create(store1, store2, (state1, state2) => ({
  ...state1,
  ...state2
}));

const UserService = () => { // It is interesting syntax too
  const store = create({ id: 10 });
  const address = create(store, (state) => state.id);

  return extend(store, {
    get id() { return store.state.id },
    move() {
      return store.state.id;
    }
  }
};

// Next question - syntax of http cancelling

const request = (url) => {
  const store = create({
    data: [],
    process: true,
    id: null
  });
  const hadler = fetch(url)
    .then((data) => {
      set(store, (state) => ({ ...state, data, process: false }));
    })
    .catch((error) => {
      set(store, (state) => ({ ...state, error, process: false }));
    });
  modify(store).id = handler.id;

  // onDestroy(store, () => { //??
  //   // http.cancel ---
  // });


  return store;
}

const debounce = (source: Store) => { // Debounce solve here
  const store2 = create(source); // Make new store with default values from another
  subscribe(source, (value) => {
    set(store2, value);
  });

  // I think it is more interesting to change "subscribe" function name to "watch" it is will look like below

  watch(source, (value) => {});

  subscribe(source, (value) => {});

  // propogate(source, store2);

  chan(store2, [ source ], (signal) => {
    if (signal === "http_cancel") {
      // ...
      // for (i of [1..10]) send({ i }); // Same as react hooks contextual function call
    }
    return signal;
  });

  send(store2, "http_cancel"); // Send signal without contextual calculation
  recieve(store2, (signal) => {
    // ...
  });

  // Short notation
  chan(store2, source);

  // chan2.state === {}
  return store2;
};

// What about signals?



















