const t = require("@babel/core").types;
const template = require("@babel/core").template;
const packageJson = require("./package");

const StoreDecoratorName = "store";
const LibCorePath = "~/lib/core";
const RegClassFunc = "register";

const regClassMap = new WeakMap();

function uniqid() {
  return process.hrtime.bigint().toString(32);
}

function transformClassProperty(path) {
  const { decorators, } = path.node;
  for (const node of decorators || []) {
    if (t.isDecorator(node)
      && t.isIdentifier(node.expression)
      && node.expression.name === StoreDecoratorName)
    {
      const { parent, parentPath, } = path.parentPath;

      if (regClassMap.has(parent)) {
        return;
      }
      regClassMap.set(parent, true);

      if (t.isClassExpression(parent)) {
        const tpl = template(`require("${LibCorePath}").${RegClassFunc}("${uniqid()}", CLASS_EXPR)`);
        parentPath.replaceWith(tpl({
          CLASS_EXPR: parent,
        }));

      } else if (t.isClassDeclaration(parent)) {
        const tpl = template(`require("${LibCorePath}").${RegClassFunc}("${parent.id.name}_${uniqid()}", CLASS_ID)`);
        parentPath.insertAfter(tpl({
          CLASS_ID: parent.id,
        }));
      }
    }
  }
}

module.exports = () => ({
  name: packageJson.name,

  manipulateOptions(opts, parserOpts) {
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
