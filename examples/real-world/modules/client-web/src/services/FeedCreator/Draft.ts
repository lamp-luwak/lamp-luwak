import { store, provide } from "~/lib/core";
import { Feed } from "~/services/Feed";

export class Draft {
  @provide private feed: Feed;
  @store public text: string = "";

  public setText(text: string) {
    this.text = text;
  }

  public send() {
    this.feed.append(this.text);
    this.reset();
  }

  public reset() {
    this.text = "";
  }
}
