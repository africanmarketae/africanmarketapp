import {
  Box,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import {StyleSheet} from 'react-native';
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation} from "@react-navigation/native";

const paymentMethodes = [
  {
    image: require("../../assets/images/paypal.png"),
    alt: "paypal",
    icon: "Ionicons",
  },
];

function OrderConfirmedScreen() {
  const navigation = useNavigation();
  return (
    <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
      {/* Header */}
      <Center pb={15}>
        <Text color={Colors.white} fontSize={14} bold>
          ORDER CONFIRMED
        </Text>
      </Center>
      {/* Selection */}
      <Box h="full" bg={Colors.order} px={5}>
        <View> 
           <Text italic textAlign="center" px={8}>
              <Text bold> YOUR ORDER IS ON THE WAY!</Text>
            </Text>
        </View>
        
        <View>
          <View>
      <Image
        source={require('../../assets/images/4792.jpg')}
        style={styles.image}
        resizeMode='cover'
        alt="OrderOnTheWay"
      />
    </View>
          <Buttone
              onPress={() => navigation.navigate("Home")}
              bg={Colors.main}
              color={Colors.white}
              mt={5}
            >
              
              CONTINUE SHOPPING
            </Buttone>
        </View>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    width: 500,
    height: 500,
     marginTop: 90,
  },
});
export default OrderConfirmedScreen;
