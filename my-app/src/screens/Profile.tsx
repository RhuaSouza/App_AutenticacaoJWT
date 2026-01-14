import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/navigation/authContext';

export default function Profile() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function loadProfile() {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://10.0.3.18:3000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUser(data);
    }

    loadProfile();
  }, []);

  function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          setAuthenticated(false); 
        },
      },
    ]);
  }

  return (
    <View className="flex-1 bg-slate-900 px-6 pt-20">
      <Text className="mb-6 text-3xl font-bold text-white">Perfil</Text>

      {user ? (
        <View className="rounded-xl bg-slate-800 p-6">
          <Text className="text-lg text-white">Nome: {user.name}</Text>
          <Text className="mb-6 text-slate-300">Email: {user.email}</Text>

          <TouchableOpacity className="rounded-xl bg-red-600 py-3" onPress={handleLogout}>
            <Text className="text-center font-semibold text-white">Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text className="text-white">Carregando usuário...</Text>
      )}
    </View>
  );
}
