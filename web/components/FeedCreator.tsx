import React from "react";
import { subscribe, provide, Subscribe } from "@lib/core";
import { FeedCreator as FeedCreatorService, Draft } from "@services/FeedCreator";
import { Input, Button, Col, Row } from "antd";

interface FeedCreatorProps {}

@subscribe
export class FeedCreator extends React.PureComponent<FeedCreatorProps> {
  @provide public feedCreator: FeedCreatorService;

  public draft: Draft;

  constructor(props: FeedCreatorProps) {
    super(props);
    this.draft = this.feedCreator.getDraft();
  }

  public render() {
    return (
      <Row>
        <Col span={10}>
          <Subscribe to={this.draft}>
            {() => (
              <Input
                placeholder="Type text..."
                onInput={(e) => this.draft.setText((e.target as any).value)}
                value={this.draft.text}
              />
            )}
          </Subscribe>
        </Col>
        <Col span={14}>
          <Button type="primary" onClick={() => this.draft.send()}>
            Create
          </Button>
        </Col>
      </Row>
    );
  }
}

