// theme.js
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
    primary: '#4285F4',
    secondary: '#D3D3D3',
    card: '#D3D3D3',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121211',
    text: '#FFFFFF',
    primary: '#4285F4',
    secondary: '#2C2C2C',
    card: '#1E1E1E',
  },
};