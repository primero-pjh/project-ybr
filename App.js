import React, {useState} from 'react';
import { legacy_createStore as createStore } from 'redux';
import reducers from './src/reducers'
import { Text, View, Box } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Count from './src/components/count'
import ChatPage from './src/components/chat/chat'
import { Button, Card, Input, Switch, Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { io } from "socket.io-client";
// const socket = io("ws://110.46.100.19:8080");
// socket.on("Connection", function(data) {
//   console.log("data:", data);
// });
//AsyncStorage setItem
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
    getData();
  } catch (e) {
    console.log("error:", e);
  // saving error
  }
}
//AsyncStorage getItem
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      console.log("value:", value);
      // value previously stored
    }
  } catch(e) {
    // error reading value
    console.log("error:", e);
  }
}
// storeData("primero");
getData();

const store = createStore(reducers);
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Count />
      <Text>Home!</Text>
      <Button title="로그인 페이지로 이동" onPress={() => navigation.navigate('Login')}/>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatPage} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [code, setCode] = useState('');
  const [visible, setVisible] = useState(false);
  const [autoLogin, setSwitchValue] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
      <Card>
        <Card.Title>LOGIN PAGE</Card.Title>
        <Card.Divider />
        <Input placeholder="아이디" value={id} 
          onChangeText={value=>setId(value)} />
        <Input placeholder="비밀번호" value={pw} secureTextEntry={true} 
          onChangeText={value=>setPw(value)} />
        <Input placeholder="초대코드" value={code} 
          onChangeText={value=>setCode(value)} />
        <Card.Divider />
        <View style={{flexDirection:'row', flexWrap:'wrap', alignItems: "center", paddingBottom: 15}}>
          <Text style={{color: 'black', paddingRight: 10, paddingLeft: 5}}>자동로그인</Text>
          <Switch value={autoLogin} label="hi" onValueChange={setSwitchValue} />
        </View>
        <Button title="로그인" onPress={ () => handleLogin() }/>
        <Overlay isVisible={visible} fullScreen={true}>
          <Text>Hello from Overlay!</Text>
        </Overlay>
      </Card>
    </View>
  );
  function handleLogin() {
    console.log("id:", id);
    console.log("pw:", pw);
    console.log("code:", code);
    console.log("autoLogin:", autoLogin);
    // setVisible(true);
    navigation.navigate('HomeStack');
    // socket.emit("/api/user/login", {
    //   id: id,
    //   pw: pw,
    //   code: code,
    //   autoLogin: autoLogin
    // }, (response) => {
    //   console.log("response;", response);
    // });
  }
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeStack" component={HomeStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// <Provider store={createStore(reducers)}>
// <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>React Native & Redux Example</Text>
//   {/* <Count/> */}
// </View>