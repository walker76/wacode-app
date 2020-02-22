import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MakeOrderScreen from '../screens/MakeOrderScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import AboutScreen from '../screens/AboutScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Make Order"
        component={MakeOrderScreen}
        options={{
          title: 'Make Order',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pizza" />,
        }}
      />
      <BottomTab.Screen
        name="My Orders"
        component={MyOrdersScreen}
        options={{
          title: 'My Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clock" />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-information-circle" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Welcome To Universal Pizza';
    case 'Links':
      return 'Links to learn more';
    case 'Make Order':
      return 'Create An Order';
    case 'My Orders':
      return 'My Orders';
    case 'About':
      return 'About Us'
  }
}
