
import React from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { Card, Title, DataTable, Button } from 'react-native-paper';
import { styles } from '../styles/theme';

export default function LotAnalysisScreen({ route, navigation }) {
  const { data } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Lot Specific Analysis</Title>
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Lot Number</DataTable.Title>
                <DataTable.Title numeric>Total Runs</DataTable.Title>
                <DataTable.Title numeric>Total Invalids</DataTable.Title>
                <DataTable.Title numeric>Invalid %</DataTable.Title>
              </DataTable.Header>

              {data?.map((row, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{row['Lot']}</DataTable.Cell>
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
