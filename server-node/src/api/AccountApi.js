import nanoid from 'nanoid';
import { inject } from 'lib/core';
import { Db } from 'services/Db';

export class AccountApi {
  @inject(Db) db;

  async createToken() {
    const token = nanoid();
    await this.db.run('INSERT INTO tokens VALUES (:token)', { token });
    return token;
  }

}
