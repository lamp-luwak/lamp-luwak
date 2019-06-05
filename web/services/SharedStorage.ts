const KeyPrefix = "__sonata__";

export class SharedStorage {

  private driver: any;

  constructor() {
    try {
      this.driver = window.localStorage;
    } catch (e) {
      console.error("No access to localStorage");
    }
  }

  public get(key: string | number) {
    try {
      return JSON.parse(this.driver.getItem(KeyPrefix + key));
    } catch (e) {
      console.error("Cannot get value from storage");
    }
  }

  public set(key: string | number, value: any) {
    try {
      this.driver.setItem(KeyPrefix + key, JSON.stringify(value));
    } catch (e) {
      console.error("Cannot set value into storage");
    }
  }

}
