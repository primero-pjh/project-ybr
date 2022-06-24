import * as React from 'react';
import { legacy_createStore as createStore } from 'redux';
import reducers from './src/reducers'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Count from './src/components/count'
import { Button } from 'react-native-elements';
const store = createStore(reducers);
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Count />
      <Text>Home!</Text>
      <Button title="Solid Button" onPress={onPress}/>
    </View>
  );
}
function onPress() {
  for(var k in store) {
    console.log("key:", k);
    console.log("value:", store[k]);
  }
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
// <Provider store={createStore(reducers)}>
// <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>React Native & Redux Example</Text>
//   {/* <Count/> */}
// </View>