import React, { useState, useEffect } from "react";
import {Box, Button, Center, HStack, Image, Pressable,Text, VStack,} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import Colors from "../color";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../Helper";

const Swiper = ({ cartItems, setCartItems }) => (
  <SwipeListView rightOpenValue={-50} previewRowKey="0" previewOpenValue={-40} previewOpenDelay={3000}
    data={cartItems} renderItem={renderItem} renderHiddenItem={hiddenItem} showsVerticalScrollIndicator={false}/>
);
// Cart Item
const renderItem = ({ item }) => (
  <Pressable>
    <Box ml={6} mb={3}>
      <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow="hidden">
        <Center w="25%" bg={Colors.deepGray}>
          <Image source={{ uri: item.image }} alt={item.name} w="full" h={24} resizeMode="contain"/>
        </Center>
        <VStack w="60%" px={2} space={2}>
          <Text isTruncated color={Colors.black} bold fontSize={10}>
            {item.name}
          </Text>
          <Text bold color={Colors.lightBlack}>
            AED {item.price}
          </Text>
        </VStack>
        <Center>
          <Button bg={Colors.main} _pressed={{ bg: Colors.main }}
            _text={{
              color: Colors.white,
            }}
          >
            {item.quantity}
          </Button>
        </Center>
      </HStack>
    </Box>
  </Pressable>
);
// Hidden
const hiddenItem = ({ item, index }, rowMap) => (
  <Pressable w={50} roundedTopRight={10} roundedBottomRight={10} h="88%" ml="auto" justifyContent="center" bg={Colors.red} onPress={() => deleteCartItem(index, rowMap)}>
    <Center alignItems="center" space={2}>
      <FontAwesome name="trash" size={24} color={Colors.white} />
    </Center>
  </Pressable>
);

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const { data, error } = await supabase.from("ProductData").select("*");
      if (error) throw error;
      const products = data.map((item) => ({ ...item, quantity: 1 }));
      setCartItems(products);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  const handleAddToCart = async (product, value) => {
    const cart = await AsyncStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];

    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product_id === product.id
    );

    if (existingCartItemIndex >= 0) {
      const existingCartItem = cartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + value,
      };
      cartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      cartItems.push({
        product_id: ProductData.id,
        name: ProductData.name,
        price: ProductData.price,
        quantity: value,
      });
    }

    await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    setCartItems(cartItems);
  };

  const TotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addToCart = async (item) => {
    try {
      await handleAddToCart(item, 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Swiper cartItems={cartItems} setCartItems={setCartItems} />
      <Box>
        <HStack justifyContent="space-between" px={6} py={4}>
          <Text color={Colors.main} fontSize={14} bold>
            Total
          </Text>
          <Text bold fontSize={18}>
            AED {TotalPrice()}
          </Text>
        </HStack>
        <Button
          bg={Colors.main}
          _pressed={{ bg: Colors.main }}
          _text={{
            color: Colors.white,
          }}
          onPress={() => navigation.navigate("Checkout")}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </>
  );
};

    
    
export default CartItems