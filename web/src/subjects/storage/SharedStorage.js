const KeyPrefix = 'sonata::';

export class SharedStorage {

  constructor() {
    try {
      this.driver = window.localStorage;
    } catch (e) { }
  }

  get(key) {
    try {
      return JSON.parse(this.driver.getItem(KeyPrefix + key));
    } catch (e) { }
  }

  set(key, value) {
    try {
      this.driver.setItem(KeyPrefix + key, JSON.stringify(value));
    } catch (e) { }
  }

}
