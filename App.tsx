import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ProfileProvider } from './src/profile';
import Tabs from './src/navigation';

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tabs />
      </NavigationContainer>
    </ProfileProvider>
  );
}
