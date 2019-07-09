import nanoid from "nanoid";
import { provide } from "~/lib/core";
import { Db } from "~/services/Db";

export class AccountApi {
  @provide public db: Db;

  public async createToken() {
    const token = nanoid();
    await this.db.collection("tokens").insertOne({ token });
    return token;
  }

}
