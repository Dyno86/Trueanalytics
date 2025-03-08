import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { styles } from '../styles/theme';

export default function TrendAnalysisScreen({ route, navigation }) {
  const { data } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Monthly Trend Analysis</Title>
          <View style={styles.chartContainer}>
            <Text style={styles.placeholder}>
              {data ? 'Monthly Trend Chart Will Appear Here' : 'No data available for display'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Weekly Trend Analysis</Title>
          <View style={styles.chartContainer}>
            <Text style={styles.placeholder}>
              {data ? 'Weekly Trend Chart Will Appear Here' : 'No data available for display'}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}