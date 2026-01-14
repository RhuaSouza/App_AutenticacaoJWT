import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { jwtDecode } from 'jwt-decode';

import AuthStack from './authStack';
import AppStack from './appStack';
import { AuthContext } from './authContext';

export default function Routes() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const { exp } = jwtDecode<{ exp: number }>(token);

        if (Date.now() >= exp * 1000) {
          await AsyncStorage.removeItem('token');
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch {
        await AsyncStorage.removeItem('token');
        setAuthenticated(false);
      }

      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <NavigationContainer>{authenticated ? <AppStack /> : <AuthStack />}</NavigationContainer>
    </AuthContext.Provider>
  );
}
