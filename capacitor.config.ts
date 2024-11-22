import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scheduleit.app',
  appName: 'Schedule It',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'auth0.com',
      '*.auth0.com'
    ],
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
