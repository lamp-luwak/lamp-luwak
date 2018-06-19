import { mut } from 'lib/core';

export class User {

  @mut name;

  setName(name) {
    this.name = name;
  }

}
