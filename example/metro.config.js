const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys({
  ...pak.peerDependencies,
  ...pak.dependencies,
});

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    // We make sure that only one version is loaded for peerDependencies
    // So we block them at the root, and alias them to the versions in example's node_modules
    blockList: modules.map(
      m => new RegExp(`^${escapeRegex(path.join(root, 'node_modules', m))}[/\\\\]..*$`),
    ),
    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(root, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
