import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'

export const supabase = createClient(
  "https://pgdudhyevinuuyoeizrs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHVkaHlldmludXV5b2VpenJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2ODQ1MDgsImV4cCI6MTk5MjI2MDUwOH0.bfAfcZlZem62LiBl_a8IWsylH0zj39blrzf7gkIFHUI", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});