import { Box, Heading, Image, ScrollView, HStack, View, Spacer, Text, VStack, Input } from "native-base";
import React, { useState } from "react";
import Colors from "../color";
import NumericInput from "react-native-numeric-input";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../Helper'
import ShippingScreen from "./ShippingScreen";
import OrderConfirmedScreen from "./OrderConfirmedScreen";

function SingleProductScreen({ route }) {
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const product = route.params;

  const handleOrder = async (orderData) => {
    try {
      const { data, error } = await supabase.from('orders').insert(orderData);
      if (error) {
        console.error(error);
      } else {
        console.log('Order data uploaded successfully!');
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }

    navigation.navigate('Checkout');
  };

  const handleConfirmOrder = () => {
    const orderData = { 
      product: product.name, 
      value: product.price * value, 
      quantity: value, 
      address, 
      phoneNumber 
    };
    handleOrder(orderData);
  };

  return (
    <Box safeArea flex={1} bg={Colors.white}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} alt="Product Image" alt="Image" w="full" h={300} resizeMode="contain"/>
        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          {product.name}
        </Heading>
        <HStack space={2} alignItems="center" my={5}>
          {product.countInStock > 0 ? (
            <NumericInput 
              value={value} 
              totalWidth={140} 
              totalHeight={30} 
              iconSize={25} 
              step={1} 
              maxValue={product.countInStock}
              minValue={0} 
              borderColor={Colors.deepGray} 
              rounded 
              textColor={Colors.black} 
              iconStyle={{ color: Colors.white }}
              rightButtonBackgroundColor={Colors.main} 
              leftButtonBackgroundColor={Colors.main} 
              onChange={setValue}
            />
          ) : (
            <Heading bold color={Colors.red} italic fontSize={12}>
              Out of stock
            </Heading>
          )}

          <Spacer />
          <Heading bold color={Colors.black} fontSize={19}>
            AED {product.price}
          </Heading>
        </HStack>
        <Text lineHeight={24} fontSize={12}>
          {product.description}
        </Text>
        <VStack mt={10} space={2}>
          <Text fontSize={12} fontWeight="bold" textTransform="uppercase">ENTER PHONE NUMBER</Text>
          <Input
            value={phoneNumber} 
            onChangeText={setPhoneNumber} 
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            bg={Colors.white}
            borderWidth={0.2}
            borderRadius={5}
            borderColor={Colors.black}
            py={2}
            px={2}
            fontSize={10}
            _focus={{
                    bg: Colors.subGreen,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
          />
          <Text fontSize={12} fontWeight="bold" textTransform="uppercase">ENTER ADDRESS</Text>
          <Input 
            value={address} 
            onChangeText={setAddress} 
            placeholder="Enter address"
            bg={Colors.white}
            borderWidth={0.2}
            borderRadius={5}
            px={2}
            borderColor={Colors.black}
            py={2}
            fontSize={10}
            numberOfLines={3}
            _focus={{
                    bg: Colors.subGreen,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
          />
        </VStack>
        <Buttone
          onPress={handleConfirmOrder}
          bg={Colors.main}
          color={Colors.white}
          mt={10}
        >
          CONFIRM ORDER
        </Buttone>
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
