
export class Logger {

  public log(...values: any[]) {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // tslint:disable-next-line: no-console
    console.log(time, ...values);
  }

}
