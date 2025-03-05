import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Truenat Mobile Dashboard</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>View Analysis</Title>
          <Paragraph>Select an analysis type to view:</Paragraph>

          <View style={{ marginTop: 24 }}>
            <Button
              mode="contained"
              style={styles.button}
              icon="chart-line"
              onPress={() => navigation.navigate('Analysis')}
            >
              Profile ID Analysis
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              icon="package-variant"
              onPress={() => navigation.navigate('LotAnalysis')}
            >
              Lot Analysis
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              icon="chart-timeline-variant"
              onPress={() => navigation.navigate('TrendAnalysis')}
            >
              Trend Analysis
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              icon="calendar-week"
              onPress={() => navigation.navigate('WeeklyAnalysis')}
            >
              Weekly Analysis
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>About</Title>
          <Paragraph>
            This application helps healthcare professionals analyze Truenat diagnostic data
            for better decision making and resource allocation.
          </Paragraph>
          <Paragraph style={{ marginTop: 8, fontStyle: 'italic' }}>
            Designed by Subhadeep. S
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}