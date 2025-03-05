import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { styles } from '../styles/theme';

export default function TrendAnalysisScreen({ route }) {
  const { monthlyData, weeklyData } = route.params || {};
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Monthly Trend Analysis</Title>
          {monthlyData && (
            <LineChart
              data={{
                labels: monthlyData.map(d => d.month),
                datasets: [
                  {
                    data: monthlyData.map(d => d.totalTests),
                    color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
                  },
                  {
                    data: monthlyData.map(d => d.totalInvalids),
                    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chartContainer}
            />
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Weekly Trend Analysis</Title>
          {weeklyData && (
            <LineChart
              data={{
                labels: weeklyData.map(d => d.week),
                datasets: [
                  {
                    data: weeklyData.map(d => d.totalTests),
                    color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
                  },
                  {
                    data: weeklyData.map(d => d.totalInvalids),
                    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chartContainer}
            />
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { styles } from '../styles/theme';

export default function TrendAnalysisScreen({ route, navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Trend Analysis</Title>
          <View style={styles.centerContent}>
            <Text style={{ marginVertical: 32, textAlign: 'center' }}>
              Trend visualizations are available in the web application.
              Please use the web interface to view detailed charts.
            </Text>
          </View>
        </Card.Content>
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          Return to Home
        </Button>
      </View>
    </ScrollView>
  );
}
