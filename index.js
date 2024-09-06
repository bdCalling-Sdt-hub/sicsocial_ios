/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppRoutes from './src/routes/AppRoutes';

if (__DEV__) {
    require("./ReactotronConfig");
  }
AppRegistry.registerComponent(appName, () => AppRoutes);                