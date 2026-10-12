import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Skills from './screens/Skills';
import Editor from './screens/Editor';
import About from './screens/About';
import { ProjectDetails, ProjectList, ProjectsStack } from './screens/Projects';
import { C } from './theme';

const Stack = createNativeStackNavigator<ProjectsStack>();
const Tab = createBottomTabNavigator();

function ProjectsNav() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: C.dark }, headerTintColor: '#fff' }}>
      <Stack.Screen name="ProjectList" component={ProjectList} options={{ title: 'Projects' }} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} options={{ title: 'Project details' }} />
    </Stack.Navigator>
  );
}

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: C.dark }, headerTintColor: '#fff', tabBarActiveTintColor: C.primary, tabBarLabelStyle: { fontSize: 12 } }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Skills" component={Skills} />
      <Tab.Screen name="Projects" component={ProjectsNav} options={{ headerShown: false }} />
      <Tab.Screen name="Editor" component={Editor} options={{ title: 'Edit profile', tabBarLabel: 'Edit' }} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}
