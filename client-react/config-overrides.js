const { injectBabelPlugin } = require('react-app-rewired');
const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function(config, env){
  config = rewireStyledComponents(config, env);
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config
  );
  config = injectBabelPlugin(
    ['module-resolver', { root: ['./src'] }],
    config
  );
  return config;
};
