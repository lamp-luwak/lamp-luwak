import React from 'react';
import { subscribe, inject } from 'lib/core';
import { FeedCreator as FeedCreatorSubject } from 'subjects/FeedCreator';
import { Input, Button, Col } from 'antd';

@subscribe
export class FeedCreator extends React.PureComponent {
  @inject(FeedCreatorSubject) feedCreator;

  constructor() {
    super();
    this.draft = this.subscribe(this.feedCreator.createDraft());
  }

  render() {
    return (
      <Input.Group>
        <Col span={10}>
          <Input
            placeholder="Type text..."
            onInput={(e) => this.draft.setText(e.target.value)}
            value={this.draft.text}
            />
        </Col>
        <Col span={14}>
          <Button type="primary" onClick={() => this.draft.send()}>
            Create
          </Button>
        </Col>
      </Input.Group>
    );
  }
}

