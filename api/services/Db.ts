import {
  MongoClient,
  Db as MongoDb,
  Collection,
} from "mongodb";

export class Db {
  public url: string;
  public dbname: string;
  public db: MongoDb;

  public configure({ url, dbname }: any) {
    this.url = url;
    this.dbname = dbname;
  }

  public async init() {
    this.db = await this.getConnectedDb();
  }

  public collection(name: string): Collection {
    return this.db.collection(name);
  }

  private async getConnectedClient(): Promise<MongoClient> {
    return MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  private async getConnectedDb(): Promise<MongoDb> {
    return (await this.getConnectedClient()).db(this.dbname);
  }
}
