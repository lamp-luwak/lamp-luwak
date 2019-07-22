import { store, provide } from "~/lib/core";
import { fetchJson } from "~/lib/fetch";
import { Config } from "~/services/Config";

export enum FetcherStatus {
  Progress,
  Ok,
  Fail,
}

export type Handler = (data: any) => any;
export type BeforeHandlerNext = () => boolean;
export type BeforeHandler = (next: BeforeHandlerNext) => any;

export class Fetcher {
  @provide private config: Config;

  @store public status: FetcherStatus = FetcherStatus.Ok;

  constructor(
    protected urlString?: string,
    protected okHandler?: Handler,
    protected failHandler?: Handler,
    protected beforeHandler?: BeforeHandler,
    ) {
  }

  public url(urlString: string) {
    this.urlString = urlString;
    return this;
  }

  public ok(okHandler: Handler) {
    this.okHandler = okHandler;
    return this;
  }

  public fail(failHandler: Handler) {
    this.failHandler = failHandler;
    return this;
  }

  public before(beforeHandler: BeforeHandler) {
    this.beforeHandler = beforeHandler;
    return this;
  }

  public async fetch() {
    if (this.beforeHandler) {
      let isStopped = true;
      const result = this.beforeHandler(() => isStopped = false);
      if (isStopped) {
        this.status = FetcherStatus.Ok;
        return result;
      }
    }

    this.status = FetcherStatus.Progress;
    try {
      const data = await fetchJson(this.config.apiHost + (this.urlString || ""));
      const result = this.okHandler && this.okHandler(data);
      this.status = FetcherStatus.Ok;
      return result;
    } catch (error) {
      if (this.failHandler) {
        const result = this.failHandler(error);
        this.status = FetcherStatus.Fail;
        return result;
      } else {
        console.error(error);
        this.status = FetcherStatus.Fail;
      }
    }
  }

  public exec() {
    this.fetch().catch((error) => {
      console.error(error);
    });
  }

}
