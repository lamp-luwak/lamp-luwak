const { injectBabelPlugin, compose } = require('react-app-rewired');
const rewireStyledComponents = require('react-app-rewire-styled-components');

const curry = (fn, ...cArgs) => (...args) => fn(...cArgs.concat(args));

const injectBabelPlugins = (...plugins) => (
  compose(...plugins.map((plugin) => curry(injectBabelPlugin, plugin)))
)

module.exports = function(config, env){
  const rewires = compose(
    rewireStyledComponents,
    injectBabelPlugins(
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
      ['module-resolver', { root: ['./src'] }],
      'add-react-displayname',
      'transform-decorators-legacy',
      'flow-react-proptypes'
    )
  );

  return rewires(config, env);
};
