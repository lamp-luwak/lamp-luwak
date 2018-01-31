import { detailedDiff } from 'deep-object-diff';
import * as deepAssign from 'deep-assign';
import { _exclude as deepExclude } from 'extend_exclude';

export function createDiff(objA, objB) {
  const diff = detailedDiff(objA, objB);

  const deepTruthyfier = node => {
    for (let key in node) {
      if (node.hasOwnProperty(key)) {
        if (node[key] && typeof node[key] === 'object') {
          deepTruthyfier(node[key]);
        } else {
          node[key] = true;
        }
      }
    }
    return node;
  };

  return {
    upserted: deepAssign(diff.added, diff.updated),
    deleted: deepTruthyfier(diff.deleted)
  };
}

export function applyDiff(obj, diff) {
  diff = diff || {};
  obj = deepAssign({}, obj, diff.upserted || {});
  return deepExclude(obj, diff.deleted || {});
}

export function isNotEmptyDiff(diff) {
  diff = diff || {};

  for (let key of [ 'upserted', 'deleted' ]) {
    if (Object.keys(diff[key] || {}).length > 0) {
      return true;
    }
  }

  return false;
}
