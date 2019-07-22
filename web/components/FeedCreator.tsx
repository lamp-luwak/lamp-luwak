import React from "react";
import { provide, Subscribe } from "~/lib/core";
import { FeedCreator as FeedCreatorService, Draft } from "~/services/FeedCreator";

interface FeedCreatorProps {}

export class FeedCreator extends React.PureComponent<FeedCreatorProps> {
  @provide private feedCreator: FeedCreatorService;

  public draft: Draft;

  constructor(props: FeedCreatorProps) {
    super(props);
    this.draft = this.feedCreator.getDraft();
  }

  public render() {
    return (
      <div>
        <div>
          <Subscribe to={this.draft}>
            {() => (
              <input
                placeholder="Type text..."
                onChange={(e: any) => this.draft.setText(e.target.value)}
                value={this.draft.text}
              />
            )}
          </Subscribe>
        </div>
        <div>
          <button onClick={() => this.draft.send()}>
            Create
          </button>
        </div>
      </div>
    );
  }
}
