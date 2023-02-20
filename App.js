import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, StatusBar } from "native-base";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import OrderScreen from "./src/Screens/OrderScreen";
import BottomNav from "./src/Navigations/BottomNav";
import { LogBox } from "react-native";
import { supabase } from './Helper';
import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import HomeScreen from "./src/Screens/HomeScreen";
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';


LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();
// const prefix = Linking.makeUrl('/');
// const deepLink = Linking.createURL('com.supabase.staging://login-callback/');
export default function App() {
  // const [loading, setLoading] = useState(true)
  // const [username, setUsername] = useState('')
  // useEffect(() => {
  //   if (session) 
  // }, [session])

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          
          <Stack.Screen name="Login" component={LoginScreen} />         
          <Stack.Screen name="Register" component={RegisterScreen} />
           <Stack.Screen name="Bottom" component={BottomNav} />
          <Stack.Screen name="order" component={OrderScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
