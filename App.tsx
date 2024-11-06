import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from 'react-native-reanimated';

import React from 'react';
import {LogBox} from 'react-native';
import AppRoutes from './src/routes/AppRoutes';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

// Suppress specific warning
LogBox.ignoreLogs(['Sending `rn-recordback` with no listeners registered']);

const App = () => {
  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
