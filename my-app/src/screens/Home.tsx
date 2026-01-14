import { View, Text, TouchableOpacity } from 'react-native';

export default function Welcome({ navigation }: any) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900 px-6">
      <Text className="mb-2 text-3xl font-bold text-white">Bem-vindo </Text>

      <Text className="mb-10 text-center text-slate-400">
        Faça login ou crie sua conta para continuar
      </Text>

      <TouchableOpacity
        className="mb-4 w-full rounded-xl bg-blue-600 py-4"
        onPress={() => navigation.navigate('Login')}>
        <Text className="text-center text-lg font-semibold text-white">Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full rounded-xl border border-blue-600 py-4"
        onPress={() => navigation.navigate('Register')}>
        <Text className="text-center text-lg font-semibold text-blue-600">Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
