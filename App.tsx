import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from 'react-native-reanimated';

import React from 'react';
import {LogBox} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import {Provider} from 'react-redux';
import ContextApi from './src/context/ContextApi';
import store from './src/redux/store';
import AppRoutes from './src/routes/AppRoutes';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

RNFetchBlob.config({
  trusty: true,
});

// Suppress specific warning
LogBox.ignoreLogs(['Sending `rn-recordback` with no listeners registered']);

const App = () => {
  return (
    <Provider store={store}>
      <ContextApi>
        <AppRoutes />
      </ContextApi>
    </Provider>
  );
};

export default App;
