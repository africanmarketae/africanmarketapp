import * as Linking from 'expo-linking';
import {Box, Button, Heading, Image, Input, Pressable, Text, VStack, View} from "native-base";
import React from "react";
import Colors from "../color";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { supabase } from '../../Helper'
import { useEffect } from "react";
import { useState } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from "./HomeScreen"
import { Session } from '@supabase/supabase-js'
function LoginScreen() {
     const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

   async function signInWithEmail() {
  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    Alert.alert(error.message);
  } else {
    navigation.navigate('Bottom');
  }
  setLoading(false);
}


  // const handleDeepLink = ({ url }) => {
  //   console.log('url', url);
  //   const route = url?.replace(/.*?:\/\//g, '');
  //   console.log('route', route);
  //   if (route === 'Bottom') {
  //     props.navigation.navigate('Bottom'); // use props.navigation instead of this.props.navigation
  //   }
  //   console.log('Received deep link:', url);
  // };

  // useEffect(() => {
  //   Linking.addEventListener('url', (event) => {
  //     console.log('event.url', event.url);
  //     handleDeepLink(event.url);
  //   });

  //   Linking.getInitialURL().then((url) => {
  //     console.log('initial url', url);
  //     if (url) {
  //       handleDeepLink(url);
  //     }
  //   });
  // }, []);  
 return (
    <Box flex={1} bg={Colors.black}>
      <Image flex={1} alt="Logo" resizeMode="cover" size="lg" w="full" source={require("../../assets/cover.png")}/>
      <Box w="full" h="full" position="absolute" top="0" px="6" justifyContent="center">
        <Heading>LOGIN</Heading>
        <VStack space={5} pt="6">
          {/* EMAIL */}
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color={Colors.main} />
            }
            variant="underlined"
            placeholder="user@gmail.com"
            w="70%"
            pl={2}
            type="text"
            color={Colors.main}
            borderBottomColor={Colors.underline}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize={'none'}
          />
          {/* PASSWORD */}
          <Input
            InputLeftElement={
              <Ionicons name="eye" size={20} color={Colors.main} />
            }
            variant="underlined"
            placeholder="*********"
            w="70%"
            type="password"
            pl={2}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </VStack>
        <Button
          _pressed={{
            bg: Colors.main,
          }}
          my={30}
          w="40%"
          rounded={50}
          bg={Colors.main}
          title="Sign in" 
          disabled={loading}
          onPress={() => signInWithEmail()}
        >
          LOGIN
        </Button>
        <View>
          <Text color={Colors.deepestGray}>If you don't have an account Please,</Text>
          <Pressable mt={4} onPress={() => navigation.navigate("Register")}>
          <Text color={Colors.deepestGray}>SIGN UP</Text>
        </Pressable>
        </View>
      </Box>
    </Box>
  );
}

export default LoginScreen;