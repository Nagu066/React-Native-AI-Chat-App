import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenNavigation from './App/Navigation/HomeScreenNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <HomeScreenNavigation/>
      </NavigationContainer>
      <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
