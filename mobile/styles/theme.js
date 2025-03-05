import { StyleSheet } from 'react-native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

export const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#6c5ce7',
    accent: '#a29bfe',
    background: '#f5f7fa',
    surface: '#ffffff',
    text: '#2c3e50',
    error: '#ff7675',
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginVertical: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
    paddingVertical: 8,
  },
  chartContainer: {
    height: 200,
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  placeholder: {
    color: '#95a5a6',
    fontSize: 16,
  },
  dataTable: {
    marginVertical: 16,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noDataText: {
    color: '#95a5a6',
    fontSize: 18,
    textAlign: 'center',
  }
});