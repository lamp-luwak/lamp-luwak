import * as deepAssign from 'deep-assign';
import {environment as base} from './environment.base';

export const environment = deepAssign({}, base, {
  production: true
});
