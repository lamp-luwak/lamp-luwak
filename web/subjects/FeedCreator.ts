import { mut, inst } from "@lib/core";
import { message } from "antd";

export class FeedCreator {

  createDraft() {
    return inst(Draft);
  }
}

export class Draft {
  @mut text;

  setText(text) {
    this.text = text;
  }

  send() {
    message.info("Draft has been sended");
  }
}
