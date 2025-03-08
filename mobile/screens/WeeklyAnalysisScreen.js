
import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, DataTable } from 'react-native-paper';
import { styles } from '../styles/theme';

export default function WeeklyAnalysisScreen({ route }) {
  const { data } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Weekly Analysis by Lab</Title>
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Lab Name</DataTable.Title>
                <DataTable.Title>Week</DataTable.Title>
                <DataTable.Title numeric>Total Runs</DataTable.Title>
                <DataTable.Title numeric>Total Invalids</DataTable.Title>
                <DataTable.Title numeric>Invalid %</DataTable.Title>
              </DataTable.Header>

              {data?.map((row, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{row['Lab_name']}</DataTable.Cell>
                  <DataTable.Cell>{row['Week'].toString()}</DataTable.Cell>
                  <DataTable.Cell numeric>{row['Total Runs']}</DataTable.Cell>
                  <DataTable.Cell numeric>{row['Total Invalids/Indeterminates']}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {row['Invalid/Indeterminate %'].toFixed(2)}%
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
