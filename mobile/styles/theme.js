import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6c5ce7',
    accent: '#00a8ff',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#2c3e50',
    error: '#ff4757',
  },
  roundness: 8,
};

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  chartContainer: {
    marginVertical: 16,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
};
import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2c3e50',
    accent: '#3498db',
    background: '#f5f7fa',
    surface: '#ffffff',
    error: '#e74c3c',
    text: '#2c3e50',
    disabled: '#bdc3c7',
    placeholder: '#95a5a6',
  },
  roundness: 8,
  fonts: {
    ...DefaultTheme.fonts,
    medium: { ...DefaultTheme.fonts.medium, fontWeight: '600' },
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#34495e',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  summaryCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 8,
  },
  button: {
    marginVertical: 8,
    paddingVertical: 6,
    backgroundColor: '#3498db',
  },
  buttonContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  fileUploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#3498db',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(52, 152, 219, 0.05)',
    marginVertical: 16,
  },
  uploadText: {
    marginTop: 12,
    fontSize: 16,
    color: '#34495e',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
