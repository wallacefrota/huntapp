import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/routes';
import Status from './src/config/StatusBar';

const App = () => {
  return (
    <>
      <Status />
      <Routes />
    </>
  );
};

export default App;
