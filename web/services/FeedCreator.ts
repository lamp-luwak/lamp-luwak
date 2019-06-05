import { Draft } from "./FeedCreator/Draft";
export { Draft };

export class FeedCreator {

  public getDraft() {
    return new Draft();
  }

}
