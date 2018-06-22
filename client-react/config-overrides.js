const { injectBabelPlugin, compose } = require('react-app-rewired');
const rewireStyledComponents = require('react-app-rewire-styled-components');

const carry = (fn, ...cArgs) => (...args) => fn(...cArgs.concat(args));

const injectBabelPlugins = (...plugins) => (
  compose(...plugins.map((plugin) => carry(injectBabelPlugin, plugin)))
)

module.exports = function(config, env){
  const rewires = compose(
    rewireStyledComponents,
    injectBabelPlugins(
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
      ['module-resolver', { root: ['./src'] }],
      'transform-decorators-legacy'
    )
  );

  return rewires(config, env);
};
