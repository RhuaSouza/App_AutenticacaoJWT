import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext } from 'react';
import { RootStackParamList } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/navigation/authContext';
type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function Login() {
  const { setAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation<RegisterNavigationProp>();
  interface LoginResponse {
    message: string;
    token: string;
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    console.log(email, password);
    if (!email.trim() || !password.trim()) {
      Alert.alert('Preencha o formulário para cadastrar!');
      return;
    }

    try {
      const response = await fetch('http://10.0.3.18:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data: LoginResponse = await response.json();
      console.log(data);
      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        setAuthenticated(true);
      } else {
        Alert.alert('Erro no Login', data.message || 'Tente novamente');
      }
    } catch (error) {
      console.log('ERRO!:', error);
    }
  }
  return (
    <View className="flex-1 justify-center bg-slate-900 px-6">
      <Text className="mb-8 text-3xl font-bold text-white">Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        className="mb-4 rounded-xl bg-slate-800 px-4 py-4 text-white"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        className="mb-6 rounded-xl bg-slate-800 px-4 py-4 text-white"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity className="rounded-xl bg-blue-600 py-4" onPress={handleLogin}>
        <Text className="text-center text-lg font-semibold text-white">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
