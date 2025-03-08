
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Title, Paragraph, DataTable, Button } from 'react-native-paper';
import { styles } from '../styles/theme';

export default function AnalysisScreen({ route, navigation }) {
  const { data } = route.params || {};
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Profile ID Summary</Title>
          <View style={styles.summaryContainer}>
            <Card style={styles.summaryCard}>
              <Card.Content>
                <Title>Total Runs</Title>
                <Paragraph>{data?.summary?.total_runs || 0}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.summaryCard}>
              <Card.Content>
                <Title>Total Invalids</Title>
                <Paragraph>{data?.summary?.total_invalids || 0}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.summaryCard}>
              <Card.Content>
                <Title>Indeterminates</Title>
                <Paragraph>{data?.summary?.total_indeterminates || 0}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.summaryCard}>
              <Card.Content>
                <Title>Invalid %</Title>
                <Paragraph>{data?.summary?.invalid_percentage?.toFixed(2) || 0}%</Paragraph>
              </Card.Content>
            </Card>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Lab-wise Analysis</Title>
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Lab Name</DataTable.Title>
                <DataTable.Title>Truelab ID</DataTable.Title>
                <DataTable.Title numeric>Total Tests</DataTable.Title>
                <DataTable.Title numeric>Invalid %</DataTable.Title>
              </DataTable.Header>

              {data?.detailed?.map((row, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{row['Lab_name']}</DataTable.Cell>
                  <DataTable.Cell>{row['Truelab_id']}</DataTable.Cell>
                  <DataTable.Cell numeric>{row['Total Tests']}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {row['Invalid/Indeterminate %']?.toFixed(2)}%
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
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
