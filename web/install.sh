pushd ./babel-plugin
BABEL_PLUGIN_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

npm link
popd
npm link ${BABEL_PLUGIN_NAME}
