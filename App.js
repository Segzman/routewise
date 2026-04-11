import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import RouteBrowseScreen from './screens/RouteBrowseScreen';
import RouteDetailsScreen from './screens/RouteDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import DownloadsScreen from './screens/DownloadsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Browse" component={RouteBrowseScreen} />
      <Stack.Screen name="RouteDetails" component={RouteDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#F0F0F0',
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => {
            const icons = {
              Explore: focused ? 'compass' : 'compass-outline',
              Favorites: focused ? 'heart' : 'heart-outline',
              Downloads: focused ? 'download' : 'download-outline',
              Profile: focused ? 'person' : 'person-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Explore" component={ExploreStack} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Downloads" component={DownloadsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}