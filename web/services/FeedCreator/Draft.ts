import { store } from "@lib/core";
import { message } from "antd";

export class Draft {
  @store public text: string;

  public setText(text: string) {
    this.text = text;
  }

  public send() {
    message.info("Draft has been sended");
  }
}
