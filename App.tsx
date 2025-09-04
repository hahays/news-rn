import React from 'react';
import {enableScreens} from 'react-native-screens';
import {ThemeProvider} from 'styled-components/native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {theme} from './src/theme';

enableScreens();

const App = () => (
  <ThemeProvider theme={theme}>
    <AppNavigator />
  </ThemeProvider>
);

export default App;
