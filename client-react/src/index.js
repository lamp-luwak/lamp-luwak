import React from 'react';
import ReactDOM from 'react-dom';

// import App from 'components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { aware, subject, mut, inject, Provider } from 'lib/core';

@subject
class User {

  @mut name;

  setName(name) {
    this.name = name;
  }

}


@aware
export class App extends React.Component {

  @inject(User) user;

  render() {
    console.log('App.render', this.user);
    return (
      <div>hello {(this.user || {}).name}</div>
    );
  }
}

class Root extends React.Component {
  render() {
    return (
      <Provider>
        <App />
      </Provider>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
