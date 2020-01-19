const t = require("@babel/core").types;
const template = require("@babel/core").template;
const packageJson = require("../package.json");
const uniqid = require("./uniqid");

const StoreDecoratorName = "store";
const LibPath = "@impress/react";
const RegClassFunc = "register";

const regClassMap = new WeakMap();

function transformClassProperty(path) {
  const { decorators, } = path.node;

  for (const node of decorators || []) {
    if (t.isDecorator(node)
      && t.isIdentifier(node.expression)
      && node.expression.name === StoreDecoratorName)
    {
      const { parent: Class, parentPath: ClassPath } = path.parentPath;

      if (regClassMap.has(Class)) {
        return;
      }
      regClassMap.set(Class, true);

      if (t.isClassDeclaration(Class)) {
        const tpl = template(`require("${LibPath}").${RegClassFunc}("${Class.id.name}_${uniqid()}", CLASS_ID)`);
        ClassPath.insertAfter(tpl({
          CLASS_ID: Class.id,
        }));
      } else { // if (t.isClassExpression(Class))
        const tpl = template(`require("${LibPath}").${RegClassFunc}("${uniqid()}", CLASS_EXPR)`);
        ClassPath.replaceWith(tpl({
          CLASS_EXPR: Class,
        }));
      }
    }
  }
}

module.exports = () => ({
  name: packageJson.name,

  manipulateOptions(_opts, parserOpts) {
    parserOpts.plugins.push(
      "decorators-legacy",
      "classProperties"
    );
  },
  visitor: {
    Class(path) {
      const body = path.get("body");
      for (const path of body.get("body")) {
        if (path.isClassProperty()) {
          transformClassProperty(path);
        }
      }
    },
  },
});
