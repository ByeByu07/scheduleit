export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  authorizationParams: {
    redirect_uri: 'com.scheduleit.app://dev-rxqpfitfr0sk5u7m.us.auth0.com/capacitor/com.scheduleit.app/callback',
    // audience: 'https://dev-rxqpfitfr0sk5u7m.us.auth0.com/api/v2/',
    // scope: 'openid profile email'
  },
  cacheLocation: 'localstorage' as const
};
