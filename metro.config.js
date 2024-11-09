const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  server: {
    port: 8082,
    host: '192.168.12.202', // Change to '0.0.0.0',
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
