const KeyPrefix = "sonata::";

export class SharedStorage {

  private driver: any;

  constructor() {
    try {
      this.driver = window.localStorage;
    // tslint:disable-next-line: no-empty
    } catch (e) { }
  }

  public get(key: string | number) {
    try {
      return JSON.parse(this.driver.getItem(KeyPrefix + key));
    // tslint:disable-next-line: no-empty
    } catch (e) { }
  }

  public set(key: string | number, value: any) {
    try {
      this.driver.setItem(KeyPrefix + key, JSON.stringify(value));
    // tslint:disable-next-line: no-empty
    } catch (e) { }
  }

}
