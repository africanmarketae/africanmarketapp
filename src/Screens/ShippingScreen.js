import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { useState } from "react";

const ShippingInputs = [

  {
    label: "ENTER PHONE NUMBER",
    type: "text",
  },
  {
    label: "ENTER ADDRESS",
    type: "text",
  }
];

function ShippingScreen() {
  //  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();
  return (
    <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
      {/* Header */}
      {/* <Center pb={15}>
        <Text color={Colors.white} fontSize={14} bold>
          DELIVERY ADDRESS
        </Text>
      </Center> */}
      {/* Inputs */}
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={2} mt={5}>
            {ShippingInputs.map((i, index) => (
              <FormControl key={index}>
                <FormControl.Label
                  _text={{
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {i.label}
                </FormControl.Label>
                <Input
                  borderWidth={0.2}
                  borderColor={Colors.black}
                  bg={Colors.subGreen}
                  py={2}
                  type={i.type}
                  color={Colors.black}
                  _focus={{
                    bg: Colors.subGreen,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                />
              </FormControl>
            ))}
             <Text italic textAlign="center">
              All Payments are <Text bold> CASH ON DELIVERY</Text> by default
            </Text>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default ShippingScreen;
