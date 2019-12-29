const
  Path = require('path'),
  program = require('commander'),
  execa = require('execa'),
  concurrently = require('concurrently');

const actions = {};

function cmd(cmdStr, ...args) {
  const [ fn ] = args;
  const parts = cmdStr.split(' ');
  const cmdArgs = parts.slice(1).map((part) => part.slice(1, -1));
  const [ cmdName ] = parts;

  const action = (opts = {}) => {
    if (typeof fn !== 'function') {
      return exec(...args);
    } else {
      return fn(opts);
    }
  }

  actions[cmdName] = action;

  program
    .command(cmdStr)
    .action((...params) => {
      const opts = {};
      const config = readConfig();
      cmdArgs.forEach((name, index) => opts[name] = params[index] || config[name]);
      action(opts);
    });
}

function start() {
  program.parse(process.argv);
}

function x(path) {
  return Path.resolve(__dirname, 'node_modules/.bin', path);
}

function exec(...pieces) {
  const str = pieces.filter((value) => value).join(' ');
  const ret = execa.command(str);
  ret.stdout.pipe(process.stdout);
  ret.stderr.pipe(process.stderr);
  return ret;
}

function run(name, options) {
  return actions[name](options);
}

function readConfig() {
  return require(Path.resolve(process.cwd(), 'projecter.json'));
}

function parallel(cfg) {
  return concurrently(
    cfg.map(({ exec, name, prefixColor }) => ({
      command: exec.join(' '),
      name,
      prefixColor
    })), {
      prefix: 'name'
    }
  );
}

module.exports = {
  run,
  exec,
  x,
  cmd,
  start,
  parallel
};
