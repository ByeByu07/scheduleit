import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scheduleit.app',
  appName: 'Schedule It',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'clerk.com',
      '*.clerk.com',
      '*.clerk.accounts.dev'
    ],
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
