import superagent from 'superagent';
import { Observable } from 'rxjs/Observable';

// @Injec???????????
class Request {

  http({ url, method = 'get', options = {}, query = {}, data = {} }) {
    const agent = options.agent || superagent;
    return Observable.create((subscriber) => {
      let request = agent[method](url).query(query).send(data);

      if (options.type) request = request.type(options.type);
      if (options.json) request = request.serialize();
      if (options.headers) request = request.set(options.headers);
      if (options.withCredentials) request = request.withCredentials();
      if (options.responseType) request = request.responseType(options.responseType);
      if (options.timeout) request = request.timeout(options.timeout);

      if (isArray(options.auth)) request = request.auth(...options.auth);
      if (isArray(options.redirects)) request = request.redirects(options.redirects);
      if (isArray(options.attaches)) request = options.attaches.filter(isArray).reduce((acc, attach) => acc.attach(...attach), request);
      if (isArray(options.fields)) request = options.fields.filter(isArray).reduce((acc, field) => request.field(...field), request);

      request.end((error, response) => {
        if (error) {
          subscriber.error({ error, response });
        }
        if (!response || (options.only2xx && !response.ok)) {
          subscriber.error({ error: 'not 2xx', response });
        }

        subscriber.next({ ...response });
        subscriber.complete();
      });
      return () => request && request.abort();
    });
  }

  get(url) {
    return this.http(url);
  }

}
