import {Box, Flex, Heading, Image, Pressable, ScrollView,Text,} from "native-base";
import React from "react";
import Colors from "../color";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from '../../Helper'

function HomeProducts() {
  const navigation = useNavigation();
  const [ProductData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const { data, error } = await supabase
        .from('ProductData')
        .select('*');
      if (error) {
        console.error(error);
      } else {
        setProductData(data);
      }
    };
    fetchProductData();
  }, []);
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {ProductData.map((product) => (
          <Pressable
            onPress={() => navigation.navigate("Single", product)}
            key={product.id}
            w="47%"
            bg={Colors.white}
            rounded="md"
            shadow={2}
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden"
          >
            <Image
              source={{ uri: product.image }}
              alt={ProductData.name}
              w="full"
              h={24}
              resizeMode="contain"
            />
            <Box px={4} pt={1}>
              <Heading size="sm" bold>
                AED {product.price}
              </Heading>
              <Text fontSize={10} mt={1} isTruncated w="full">
                {product.name}
              </Text>
            </Box>
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
}

export default HomeProducts;