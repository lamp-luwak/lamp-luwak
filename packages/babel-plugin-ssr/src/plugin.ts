import { types as t, template } from "@babel/core";
import { FileUniqid } from "./FileUniqid";

const PluginName = "@impress/babel-plugin-ssr";
const StoreDecoratorName = "store";
const LibPath = "@impress/react";
const RegClassFunc = "register";

const regClassSet = new WeakSet();
const uniqid = new FileUniqid();

function transformClassProperty(path: any) {
  const { decorators, } = path.node;

  for (const node of decorators || []) {
    if (t.isDecorator(node)
      && t.isIdentifier(node.expression)
      && node.expression.name === StoreDecoratorName)
    {
      const { parent: Class, parentPath: ClassPath } = path.parentPath;

      if (regClassSet.has(Class)) {
        return;
      }
      regClassSet.add(Class);

      if (t.isClassDeclaration(Class)) {
        const tpl = template(`require("${LibPath}").${RegClassFunc}("${Class.id.name}_${uniqid.next()}", CLASS_ID)`);
        ClassPath.insertAfter(tpl({
          CLASS_ID: Class.id,
        }));
      } else { // if (t.isClassExpression(Class))
        const tpl = template(`require("${LibPath}").${RegClassFunc}("${uniqid.next()}", CLASS_EXPR)`);
        ClassPath.replaceWith(tpl({
          CLASS_EXPR: Class,
        }));
      }
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
