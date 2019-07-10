import { store } from "~/lib/core";

export class Draft {
  @store public text: string;

  public setText(text: string) {
    this.text = text;
  }

  public send() {
    console.log("Draft has been sended");
  }
}
