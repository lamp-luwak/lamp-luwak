import { types as t, template } from "@babel/core";
import { FileUniqid } from "./FileUniqid";

const PluginName = "babel-plugin-lamp-luwak";
const LibPath = "lamp-luwak";
const RegClassFunc = "register";
const StoreStateProp = "state";

const regClassSet = new WeakSet();
const uniqid = new FileUniqid();

function transformClassProperty(path: any) {
  const node = path.node;
  if (t.isClassProperty(node) && node.key && (node.key as any).name === StoreStateProp && node.static === false) {
    const { parent: Class, parentPath: ClassPath } = path.parentPath;

    if (regClassSet.has(Class)) {
      return;
    }
    regClassSet.add(Class);

    if (t.isClassDeclaration(Class)) {
      const tpl = template(`require("${LibPath}").${RegClassFunc}(CLASS_ID, "${Class.id.name}_${uniqid.next()}")`);
      ClassPath.insertAfter(tpl({
        CLASS_ID: Class.id,
      }));
    } else { // if (t.isClassExpression(Class))
      const tpl = template(`require("${LibPath}").${RegClassFunc}(CLASS_EXPR, "${uniqid.next()}")`);
      ClassPath.replaceWith(tpl({
        CLASS_EXPR: Class,
      }));
    }
  }
}

export function plugin() {
  return {
    name: PluginName,

    manipulateOptions(_opts: any, parserOpts: any) {
      parserOpts.plugins.push(
        "decorators-legacy",
        "classProperties"
      );
    },
    visitor: {
      Program(_path: any, state: any) {
        uniqid.reset(state.file.opts.filename);
      },
      Class(path: any) {
        const body = path.get("body");
        for (const path of body.get("body")) {
          if (path.isClassProperty()) {
            transformClassProperty(path);
          }
        }
      },
    },
  };
}
