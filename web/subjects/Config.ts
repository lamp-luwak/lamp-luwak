
export class Config {

  public get(key: string) {
    switch (key) {
    case "api-host":
      return "http://localhost:2020"
    default:
    }
  }

}
