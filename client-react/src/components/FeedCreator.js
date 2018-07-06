// @flow
import React from 'react';
import { subscribe, inject, Subscribe } from 'lib/core';
import { FeedCreator as FeedCreatorSubject, Draft as FeedDraft } from 'subjects/FeedCreator';
import { Input, Button, Col } from 'antd';

@subscribe
export class FeedCreator extends React.PureComponent<{}> {
  @inject(FeedCreatorSubject)
  feedCreator: FeedCreatorSubject;

  draft: FeedDraft;

  constructor() {
    super();
    this.draft = this.feedCreator.createDraft();
  }

  render() {
    return (
      <Input.Group>
        <Col span={10}>
          <Subscribe to={this.draft}>
            {() => (
              <Input
                placeholder="Type text..."
                onInput={(e) => this.draft.setText(e.target.value)}
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
      </Input.Group>
    );
  }
}

