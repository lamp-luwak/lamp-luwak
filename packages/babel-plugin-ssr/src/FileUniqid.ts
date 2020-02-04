import fs from "fs";
import crypto from "crypto";

export class FileUniqid {
  private filename?: string;
  private prefix = "";
  private counter = 0;

  public reset(filename?: string) {
    this.filename = filename;
    this.prefix = "";
    this.counter = 0;
  }

  private getPrefix() {
    if (!this.prefix) {
      if (process.platform !== "win32" && this.filename) {
        try {
          const stat = fs.statSync(this.filename);
          if (stat.ino) {
            this.prefix = stat.ino.toString(36);
          }
        } catch (e) {}
      }
      if (!this.prefix) {
        this.prefix = crypto
        .createHash("md5")
        .update(this.filename || "", "utf8")
        .digest("base64")
        .slice(0, -2);
      }
    }
    return this.prefix;
  }

  public next() {
    return this.getPrefix() + (this.counter ++).toString(36);
  }
}
