import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Screen01 from './screens/Screen01';
import SignInScreen from './screens/signin_screen';
import SignUpScreen from './screens/signup_screen';

const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Screen01' screenOptions={{ headerShown: false }}>
        <stack.Screen name='Screen01' component={Screen01}></stack.Screen>
        <stack.Screen name='SignInScreen' component={SignInScreen}></stack.Screen>
        <stack.Screen name='SignUpScreen' component={SignUpScreen}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
