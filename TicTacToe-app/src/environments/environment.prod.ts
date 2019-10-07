
export const environment = {
  production: true,
  signalR: {
    baseUrl: 'http://localhost:8081/api',
  },
  ghost: {
    baseUrl: 'http://blog.andkra.eu/',
    contentApiUrl: 'ghost/api/v2/content/',
    apiKey: process.env.GHOST_API_KEY
  }
};
