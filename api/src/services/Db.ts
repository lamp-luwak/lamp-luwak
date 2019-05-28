import Path from 'path';
import {
  MongoClient,
  Db as MongoDb,
  Collection
} from 'mongodb';

export class Db {
  public url: string;
  public dbname: string;
  public db: MongoDb;

  public configure({ url, dbname }: { url: string, dbname: string }) {
    this.url = url;
    this.dbname = dbname;
  }

  public async init() {
    this.db = await this._getConnectedDb();
  }

  public collection(name: string): Collection {
    return this.db.collection(name);
  }

  private async _getConnectedClient(): Promise<MongoClient> {
    return await MongoClient.connect(this.url, { useNewUrlParser: true });
  }

  private async _getConnectedDb(): Promise<MongoDb> {
    return ( await this._getConnectedClient() ).db(this.dbname);
  }
}
