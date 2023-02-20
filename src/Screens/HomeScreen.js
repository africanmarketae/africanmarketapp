import { Box, Text, View } from "native-base";
import React from "react";
import Colors from "../color";
import HomeProducts from "../Components/HomeProducts";
import HomeSearch from "../Components/HomeSearch";
import { supabase } from '../../Helper';
// import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import LoginScreen from "./LoginScreen";
import 'react-native-url-polyfill/auto'

function HomeScreen() {
  //   const [session, setSession] = useState<Session | null>(null)

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [])
  return (
    <Box flex={1} bg={Colors.subGreen}>
      {/* {session && session.user ? <HomeScreen key={session.user.id} session={session} /> : <LoginScreen />} */}
      <HomeSearch />
      <HomeProducts />
    </Box>
  );
}

export default HomeScreen;
