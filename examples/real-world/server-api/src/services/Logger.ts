
export class Logger {

  public log(...values: any[]) {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(time, ...values);
  }

}
