import React from 'react';
import { subscribe, inject, mut } from 'lib/core';
import { FeedCreator as FeedCreatorSubject } from 'subjects/FeedCreator';
import { Input, Button, Col } from 'antd';

@subscribe
export class FeedCreator extends React.PureComponent {
  @inject(FeedCreatorSubject) feedCreator;

  @mut text;

  render() {
    return (
      <Input.Group>
        <Col span={10}>
          <Input
            placeholder="Type text..."
            onInput={(e) => this.text = e.target.value}
            value={this.text}
            />
        </Col>
        <Col span={14}>
          <Button type="primary">
            Create
          </Button>
        </Col>
      </Input.Group>
    );
  }
}
