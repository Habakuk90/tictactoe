
export const environment = {
  production: true,
  signalR: {
    baseUrl: 'http://localhost:8081/api',
  },
  ghost: {
    baseUrl: 'http://blog.andkra.eu/',
    contentApiUrl: 'ghost/api/v2/content/',
    apiKey: process.env.KEY,
    apiKey2: process.env.KEY2
  }
};

// '8a6a1a7b88abd518d6e578517f'
