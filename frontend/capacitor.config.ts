import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartfarm.app',
  appName: 'Smart Farm',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0B2F28',
      showSpinner: false,
    },
    StatusBar: {
      backgroundColor: '#FAFBF8',
      style: 'DARK',
    },
  },
};

export default config;
