import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NewsListScreen} from '../screens/NewsListScreen';
import {NewsDetailScreen} from '../screens/NewsDetailScreen';
import type {Article} from '../types/news';

export type RootStackParamList = {
  NewsList: undefined;
  NewsDetail: {article: Article};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const navTheme: Theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: 'transparent'},
};

export const AppNavigator = () => (
  <NavigationContainer theme={navTheme}>
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#e6edf3',
        headerStyle: {backgroundColor: '#0b0f14'},
        contentStyle: {backgroundColor: '#0b0f14'},
      }}>
      <Stack.Screen
        name="NewsList"
        component={NewsListScreen}
        options={{title: 'Новости'}}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{title: 'Детали'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
