import { Fetcher, FetcherStatus } from "./FetcherPool/Fetcher";
export { Fetcher, FetcherStatus };

export class FetcherPool {

  public make(url?: string) {
    return new Fetcher(url);
  }

}
