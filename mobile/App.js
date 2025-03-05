import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './styles/theme';
import HomeScreen from './screens/HomeScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import LotAnalysisScreen from './screens/LotAnalysisScreen';
import TrendAnalysisScreen from './screens/TrendAnalysisScreen';
import WeeklyAnalysisScreen from './screens/WeeklyAnalysisScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6c5ce7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Truenat Dashboard' }}
          />
          <Stack.Screen 
            name="Analysis" 
            component={AnalysisScreen}
            options={{ title: 'Profile ID Analysis' }}
          />
          <Stack.Screen 
            name="LotAnalysis" 
            component={LotAnalysisScreen}
            options={{ title: 'Lot Analysis' }}
          />
          <Stack.Screen 
            name="TrendAnalysis" 
            component={TrendAnalysisScreen}
            options={{ title: 'Trend Analysis' }}
          />
          <Stack.Screen 
            name="WeeklyAnalysis" 
            component={WeeklyAnalysisScreen}
            options={{ title: 'Weekly Analysis' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
