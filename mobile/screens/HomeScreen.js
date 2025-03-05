import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Title, Card, Paragraph } from 'react-native-paper';
import { styles } from '../styles/theme';
import * as DocumentPicker from 'expo-document-picker';

export default function HomeScreen({ navigation }) {
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        // TODO: Implement file processing
        console.log('File selected:', result.uri);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Truenat Dashboard Data Analysis Tool</Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
        Designed by Subhadeep. S
      </Paragraph>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Upload Data</Title>
          <Paragraph>Select a CSV file to analyze Truenat test results</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleFileUpload}>
            Upload CSV File
          </Button>
        </Card.Actions>
      </Card>

      <View style={{ marginTop: 24 }}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Analysis')}
        >
          Profile ID Analysis
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('LotAnalysis')}
        >
          Lot Analysis
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('TrendAnalysis')}
        >
          Trend Analysis
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('WeeklyAnalysis')}
        >
          Weekly Analysis
        </Button>
      </View>
    </ScrollView>
  );
}
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { styles } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, { marginTop: 16 }]}>
        <Card.Content>
          <Title style={{ textAlign: 'center', fontSize: 24, marginBottom: 8 }}>
            Truenat Dashboard
          </Title>
          <Paragraph style={{ textAlign: 'center', marginBottom: 16 }}>
            Data Analysis Tool for Healthcare Professionals
          </Paragraph>
          
          <View style={styles.fileUploadContainer}>
            <Text style={styles.uploadText}>
              Please use the web application to upload CSV files
            </Text>
          </View>
        </Card.Content>
      </Card>

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
            This application helps to analyze Truenat diagnostic data 
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
