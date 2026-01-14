import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const navigation = useNavigation<RegisterNavigationProp>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleRegister() {
    console.log(name, email, password);
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Preencha o formulário para cadastrar!');
      return;
    }
    if (!ValidateEmail(email)) {
      Alert.alert('Email inválido');
      return;
    }

    try {
      const response = await fetch('http://10.0.3.18:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        Alert.alert('Cadastro concluído!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro no cadastro', data.message || 'Tente novamente');
      }
    } catch (error) {
      console.log('ERRO!:', error);
    }
  }

  function ValidateEmail(email: string) {
    return emailRegex.test(email);
  }
  return (
    <View className="flex-1 justify-center bg-slate-900 px-6">
      <Text className="mb-8 text-3xl font-bold text-white">Criar conta</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#94a3b8"
        className="mb-4 rounded-xl bg-slate-800 px-4 py-4 text-white"
        value={name}
        onChangeText={setName}
      />

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

      <TouchableOpacity className="rounded-xl bg-blue-600 py-4" onPress={handleRegister}>
        <Text className="text-center text-lg font-semibold text-white">Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
