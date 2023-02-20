import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Pressable,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import { Alert, StyleSheet} from 'react-native'
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from '../../Helper'
import HomeScreen from "./HomeScreen"

function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

 async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)

    navigation.navigate('Bottom')
  }
  return (
    <Box flex={1} bg={Colors.black}>
      <Image
        flex={1}
        alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../../assets/cover.png")}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center"
      >
        <Heading>SIGN UP</Heading>
        <VStack space={5} pt="6">
          {/* USERNAME */}
          <Input
            InputLeftElement={
              <FontAwesome name="user" size={20} color={Colors.main} />
            }
            variant="underlined"
            placeholder="John Doe"
            w="70%"
            pl={2}
            type="text"
            color={Colors.main}
            borderBottomColor={Colors.underline}
          />
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
        title="Sign up"
        disabled={loading}
          _pressed={{
            bg: Colors.main,
          }}
          my={30}
          w="40%"
          rounded={50}
          bg={Colors.main}
          onPress={() => signUpWithEmail()}
        >
          SIGN UP
        </Button>
        <View>
          <Text color={Colors.deepestGray}>If you don't already have an account Please,</Text>
          <Pressable mt={4} onPress={() => navigation.navigate("Login")}>
          <Text color={Colors.deepestGray}>LOGIN</Text>
        </Pressable>
        </View>
      </Box>
    </Box>
  );
}

export default RegisterScreen;
